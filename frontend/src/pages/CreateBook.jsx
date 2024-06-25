import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { theme } from "../Theme";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [loading, setLoading] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate("");

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      synopsis,
    };
    setLoading(true);
    axios
      .post("https://book-collection-nu.vercel.app/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });

        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
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
            label="Description"
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
          onClick={handleSaveBook}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateBook;
