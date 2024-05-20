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
const BooksTable = ({ books }) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Publish Year</TableCell>
            <TableCell align="right">Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow
              key={book._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {book.title}
              </TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.publishYear}</TableCell>
              <TableCell align="right">
                <div className="flex justify-center gap-x-4 ">
                  <Link to={`/books/details/${book._id}`}>
                    <InfoIcon className=" text-green-500 hover:text-green-600" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <EditIcon className=" text-yellow-500 hover:text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <DeleteIcon className=" text-red-500 hover:text-red-600" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BooksTable;
