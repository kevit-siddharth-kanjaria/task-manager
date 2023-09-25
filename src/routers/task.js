//import dependencies
const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

//create new task
router.post('/tasks', async (req,res)=>{
    
    const task = new Task(req.body)

    try {
        const newTask = await task.save()
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

//read all tasks
router.get('/tasks', async (req,res)=>{
    
    try {
        const tasks = await Task.find({})
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//read task by id 
router.get('/tasks/:id', async (req,res)=>{
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
router.patch('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['description','completed']
    const validUpdates = updates.every((update)=> allowedUpdates.includes(update))

    if(!validUpdates){
        return res.status(400).send({error:'Invalid update!'})
    }
    
    try {
        const task = await Task.findByIdAndUpdate(_id,update,{new:true,runValidators:true})
        if (!task) {
            return res.status(404).send()
        } else {
            res.send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete task by id 
router.delete('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        } else {
            res.send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router
