import express from 'express';

export class Server {

    private app = express();

    //! Metodo start()⬇️
    async start(){

        //* Middleware para que el servidor responda con el contenido de la carpeta public ⬇️
        this.app.use(express.static('public'))


        this.app.listen(3000,()=>{
            console.log(`Server is running on port ${3000}`);
        })
    }

}