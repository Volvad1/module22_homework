const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const ws = new WebSocket('wss://echo-ws-service.herokuapp.com/');
let allowServerMessage = true;

ws.addEventListener('open', (event) => {
    allowServerMessage = true;
});

ws.addEventListener('message', (event) => {
    const message = event.data;

    if (allowServerMessage) {
        const isLocationMessage = message.includes('Геолокация');
        if (!isLocationMessage) {
            displayMessage(message, 'server-message');
        }
    } else {
        console.log('Server message ignored:', message);
    }
});

ws.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        ws.send(message);
        console.log('Sent message:', message);
        displayMessage(message, 'sender-message');
        messageInput.value = '';
        allowServerMessage = false;
    }
}

function initWebSocket() {
    ws.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
    });

    ws.addEventListener('message', (event) => {
        const message = event.data;
        const isLocationMessage = message.includes('Геолокация');

        if (!isLocationMessage || allowServerMessage) {
            console.log('Received server message:', message);
            displayMessage(message, 'server-message');
        } else {
            console.log('Server message ignored:', message);
        }
    });

    ws.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });
}

function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
            const messageText = `<a href="${locationUrl}" target="_blank">Гео-локация</a>`;
            displayMessage(messageText, 'sender-message');
            allowServerMessage = false;
        }, (error) => {
            console.error('Geolocation error:', error);
        });
    } else {
        alert('Ваш браузер не поддерживает геолокацию.');
    }
}
function displayMessage(message, className) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(className);
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
initWebSocket();