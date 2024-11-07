// TODO lo que es del Framework de express va en la capa presentation (clean architecture)

import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

//! funcion autoinvocada para que se ejecute el codigo ⬇️
(async()=>{
    main()
})();

//! Funcion main que llama el server y lo activa ⬇️
function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });
    server.start();
}