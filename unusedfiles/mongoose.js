const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

// here the mongoose takes the "User" and "Task" lowercases it and pluralises it and makes database collections users and tasks

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
            if(value.toLowerCase.includes('password')){
                throw new Error('password cant contain \'password\'')
            }
        }
    }
})

const me = new User({
    name:'amay3',
    email:'amayAMAY@pur.com',
    age:22,
    password:'    passWord@123'
})

async function saveUser() {
    try {
        const newUser = await me.save()
        console.log(newUser);
    } catch (error) {
        console.log(error);
    }
}

// saveUser()

const Task = mongoose.model('Task',{
        description:{ 
            type : String,
            required:true,
            trim:true
        },
        completed:{ 
            type : Boolean,
            default:false
        }
    })

const task = new Task({
    description: '',
    // completed:true
})

async function saveTask() {
    try {
        const newTask = await task.save()
        console.log(newTask);
    } catch (error) {
        console.log(error);
    }
}

saveTask()