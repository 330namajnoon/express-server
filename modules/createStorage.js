const multer = require("multer");

/**
 * 
 * @param {string} fileDirection 
 * @returns {multer.Multer}
 */

function createStorage(fileDirection = "./") {
    const storage = multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, fileDirection);
        },
        filename: (req, file, cd) => {
            cd(null, file.originalname);
        }
    })
    return multer({ storage });
}

module.exports = createStorage;
