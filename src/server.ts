import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import router from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({
    origin: [FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));

//app.use(routes);
app.use(router)

const PORT = process.env.PORT || 3000


app.listen(PORT, () => (
    console.log("Http server running! on port " + PORT)
));

