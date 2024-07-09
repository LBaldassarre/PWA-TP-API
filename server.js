import express from "express";
import cors from 'cors';
const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 5000;
import "./db.js";
import { router as UsersRouter } from "./routes/usersRT.js";

server.listen(PORT, (err) => {
  err
    ? console.error(`Server not mounted: ${err.message}`)
    : console.log(`Server running: http://localhost:${PORT}`);
});

server.use("/users", UsersRouter);

// catch all
server.use((req, res, next) => {
  let error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

//Error handler
server.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
    error.message = "Internal Server Error";
  }
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});