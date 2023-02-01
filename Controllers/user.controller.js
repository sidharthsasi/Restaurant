const User = require('../models/User.model');
const createError = require('http-errors')
const bcrypt = require('bcrypt');
const {signAccessToken}= require('../helpers/jwt.helper')

exports.signup =async(req,res,next)=>{
    try {
        const {email,password,name,isAdmin}=req.body;
        if(!email||!password||!name) throw createError.BadRequest()
        const doesExist = await User.findOne({email:email})
        if(doesExist) throw createError.Conflict(`${email} is already been registered `)
        const user = new User({email,password,name,isAdmin  });
        const saveUser = await user.save()
        res.send(saveUser)
    } catch (error) {
        next(error)
    }
};
exports.signin=async(req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email:email})
        if(!user){
            res.json({message: " user not found...."})
             throw createError.NotFound("User not found");
        }
        const accesstoken = await signAccessToken(user.id)

        await bcrypt.compare(password,user.password, function(err, res) {
            if (err) {
            console.log("error",err)
            } })
        res.json(201,{message:"Login",email:user.email,name:user.name,Token:accesstoken})
    } catch (error) {
    console.log("error occured",error)
    }
  


}