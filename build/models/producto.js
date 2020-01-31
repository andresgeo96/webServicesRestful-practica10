"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let productoShema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    descripcion: {
        type: String,
        required: [false]
    },
    disponible: {
        type: Boolean,
        required: [true],
        default: true
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Categoria'
    },
});
//Exportar el modelo para ser usado en le proyecto
exports.default = mongoose_1.model('Producto', productoShema);
