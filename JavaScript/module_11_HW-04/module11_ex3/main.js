const websocketUrl = "wss://echo-ws-service.herokuapp.com/"
const messageSendButton = document.querySelector('.chat__send-button');
const geoSendButton = document.querySelector('.chat__geo-button');
const messageInput = document.querySelector('.chat__input');
const dialogArea = document.querySelector('.chat__dialog-area');

let coordsOnMap;
let chatWebsocket = new WebSocket(websocketUrl);

function openChatWebsocket() {
    chatWebsocket.onopen = function (event) {
        console.log(`[websocket message] Соединение открыто`);
    }

    chatWebsocket.onmessage = function(event) {
        console.log(`[message] Данные, полученные с сервера: ${event.data}`);
        displayMessageOnDialogArea(event.data, 'server');
    }

    chatWebsocket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[websocket close] Соединение закрыто, код=${event.code} ,причина=${event.reason}`);
        } else {
            console.log('[websocket close] Соединение прервано');
        }
        dialogArea.textContent = 'Сервер недоступен';
    }

    chatWebsocket.onerror = function (event) {
        alert(`[error]`);
        dialogArea.textContent = 'Сервер недоступен';
    }
}

openChatWebsocket();

const displayMessageOnDialogArea = (messageStr, senderStr, isGeo, coordsOnMapURL) => {

    const messageContainer = document.createElement('div');

    if(senderStr === 'client') {
        messageContainer.classList = 'client-message';
    } else if (senderStr === 'server') {
        if(messageStr === coordsOnMap){
            return;
        }else{
            messageContainer.classList = 'server-message';
        }
    } else {
        console.log('Аргумент "senderStr" содержит некорректное значение');
        return;
    }

    dialogArea.appendChild(messageContainer);

    if(isGeo){
        const messageLink = messageContainer.appendChild(document.createElement('a'))
        messageLink.textContent = messageStr;
        messageLink.href = coordsOnMapURL;
    } else {
        messageContainer.textContent = messageStr;
    }

    dialogArea.scrollBy(0, dialogArea.clientHeight);
}

messageSendButton.addEventListener('click', () => {
    const inputText = messageInput.value;
    messageInput.value = '';

    if(inputText !== '') {
        displayMessageOnDialogArea(inputText, 'client', 0)
        chatWebsocket.send(inputText);
    }
})

const generateGeoHrefAsync = function () {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                resolve(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`)
            })
        } else {
            reject('Гео-локация не поддерживается');
        }
    })
}

geoSendButton.addEventListener('click', async () => {
    try {
        coordsOnMap = await generateGeoHrefAsync();
        displayMessageOnDialogArea('Гео-локация', 'client', true, coordsOnMap);
        chatWebsocket.send(coordsOnMap);
    } catch(err) {
        displayMessageOnDialogArea('Гео-локация недоступна', 'client', false);
    }
})
