"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase Inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log('Conectado DB');
        });
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (error, results, fields) => {
            if (error) {
                console.log('Error en la query');
                return callback(error);
            }
            callback(null, results);
        });
    }
}
exports.default = MySQL;
