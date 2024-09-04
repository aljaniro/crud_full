import { Application } from "express";
import express from 'express';
import label from "../label";
import { db_connection } from "../config/mysql";
import { typeConexion } from "../config/typeorm";
import { ruta } from "../routes/item";
import { rutas } from "../routes/person.routes";
import route from "../routes/login.routes";
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors');
class Server{
    private app: Application
    private port: string
    private login_path:string
    constructor(){
        this.app = express()
        this.port = process.env.PORT || "3000"  
        this.login_path = "/api"
        this.conexion() 
        this.middlewares()
        this.morgan()
        this.json()
        this.cookie()
        this.rutas() 
       
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(label.LISTEN_SERVER+this.port)
        })
    }
    morgan(){
        this.app.use(morgan('dev'))
    }
    async conexion(){
        await typeConexion()
    }
    cookie(){
        this.app.use(cookieParser())
    }
    rutalogin(){
        this.app.use(this.login_path,route)
    }
    rutas(){
        this.app.use(this.login_path,route)
        this.app.use(ruta)
       this.app.use(rutas)
    }

    middlewares(){
        const allowedOrigin = process.env.allowedOrigins || ''
        this.app.use(cors({allowedOrigin}))
     this.app.use(express.json())   
    }
    json(){
        this.app.use(express.json())
    }
}
export default Server