import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

app.use(cors()); // permission to connect another domain

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// when visit /, response with hello world
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello World");
});

// use /books to access booksRoute. booksRoute contains route of http method for book database
app.use("/books", booksRoute);

//connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
