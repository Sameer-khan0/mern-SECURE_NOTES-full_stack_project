const express =require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User= require('../Models/auth');
const Profile=require('../Models/profilepic')
const jwt=require('jsonwebtoken'); 
const fetchuser=require('../Midelware/fetchuser');
const bcrypt=require('bcrypt');
const skey= 'halloistskey';


// endpoint for regesteration
router.post('/regesterd',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const propic= await Profile.create({user:user.id})
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, skey);
      const success=true;
      res.json({success,token,propic })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
    

//endpoint for Login user
router.post( "/login",[
body('email','enter valid crudantions').isEmail(),
body('password','enter valid crudantions').exists()
], async (req,res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email,password}=req.body;
try {
  const isemail=await User.findOne({email});
if(!isemail){
  success = false
  return res.status(400).json({ error: "Please try to login with correct credentials" });
}
const comparepass= bcrypt.compare(password,isemail.password);
if(!comparepass){
  success=false;
  return res.status(400).json({ error: "Please try to login with correct credentials" });
}
const data={
  user:{ 
   id: isemail.id
  }
}
  
const token = jwt.sign(data, skey);
success = true;
res.json({ success, token })


} catch (error) {
  console.log(error.message);
  res,json(error);
}


})
    

// get user
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    const propic=await Profile.findOne({user:userId})
    if(propic){res.send({user:user,profile_img:propic})}
    if(!propic){res.send({user:user,profile_img:"Null"})}
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// router.post('/dp/upload',async (req,res)=>{
//   try {
//     const {myfile,user}=req.body
//     if(!myfile){
//       res.json("file not found");
//     }
//     if(!user){
//       res.json("user not found");
//     }
//     const uploaddp=await Profile.create({myfile:myfile,user:user})
//     if(uploaddp){
//       res.json("DP uploaded")
//     }
//     if(!uploaddp){
//       res.json("DP is not uploaded")
//     }
//   } catch (error) {
//     console.error(error)
//     res.json(error)
//   }
// })

//update the profile picture
router.put('/dp/update/:id', async (req, res) => {
  try {
    const { myfile } = req.body;
    const newDP = { user: req.body.user, myfile: myfile }; // Keep the property name as "myfile"
    const isuser = await Profile.findById(req.params.id);
    console.log(newDP)
    if (isuser) {
      const newdp = await Profile.findByIdAndUpdate(
        req.params.id,
        { $set: newDP },
        { new: true }
      );
      res.json({ UPDATED: newdp });
    }
    if(!isuser){
      res.json("User not found")
    }
  } catch (error) {
    console.error(error);
  }
});



module.exports=router;