const express = require("express");
const pool = require("../config");

router = express.Router();

router.post("/account", async function (req, res, next) {

    const id_card = req.body.id_card;
    console.log(id_card)

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let result = await conn.query("SELECT * FROM user WHERE id_card = ?", [
        id_card,
      ]);
        res.send(result);
       
      await conn.commit();

    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  });



  
  router.put("/changepassword", async function(req,res,next){
    const old = req.body.oldpass;
    const newpass = req.body.newpass;
    const id = req.body.id;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {

      let result = await conn.query("SELECT password FROM user WHERE id_card = ?", [
        id,
      ]);
      if(result[0][0].password === old){
        await conn.query('UPDATE user SET password=? WHERE id_card=?', [newpass, id])
      }else{
        console.log("cant change cause old password not match")
      }
        await conn.commit()
        res.send(result[0].password)
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})



router.put("/editprofile", async function(req,res,next){
  const email = req.body.email;
  const phone = req.body.phone;
  const id = req.body.id;

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
      if(email.length != 0 ){
        let reuset = await conn.query('UPDATE user SET email=? WHERE id_card=?', [email, id])
        res.send(reuset[0][0]) 
        await conn.commit()
      }else if(phone.length != 0){
        let reuset =  await conn.query('UPDATE user SET phonenumber=? WHERE id_card=?', [phone, id])
        res.send(reuset[0][0]) 
        await conn.commit()
      }
      
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }

})



const multer = require("multer")


const storage = multer.diskStorage({ 
  destination: "./uploads/",
  filename:  function(req, file, cb)  {
    // null as first argument means no error
    cb( null, Date.now() + "-" + file.originalname);
 
  },
});

const diskStorage = multer({ storage: storage });

router.post("/usersimage", diskStorage.single("image"), async (req, res) => {

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    console.log(req.file)
    res.send(req.file)
    await conn.commit()
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
router.post("/addimage/account", diskStorage1.single("image"), async  (req, res, next) => {
  console.log("req.file")
  const id =  req.body.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query('UPDATE user SET imageuser=? WHERE id_card=?', [ req.file.path.substr(8), id])
    await conn.commit();
      console.log("Succress")
      res.send("success to add image")      
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});


  exports.router = router;
