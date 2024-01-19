const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const Controller = require("sm-express-server/Controller");
const context = require("sm-express-server/context");
const { methodsMap } = require("sm-express-server/constants");


function Server(port = 4000, direction = "/", use = []) {
    /**@type {Controller[]} */
    this.controllers = [];
    this.port = process.env.PORT || port;
    this.direction = direction;
    this.app = express();
    this.pdp = path.join(__dirname, "../.." + this.direction);
    this.app.use(cors());
    this.app.use(express.static(this.pdp));
    use.forEach((u) => {
        this.app.use(u);
    })
    this.server = http.createServer(this.app);
    context.app = this.app;
}
Server.prototype.start = function (calback) {
    this.server.listen(this.port, () => {
        this.controllers.forEach(c => {
            this.app[methodsMap[c.method]](c.path, c.storage, c.callback);
        })
        calback();
    });
}
Server.prototype.addControllers = /**@param{Controller[]}controllers */ function (controllers) {
    controllers.forEach(c => {
        this.controllers.push(c);
    });
}

module.exports = { Server };
