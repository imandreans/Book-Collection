import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/book-context";
import { userErrors } from "./userErrors.js";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(BookContext);
  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5555/user/login", { username, password });

      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setAuthenticated(true);
      navigate("/");
    } catch (err) {
      let errorMessage = "";
      switch (err.response.data.type) {
        case userErrors.NO_USER_FOUND:
          errorMessage = "User doesn't exist";
          break;
        case userErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      console.log(err);

      alert(errorMessage);
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1>Silahkan Login</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          // action="#"
          // method="POST"
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border-2 border-sky-950 w-64 p-1.5 sm:text-sm mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              text="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block rounded-md border-2 border-sky-950 p-1.5 sm:text-sm mt-1"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="w-64"
          >
            Login
          </Button>
        </form>
        <a href="/">Go back</a>
      </div>
    </div>
  );
};

export default Login;
