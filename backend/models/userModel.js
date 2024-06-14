import mongoose from "mongoose";

// make the schema of database
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model("User", userSchema);
