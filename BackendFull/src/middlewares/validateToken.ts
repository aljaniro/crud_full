import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  if (!authHeader) {
    return res.status(403).send('Token requerido');
  }

  const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
  console.log(token)
  if (!token) {
    return res.status(403).send('Token requerido');
  }
  try {
    const data = <any>jwt.verify(token, process.env.SECRET_KEY || '');
    console.log("su id", data);
    if (!data) {
      return res.status(401).json({
        msg:"no valido su token",
        isValid:false
      });
    }
    res.status(200).send(true);
  } catch (err) {
    return res.status(401).json({
        msg:"no valido su token",
        isValid:false
      });
  }
};

export default verifyToken;