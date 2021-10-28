const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/login", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT * FROM user");
    await conn.commit();
    res.json({ name: result[0] });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

//login
router.post("/login", async function (req, res, next) {
  const id = req.body.id;
  const password = req.body.password;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    // if (password == result[0][0].password) {throw new Error('Incorrect username or password')}
    if (result[0].length > 0) {
      console.log('Login sucess')
      res.send(result[0]);
    } else {
      throw new Error("Incorrect Username and/or Password!");
    }
    await conn.commit();
    console.log(req.body.username);
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.post("/register", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const id = req.body.id;
  const password = req.body.password;
  try {
    await conn.query(
      "INSERT INTO user(id, f_name, l_name, password) VALUES(?, ?, ?, ?);",
      [id, f_name, l_name, password]
    );
    await conn.commit();
    res.status(201).send();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

exports.router = router;
