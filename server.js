const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});

const path = require("path");
const PORT = process.env.PORT || 8000;

// Serve static files
app.use(express.static(path.join(__dirname)));

let users = {};

io.on("connection", (socket) => {
    socket.on("user-joined", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("new-user-joined", name);
    });

    socket.on("send", (message) => {
        socket.broadcast.emit("recevie", { name: users[socket.id], message });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-left", users[socket.id]);
        delete users[socket.id];
    });
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
