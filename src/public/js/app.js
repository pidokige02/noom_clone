const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        console.log(myStream);
        myFace.srcObject = myStream;
    } catch(err) {
      console.log(err);
    }
}

getMedia();

function handlemMuteClick(){
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function handleCameraClick(){
    if(cameraOff){
        cameraBtn.innerText = "Tuen Camera Off";
        cameraOff = false;
    } else{
        cameraBtn.innerText = "Tuen Camera On";
        cameraOff = true;
    }
}

muteBtn.addEventListener("click", handlemMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);

//////////////////////#2 SOCKET IO ////////////////////////////////////
// const socket = io();

// const welcome = document.getElementById("welcome");
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// room.hidden = true;
// let roomName;

// function addMessage(message){
//     const ul = room.querySelector("ul");
//     const li = document.createElement("li");
//     li.innerText = message;
//     ul.appendChild(li);
// }

// function handleMessageSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#msg input");
//     const value = input.value;
//     socket.emit("new_message", input.value, roomName, () => {
//         addMessage(`You: ${value}`);
//     });
//     input.value = "";
// }

// function handleNicknameSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#name input");
//     const value = input.value;
//     socket.emit("nickname", input.value);
//     input.value = "";
// }

// function showRoom(msg) {
//     welcome.hidden = true;
//     room.hidden = false;
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}`;
//     const msgForm = room.querySelector("#msg");
//     const nameForm = room.querySelector("#name");
//     msgForm.addEventListener("submit",handleMessageSubmit);
//     nameForm.addEventListener("submit",handleNicknameSubmit);
// }

// function handleRoomSubmit(event){
//     event.preventDefault();
//     const input = form.querySelector("input");
//     // socket.emit("enter_room", {payload:input.value}, showRoom); // not working w/ socket.to(roomName).emit("welcome");
//     socket.emit("enter_room", input.value, showRoom); // "enter_room" is event name, socket.io can send object directly.
//     roomName = input.value;
//     input.value = "";
// }

// form.addEventListener("submit", handleRoomSubmit);

// //Socket Code
// socket.on("welcome", (user,newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`;
//     addMessage(`${user} arrived!`);
// });

// socket.on("bye", (left,newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`;
//     addMessage(`${left} left ㅠㅠ`);
// });

// // socket.on("new_message", (msg) => addMessage(msg));
// socket.on("new_message", addMessage);

// //socket.on("room_change", (msg) => console.log(msg));
// //socket.on("room_change", console.log);
// socket.on("room_change", (rooms) => {
//     const roomList = welcome.querySelector("ul");
//     roomList.innerHTML = "";
//     if(rooms.llength === 0){
//         return;
//     }
//     rooms.forEach(room => {
//         const li = document.createElement("li");
//         li.innerText = room;
//         roomList.append(li);
//     });
// });
//////////////////////#2 SOCKET IO ////////////////////////////////////







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