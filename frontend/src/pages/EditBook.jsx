import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import Box from "@mui/material/Box";
import { theme } from "../Theme";
import { Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const navigate = useNavigate("");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-collection-nu.vercel.app/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setSynopsis(response.data.synopsis);
        setLoading(false);
      })
      .catch((error) => {
        alert("an error happened. Please check console");
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      synopsis,
    };
    setLoading(true);
    axios
      .put(`https://book-collection-nu.vercel.app/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex ">
        <BackButton />
        <Typography
          variant="h5"
          className="self-center"
        >
          Edit Book
        </Typography>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col shadow-xl rounded-xl w-[600px] p-4 mx-auto">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Year of Publish"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Synopsis"
            multiline
            rows={4}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </Box>
        <Button
          theme={theme}
          variant="contained"
          size="large"
          onClick={handleEditBook}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EditBook;
