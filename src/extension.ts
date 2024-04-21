// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class GenieProvider implements vscode.WebviewViewProvider {

	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri) {
		this._extensionUri = _extensionUri;
	}

	resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken): void | Thenable<void> {
		this._view = webviewView;
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, "media"), vscode.Uri.joinPath(this._extensionUri, "src", "ui")],
		};
		webviewView.webview.html = getWebviewContent(webviewView.webview, this._extensionUri);
	}
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {

	const imgPath = vscode.Uri.joinPath(extensionUri, "media", "kitt-black-slow.gif");
	const imgSrcUri = webview.asWebviewUri(imgPath);
	const cssPath = vscode.Uri.joinPath(extensionUri, "src", "ui", "style", "style.css");
	const styleUri = webview.asWebviewUri(cssPath);

	return `<!DOCTYPE html>
        <html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} ${imgSrcUri}; style-src ${webview.cspSource} ${styleUri}; script-src ${webview.cspSource}/scripts;"/>
			<title>Chat Interface</title>
			<script src="./scripts/htmx.min.js"></script>
			<link rel="stylesheet" type="text/css" href="${styleUri}"/>
		</head>

		<body>
			<div class="chat-container" id="chatContainer">
				<div class="history">
					<!--div class="welcome">
						<img src="${imgSrcUri}" />
					</div -->
					<div class="chat-req-resp">
						<div class="chat-message bot">
							<span class="name">Genie:</span>
							<span class="message">Welcome! How can I help you today?</span>
						</div>
					</div>
					<div class="chat-req-resp">
						<div class="chat-message self">
							<span class="name">You:</span>
							<span class="message">Hello, how are you?</span>
						</div>
						<div class="chat-message bot">
							<span class="name">Genie:</span>
							<span class="message">I'm good, thanks! How about you?</span>
						</div>
					</div>
					<div class="chat-req-resp">
						<div class="chat-message self">
							<span class="name">You:</span>
							<span class="message">Hello, how are you?</span>
						</div>
						<div class="chat-message bot">
							<span class="name">Genie:</span>
							<span class="message">I'm good, thanks! How about you?</span>
						</div>
					</div>
					<div class="chat-req-resp">
						<div class="chat-message self">
							<span class="name">You:</span>
							<span class="message">Hello, how are you?</span>
						</div>
						<div class="chat-message bot">
							<span class="name">Genie:</span>
							<span class="message">I'm good, thanks! How about you?</span>
						</div>
					</div>
					<div class="chat-req-resp">
						<div class="chat-message self">
							<span class="name">You:</span>
							<span class="message">Hello, how are you?</span>
						</div>
						<div class="chat-message bot">
							<span class="name">Genie:</span>
							<span class="message">I'm good, thanks! How about you?</span>
						</div>
					</div>
				</div>
				<div class="input">
					<textarea id="chatInput" rows="3" placeholder="Your command"></textarea>
					<button id="sendButton">Send</button>
				</div>
			</div>
		</body>
        </html>`;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-genie" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('code-genie.hello', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showWarningMessage('A Notification from Code Genie!');
	});
	context.subscriptions.push(disposable);

	const provider = new GenieProvider(context.extensionUri);
	console.log(`Context URI = ${context.extensionUri}`);
	disposable = vscode.window.registerWebviewViewProvider('code-genie.sidebar', provider,);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }

