const express = require('express');
const {signup,signin}= require('../Controllers/user.controller')
const router = express.Router();


router.post('/register',signup);
   

router.post('/login',signin)

router.post('/refresh-token',async(req,res,next)=>{
    res.send("register")
});

router.post('/logout',async(req,res,next)=>{
    res.send("logout-route")
});

module.exports=router;