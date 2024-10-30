import express from 'express';
import path from 'path';

export class Server {

    private app = express();

    //! Metodo start()⬇️
    async start(){

        //* Middleware para que el servidor responda con el contenido de la carpeta public al visitar la ruta / ⬇️
        this.app.use(express.static('public'))

        //* Middleware para que el servidor responda al visitar cualquier ruta ⬇️
        this.app.get('*', (req, res)=>{
            const indexPath = path.join(__dirname, '../../public/index.html' )
            res.sendFile(indexPath)
        })


        this.app.listen(3000,()=>{
            console.log(`Server is running on port ${3000}`);
        })
    }

}