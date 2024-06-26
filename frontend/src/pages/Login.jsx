import React, { useContext, useState } from "react";
import { Button, Paper } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/book-context";
import { userErrors } from "./userErrors.js";
import axios from "axios";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { theme } from "../Theme.ts";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(BookContext);
  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("https://book-collection-nu.vercel.app/user/login", { username, password });

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
    <>
      <Navbar />

      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Paper
          sx={{ height: "320px", width: "440px" }}
          className="flex flex-col p-10 rounded-md text-white"
        >
          <Typography
            variant="h4"
            mb={2}
          >
            Login
          </Typography>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            // action="#"
            // method="POST"
          >
            <TextField
              type="text"
              label="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="password"
              label="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <section className="flex justify-between items-center">
              <Button
                theme={theme}
                type="submit"
                variant="contained"
                className="w-1/6"
              >
                Login
              </Button>
              <Link
                to="/"
                className="hover:text-red-500"
              >
                Go back
              </Link>
            </section>
          </form>
        </Paper>
      </main>
    </>
  );
};

export default Login;
