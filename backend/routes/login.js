const express = require("express");
const pool = require("../config");

router = express.Router();

router.post("/updateToken/:token/:idCard", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("UPDATE user SET tokenNotification = ? WHERE id_card = ?", [req.params.token, req.params.idCard]);
    await conn.commit();
    res.send(result);
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
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  try {
    await conn.query(
      "INSERT INTO user(id_card, f_name, l_name, password,phoneNumber,email) VALUES(?, ?, ?, ?, ?, ?);",
      [id_Card, f_name, l_name, password ,phoneNumber ,email]
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
