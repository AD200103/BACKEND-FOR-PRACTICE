import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import taskRouter from "./src/router/task.js";
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION as string)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Bad connection!"));
app.use(taskRouter);

app.use((req, res) => {
  res.status(404).json({ message: "No such endpoint exists!" });
});
// const endpointNotFound: express.RequestHandler= (req,res) =>{
//     res.status(404).json({ message: "No such endpoint exists!" });
// }
// app.use(endpointNotFound)

app.listen(process.env.PORT, () => {
  console.log(`Application started successfuly on port:${process.env.PORT}!`);
});
