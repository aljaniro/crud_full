import { Request, response, Response } from "express";
import  person  from "../models/personas.model";
import label from "../label";
export const getpersons = async(req: Request, res: Response)=>{
    try {
        console.log("aqui estoy")
        const lista = await person.find();
        if(lista.length<=0){
           return res.status(400).json({
                 msg:"Lista vacia",
           error:label.MSG_400
             })
         }
        res.status(200).json(lista)
    } catch (error) {
        if (error instanceof Error) res.status(504).send(error.message);
    }
}

export const getperson = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id
        const persona = await person.findOne({ where: { id: Number(id) } });
        if(!persona){
            return res.status(400).json({
                msg:"INTENTE DE NUEVO",
                error:label.MSG_400
            })
        }
        res.status(200).json({
            msg:"ENCONTRADO",
            persona: persona
        })
    } catch (error) {
        if(error instanceof Error)res.status(504).send(error.message);
    }
}

export const createPerson = async(req: Request, res: Response)=>{
    try {
        const {nombre,apellido,email,tipoDocumento,documento} = req.body
        const persona = await person.save(
            {
                nombre:nombre,apellido:apellido,email:email,tipoDocumento:tipoDocumento,documento:documento  
            }
        )
        if(!person){
            return res.status(400).json({
                msg:"error al crear persona"
            })
        }
        res.status(200).json({
            msg:"Persona creada",
            persona:persona
        })
    } catch (error) {
        if(error instanceof Error) res.status(504).send(error.message);
    }
}

export const updatePerson = async (req: Request, res: Response) => {
    try {
        console.log("se esta actualizando")
      const id = req.params.id;
      const {nombre,apellido,email,tipoDocumento,documento} = req.body
      const datos = await person.findOne({ where: { id: Number(id) } });
      if (!datos) {
        throw new Error("Usuario no encontrado");
      }
      await person.update({ id: Number(id) },  {
        nombre:nombre,apellido:apellido,email:email,tipoDocumento:tipoDocumento,documento:documento  
    });
      const datos2 = await person.findOne({ where: { id: Number(id) } });
      res.status(200).json(datos2);
    } catch (error) {
      if (error instanceof Error) res.status(504).send(error.message);
    }
  };
  
 export const deletePerson = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const dato = person.findOne({ where: { id: Number(id) } });
      if (!dato) {
        throw new Error("Usuario no existe");
      }
      person.delete({ id: Number(id) });
      res.status(200).send(id);
    } catch (error) {
      if (error instanceof Error) res.status(500).send(error.message);
    }
  };