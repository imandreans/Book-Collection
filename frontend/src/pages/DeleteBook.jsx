import axios from "axios";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-collection-gamma.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
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
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center shadow-xl rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl mb-6">Are you sure you want to delete this book?</h3>

        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </Button>
      </div>
    </div>
  );
};

export default DeleteBook;
