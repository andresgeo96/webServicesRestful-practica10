import { Request, Response, Router } from 'express';
import CategoriaModel from '../models/categoria';



class Categoria {
    router: Router;
    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    async getCategoria(req: Request, res: Response) {

        try {
            //fnd mostrar y sort ordenar por el nombre  await espera cib async 
            let categoriaBD = await CategoriaModel.find({}).sort('nombre');
            //cuneta los documentos de la base de datos 
            let conteo = await CategoriaModel.countDocuments();

            //la respùesta es de tipo json 
            res.json(
                {
                    //mandarle todos los documenyos de la base de datos 
                    categorias: categoriaBD,
                    conteo: conteo
                });

        } catch (error) {
            return res.status(400).json(
                {
                    dato: error 
                });

        }

    }

    async postCategoria(req: any, res: Response) {
        try {
            let bodycabecera = req.body;
            let categoria = new CategoriaModel(
                {
                    nombre: bodycabecera.nombre,
                   // usuario: req.usuario

                });

                //que se guarde 
            let categoriaBD = await categoria.save();

            res.json(
                {
                    categoria: categoriaBD
                })
        }
        catch (error) {
            return res.status(400).json(
                {
                    dato: error
                });

        }

    }

    async getCategoriaId(req: Request, res: Response) {
        let categoriaBD: any;
        try {
            let idurl = req.params.id;
            categoriaBD = await CategoriaModel.findById(idurl);
            categoriaBD.usuario.password = null;
            res.json(
                {
                    ok: true,

                    categoria: categoriaBD
                })


        } catch (error) {

            if (error) {
                return res.status(400).json(
                    {
                        dato: error
                    });
            }

            if (categoriaBD === null) {
                return res.status(400).json(
                    {
                        ok: false,
                        dato: "Categoria no encontrada"
                    });
            }

        }
    }

    async putCategoria(req: Request, res: Response) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let categoriaBD = await CategoriaModel.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json(
                {
                    categoria: categoriaBD
                })

        } catch (error) {
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });

        }

    }
    async deleteCategoria(req: Request, res: Response) {
        let categoriaBD: any;
        try {
            let idurl = req.params.id;
            categoriaBD = await CategoriaModel.findByIdAndRemove(idurl);
            res.json(
                {
                    mensaje: "CATEGORIA ELIMINADA",
                    categoria: categoriaBD
                })

        } catch (error) {

            if (error) {
                return res.status(400).json(
                    {
                        ok: error,
                        message: "CATEGORIA NO ENCONTRADA",
                    });
            }
            else {

                if (categoriaBD === null) {
                    return res.status(400).json(
                        {
                            codigo: "400",
                            message: "CATEGORIA NO ENCONTRADA",
                        });
                }

            }

        }
    }

        exponerRutas() {
            this.router.get('/', this.getCategoria);
            this.router.get('/:id', this.getCategoriaId);
            this.router.post('/', this.postCategoria);
            this.router.put('/:id',this.putCategoria);
            this.router.delete('/:id', this.deleteCategoria);

        }
    }

    const categoria = new Categoria();

    export default categoria.router;