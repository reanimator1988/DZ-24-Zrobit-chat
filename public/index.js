"use strict";

window.addEventListener('error', (event) => {
    console.log('Oooops', event)
})


const CURRENT_LI_KEY = 'currentLi';
const allLiElements = [...document.querySelectorAll('.lesson-plan li')];
const currentLiIndex = localStorage.getItem(CURRENT_LI_KEY);
if (currentLiIndex) {
    const elementToHighlight = allLiElements(currentLiIndex);
    setAsActive(elementToHighlight);
}

document.querySelector('.lesson-plan').addEventListener('click', e => {
    if (e.target.nodeName !== 'LI') {
        return;
    }
})



const ws = new WebSocket('ws://localhost:9999')

ws.onmessage = messageEvent => {
    console.log('Received from server: ', messageEvent.data)
}

ws.onopen = () => {
    document.querySelector('.btn-send').onclick = () => {
        const message = document.querySelector('.message').value.trim()
        if (message) {
            ws.send(message)
        }
    }
} 






