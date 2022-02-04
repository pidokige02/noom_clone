import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);


wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName, done) => {
      socket.join(roomName);
      done();
      socket.to(roomName).emit("welcome");  // send message except myself
    });
    socket.on("offer", (offer, roomName) => {  // design as per RCTConnection diagram
      socket.to(roomName).emit("offer", offer);
    });
    // socket.on("answer", (answer, roomName) => {
    //   socket.to(roomName).emit("answer", answer);
    // });
    // socket.on("ice", (ice, roomName) => {
    //   socket.to(roomName).emit("ice", ice);
    // });
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

////////////////////////#2 SOCKET.IO
// import http from "http" // pre install package in node.js
// import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";
// import express from "express"

// const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname +"/views");
// app.use("/public", express.static(__dirname + "/public"));  //expose only public folder to the user (security reason)
// app.get("/", (_,res) => res.render("home")); // rendering template "home" for the root route . '_" means that nothing is cared about.
// app.get("/*", (_,res) => res.redirect("/")); // catch all other url

// const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer, {   // added for socket.io admin
//     cors: {
//       origin: ["https://admin.socket.io"],
//       credentials: true
//     }
// });

// instrument(wsServer, {
//     auth: false
// });

// function publicRooms(){
//         const {
//             sockets: {
//                 adapter: {sids, rooms},
//             },
//         } = wsServer;
//         const publicRooms = [];
//         rooms.forEach((_, key) => {
//             if(sids.get(key) === undefined) {
//                 publicRooms.push(key)
//             }
//         })
//     return publicRooms;
// }

// function countRoom(roomName){
//     return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on ("connection", (socket) =>{
//     socket['nickname'] = "Amno";
//     socket.onAny((event) => {
//         // console.log(wsServer.sockets.adapter); // adapter structure
//         console.log(`Socket Event:${event}`);  // tiny spy code
//     });
//     socket.on("enter_room",(roomName, done) =>{
//         //console.log(socket.rooms);  //Set(1) { 'zbdmMbOdDQXVSb0iAAAD' }
//         socket.join(roomName);
//         //console.log(socket.rooms);  //Set(2) { 'zbdmMbOdDQXVSb0iAAAD', { payload: '1212' } }
//         done();                     // callback function named showRoom from app.js
//         socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));  // send welcome event to everybody in the room except myself
//         wsServer.sockets.emit("room_change",publicRooms()); // send a message to all socket
//         // setTimeout(() => {
//         //     done("hello from the backend");
//         // },15000);
//     });
//     socket.on("disconnecting", () => {
//         socket.rooms.forEach((room) => socket.to(room).emit("bye",socket.nickname, countRoom(room) -1 )); //
//     });

//     socket.on("disconnect", () => {
//         wsServer.sockets.emit("room_change",publicRooms()); // send a message to all socket
//     });

//     socket.on("new_message", (msg, room, done) => {     // done is passed from the frontend
//         socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//         done();
//     });

//     socket.on("nickname", nickname => socket["nickname"] = nickname);

// });

// const handleListen = () => console.log(`Listening on http://localhost:3000`);
// httpServer.listen(3000, handleListen);
////////////////////////#2 SOCKET.IO


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
