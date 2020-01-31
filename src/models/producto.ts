  
import {Schema, model} from  'mongoose';


let productoShema = new Schema({
    nombre:{
        type:String,
        required:[true,'Nombre es Obligatorio']
    },
    precioUni:{
        type:Number,
        required:[true,'El precio es requerido']
    },
    descripcion:{
        type:String,
        required:[false]
    },
    disponible:{
        type:Boolean,
        required:[true],
        default:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Categoria'
       
    },


});

//Exportar el modelo para ser usado en le proyecto
export default model('Producto', productoShema);