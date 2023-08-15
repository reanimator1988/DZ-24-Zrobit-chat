"use strict";


document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket('ws://localhost:9998');

    const messageInput = document.querySelector('.message');
    const nameInput = document.querySelector('.name');
    const sendButton = document.querySelector('.btn-send');
    const joinButton = document.querySelector('.btn-join');
    const nameContainer = document.getElementById('nameContainer');
    const chatContainer = document.getElementById('chatContainer');
    const messageContainer = document.getElementById('messageContainer');

    let userName = '';

    ws.onmessage = receivedMessageEvent => {
        try {
            const messageData = JSON.parse(receivedMessageEvent.data);
            if (!messageData.systemMessage) {
                const name = messageData.name;
                const message = messageData.message;
                const time = new Date(messageData.time).toLocaleTimeString();

                const newMessageElement = document.createElement('div');
                const messageContent = document.createElement('span');
                messageContent.textContent = `(${time}) ${name}: ${message}`;
                newMessageElement.appendChild(messageContent);
                messageContainer.appendChild(newMessageElement);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
            console.log('Received data:', receivedMessageEvent.data);
        }
    };

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();

        if (message && userName) {
            ws.send(JSON.stringify({ name: userName, message, time: new Date().toISOString() }));
            messageInput.value = '';
        }
    });

    joinButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            userName = name;
            nameContainer.style.display = 'none';
            chatContainer.style.display = 'block';
        }
    });
});
