import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Acesso negado" });
    return;
  }
  jsonwebtoken.verify(
    token,
    process.env.SECRET || "",
    (err: jsonwebtoken.VerifyErrors | null, decoded?: any) => {
      if (err) {
        res.status(401).send({ message: "Token inválido" });
        return;
      }
      res.locals.id = decoded.id;
      next();
    }
  );
}
