const express = require("express");
const pool = require("../config");
const multer = require("multer")



const storage1 = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + "-" + file.originalname);   
    },
  });
  const diskStorage1 = multer({ storage: storage1 });
  router.put("/report/police", diskStorage1.single("image"), async  (req, res, next) => {
    const id =  req.body.id;
    const des =  req.body.des;
    const date =  req.body.date;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let result = await conn.query(
            "SELECT * FROM user  WHERE id_card = ?",
            [id]
          );  

      await conn.query(
        "INSERT INTO reportofpolice (policeid_card, date, imagetofind, dataofpolice,station) VALUES(?, ?, ?, ?,?);",
        [id, date, req.file.path.substr(8) ,des,result[0][0].station]
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




  router.post("/peoplereport", async  (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      let result = await conn.query("SELECT *,reportofpolice.id FROM reportofpolice  join user on(reportofpolice.policeid_card = user.id_card) join police_station on (user.station = police_station.id)WHERE status = ?", ["questtofind"])
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
 
  router.post("/peoplereportDetail", async  (req, res, next) => {
    const id =  req.body.id;
    const report =  req.body.report;
    const date =  req.body.date;
    const userid =  req.body.userid;
    console.log(id)
    console.log(report)
    console.log(date)
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        "INSERT INTO peoplereport (peoplereport_id, date, dataofpeople, useeid) VALUES(?, ?, ?, ?);",
        [id, date ,report, userid]
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

  router.post("/statuspolice", async  (req, res, next) => {
      const iduser = req.body.iduser
      console.log(iduser)
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        let result = await conn.query(
            "SELECT * FROM user  WHERE id_card = ?",
            [iduser]
          );  
      let result1 = await conn.query("SELECT * FROM reportofpolice where station = ?", [result[0][0].station])
      res.send(result1[0])

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });



  router.post("/statuspoliceinfo", async  (req, res, next) => {
    const id = req.body.iduser

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
 
    let result1 = await conn.query("SELECT * FROM peoplereport join user on(user.id_card = peoplereport.useeid) where peoplereport_id = ?", [id])
    res.send(result1[0])

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});


router.post("/police/success", async  (req, res, next) => {
    const id = req.body.id
    console.log(id)
    let success = "success"
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
 
    const ans = await conn.query("UPDATE reportofpolice SET status = ? WHERE id = ?", [success, id])
    res.send(ans[0])

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});



// router.post("/report/police/delete", async function(req,res,next){
//     console.log("delete")
//     const conn = await pool.getConnection();
//     await conn.beginTransaction();
//     try{


//     await conn.query("DELETE FROM `reportofpolice` WHERE `max(id)`");
//       await conn.commit()
//       console.log("delete success")
//       res.status(204).send();
//     }catch (err) {
//       console.log(err)
//       await conn.rollback();
//       return res.status(500).json(err);
//     } finally {
//       conn.release();
//     }
//   })

exports.router = router;