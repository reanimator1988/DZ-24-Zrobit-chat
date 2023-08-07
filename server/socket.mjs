import { WebSocketServer } from "ws";

const wss = new WebSocketServer ({port: 9999});

wss.on('connection', client => {
    console.log('---- NEW CLIENT CONNECTED');

    client.on('message', data => {
        console.log('GOT MESSAGE', data.toString())
    })

    client.on('close', () => {
        console.log('----CLIENT DISCONNECT')
    })
})

