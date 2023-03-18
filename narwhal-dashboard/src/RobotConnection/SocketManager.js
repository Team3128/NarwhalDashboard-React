
import config from "../config.json";

var socket;

function connectSocket() {
    socket = new WebSocket(config.robotIp);
    return new Promise((resolve, reject) => {
        socket.onopen = () => {
            resolve();
        };
        socket.onmessage = onSocketMessage;
        socket.onerror = (error) => {
            reject(error);
        };
    });
}

function onSocketMessage(event) {
    //TODO: Fill this in
}

function send(command) {
    socket.send(command);
}

export { connectSocket, send };