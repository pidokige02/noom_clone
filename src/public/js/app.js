const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}


function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    // socket.emit("enter_room", {payload:input.value}, showRoom); // not working w/ socket.to(roomName).emit("welcome");
    socket.emit("enter_room", input.value, showRoom); // "enter_room" is event name, socket.io can send object directly.
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//Socket Code
socket.on("welcome", () => {
    console.log("welcome");
    addMessage("someone joined!");
});

socket.on("bye", () => {
    console.log("bye");
    addMessage("someone left ㅠㅠ");
});










// // codes below are for frond end using websocket
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");

// //window.location.host tells us where we are this can be applicable to web and modile phone
// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload){
//     const msg = {type, payload};    // turn data into object
//     return JSON.stringify(msg);     // turn object into string
// }

// // register eventlisterer function for "open", "message" and "close" event for the socket.
// socket.addEventListener("open", () =>{
//     console.log("Connected to Server");
// });

// socket.addEventListener("message", (message) =>{
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);
// });

// socket.addEventListener("close", () =>{
//     console.log("disconnected from Server🤦‍♂️");
// });

// //register timer event triggered after 10 seconds
// // setTimeout(() => {
// //     socket.send("hello from the browser!");
// // },10000)

// function handleSubmit(event){
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     input.value = "";
// }

// function handleNickSubmit(event){
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname",input.value));
//     input.value = "";
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);