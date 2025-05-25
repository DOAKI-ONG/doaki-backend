import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import router from "./routes";
import { errorHandler } from "@middlewares/errorHandler";
import morgan from "morgan";
import { checkCpf } from "@services/users/checkCpf";
dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"; 
const PORT = process.env.PORT || 3000;
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.json());

app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//app.use(routes);
app.use(router);

app.use(errorHandler);
app.listen(PORT, () => console.log("Http server running! on port " + PORT));
