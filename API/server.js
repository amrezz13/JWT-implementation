import {} from 'dotenv/config'
import express from "express";
import cors from 'cors'
import pool from './db/index.js';
import auth from './routes/auth.js';
import dashboard from './routes/dashboard.js'


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", auth)

app.use("/dashboard", dashboard)

app.listen(port, ()=>{
    console.log(`server is running in port ${port}`)
});


