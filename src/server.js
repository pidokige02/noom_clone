import http from "http" // pre install package in node.js
import WebSocket from "ws"
import express from "express"

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.use("/public", express.static(__dirname + "/public"));  //expose only public folder to the user (security reason)
app.get("/", (_,res) => res.render("home")); // rendering template "home" for the root route .
app.get("/*", (_,res) => res.redirect("/")); // catch all other url

const handleListen = () => console.log('Listening on http://localhost:3000')

// create http server from express application.
const server = http.createServer(app);
// create webSocket server on top of http server
// if http server isn't required, you don't need to put "server" parameter to WebSocket.Server ({server})
const wss = new WebSocket.Server ({server})

function handleConnection(socket)   {
    console.log(socket);
}


const sockets = [];
// wss.on("connection", handleConnection);
// bbelow code  is executed for each browser connected to the server
wss.on("connection",(socket) => {
    sockets.push(socket);  // save socket whenever new socket is established for multiple browsers.
    console.log("Connected to Browser😂");
    socket.on("close", () => {
        console.log("disconnected from the Browser✔");
    })
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString()))
        //socket.send(message.toString()); // send back the received messaage.
     });
});

server.listen(3000, handleListen);





// sample code for lesson #0
// import express from "express"

// const app = express();

// //below two line set the view
// app.set("view engine", "pug");
// app.set("views", __dirname +"/views");
// app.use("/public", express.static(__dirname + "/public"));  //expose only public folder to the user (security reason)


// // it render
// app.get("/", (_,res) => res.render("home"));  // rendering template "home" for the root route .
// app.get("/*", (_,res) => res.redirect("/"));  // catch all other url

// const handleListen = () => console.log('Listening on http://localhost:3000')
// app.listen(3000, handleListen);
