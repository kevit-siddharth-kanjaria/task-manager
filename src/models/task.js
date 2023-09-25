//import dependencies
const mongoose = require('mongoose')

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
    }
})

//export "Task" model
module.exports = Task