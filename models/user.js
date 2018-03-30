const mongoose = require('mongoose');
const bcryptnode = require('bcrypt-node');
const userSchema =mongoose.Schema({
    username: {type:String, unique:true},
    fullname: {type:String, unique:true, default:"" },
    password: {type:String, unique:true,default:""},
    email: {type:String, unique:true},
    userImage:{type:String,default:"default.png"},
    facebook:{type:String, default:""},
    facebookTokens:Array,
    google:{type:String,default:""},
    googleToken:Array
    
});

userSchema.methods.encryptPassword = function(password){
    return bcryptnode.hashSync(password,bcryptnode.genSaltSync(10),null)
};
userSchema.methods.validatePassword = function(password){
    return bcryptnode.compareSync(password, this.password)
};

module.exports = mongoose.model('User',userSchema)