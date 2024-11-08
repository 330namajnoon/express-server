/**
 * @typedef {{
 *  callback: import("express").RequestHandler;
 * }} Controller
 */
/**
 * @param {(req: import("express").Request, res: import("express").Response) => void} action
 * @returns {Controller}
 */
function createController(action = (req, res) => {}) {
    return action;
}

module.exports = createController;
