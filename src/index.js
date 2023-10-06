//import dependencies
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//make express instance
const app = express()

//define port for app
const port = process.env.PORT

//setup logger
let reqs = 0;
app.use((req,res,next)=>{
    console.log(reqs,req.method,req.path);
    reqs++
    next()
})

//maintanence middleware
// app.use((req,res,next)=>{
//         res.status(503).send('site under maintainance')    
// })

//initialize express app
app.use(express.json())

//use routes
app.use(userRouter)
app.use(taskRouter)

//run task-manager app
app.listen(port,()=>{
    console.log("Server is active on port "+port);
})