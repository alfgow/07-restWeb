// TODO lo que es del Framework de express va en la capa presentation (clean architecture)

import { Server } from "./presentation/server";

//! funcion autoinvocada para que se ejecute el codigo ⬇️
(async()=>{
    main()
})();

//! Funcion main que llama el server y lo activa ⬇️
function main() {
    const server = new Server();
    server.start();
}