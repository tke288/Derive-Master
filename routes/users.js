const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const _=require('lodash')
var path = require("path");

var loggedIn=require('../middleware/auth')
// Load User Model
var {User} = require('../models/User');
var {Budget} = require('../models/budget');
// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});
router.get('/budget', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/budget.html"));
});
//Login form post
router.post('/savebudget',loggedIn,async(req,res)=>{
  var user =req.user
  var body=_.pick(req.body,[  'location',
  'date',
  'targerBudget',
  'airfareCost',
  'hostelCost',
  'miscellaneous',
  'totalCost',
  'underBudget'])
  var newBudget= new Budget(body)
  var result=await newBudget.save()
  var updateResult= await User.update({_id:user._id},{$push:{budget:newBudget._id}})
  if(updateResult.n>0){
    res.send({status:1})
  }
  else{
    res.send()
  }

})

router.post('/getbudget',loggedIn,async(req,res)=>{

  var budgetId=req.user.budget
  var budget= await Budget.find({_id:{$in:budgetId}})
  res.send({data:budget,status:1})

})


router.post('/login',(req, res)=> {
  var body=_.pick(req.body,['email','password'])
  User.findByCredentials(body.email,body.password).then((user)=>{
      return user.generateAuthToken()
    }).then(async(result)=>{
      res.send({status:1,data:result})
      }).catch((err)=>{
      res.send({status:0})
  })
})

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

// Logout User
router.post('/logout',loggedIn,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
        res.send({status:1})
    }).catch(()=>{
        res.status(400).send()
    })
}) 

module.exports = router;