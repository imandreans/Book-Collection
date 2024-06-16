import { Link } from "react-router-dom";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import BookModal from "./BookModal";
import { Box, Button, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import { BookContext } from "../../context/book-context";

const BookSingleCard = ({ item }) => {
  const { isNotAuthenticated } = useContext(BookContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <Box
      className="shadow-xl p-4 rounded-xl"
      m={1}
    >
      <Grid
        container
        rowGap={2}
      >
        <Grid
          item
          xs={10}
          display={"flex"}
          alignItems="center"
          gap={1}
        >
          <ImportContactsRoundedIcon />
          <h2>{item.title}</h2>
        </Grid>
        <Grid
          item
          display={"flex"}
        >
          <div className="px-4 py-1 bg-blue-600 rounded-md text-white absolute">{item.publishYear}</div>
        </Grid>
        <Grid
          item
          display={"flex"}
          gap={1}
        >
          <AccountCircleIcon />
          <h2>{item.author}</h2>
        </Grid>
        <Grid
          container
          columnGap={4}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={() => setShowModal(true)}
          >
            Show
          </Button>
          {isNotAuthenticated && (
            <>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
              />

              <Link to={`/books/details/${item._id}`}>
                <InfoRoundedIcon className="text-2xl text-green-500 hover:text-green-600" />
              </Link>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Link to={`/books/edit/${item._id}`}>
                <EditRoundedIcon className="text-2xl text-yellow-500 hover:text-yellow-600" />
              </Link>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Link to={`/books/delete/${item._id}`}>
                <DeleteRoundedIcon className="text-2xl text-red-500 hover:text-red-600" />
              </Link>
            </>
          )}
        </Grid>
      </Grid>
      {showModal && (
        <BookModal
          book={item}
          onClose={() => setShowModal(false)}
        />
      )}
    </Box>
  );
};

export default BookSingleCard;
