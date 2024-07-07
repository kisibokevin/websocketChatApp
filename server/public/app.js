
const socket = new io('ws://localhost:3000');

const activity = document.querySelector('.activity-detector');
const msgInput = document.querySelector('input');

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        socket.emit('message', msgInput.value);
        msgInput.value = '';
    }
    msgInput.focus();

}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

socket.on('message', (data) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = data;
    ul.append(li);
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5));
});


let activityTimeout;
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`;

    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        activity.textContent = '';
    }, 3000);
})