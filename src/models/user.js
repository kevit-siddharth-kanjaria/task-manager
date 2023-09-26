//import dependencies
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//create user model schema
const userSchema = mongoose.Schema({
    name:{ 
        type : String,
        required:true
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
})

//generate auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'taskmanager')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//user details abstraction (hide password and auth tokens)
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//user authentication
userSchema.statics.findUserByCredentials= async (email,password)=>{
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error('unable to login')
    }
    return user
}

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