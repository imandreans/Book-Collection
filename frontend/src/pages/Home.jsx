import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Button from "@mui/material/Button";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import ViewAgendaRoundedIcon from "@mui/icons-material/ViewAgendaRounded";
import { BookContext } from "../context/book-context";
import Navbar from "../components/Navbar";
import { outlinedTheme, theme } from "../Theme";
import { Typography } from "@mui/material";

theme;
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { isAuthenticated, setAuthenticated } = useContext(BookContext);

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
      <Navbar />

      <div className="p-10">
        {isAuthenticated ? <Typography variant={"h4"}>Feel Free to add your favorite book!</Typography> : <Typography variant={"h4"}>Feel free to explore my book collection!</Typography>}
        <div className="flex justify-between items-center mb-6 mt-6">
          <div className="flex gap-6">
            {/* <h1 className="self-center">View</h1> */}
            <Button
              theme={outlinedTheme}
              variant="outlined"
              onClick={() => setShowType("table")}
              startIcon={<TableViewRoundedIcon />}
            >
              Table
            </Button>
            <Button
              theme={outlinedTheme}
              variant="outlined"
              onClick={() => setShowType("card")}
              startIcon={<ViewAgendaRoundedIcon />}
            >
              Card
            </Button>
          </div>
          {isAuthenticated && (
            <Link to="/books/create">
              <Button
                theme={theme}
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
