import express, { query } from "express";
import pool from "../db/index.js";
import middleware from "../middleware/authorization.js";

const router = express.Router();

router.get("/", middleware, async (req, res) => {
  try {
    res.json(req.user);
    console.log("first");

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [req.user],
    );
  } catch (err) {
    console.log("error ", err);
  }
});
export default router;
