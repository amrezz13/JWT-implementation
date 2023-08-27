import express, { query } from "express";
import pool from "../db/index.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/JWTGenerator.js";
import validInfo from "../middleware/validaInfo.js";
import middleware from "../middleware/authorization.js";
const router = express.Router();

router.post("/register",validInfo, async (req, res) => {
  console.log(" here's api");
  try {
    console.log("here in API");
    const { user_name, user_email, user_password } = req.body;
    console.log(user_name, user_email, user_password);

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email],
    );

    //res.json(rows);
    //console.log(rows);
    rows.length > 0 ? res.send("already exist") : res.json(rows);

    if (rows.length > 0) {
      res.status(401).send("already exist");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const addNewuser = await pool.query(
      "INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3) RETURNING user_id",
      [user_email, user_name, bcryptPassword],
    );

    console.log(addNewuser.rows[0].user_id);
    const token = jwtGenerator(addNewuser.rows[0].user_id);
    res.json(token);
  } catch (err) {
    console.log("this is error ", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    //const { user_email, user_password } = req.body;
    const user_password = req.body.user_password
    
    console.log(user_password)

    console.log("request body", req.body)

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [req.body.user_email],
    );
    console.log("selecting Rows", rows)
    if (rows.length === 0) {
      return res.status(401).json("password or Email is not correct");
    }

    const validPassword = await bcrypt.compare(
      user_password,
      rows[0].user_password,
    );

    if (!validPassword) {
      res.status(401).json(" Password or mail not correct");
    }
    console.log(validPassword);

    
    const token = jwtGenerator(rows[0].user_id);
    res.json({token})

  } catch (err) {
    console.log('error ', err)
  }
});

router.get("is-verify", middleware, async (req, res) => {
  try{

    res.status(200).send(true)

  }catch (err){
    console.log('error ', err)
    res.status(500).send("server error");
  }
});

export default router;
