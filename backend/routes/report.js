const express = require("express");
const pool = require("../config");

router = express.Router();

router.post("/report/important/:idCard", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const report_type = req.body.report_type;
    const station = req.body.station;
    try {
      let station_id = await conn.query("SELECT id FROM police_station WHERE name=(?)",[station])
      await conn.query(
        "INSERT INTO report(report_type, userid_card, date, status, station) VALUES(?, ?, ?, ?,?);",
        [report_type, req.params.idCard, null, "pending", station_id[0][0].id]
      );
      console.log(station_id[0][0])
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

router.post("/report/important", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const missing_type = req.body.missing_type;
    try {
        let result = await conn.query("SELECT MAX(report_id) report_id FROM report")
        await conn.query(
            "INSERT INTO important_miss(id, description, missing_type) VALUES(?, ?, ?);",
            [result[0][0].report_id, null, missing_type]
        );
        console.log(result[0][0])
        res.send('complete')
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

  router.post("/report/:idCard", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report WHERE userid_card = ?;", [req.params.idCard])
        res.send(result[0])
        await conn.commit();
        
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });

exports.router = router;