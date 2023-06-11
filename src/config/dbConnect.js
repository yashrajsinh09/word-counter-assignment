const mongoose = require('mongoose') 

 const dbConnect = () => {
    try{
        const connect = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Succesfully");
    }
    catch(error){
        console.log("Database error");
    } 
 }

 module.exports = dbConnect; 