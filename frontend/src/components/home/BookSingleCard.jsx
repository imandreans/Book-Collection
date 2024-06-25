import { Link } from "react-router-dom";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import BookModal from "./BookModal";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, Card, Divider, createTheme } from "@mui/material";
import { useContext } from "react";
import { BookContext } from "../../context/book-context";
import Typography from "@mui/material/Typography";
import { theme } from "../../Theme";
const BookSingleCard = ({ item }) => {
  const { isAuthenticated } = useContext(BookContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <Card sx={{ width: 300, height: 150, backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {item.publishYear} {"•"} {item.author}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>{item.title}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant="contained"
          // startIcon={<VisibilityIcon />}
          onClick={() => setShowModal(true)}
          theme={theme}
        >
          Desc
        </Button>
        {isAuthenticated && (
          <>
            <Link to={`/books/details/${item._id}`}>
              <InfoRoundedIcon className="text-2xl text-green-600 hover:text-green-500" />
            </Link>

            <Link to={`/books/edit/${item._id}`}>
              <EditRoundedIcon className="text-2xl text-yellow-600 hover:text-yellow-500" />
            </Link>

            <Link to={`/books/delete/${item._id}`}>
              <DeleteRoundedIcon className="text-2xl text-red-600 hover:text-red-500" />
            </Link>
          </>
        )}
        {showModal && (
          <BookModal
            book={item}
            onClose={() => setShowModal(false)}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default BookSingleCard;
