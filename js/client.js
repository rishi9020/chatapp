const socket = io("http://localhost:8001");

const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInput');
const msgContainer = document.querySelector('.container');

const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', name)