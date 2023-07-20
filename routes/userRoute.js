const express = require("express");
const router = express.Router();

router.post("/login",(req,res)=>{
    const body = req ; 
    console.log(body);
    return res.status(200).json(body);
})
module.exports = router;