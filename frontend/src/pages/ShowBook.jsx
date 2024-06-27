import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { style } from "../Theme";
import { Skeleton } from "@mui/material";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-collection-nu.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex ">
        <BackButton />
        <Typography
          variant="h5"
          className="self-center"
        >
          Show Book
        </Typography>
      </div>
      {loading ? (
        <Box sx={style}>
          <Skeleton
            variant="text"
            animation="wave"
          />
          <Skeleton
            variant="text"
            animation="wave"
          />
          <Skeleton
            variant="text"
            animation="wave"
          />
        </Box>
      ) : (
        <Box sx={style}>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id: </span>
            <span className="text-xl mr-4 text-gray-500">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title: </span>
            <span className="text-xl mr-4 text-gray-500">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Year of Publish: </span>
            <span className="text-xl mr-4 text-gray-500">{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Time Created: </span>
            <span className="text-xl mr-4 text-gray-500">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Updated: </span>
            <span className="text-xl mr-4 text-gray-500">{new Date(book.updateAt).toString()}</span>
          </div>
        </Box>
      )}
    </>
  );
};

export default ShowBook;
