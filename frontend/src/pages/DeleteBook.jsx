import axios from "axios";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { style } from "../Theme";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const DeleteBook = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-collection-nu.vercel.app/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        alert("an error happened. Please check console");
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-collection-nu.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        setTitle(response.data.title);
        enqueueSnackbar("Book Deleted Succesfully", { variant: "success" });
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
          Delete Book
        </Typography>
      </div>{" "}
      {loading ? (
        <Box sx={style}>
          <Skeleton
            variant="text"
            height={32}
            width={336}
          ></Skeleton>
          <Skeleton
            variant="text"
            height={32}
            width={336}
          ></Skeleton>
          <br />
          <Skeleton
            variant="rectangluar"
            height={42}
            width={153}
          ></Skeleton>
        </Box>
      ) : (
        <Box sx={style}>
          <Typography variant="h5">Are you sure you to delete</Typography>
          <Typography variant="h5">{title}?</Typography>
          <br />
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </Button>
        </Box>
      )}
    </>
  );
};

export default DeleteBook;
