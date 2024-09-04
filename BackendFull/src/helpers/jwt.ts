import { sign } from "crypto"
import label from "../label"
const jwt = require("jsonwebtoken")
const getJwt = (uid: string,role:string)=>{
    try {
      return new Promise((resolve, reject) => {
        const payload = {uid,role}
        jwt.sign(payload,process.env.SECRET_KEY || '',{
            expiresIn: '24h'
        },(error: any,token: any)=>{
            if(error){
                console.error(error)
                reject(label.ERROR_TOKEN)
            }else{
                resolve(token)
            }
        })
        
      })  
    } catch (error) {
        console.error(error)
        throw new Error(label.ERROR)
    }
}
export default getJwt