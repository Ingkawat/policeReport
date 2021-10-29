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
  const id_card = req.body.id_card;
  const password = req.body.password;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT * FROM user WHERE id_card = ?", [
      id_card,
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
  const id_Card = req.body.id_Card;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  try {
    await conn.query(
      "INSERT INTO user(id_card, f_name, l_name, password,confirmpassword,phoneNumber,email) VALUES(?, ?, ?, ?, ?, ?, ?);",
      [id_Card, f_name, l_name, password,confirmpassword ,phoneNumber ,email]
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
