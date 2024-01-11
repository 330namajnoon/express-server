const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const multer = require("multer");


function Server(port = 4000, direction = "./", use = [], fileDirection = "") {
    this.storage = multer.diskStorage({
        destination: (req, file, cd)=> {
            cd(null, fileDirection);
        },
        filename: (req, file, cd)=> {
            cd(null, file.originalname);
        }
    })
    this.upload = multer({storage: this.storage});
    this.port = process.env.PORT || port;
    this.direction = direction;
    this.app = express();
    this.pdp = path.join(__dirname, this.direction);
    this.app.use(cors());
    this.app.use(express.static(this.pdp));
    use.forEach((u)=> {
        this.app.use(u);
    })
    this.server = http.createServer(this.app);
  
}
Server.prototype.start = function(calback) {
    this.server.listen(this.port, ()=> {
        console.log(`server is up on port ${this.port}`);
        calback();
    })
}
Server.prototype.setControls = function(controls = [{method: "GET" || "POST" || "DELETE" || "PUT" || "UPDATE", path: "", action:()=>{}, file: null}]) {
    this.controls = controls;
    this.controls.forEach(([method, path, action, file])=> {
        switch (method) {
            case "GET":
                this.app.get(path,multer().none(),(req, res)=> {
                    action(req, res);
                })
                break;
            case "POST":
                if (file) {
                    this.app.post(path,this.upload.single(file) ,(req, res)=> {
                        action(req, res);
                    })
                }else {
                    this.app.post(path ,multer().none(),(req, res)=> {
                        action(req, res);
                    })
                }
                break;
        
            default:
                break;
        }
    })
}

module.exports = {Server};