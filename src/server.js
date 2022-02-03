import http from "http" // pre install package in node.js
import SocketIO from "socket.io";
import express from "express"

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.use("/public", express.static(__dirname + "/public"));  //expose only public folder to the user (security reason)
app.get("/", (_,res) => res.render("home")); // rendering template "home" for the root route .
app.get("/*", (_,res) => res.redirect("/")); // catch all other url

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on ("connection", (socket) =>{
    socket['nickname'] = "Amno";
    socket.onAny((event) => {
        console.log(`Socket Event:${event}`);  // tiny spy code
    });
    socket.on("enter_room",(roomName, done) =>{
        //console.log(socket.rooms);  //Set(1) { 'zbdmMbOdDQXVSb0iAAAD' }
        socket.join(roomName);
        //console.log(socket.rooms);  //Set(2) { 'zbdmMbOdDQXVSb0iAAAD', { payload: '1212' } }
        done();                     // callback function named showRoom from app.js
        socket.to(roomName).emit("welcome", socket.nickname);  // send welcome event to everybody in the room except myself

        // setTimeout(() => {
        //     done("hello from the backend");
        // },15000);
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye",socket.nickname)); //
    });

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });

    socket.on("nickname", nickname => socket["nickname"] = nickname);

});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);


//////////////////////////////////////////////////////////////////////////////////////
// code for lesson0~1 teaching websocket
// import http from "http" // pre install package in node.js
// import WebSocket from "ws"
// import express from "express"

// const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname +"/views");
// app.use("/public", express.static(__dirname + "/public"));  //expose only public folder to the user (security reason)
// app.get("/", (_,res) => res.render("home")); // rendering template "home" for the root route .
// app.get("/*", (_,res) => res.redirect("/")); // catch all other url

// const handleListen = () => console.log('Listening on http://localhost:3000')

// // create http server from express application.
// const server = http.createServer(app);
// // create webSocket server on top of http server
// // if http server isn't required, you don't need to put "server" parameter to WebSocket.Server ({server})
// const wss = new WebSocket.Server ({server})

// function handleConnection(socket)   {
//     console.log(socket);
// }


// const sockets = [];
// // wss.on("connection", handleConnection);
// // below codes are executed for each browser connected to the server
// wss.on("connection",(socket) => {
//     sockets.push(socket);  // save socket whenever new socket is established for multiple browsers.
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser😂");
//     socket.on("close", () => {
//         console.log("disconnected from the Browser✔");
//     })
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket =>
//                     aSocket.send(`${socket.nickname}: ${message.payload}`))
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//      });
// });

// server.listen(3000, handleListen);




//////////////////////////////////////////////////////////////////////////////////////
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
