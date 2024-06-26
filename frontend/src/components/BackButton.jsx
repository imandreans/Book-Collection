import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { theme } from "../Theme";
const BackButton = ({ destination = "/" }) => {
  return (
    <>
      <Link to={destination}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          theme={theme}
          sx={{ margin: "20px" }}
        >
          Back
        </Button>
      </Link>
    </>
  );
};

export default BackButton;
