const mongoose = require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/Secure-Notes";
// const mongoURI = "mongodb://127.0.0.1:27017/school";

const connectToMongo = async() => {
   const db= await mongoose.connect(mongoURI);
   if(db){
    console.log('connected to data-base')
}
else{
       console.log('not connected to data-base')
   }
}

module.exports = connectToMongo;
