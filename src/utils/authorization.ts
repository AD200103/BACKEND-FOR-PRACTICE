import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
type DecodedType = {
  id: string;
  email: string;
};
const auth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({ message: "Bad auth!" });
    return;
  }
  jwt.verify(
    token as string,
    process.env.SECRET as string,
    (error, decoded) => {
      if (error || !decoded) {
        res.status(403).json({ message: "Bad auth", error: error });
        return;
      }
      const data = decoded as DecodedType;
      req.body.userId = data.id;
      req.body.userEmail = data.email;
      next();
    }
  );
};
export default auth;
