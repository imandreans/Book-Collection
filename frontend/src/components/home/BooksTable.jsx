import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { BookContext } from "../../context/book-context";
import { useState } from "react";
// import BookModal from "./BookModal";
const BooksTable = ({ books }) => {
  const { isAuthenticated } = useContext(BookContext);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#424242" }}>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell
                align="right"
                sx={{ color: "white" }}
              >
                Author
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white" }}
              >
                Publish Year
              </TableCell>
              {isAuthenticated && (
                <TableCell
                  align="center"
                  sx={{ color: "white" }}
                >
                  Operations
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#f5f5f5" }}>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell
                  component="th"
                  scope="row"
                >
                  {book.title}
                </TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.publishYear}</TableCell>
                {isAuthenticated && (
                  <TableCell align="right">
                    <div className="flex justify-center gap-x-4 ">
                      <Link to={`/books/details/${book._id}`}>
                        <InfoIcon className=" text-green-600 hover:text-green-500" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <EditIcon className=" text-yellow-600 hover:text-yellow-500" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <DeleteIcon className=" text-red-600 hover:text-red-500" />
                      </Link>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BooksTable;
