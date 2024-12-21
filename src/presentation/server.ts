import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}


export class Server {
    
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    
    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        //middleware
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) ); //para que pueda recibir datos de formularios - x-www-form-urlencoded
        
        //usar las definiciones de rutas
        this.app.use( this.routes );
        
        //escuchar en el puerto
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto: ${this.port}`);
            });

    }
}