class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            userInput: document.querySelector('.user__input')
        }

        this.state = false;
        this.messages = [];
        this.escalated = false; // New flag to track if chat has been escalated
    }

    display() {
        const { openButton, chatBox, sendButton, userInput } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        // Enable or disable the input field based on the escalated flag
        

        // Initialize chat with default AI message
        this.initializeChat(chatBox);
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('https://giga-bot.onrender.com/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''

                // Check if the chat has been escalated and disable user input if necessary
                if (this.escalated) {
                    this.args.userInput.disabled = true;
                }

            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'; // User's message
                // Add thumbs up and thumbs down emojis below AI response
                html += '<div class="emoji-container">';
                html += '<button class="emoji-button like-button" onclick="likeClicked(this)">&#128077;</button>'; // Thumbs up emoji button
                html += '<button class="emoji-button dislike-button" onclick="dislikeClicked(this)">&#128078;</button>'; // Thumbs down emoji button
                html += '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'; // Bot's message
            }
        });
    
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
    
    // Function to initialize chat with default AI message
    initializeChat(chatbox) {
        // Add default message from AI bot
        const defaultMsg = "Hey there! How can I help you?";
        let defaultMsgObj = { name: "Sam", message: defaultMsg };
        this.messages.push(defaultMsgObj);
        
        // Add default message and emoji buttons to chatbox
        this.updateChatText(chatbox);
    }
}

function likeClicked(button) {
    const dislikeButton = button.parentElement.querySelector('.dislike-button');
    button.classList.toggle("liked");
    if (button.classList.contains("liked")) {
        dislikeButton.classList.remove("disliked");
    }
}

function dislikeClicked(button) {
    const likeButton = button.parentElement.querySelector('.like-button');
    button.classList.toggle("disliked");
    if (button.classList.contains("disliked")) {
        likeButton.classList.remove("liked");
    }
}


const chatbox = new Chatbox();
chatbox.display();
