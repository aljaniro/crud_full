import { NextFunction, Request,Response } from "express"
import label from "../label"
export const validateform = async(req: Request,res:Response,next:NextFunction)=>{
  try {
    console.log("holllla")
    const {username,password,role,status} = req.body
    console.log(username)
    console.log(username,password,role,status)
    if(username.length<3 || username.length>20 ){
        console.log("errrrrror")
    return res.status(401).send("CANTIDAD DE CARACTERES DEBE ESTAR ENTRE 3 Y 20")
    }
    if(password.length<3 || password.length>10 ){
        console.log("errrrrror")
       return res.status(401).send("CANTIDAD DE CARACTERES DEL PASSWORD DEBE ESTAR ENTRE 3 Y 8")
    }
    if(role == undefined){
        
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({
        msg:label.MSG_500,
        response: label.ERROR
    })
  }
}