//import dependencies
const mongoose = require('mongoose')
const User = require('./user')

//create "Task" model using mongoose
const Task = mongoose.model('Task',{
    description:{ 
        type : String,
        required:true,
        trim:true
    },
    completed:{ 
        type : Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :'User'
    }
})

//export "Task" model
module.exports = Task