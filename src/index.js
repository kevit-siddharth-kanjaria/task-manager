//import dependencies
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//make express instance
const app = express()

//define port for app
const port = process.env.PORT || 3000

//initialize express app
app.use(express.json())

//use routes
app.use(userRouter)
app.use(taskRouter)

//run task-manager app
app.listen(port,()=>{
    console.log("server is active on port "+port);
})