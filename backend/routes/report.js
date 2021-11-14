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

    const report_type = req.body.report_type;
    const station = req.body.station;
    const date = req.body.date;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    console.log(date)

    try {
      let station_id = await conn.query("SELECT id FROM police_station WHERE name=(?)",[station])
      await conn.query(
        "INSERT INTO report(report_type, userid_card, date, status, station) VALUES(?, ?, ?, ?,?);",
        [report_type, req.params.idCard, date, "pending", station_id[0][0].id]
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
        
        let report1 = await conn.query("SELECT * FROM report  where report.station = ?", [result[0][0].station])
          res.send(report1[0])
          await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });




  router.post("/hint", async function (req, res, next) {
    const report_type = req.body.report_type;
    const status =  req.body.status;

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      let result = await conn.query("SELECT * FROM report  join missing_people on(report_id = id) WHERE report_type = ? AND status = ?", [report_type, status])
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




  const storage1 = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + "-" + file.originalname);   
    },
  });
  const diskStorage1 = multer({ storage: storage1 });
  router.put("/report/missingpeople", diskStorage1.single("image"), async  (req, res, next) => {
    console.log(req.file)
    const id =  req.body.id;
    const report_type =  req.body.report_type;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        "INSERT INTO report (report_type, userid_card, status) VALUES(?, ?, ?);",
        [report_type, id,  "pending"]
      );  
       let result = await conn.query("SELECT MAX(report_id) report_id FROM report WHERE report_type = ?",report_type)
      await conn.query(
        "INSERT INTO missing_people (id, image_people) VALUES(?, ?);",
        [result[0][0].report_id, req.file.path.substr(8)]
      );
      await conn.commit();
        console.log("Succress")
        res.send("success")      
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });




   
  router.post("/report/missingpeople/update", async function (req, res, next) {

    const station =  req.body.station;
    console.log(station)
    const peopleid =  req.body.peopleid;
    const name =  req.body.name;
    const des =  req.body.des;  
    const date = req.body.date
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let result = await conn.query("SELECT MAX(report_id) report_id FROM report")
      let result1 = await conn.query("SELECT MAX(id) id FROM missing_people")
      conn.query('UPDATE report SET date=?, station=? WHERE report_id=?', [date,station,result[0][0].report_id])  
      await conn.query('UPDATE missing_people SET missing_name=?, missing_idcard=?, missing_des=? WHERE id=?', [name,peopleid,des,result1[0][0].id])
   
      console.log("Succress update")
      res.send("success update")
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });


  router.put("/report/reporthint", async function (req, res, next) {
    const report =  req.body.report;
    const id =  req.body.id;  
    const goodid = req.body.idcard
 
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        "INSERT INTO good_people (good_id, good_peopleid, good_des) VALUES(?, ?, ?);",
        [id, goodid,  report]
      );
      console.log("Succress put report hint")
      res.send("Succress put report hint")
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });



  router.post("/goodpeople", async function (req, res, next) {
    const id =  req.body.id;  
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let report1 = await conn.query("SELECT * FROM good_people  where good_id = ?", [id])
      console.log("Succress put report hint")
      res.send(report1[0])
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });
  


  
  router.post("/report/pending/status/success", async function (req, res, next) {
    const report_id =  req.body.report_id;  
    const status = "success";
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      conn.query('UPDATE report SET status=? WHERE report_id=?', [status,report_id])  
 
      res.send("Succres to change status")
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });
  


  router.put("/report/missingpeople/detail", async function (req, res, next) {
    const report_id = req.body.report_id;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {

      let result = await conn.query("SELECT * FROM report join missing_people on(report.report_id = missing_people.id) join user on(user.id_card = report.userid_card)  where report_id = ?", [report_id])
      console.log(result[0])
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