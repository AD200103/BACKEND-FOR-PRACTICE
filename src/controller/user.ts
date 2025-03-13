/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
import { v4 as uuidv4 } from "uuid";

const SIGN_IN: RequestHandler = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      id: uuidv4(),
      email: req.body.email,
      username: req.body.username,
      password: hash,
    };
    const user = new UserModel(newUser);
    await user.save();
    const users = await UserModel.find();
    res.status(201).json({ message: "User successfully added!", users: users });
    return;
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    return;
  }
};

const LOGIN: RequestHandler = async (req, res) => {
  try {
    const findEmail = await UserModel.findOne({ email: req.body.email });
    if (!findEmail) {
      res.status(403).json({ message: "Bad input data!" });
      return;
    }
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      findEmail.password
    );
    if (!passwordsMatch) {
      res.status(403).json({ message: "Bad input data!" });
      return;
    }
    const token = jwt.sign(
      { id: findEmail.id, email: findEmail.email },
      process.env.SECRET as string,
      { expiresIn: "12h" }
    );
    res.status(200).json({ message: "Connected successfully!", token: token });
    return;
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    return;
  }
};
export { SIGN_IN, LOGIN };
