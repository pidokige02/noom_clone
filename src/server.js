// import http from "http" // pre install package in node.js
// import WebSocket from "ws"
// import express from "express"

// const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname +"/views");
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", (_,res) => res.render("home"));
// app.get("/*", (_,res) => res.redirect("/"));

// const handleListen = () => console.log('Listening on http://localhost:3000')

// const server = http.createServer(app);      // combine http and express server. this is required for websocket.
// const wss = new WebSocket.Server ({server}) // create http server on top of webSocket server

// function handleConnection(socket)   {
//     console.log(socket);
// }

// wss.on("connection",(socket) => {
//     console.log("Connected to Browser😂");
//     socket.send("hello!!!");
// });

// server.listen(3000, handleListen);
// // app.listen(3000, handleListen);

import express from "express"

const app = express();

//below two line set the view
app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.use("/public", express.static(__dirname + "/public"));  //expose public folder th the user


// it render
app.get("/", (req,res) => res.render("home"));  // create only root route.
const handleListen = () => console.log('Listening on http://localhost:3000')
app.listen(3000, handleListen);
