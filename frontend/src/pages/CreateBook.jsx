import React, { useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { formStyle, theme } from "../Theme";
import { Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
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
    <>
      <div className="flex ">
        <BackButton />
        <Typography
          variant="h5"
          className="self-center"
        >
          Create Book
        </Typography>
      </div>
      {loading ? (
        <Box sx={formStyle}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={56}
            width={286}
          ></Skeleton>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={56}
            width={286}
          ></Skeleton>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={56}
            width={286}
          ></Skeleton>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={217}
            width={286}
          ></Skeleton>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={42.25}
            width={286}
          ></Skeleton>
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={formStyle}
        component="form"
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
          rows={8}
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
        <Button
          theme={theme}
          variant="contained"
          size="large"
          onClick={handleSaveBook}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default CreateBook;
