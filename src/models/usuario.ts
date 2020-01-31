import {Schema, model} from 'mongoose';

let usuarioShema = new Schema({
    nombre:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    },
    password:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    },
    email:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    },
    role:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    }
});

export default model('usuario', usuarioShema);