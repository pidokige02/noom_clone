// codes below are for frond end
//window.location.host tells us where we are this can be applicable to web and modile phone
const socket = new WebSocket(`ws://${window.location.host}`);

// register eventlisterer function for "open", "message" and "close" event for the socket.
socket.addEventListener("open", () =>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) =>{
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () =>{
    console.log("disconnected from Server🤦‍♂️");
});

//register timer event triggered after 10 seconds
setTimeout(() => {
    socket.send("hello from the browser!");
},10000)