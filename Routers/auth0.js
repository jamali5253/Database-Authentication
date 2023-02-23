//------------------------------ Router Require Section 
const express = require("express");
const path = require('path');
const router = express.Router();
const bcrypt = require("bcrypt");
//--------------------------------- Database and Collection Requiring 
require("../Database_Connection/Database_1");
const Collect1 = require("../Collection/collection_1");
//-------------------------------- Use Method
router.use(express.static('public'))
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
//------------------------------- Get Method Section 
router.get("/", (req, res) => {
    res.render("home")
});
router.get("/signup", (req, res) => {
    res.render("signup")
})
router.get("/signin", (req, res) => {
    res.render("signin")
})
router.get("/forgetp", (req, res) => {
    res.render("forgetpass");
})
// --------------------------------- Get Method
router.post("/signup", async (req, res) => {
    try {
      const { email, pass, cpass, username, age, gender, phone } = req.body;
      const exituser = await Collect1.findOne({ email: email });
      if (exituser) {
        res.status(401).send("Already Valid");
      } else {
        if (pass === cpass) {
          const data = new Collect1({
            username: username,
            age: age,
            phone: phone,
            gender: gender,
            email: email,
            pass: pass,
            cpass: cpass
          });
          const savedata = await data.save();
            res.status(201).render("signin");
            console.log(savedata);
        } else {
          res.send("Ohh Your Password is Incorrect");
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});
  
router.post("/signin", async (req, res) => {
    try {
    const { email, pass } = req.body;
        const valid1 = await Collect1.findOne({ email: email });
        if (!valid1) {
            res.status(401).send("Invalid Data");
        } else {
            const ismatch = await bcrypt.compare(pass, valid1.pass);
            if (ismatch) {
                res.status(201).render("home");
            } else {
                res.status(400).send("Invalid Data")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error");
    }
})

router.post("/forgetp", async(req, res) => {
  try {
    const { email, pass, cpass } = req.body;
      const valid1 = await Collect1.findOne({ email: email });
      if (!valid1) {
          res.status(404).send("Invalid Data");
      } else {
          const data = new Collect1({
              pass: pass,
              cpass: cpass
          });
           await data.updateOne();
          res.status(201).send("Password Updated Successfully");
      }
  } catch (error) {
      console.log(error)
      res.status(500).send("Server Error")
  }
})
  
//-------------------------------- Export Module Section 
module.exports = router
