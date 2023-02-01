const express = require("express");
const morgan = require("morgan")
const createError= require("http-errors");
require('dotenv').config();
require('./helpers/init_mongodb')
const app =express();
app.use(morgan('dev'));
app.use(express.json());
const PORT = process.env.PORT||5000;

const AuthRoute = require('./routes/auth.route');

app.use('/api',AuthRoute)

app.use(async(req,res,next)=>{
    // const error = new Error('Not found')
    // error.status =404;
    // next(error);
    next(createError.NotFound('This route does not exist'));
})

app.use((err,req,res)=>{
    res.status(err.status||500)
    res.send({
        error:{
            status: err.status||500,
            message:err.message,
        },
    })
})

app.listen(PORT,(err)=>{
if(err) throw err;
console.log(`Server Runing on Port:${PORT}`);
})
