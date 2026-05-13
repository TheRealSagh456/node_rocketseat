import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { profile } from "./profile.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
// import { list } from "./controllers/list.js";

export async function appRoutes(app:FastifyInstance) {
    app.post('/users', register)

    app.post('/sessions', authenticate)

/*Autenticado*/ 

    app.get('/me',{onRequest: [verifyJWT]} , profile)
 //   app.get('/users/:date', list)





}