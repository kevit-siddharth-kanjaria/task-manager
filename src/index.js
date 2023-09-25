const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req,res)=>{
    
    const user = new User(req.body)

    try {
        const newUser = await user.save()
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})


app.post('/tasks', async (req,res)=>{
    
    const task = new Task(req.body)

    try {
        const newTask = await task.save()
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port,()=>{
    console.log("server is active on port "+port);
})