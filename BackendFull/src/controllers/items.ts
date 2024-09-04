import { NextFunction, Request, response, Response } from "express";
import { db } from "../config/mysql";
import Items from "../models/items.model";
import login from "../models/login.model";
import items from "../models/items.model";
import { AppDataSource } from "../config/typeorm";
import label from "../label";
import getJwt from "../helpers/jwt";

var bcrypt = require("bcryptjs");

const getuser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await login.findOneBy({
      username: username,
    });
    console.log(data);

    if (!data) {
      return res.status(400).json({
        msg: label.MSG_400,
        response: label.FAILED_LOGIN,
      });
    }
    console.log(data.status);
    if (!data.status) {
      return res.status(400).json({
        msg: label.MSG_400,
        response: label.STATUS_USER,
      });
    }

    const validpass = bcrypt.compareSync(password, data.password);

    if (!validpass) {
      return res.status(400).json({
        msg: label.MSG_400,
        response: label.FAILED_LOGIN,
      });
    }

    const token = await getJwt(String(data.id), String(data.role));

    console.log(data);
    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({
      msg: label.SUCCESFUL_LOGIN,
      username: data.username,
      isSuccess: true,
      token: token,
      expiresIn: 3600,
      response: data,
    });
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
  }
};




export const register = async (req: Request, res: Response) => {
  try {
    console.log("hola");
    const { username, password, role, status } = req.body;

    const salt = await bcrypt.genSaltSync();
    const hashpas = await bcrypt.hashSync(password, salt);
    const data = await login.save({
      username: username,
      password: hashpas,
      role: role,
      status: status,
    });
    res.status(200).json({
      msj: "CREADO CON EXITO",
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("error no hay");
      res.status(500).send(error.message);
    }
  }
};
const getItems = async (req: Request, res: Response) => {
  try {
    const data = await items.find();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error no hay");
      res.status(500).send(error.message);
    }
  }
};

const getItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await items.findOne({ where: { id: Number(id) } });
    console.log(data);
    if (!data) {
      throw new Error("Usuario no encontrado");
    }

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
  }
};

const createItem = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const datos = await items.save(req.body);
    res.status(200).json(datos);
  } catch (error) {
    if (error instanceof Error) res.status(504).send(error.message);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const datos = await items.findOne({ where: { id: Number(id) } });
    if (!datos) {
      throw new Error("Usuario no encontrado");
    }
    await items.update({ id: Number(id) }, req.body);
    const datos2 = await items.findOne({ where: { id: Number(id) } });
    res.status(200).json(datos2);
  } catch (error) {
    if (error instanceof Error) res.status(504).send(error.message);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dato = items.findOne({ where: { id: Number(id) } });
    if (!dato) {
      throw new Error("Usuario no existe");
    }
    items.delete({ id: Number(id) });
    res.status(200).send(id);
  } catch (error) {
    if (error instanceof Error) res.status(500).send(error.message);
  }
};

export { getItem, getItems, createItem, getuser, updateItem, deleteItem };
