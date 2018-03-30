'use strict'

//const passport = require('passport');
module.exports = function(passport){
    return{
        SetRouting:function(router){
            router.get('/',this.IndexPage);
           
            router.get('/signup',this.getSignUp);
            
             router.get('/home',this.homePage)
            
            router.post('/signup',this.postSignUp)
        },
        IndexPage:function(req,res){
            res.render('index');
        },
        getSignUp:function(req,res){
            res.render('signUp')
        },
        postSignUp: passport.authenticate('local.signup',{
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }),
        homePage:function(req,res){
            res.render('home')
        }
    }
    
}