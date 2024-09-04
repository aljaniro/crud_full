import express,{Request,Response} from 'express'
import {createItem, deleteItem, getItem,getItems, getuser, updateItem} from '../controllers/items'
import validateJwt from "../middlewares/validateJWT";
import { getpersons } from '../controllers/person';
const ruta = express.Router()

ruta
    .get("/api/user",validateJwt("admin"),getuser)
    .post("/api/user",getuser)
    .get("/api/item",getItems)
    .get("/api/item/:id",validateJwt("admin"),getItem)
ruta.post("/api/item",createItem)
    .put("/api/item/:id",updateItem)
    .delete("/api/item/:id",deleteItem)
   
export {ruta}