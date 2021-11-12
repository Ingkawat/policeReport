const express = require("express");
const pool = require("../config");
const multer = require("multer")


router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/')
  },
  filename: function(req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const diskStorage = multer({ storage: storage });

router.post("/users", diskStorage.single("image"), async (req, res) => {
  const id = req.body.id
  const userid_card = req.body.userid_card
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    console.log(req.file.path); // File which is uploaded in /uploads folder.
    const result = await conn.query("UPDATE report SET approve_file = ? WHERE report_id = ?",[req.file.path, id]);
    await conn.query("UPDATE report SET status = ? WHERE report_id = ? AND userid_card = ?",["success", id, userid_card])
    await conn.commit();
    res.send({ congrats: "data recieved" });
  } catch (error) {
    await conn.rollback()
    res.status(500).send("Error");
  } finally{
    console.log('finally')
    conn.release();
  }
});

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
  router.post("/report/police/:idCard", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM user WHERE id_card = ?;", [req.params.idCard])
        let report = await conn.query("SELECT * FROM report WHERE station = ?", [result[0][0].station])
        res.send(report[0])
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