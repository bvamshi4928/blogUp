import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "all fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  // console.log(username, email, hashedPassword);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "sign up successful" });
  } catch (error) {
    next(error);
  }
};
