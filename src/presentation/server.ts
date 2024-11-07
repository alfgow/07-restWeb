import express, { Router } from 'express';
import path from 'path';

interface Options{
    port: number
    routes: Router
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number
    private readonly publicPath: string
    private routes: Router;

    constructor(options: Options){
        const {routes, port, public_path = 'public'} = options
        this.port = port
        this.publicPath = public_path
        this.routes = routes
    }

    //! Metodo start()⬇️
    async start(){

        //* Middleware para que el servidor responda con el contenido de la carpeta public al visitar la ruta / ⬇️
        this.app.use(express.static(this.publicPath))

        //* Middlewares para que el servidor "parsee" el body del request ⬇️
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))


        //! ROUTES ⬇️
        this.app.use(this.routes)


        //* Middleware para que el servidor responda al visitar cualquier ruta ⬇️
        this.app.get('*', (req, res)=>{
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html` )
            res.sendFile(indexPath)
        })


        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
        })
    }

}