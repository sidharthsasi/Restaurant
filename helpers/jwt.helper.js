const Jwt = require('jsonwebtoken');
const createError = require('http-errors');
module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve, reject) => {
            const payload={
                user:userId
                // isAdmin:isAdmin

            };
            const secret= process.env.secret
            const options = {expiresIn:'1h'}
            Jwt.sign(payload,secret,options,(err,token)=>{
                if(err) reject (err);
                resolve(token)
            })
        })
    }
}