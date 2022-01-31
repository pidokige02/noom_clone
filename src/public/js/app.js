// codes below are for frond end
//window.location.host tells us where we are this can be applicable to web and modile phone
const socket = new WebSocket(`ws://${window.location.host}`);

// socket.addEventListener("open", () =>{
//     console.log("Connected to Server");
// });

// socket.addEventListener("message", (message) =>{
//     console.log("Just got this:", message, "from ths server");
// });


// socket.addEventListener("close", () =>{
//     console.log("disconnected from Server🤦‍♂️");
// });