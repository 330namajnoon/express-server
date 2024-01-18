const context = require("sm-express-server/context");
const { methodsMap } = require("./constants");

/**@typedef {{method: keyof methodsMap, name: string, path: string, storage: import("multer").Multer}} Propertise */

class Controller {
    storage = null;
    name = "getApp";
    path = "/app";
    /**@type {keyof methodsMap} */
    method = "GET";
    callback =
    /**
    * 
    * @param {import("express").Request} req 
    * @param {import("express").Response} res
    * @param {import("express").Express} app
    */ (req, res, app) => { };
    /**@type {import("express").Express} */
    app = context.app;
    /**@param {Propertise} propertise */
    constructor(
        propertise,
        callback =  /**
        * 
        * @param {import("express").Request} req 
        * @param {import("express").Response} res
        * @param {import("express").Express} app
        */ (req, res, app) => { }) {
        propertise.name && (this.name = propertise.name);
        propertise.path && (this.path = propertise.path);
        propertise.method && (this.method = propertise.method);
        propertise.storage && (this.storage = propertise.storage);
        this.callback = callback;
    }
}

module.exports = Controller;
