import { Router, Request, Response } from 'express';
import ProductoModel from '../models/producto';
import CategoriaModel from '../models/categoria';

class producto {
    router: Router;

    constructor() {
        //inicializar mencionando que es de tipo
        this.router = Router();
        this.exponerRutas();
    }

    //darle una respuesta y se inicializa con una variable res 
    async getProducto(req: Request, res: Response ) {
        try {

            let ProductoBD = await ProductoModel.find({}).sort('nombre');
            //que nos muestre cuantos registros obtenemos en nuestro docuemnto

            CategoriaModel.populate(ProductoBD,{path:"categoria", select:"nombre"});

            let conteo = await ProductoModel.countDocuments;

            res.json({
                productoAlmacenados: ProductoBD,
                conteodeProductos: conteo
            });


        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }
    }

    //pasr un parametro a la funcion de tipo peticion y pasar la respuesta 
    async getProductoId(req: Request, res: Response) {
        try {
            let idurl = req.params.id;
            let productoBD = await ProductoModel.findById(idurl);

            res.json({
                ok: true,
                productoGenerado: productoBD

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
    async postProducto(req: Request, res: Response) {

        try {
            //para capturar todo el cuerpo de la informacion no solo un prarametro como el id
            let bodycabeceera = req.body;

            let producto = new ProductoModel({
                nombre: bodycabeceera.nombre,
                precioUni: bodycabeceera.precioUni,
                descripcion: bodycabeceera.descripcion,
                categoria: bodycabeceera.categoria,
            });

            let productoBD = await producto.save();
        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                }
            );
        }
    }

    async putProducto(req: Request, res: Response ) {
        try{

            let idurl = req.params.id;

            let bodycabecera  = req.body;

            let productoDB = 

            await ProductoModel.findByIdAndUpdate(idurl,bodycabecera,{new:true, runValidators: true, context: 'query' }) 


            res.json({
                producto:productoDB
            });


        }catch(error){
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });
        }
    }

    async deleteProducto(req: Request, res: Response) {
        try{
            let idurl = req.params.id;
            let productoDB = await ProductoModel.findByIdAndRemove(idurl);

            res.json({
                productoEliminado: productoDB
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
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);

    }
}

const product = new producto();
export default product.router;
