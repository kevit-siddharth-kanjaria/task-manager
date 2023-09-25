//import dependencies
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

//make express instance
const app = express()

//define port for app
const port = process.env.PORT || 3000

//initialize express app
app.use(express.json())

// create user
app.post('/users', async (req,res)=>{
    
    const user = new User(req.body)

    try {
        const newUser = await user.save()
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

//read all users
app.get('/users', async (req,res)=>{
    
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

//read users by id
app.get('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//update user by id
app.patch('/users/:id', async (req,res)=>{
    const _id = req.params.id
    const update = req.body
    try {
        const user = await User.findByIdAndUpdate(_id,update)
        if (!user) {
            return res.status(404).send()
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//create new task
app.post('/tasks', async (req,res)=>{
    
    const task = new Task(req.body)

    try {
        const newTask = await task.save()
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

//read all tasks
app.get('/tasks', async (req,res)=>{
    
    try {
        const tasks = await Task.find({})
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//read task by id 
app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        } else {
            res.send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//update task by id
app.patch('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    const update = req.body
    try {
        const task = await Task.findByIdAndUpdate(_id,update)
        if (!task) {
            return res.status(404).send()
        } else {
            res.send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//run task-manager app
app.listen(port,()=>{
    console.log("server is active on port "+port);
})