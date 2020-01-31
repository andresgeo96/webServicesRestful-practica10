import { Router, Request, Response } from 'express';
import ProductoModel from '../models/producto';
import CategoriaModel from '../models/categoria';
import UsuarioModel from '../models/usuario';

class usuario {
    router: Router;

    constructor() {
        //inicializar mencionando que es de tipo
        this.router = Router();
        this.exponerRutas();
    }

    //darle una respuesta y se inicializa con una variable res 
    async getUsuario(req: Request, res: Response ) {
        try {

            let UsuarioBD = await UsuarioModel.find({}).sort('nombre');
            //que nos muestre cuantos registros obtenemos en nuestro docuemnto

            UsuarioModel.populate(UsuarioBD,{path:"usuario", select:"nombre"});

            let conteo = await UsuarioModel.countDocuments;

            res.json({
                usuariosAlmacenados: UsuarioBD,
                conteodeUsuarios: conteo
            });

            res.send(UsuarioBD);


        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }
    }

    //pasr un parametro a la funcion de tipo peticion y pasar la respuesta 
    async getUsuarioId(req: Request, res: Response) {
        try {
            let idurl = req.params.id;
            let usuarioBD = await UsuarioModel.findById(idurl);

            res.json({
                ok: true,
                Generado: usuarioBD

            })
        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }





    }

    //enviar parametros 
    async postUsuario(req: Request, res: Response) {

        try {
            //para capturar todo el cuerpo de la informacion no solo un prarametro como el id
            let bodycabeceera = req.body;

            let usuario = new UsuarioModel({
                nombre: bodycabeceera.nombre,
                password: bodycabeceera.password,
                email: bodycabeceera.email,
                role: bodycabeceera.role,
            });


            let usuarioBD = await usuario.save();
        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }
    }

    async putUsuario(req: Request, res: Response ) {
        try{

            let idurl = req.params.id;

            let bodycabecera  = req.body;

            let usuarioDB = 

            await ProductoModel.findByIdAndUpdate(idurl,bodycabecera,{new:true, runValidators: true, context: 'query' }) 


            res.json({
                usuario:usuarioDB
            });


        }catch(error){
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        try{
            let idurl = req.params.id;
            let usuarioDB = await UsuarioModel.findByIdAndRemove(idurl);

            res.json({
                usuarioEliminado: usuarioDB
            });
        }catch(error){
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }
        
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
export default usu.router;
