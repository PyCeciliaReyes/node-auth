import { Router } from "express";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {
    static get routes(): Router {

        const router = Router();


        //definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes)
        // router.use('/api/users')
        // router.use('/api/roles')
        // router.use('/api/products')
        // router.use('/api/categories')
        // router.use('/api/orders')


        return router;        
    }
}