const express = require('express');
const router = express.Router();

router.get('/get',(req,res,next)=>{
    res.status(200).json({
        message:'faculty get api is running'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'faculty post api is running'
    })
})
module.exports= router;