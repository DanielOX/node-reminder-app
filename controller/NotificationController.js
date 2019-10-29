const router = require('express').Router()
const transporter = require('../config/transporter')
const { EMAIL } = require('../config/secret')


// Authentication Middleware

const auth = require('../middleware/Auth')


router.get('/',auth,(req,res,next) => {
    res.redirect('/notifications/create')
})

router.get('/create',auth,(req,res,next) => {
    res.render('pages/notifications/create')
})

/*  @ POST
    @ Send Notification
    @params search
*/

router.post('/send',auth,(req,res,next) => {
    // Send Email

  User.find({},{email:true,_id:false},(err,emails) => {
    const recievers = emails.map(email => email.email).join(',')
    const mailOptions = {
        from:EMAIL,
        to:recievers,
        subject:req.body.subject,
        text:req.body.body
    }

    transporter.sendMail(mailOptions,(err,info) => {
        if(err) {
            console.log(err)
            return res.render('pages/notifications/sentStatus',{success:false,message:err})
        }else {
            return res.render('pages/notifications/sentStatus',{success:true,message:'Email Was Sent Successfully!'})
        }
        
    })

});



})


module.exports =  router