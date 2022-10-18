



var socket = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']});


const form = document.getElementById('send-container'); // getting form by accessing it's id
const messageinput = document.getElementById('messageInp') // getting input by accessing it's id
const messageContainer = document.querySelector('.container')


const append = (message,position)=>{  //anonymous callback function that takes 2 parameters message and position
  const messageElement = document.createElement('div'); //create a new element div
  messageElement.innerText = message; //div innerText is equal to message
  messageElement.classList.add('message'); //add message class
  messageElement.classList.add(position); //add position class
  messageContainer.append(messageElement); //append the message Element into messageContainer
}

socket.on('output-message',data=>{
  console.log(data);
  if(data.length){
    data.forEach(message=>{
      append(message.name+':'+message.message)
    })
  }
})

form.addEventListener('submit',(event)=>{
     event.preventDefault();
     var messageValue = messageinput.value;
     append(`You:${messageValue}`,'right')
     socket.emit('send',messageValue);
     messageinput.value='';
})



const name = prompt("What is your name");
socket.emit('new-user-joined',name);  //it sends the name  to index.js and socket.on accepts it in place of new-user-joined

socket.on('user-joined', name=>{    //if any user joined then it will callback a function which gives a value of data

append(`${name} joined the chat`,'right');   //`` this is a javascript feature read the documentation and ${} alos.this function will take th name and show it on chat that name has joined the chat

})

socket.on('receive',data=>{
  append(`${data.name}: ${data.message}`,'left')
})

socket.on('bye',data=>{
  append(`${data} left the chat`,'left');
})
