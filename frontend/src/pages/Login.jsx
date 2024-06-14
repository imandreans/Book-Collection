import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Login = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1>Silahkan Login</h1>
        <form
          className="flex flex-col gap-4"
          // action="#"
          // method="POST"
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              required
              // onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border-2 border-sky-950 w-64 p-1.5 sm:text-sm mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              text="password"
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
