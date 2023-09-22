const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
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

module.exports = User