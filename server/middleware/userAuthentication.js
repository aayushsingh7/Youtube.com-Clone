const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const userAuthentication = async(req,res,next)=> {
   try {
    let token = req.cookies.youtube;
    if(!token){
        return res.status(401).send({success:false,error:"No Token Provided"})
    }else{
        let verifyToken = await jwt.verify(token,process.env.SECRET_KEY)
        if(!verifyToken){return res.status(401).send({success:false,error:"Invalid Token"})}
        let getUser = await User.findOne({_id:verifyToken._id})
        req.userData = getUser;
        return next()
    }
   } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
}
}

module.exports = userAuthentication;