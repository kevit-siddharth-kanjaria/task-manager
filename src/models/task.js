//import dependencies
const mongoose = require('mongoose')
const User = require('./user')

const taskSchema =mongoose.Schema({
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
},{
    timestamps:true
})

//create "Task" model using mongoose
const Task = mongoose.model('Task', taskSchema)

//export "Task" model
module.exports = Task