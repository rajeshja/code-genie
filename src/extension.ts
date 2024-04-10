// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class GenieProvider implements vscode.WebviewViewProvider {

	private _view?: vscode.WebviewView;

	constructor(private  readonly _extensionUri: vscode.Uri) {
		this._extensionUri = _extensionUri;
	}

	resolveWebviewView(
		webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext<unknown>, 
		token: vscode.CancellationToken): void | Thenable<void> {
			this._view = webviewView;

			webviewView.webview.html = getWebviewContent();
	}
}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
        <html lang="en">
		<head>
			<title>Chat Interface</title>
			<script src="./scripts/htmx.min.js"></script>
			<style>
				body {
					font-family: Arial, sans-serif;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100vh;
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				.chat-container {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					width: 100%;
					height: 99%;
					max-width: 500px;
					border: 1px solid #ccc;
					padding: 10px;
				}

				.history {
					flex-grow: 1;
					overflow-y: auto;
				}

				.chat-message {
					padding: 10px;
					margin-bottom: 10px;
					border-radius: 10px;
				}

				.chat-message .name {
					font-style: italic;
					font-weight: bold;
					display: block;
					padding: 5px 0;
				}

				.chat-message .message {
					margin-left: 10px;
				}

				.self {
					text-align: right;
					border: solid 2px;
					margin-left: 20px;
				}

				.bot {
					border: solid 1px;
					margin-right: 20px;
				}

				.input {
					margin-top: auto;
					padding: 5px 0;
					display: flex;
				}

				.input textarea {
					flex-grow: 1;
				}

				.input button {
					width: 70px;
				}
			</style>
		</head>

		<body>
			<div class="chat-container" id="chatContainer">
				<div class="history">
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
					</div>
					<div class="chat-message self">
						<span class="name">You:</span>
						<span class="message">Hello, how are you?</span>
					</div>
					<div class="chat-message bot">
						<span class="name">Genie:</span>
						<span class="message">I'm good, thanks! How about you?</span>
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
	disposable = vscode.window.registerWebviewViewProvider('code-genie.sidebar', provider, );
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

