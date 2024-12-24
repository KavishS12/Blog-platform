const express = require('express');
const User = require('../models/User');
const router = express.Router();

const {loginUser,registerUser} = require("../controllers/authControllers.js");
  
router.post("/login", (req, res) => {
    loginUser(req, res);
});
  
router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.get('/',async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } 
    catch(err) {
        res.status(500).json({message : "Error retrieving users", error : error.message});
    }
})
  
module.exports = router;