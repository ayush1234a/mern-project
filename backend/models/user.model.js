const mongoose = require('mongoose');
//( npm i bcrypt jsonwebtoken "first install it using this") this is for hash password it is baically vor authantication
    
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, 'First name must be atlist 3 characters long'],
        },

            lastname:{
                type:String,
                
                minlength:[3, 'last name must be atlist 3 characters long'],
            }
        },
        email:{
            type:String,
            required:true,
            unique:true,
            minlength:[5, 'email must be atlist 5 characters long'],
        },

        password:{
            type:String,
            required:true,
            select: false,
        },

        //it isw use for live tracking ex: drivror user location tracking where is he or she 
        socketId:{
            type:String,
        }
          
        // npm i bcrypt jsonwebtoken this is for hash password it is baically vor authantication
    
})

userSchema.methods.generateAuthtoken = function(){
    const token = jsonwebtoken.sign({ _id: this._id}, process.env.jsonwebtoken_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword =async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;