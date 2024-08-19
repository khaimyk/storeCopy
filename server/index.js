import config from "dotenv/config";
import express from "express";
import sequelize from "./db.js";
import * as mapping from "./models/mapping.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import ErrorHandler from "./middleware/ErrorMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static("static"));
app.use(cookieParser(process.env.SECRET_KEY));
app.use("/api", router);

//опрацювання помилки, останній middleware
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
