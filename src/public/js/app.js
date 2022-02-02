// codes below are for frond end
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

//window.location.host tells us where we are this can be applicable to web and modile phone
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload};    // turn data into object
    return JSON.stringify(msg);     // turn object into string
}

// register eventlisterer function for "open", "message" and "close" event for the socket.
socket.addEventListener("open", () =>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) =>{
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () =>{
    console.log("disconnected from Server🤦‍♂️");
});

//register timer event triggered after 10 seconds
// setTimeout(() => {
//     socket.send("hello from the browser!");
// },10000)

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);

    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);