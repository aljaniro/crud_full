import { DataSource } from "typeorm"
import Login from "../models/login.model"
import  Items  from "../models/items.model"
import items from "../models/items.model"
import login from "../models/login.model"
import  person  from "../models/personas.model"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: 'root',
    password: '',
    database: 'empleado',
    synchronize: false,
    logging: true,
    entities: [items,login,person],
    
})
export const typeConexion = async()=>{
    try {
        AppDataSource.initialize()
        console.log("BASE DE DATOS CONECTADA POR TYPEORM")
    } catch (error) {
        console.log(error)  
    }
}
/*
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })*/