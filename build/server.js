"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//LLAMAR AL MODULO EXPRESS 
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//IMPORTAMOS A LAS RUTAS DEL SERVIDOR 
const producto_1 = __importDefault(require("./routes/producto"));
const categorias_1 = __importDefault(require("./routes/categorias"));
const usuario_1 = __importDefault(require("./routes/usuario"));
//CLASE
class Server {
    constructor() {
        //INICIALIZR AL MODULO EXPRESS
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //INICIALIZAR EL PUERTO EXPRESS
        this.app.set('port', process.env.PORT || 3001);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categorias_1.default);
        this.app.use('/api/usuario', usuario_1.default);
    }
    start() {
        //INICIALIZAR EL SERVIDOR EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3001 OK");
        });
    }
}
//INSTANCIAMOS LA CLASE
const server = new Server();
server.start();
