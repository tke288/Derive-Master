var {User}= require('../models/User')

var authenticate=async(req,res,next)=>{
  try{
    let token=req.header('x-auth')
    var user =await User.findByToken(token)
    if (!user) {
      return res.send({status:2})
    }
    req.user=user
    req.token=token
    next();
    }catch(err){
        res.send({status:2})
    }
  }

module.exports=authenticate