import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { UserErrors } from "./userErrors.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      response.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign({ id: user._id }, "secret");

    response.json({ token, userID: user._id });
  } catch (error) {
    console.log(error);
    response.status(500).json({ type: error });
  }
});

router.post("/register", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return response.status(400).json({ type: UserErrors.USER_ALREADY_EXIST });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    response.json({ message: "User Registered Succesfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// export const verifyToken = (request, response, NextFunction) => {
//   const authHeader = request.headers.authorization;

//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return response.sendStatus(403);
//       }
//       NextFunction();
//     });
//   } else {
//     response.sendStatus(401);
//   }
// };

export default router;
