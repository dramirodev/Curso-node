import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;


    cnn: mysql.Connection;
    conectado: boolean = false;


    constructor() {
        console.log('Clase Inicializada');

        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message)
            }

            this.conectado = true;

            console.log('Conectado DB')
        });
    }


    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (error, results: Object[], fields ) => {
            if (error) {
                console.log('Error en la query');
                 return callback(error);

            }

            callback(null, results);
        })
    }


}
