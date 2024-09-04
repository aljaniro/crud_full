import { Router } from "express";
import { createPerson, deletePerson, getperson, getpersons, updatePerson } from "../controllers/person";
import validateJwt from "../middlewares/validateJWT";
const rutas = Router()

//rutas.get("/api/person",validateJwt,getpersons)
  rutas.get("/api/person",validateJwt("admin"),getpersons)
   .get("/api/person/:id",validateJwt("admin"),getperson)
   .post("/api/person",validateJwt("admin"),createPerson)
   .put("/api/person/:id",validateJwt("admin"),updatePerson)
   .delete("/api/person/:id",validateJwt("admin"),deletePerson)
   
export {rutas}