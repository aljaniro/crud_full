import mysql,{createPool} from 'mysql2/promise'
export const db = createPool({
    host:process.env.HOST,
    user:'root',
    password:'',
    database:process.env.DATABASE
})
export const db_connection = async()=>{
    try {
        await db.getConnection()
        console.log("BASE DE DATOS CONECTADA")
    } catch (error) {
        console.log(error)
    }
}
 
