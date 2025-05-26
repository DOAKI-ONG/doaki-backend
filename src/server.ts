import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import router from "./routes";
import { errorMiddleware } from "@middlewares/errorMiddleware";
import morgan from "morgan";

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"; 
const PORT = process.env.PORT || 3000;
import { Request } from "express";
morgan.token("body", (req: Request) => {
  const safeBody = { ...req.body };
  delete safeBody.password; // remove campo sensível
  return JSON.stringify(safeBody);
});
app.use(
  morgan(":method :url :status - Body:\n :body", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(router);

app.use(errorMiddleware);
app.listen(PORT, () => console.log("Http server running! on port " + PORT));
