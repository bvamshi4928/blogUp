import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required or need to be unique" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  // console.log(username, email, hashedPassword);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "sign up successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
