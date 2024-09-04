import { Router } from "express";
import { getuser, register } from "../controllers/items";
import { check } from "express-validator";
import label from "../label";

import validateJwt from "../middlewares/validateJWT";
import { validateform } from "../middlewares/validate";
import verifyToken from "../middlewares/validateToken";

const route = Router();

route
  .post(
    "/login",
    //  check('username',label.EMPTY_FIELD).not().isEmpty,
    //  check('password',label.EMPTY_FIELD).not().isEmpty,
    //   check('role',label.EMPTY_FIELD).not().isEmpty,
    //  check('status',label.EMPTY_FIELD).not().isEmpty
    getuser
  )
  .post('/validate-token',verifyToken)
  .post("/register", validateform, register)
  .post("/logout", (req, res) => {
    res.clearCookie("auth", { path: "/" });
    res.send("Cookie eliminada correctamente");
  });
export default route;
