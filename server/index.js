const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.use(express.static("public"));

const drawnPixels = [];

io.on("connect", socket => {
    console.log("a user connected");
    io.emit("online", io.engine.clientsCount);
    socket.emit("pixels", drawnPixels);

    socket.on("draw", data => {
        drawnPixels.push(data);
        io.emit("pixels", drawnPixels);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
        io.emit("online", io.engine.clientsCount);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
