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

server.listen(3000, handleListen);

// function handleConnection(socket)   {
//     console.log(socket);
// }

// wss.on("connection",(socket) => {
//     console.log("Connected to Browser😂");
//     socket.send("hello!!!");
// });




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
