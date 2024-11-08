const express = require('express');

/**
 * @param {string} path
 * @param {(router: express.Router) => void} callback 
 * @returns {express.Router}
*/
function createRouter(path = "", callback = (router) => {}) {
    const router = express.Router();
    callback(router);
    return {path, router};
}

module.exports = createRouter;