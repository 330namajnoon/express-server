const { Server } = require("socket.io");
/**
 *
 * @param {import("http").Server} server
 */
function SocketIo(server, originCors = "*", socketControllers = []) {
    this.socketControllers = socketControllers;
    this.io = new Server(server, { cors: { origin: originCors } });
    this.io.on("connection", (socket) => {
        console.log("user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        this.socketControllers.forEach(({ name, callback, broadcast = false }) => {
            socket.on(name, (...args) => {
                if (broadcast) socket.broadcast.emit(name, callback(...args));
                else this.io.emit(name, callback(...args));
            });
        });
    });
}

function createSocketController(name = "newSocketController", callback = (...args) => {}, broadcast = false) {
    return {
        name,
        callback,
        broadcast,
    };
}

module.exports = { SocketIo, createSocketController };
