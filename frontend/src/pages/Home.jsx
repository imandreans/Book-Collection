import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import ViewAgendaRoundedIcon from "@mui/icons-material/ViewAgendaRounded";
import { BookContext } from "../context/book-context";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { isAuthenticated, setAuthenticated } = useContext(BookContext);
  const logout = () => {
    setAuthenticated(false);
  };

  useEffect(() => {
    //run code inside when home is running
    setLoading(true);
    axios
      .get("https://book-collection-nu.vercel.app/books") // axios contains HTTP Methods
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        bgcolor={"#6E88E5"}
        alignItems="center"
        padding={2}
        width={"100%"}
        className=" flex shadow-lg"
      >
        <div className="font-bold text-white pl-6">
          <h1>Choose View</h1>
        </div>
        <Button
          variant="contained"
          onClick={() => setShowType("table")}
          color="inherit"
          startIcon={<TableViewRoundedIcon />}
        >
          Table
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowType("card")}
          color="inherit"
          startIcon={<ViewAgendaRoundedIcon />}
        >
          Card
        </Button>
        {!isAuthenticated ? (
          <Link to={"/login"}>
            <Button
              variant="contained"
              color="secondary"
            >
              LOGIN
            </Button>
          </Link>
        ) : (
          <Link to={"/"}>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              LOGOUT
            </Button>
          </Link>
        )}
      </Stack>
      <div className="p-10">
        <h1 className="text-2xl">Feel Free to add your favorite book!</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Book Collection</h1>
          {isAuthenticated && (
            <Link to="/books/create">
              <Button
                variant="contained"
                startIcon={<AddCircleRoundedIcon />}
              >
                Add Book
              </Button>
            </Link>
          )}
        </div>
        {loading ? <Spinner /> : showType === "table" ? <BooksTable books={books} /> : <BooksCard books={books} />}
      </div>
    </>
  );
};

export default Home;
