"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(port) {
        return new Server(port);
    }
    start(callback) {
        this.app.listen(this.port, callback());
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
        this.publicFolder();
    }
}
exports.default = Server;
