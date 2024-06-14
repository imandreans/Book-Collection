import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      console.log("User not exist");
      response.status(400).json({ type: userErrors.NO_USER_FOUND });
    }
    if (user.password !== password) {
      return response.status(400).json({ type: userErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign({ id: user._id }, "secret");

    response.json({ token, userID: user._id });
    console.log("Login Succesfull");
  } catch (err) {
    console.log("Masuk sini");
    response.status(500).json({ type: err });
  }
});

// router.get("/show", async (req, res) => {
//   try {
//     const users = User.find({});
//     return res.status(200).json({
//       count: users.length,
//       data: users,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

export default router;
