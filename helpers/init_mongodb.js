const mongoose= require("mongoose");
url=process.env.URL
mongoose.connect(url,{}).then((res)=>{
    console.log("Mongodb Connected");
})
.catch((err)=>{
    console.log(err.message,'error');
})
