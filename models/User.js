const mongoose = require('mongoose'); 
const _=require('lodash')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

var UserSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true, 
  }, 
  email: {
    type: String, 
    required:true,  
  }, 
  password: {
    type: String, 
    required:true,  
  }, 
  date: {
    type: Date, 
    default: Date.now
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    tokenExpire:{
      type:Date,
      required:true
    }
  }],
  budget:[]
}); 

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    console.log(user)
    var access = 'auth';
    var date=Date.now()
    var token = jwt.sign({_id: user._id.toHexString(), access,date}, "ksdjkfjweei849w388rjoef").toString();
    var tokenExpire=Date.now()+3600000*8*24
    user.tokens.push({access, token,tokenExpire});

    return user.save().then((result) => {
      return data={
        token:token,
        result:result
      }
    });
};

UserSchema.statics.findByToken =async function(token) {
    var User = this;
    var decoded;

    try {
      decoded = jwt.verify(token, "ksdjkfjweei849w388rjoef");
    } catch (e) {
      return Promise.reject();
    }

    var result=await User.findOne({
      '_id': decoded._id,
      'tokens':{$elemMatch:{'token':token,
      'access': 'auth',
      'tokenExpire':{ $gt: Date.now() }
      }}
    });
    if(result){
      var response =await User.update({'tokens.token':token},{$set:{'tokens.$.tokenExpire':Date.now()+3600000*8*24}})
    }
    return result
  };
UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
      $pull: {
        'tokens':{$or:[{token:token},{tokenExpire:{$lt:Date.now()}}]}
      }
    });
  };


UserSchema.statics.findByCredentials=function(email, password){
    var User=this;
    return User.findOne({"email":email}).then((user)=>{
        if(!user){
            return Promise.reject({message:"user not found"});
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){

                    resolve(user)
                }
                else{
                    reject()
                }
            })
        })
    })
}


var User=mongoose.model('userdata', UserSchema); 


module.exports={User}