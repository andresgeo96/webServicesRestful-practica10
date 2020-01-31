"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let usuarioShema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    email: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    role: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    }
});
exports.default = mongoose_1.model('usuario', usuarioShema);
