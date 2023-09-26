//import dependencies
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//create user model schema
const userSchema = mongoose.Schema({
    name:{ 
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email Invalid')
            }
        }
    },
    age:{ 
        type : Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error('password cant contain \'password\'')
            }
        }
    }
})

//password hashing middleware
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

//create "User" model using mongoose
const User = mongoose.model('User',userSchema)

//export "User" model
module.exports = User