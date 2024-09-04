import { NextFunction, Request,Response } from "express"
import label from "../label"
import login from "../models/login.model"

const jwtoken = require('jsonwebtoken')
const validateJwt = (rolevalidate:string)=>{
    
  return async(req: Request,res:Response,next:NextFunction)=>{
        try {
            const token = req.header('Authorization')?.split(' ')[1]
            const token2 = req.cookies.auth
            console.log(typeof token2)
            console.log("este es otro",token2)
            console.log("este es tu token",token)
            if(!token || token == undefined){
                return res.status(401).json({
                    msg:"IDENTIFIQUESE PRIMERO",
                    error:label.NO_VALIDATE
                })
            }
    
            const data = <any> jwtoken.verify(token,process.env.SECRET_KEY || '')
            console.log("su id",data)
            const user = await login.findOne({ where: { id: data.id } });
            console.log("usuario",user)
            if(!user){
                return res.status(401).json({
                    msg:label.MSG_400,
    
                })
            }
            if(!user.status){
                return res.status(401).json({
                    msg:label.MSG_400,
    
                }) 
            }
            console.log(user.role,rolevalidate)
            if(user.role !== rolevalidate){
                console.log("no funciona")
             return res.status(401).json({
                    msg: label.ROLE_VALIDATE,
                    role: user.role
                })
            }
            
            console.log(user)
            next()
        } catch (error) {
            console.error(error)
            res.status(500).json({
                msg:label.MSG_500,
                response: label.ERROR
            })
        }
} 
}

export default validateJwt