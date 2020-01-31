import {Schema, model} from 'mongoose';

let categoriasSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    }
});

export default model('Categoria', categoriasSchema);