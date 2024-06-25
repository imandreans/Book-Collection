import { useContext } from "react";
import React from "react";
import { BookContext } from "../context/book-context";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { theme } from "../Theme";

const Navbar = () => {
  const { isAuthenticated, setAuthenticated } = useContext(BookContext);
  const logout = () => {
    setAuthenticated(false);
  };
  return (
    <nav className="flex flex-wrap justify-around py-4 bg-stone-800">
      <h1 className="self-center text-stone-50">Book Collection</h1>
      {isAuthenticated ? (
        <Link to={"/"}>
          <Button
            theme={theme}
            variant="contained"
            onClick={logout}
          >
            LOGOUT
          </Button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <Button
            theme={theme}
            variant="contained"
          >
            LOGIN
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
