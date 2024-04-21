console.log("Entered script");
var root = document.body;

console.log("Starting to render");

m.render(root, [
    m("div", {class: "chat-container"}, [
        m("div", {class: "history"}, [
            m("div", {class: "welcome"}, [
                m("img", {src: "../../media/kitt-black-slow.gif"})
            ]),
            m("div", {class: "chat-req-resp"}, [
                m("div", {class: "chat-message self"}, [
                    m("span", {class: "name"}, "You:"),
                    m("span", {class: "message"}, "Hello, how are you doing?")
                ]),
                m("div", {class: "chat-message bot"}, [
                    m("span", {class: "name"}, "Genie:"),
                    m("span", {class: "message"}, "I'm good, thanks! How are you doing?")
                ])
            ])
        ]),
        m("div", {class: "input"}, [
            m("textarea", {id: "chatInput", rows: "3", placeholder: "You command"}),
            m("button", {id: "sendButton"}, "Send")
        ])
    ])
]);
