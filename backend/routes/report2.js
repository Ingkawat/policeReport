const express = require("express");
const pool = require("../config");
const multer = require("multer")

router = express.Router();

router.post("/report/pending/:report_id/:police_id", async function (req, res, next) {
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report WHERE report_id = ?",[req.params.report_id])
        if(result[0][0].status == "pending"){
            const ans = await conn.query("UPDATE report SET status = ?, police_id = ? WHERE report_id = ?", ["inprocess", req.params.police_id ,req.params.report_id])
            res.send(ans[0][0])
            await conn.commit();
        }else{
            res.send("alreay in process")
            await conn.commit();
        }
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });

  router.post("/join_important/:report_id", async function (req, res, next) {
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report INNER JOIN important_miss ON report.report_id = important_miss.id WHERE report.report_id = ?",[req.params.report_id])
        res.send(result[0][0])
        await conn.commit()
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });


  router.post("/join_important/police/:report_id", async function (req, res, next) {
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report  JOIN important_miss ON (report.report_id = important_miss.id) join user on (user.id_card = report.police_id) WHERE report.report_id = ?",[req.params.report_id])
        res.send(result[0][0])
        await conn.commit()
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });




  router.post("/join_missing/:report_id", async function (req, res, next) {
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report INNER JOIN missing_people ON report.report_id = missing_people.id WHERE report.report_id = ?",[req.params.report_id])
        res.send(result[0][0])
        await conn.commit()
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });


  router.post("/join_missing/police/:report_id", async function (req, res, next) {
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM report  JOIN missing_people ON (report.report_id = missing_people.id) join user on (user.id_card = report.police_id) WHERE report.report_id = ?",[req.params.report_id])
        res.send(result[0][0])
        await conn.commit()
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });

  
  exports.router = router;