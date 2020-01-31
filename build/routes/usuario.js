"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
class usuario {
    constructor() {
        //inicializar mencionando que es de tipo
        this.router = express_1.Router();
        this.exponerRutas();
    }
    //darle una respuesta y se inicializa con una variable res 
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let UsuarioBD = yield usuario_1.default.find({}).sort('nombre');
                //que nos muestre cuantos registros obtenemos en nuestro docuemnto
                usuario_1.default.populate(UsuarioBD, { path: "usuario", select: "nombre" });
                let conteo = yield usuario_1.default.countDocuments;
                res.json({
                    usuariosAlmacenados: UsuarioBD,
                    conteodeUsuarios: conteo
                });
                res.send(UsuarioBD);
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    //pasr un parametro a la funcion de tipo peticion y pasar la respuesta 
    getUsuarioId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let usuarioBD = yield usuario_1.default.findById(idurl);
                res.json({
                    ok: true,
                    Generado: usuarioBD
                });
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    //enviar parametros 
    postUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //para capturar todo el cuerpo de la informacion no solo un prarametro como el id
                let bodycabeceera = req.body;
                let usuario = new usuario_1.default({
                    nombre: bodycabeceera.nombre,
                    password: bodycabeceera.password,
                    email: bodycabeceera.email,
                    role: bodycabeceera.role,
                });
                let usuarioBD = yield usuario.save();
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let bodycabecera = req.body;
                let usuarioDB = yield producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
                res.json({
                    usuario: usuarioDB
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: "ERROR",
                    dato: error
                });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let usuarioDB = yield usuario_1.default.findByIdAndRemove(idurl);
                res.json({
                    usuarioEliminado: usuarioDB
                });
            }
            catch (error) {
                return res.status(400).json({
                    errorGenerado: error
                });
            }
        });
    }
    exponerRutas() {
        this.router.get('/', this.getUsuario);
        this.router.get('/:id', this.getUsuarioId);
        this.router.post('/', this.postUsuario);
        this.router.put('/:id', this.putUsuario);
        this.router.delete('/:id', this.deleteUsuario);
    }
}
const usu = new usuario();
exports.default = usu.router;
