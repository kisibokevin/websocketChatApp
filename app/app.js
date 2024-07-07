
const socket = new io('ws://localhost:3000');


function sendMessage(e) {
    e.preventDefault()

    const input = document.querySelector('input');
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
    input.focus();

}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

socket.on('message', (data) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = data;
    ul.append(li);
})
