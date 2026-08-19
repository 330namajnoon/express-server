const express = require("express");
const http = require("http");
const cors = require("cors");

/**
 * @typedef {{
* @param {(req: import("express").Request, res: import("express").Response) => void} callback
* }} Controller
*/

/**
 * 
 * @param {number} port 
 * @param {string} direction 
 * @param {any[]} use 
 * @param {{path: string, exports.Router}[]} routers 
 * @param {Controller[]} controllers 
 * @returns {Server}
 */
function Server(port = 4000, direction = "/", use = [], routers = [], controllers = []) {
    /**@type {Controller[]} */
    this.controllers = controllers;
    this.routers = routers;
    this.port = process.env.PORT || port;
    this.direction = direction;
    this.app = express();
    this.pdp = this.direction;
    this.app.use(cors({
        origin: function (origin, cb) {
            if (!origin) return cb(null, true); // curl/SSR/same-origin
            try {
                var u = new URL(origin);
                var h = u.hostname;
                var ok = (u.protocol === "https:" && (h === "sinul.es" || h.endsWith(".sinul.es")))
                    || h === "localhost" || h === "127.0.0.1";
                return cb(null, ok);
            } catch (e) { return cb(null, false); }
        },
        credentials: true,
    }));
    this.app.use(express.static(this.pdp));
    use.forEach((u) => {
        this.app.use(u);
    });
    this.routers.forEach((router) => {
        this.app.use(router.path, router.router);
    });
    this.server = http.createServer(this.app);
}
Server.prototype.start = function (calback) {
    this.server.listen(this.port, () => {
        this.controllers.forEach((c) => {
            this.app[c.method](c.path, c.storage, c.callback);
        });
        calback();
    });
};
Server.prototype.addControllers = /**@param{Controller[]}controllers */ function (controllers) {
    controllers.forEach((c) => {
        this.controllers.push(c);
    });
};

module.exports = Server;
