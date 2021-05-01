const socket = io("http://localhost:8001");

const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInput');
const msgContainer = document.querySelector('.container');

const append = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('msg');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
})

const name = prompt("Enter your name to join the chat");

socket.emit('new-user-joined', name);

socket.on('user-joined', data => {
    append(`${data}: joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})