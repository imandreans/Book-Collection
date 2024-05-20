import mongoose from "mongoose";

// make the schema of database
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // for time of creation and last updated.
  }
);
export const Book = mongoose.model("Cat", bookSchema);
