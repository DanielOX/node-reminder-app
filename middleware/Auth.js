const auth = (req,res,next) => {
    console.log(req.session)
    if(req.session && req.session.user){      
         return next()
    }
    else {
        res.redirect('/auth/login')
    }
}

module.exports = auth