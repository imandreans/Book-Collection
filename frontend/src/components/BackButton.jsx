import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link to={destination}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          {" "}
          Back
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;
