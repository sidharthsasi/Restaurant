const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const  UserSchema = new Schema({
name:{
    type: String,
    required:true
},
email:{
    type: String,
    required:true,
    lowercase:true,
    unique:true
},
password:{
    type: String,
    required:true,
},
isAdmin:{
   type:Boolean,
   default:false 
}
});

UserSchema.pre('save',async function (next){
    try {
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(this.password,salt)
     this.password= hashedPassword
     next()
    } catch (error) {
        next(error)
        
    }
})
UserSchema.methods.isValidatePassword = async function (password){
    try {
        return await bcrypt.compared(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user',UserSchema)
module.exports= User;