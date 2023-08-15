import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 9998 });

wss.on('connection', client => {
    console.log('---- NEW CLIENT CONNECTED');

    let userName = '';

    client.on('message', data => {
        try {
            const parsedData = JSON.parse(data);

            if (parsedData.name && userName !== parsedData.name) {
                userName = parsedData.name;
                const userJoinedMessage = { systemMessage: `User ${userName} has joined the chat.` };
                broadcastMessage(userJoinedMessage);
            }

            if (client.readyState === WebSocket.OPEN) {
                broadcastMessage(parsedData);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    function broadcastMessage(message) {
        wss.clients.forEach(otherClient => {
            if (otherClient.readyState === WebSocket.OPEN) {
                otherClient.send(JSON.stringify(message));
            }
        });
    }
});