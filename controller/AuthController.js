const router = require('express').Router()
const User = require('../models/User')

router.get('/login',(req,res) => {
    res.render('pages/auth/login')
});

router.post('/attempt',(req,res) => {

    const {email,password} = req.body

    User.findOne({email:email},(err,user) => {
        if(err) return res.render('pages/auth/login-success',{message:'Unexpected Error Occured  <a href="/auth/login">Try Again</a>'})
 
        if(!user) return res.render('pages/auth/login-success',{message:'Wrong Credentials <a href="/auth/login">Try Again</a>'})
        if(user.password == password)
        {
            req.session.user = user
            return res.render('pages/auth/login-success',{message:'Successfully logged in <a href="/">Continue</a>'})
        }
        else {
            return res.render('pages/auth/login-success',{message:'Wrong Credentials <a href="/auth/login">Try Again</a>'})
        }
    });
})

router.get('/register',(req,res) => {
    res.render('pages/auth/register')
})

router.get('/logout',(req,res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router