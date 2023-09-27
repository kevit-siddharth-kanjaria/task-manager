//import dependencies
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

//create new task
router.post('/tasks', auth, async (req,res)=>{
    
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try {
        const newTask = await task.save()
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

//read all tasks
router.get('/tasks', auth, async (req,res)=>{
    
    try {
        const tasks = await Task.find({owner: req.user._id})
        // await req.user.populate('tasks').execPopulate() <----explore this again.
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//read task by id 
router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
        
    } catch (error) {
        res.status(500).send(error);
    }
})

//update task by id
router.patch('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['description','completed']
    const validUpdates = updates.every((update)=> allowedUpdates.includes(update))

    if(!validUpdates){
        return res.status(400).send({error:'Invalid update!'})
    }
    
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        
        if (!task) {
            return res.status(404).send()
        } 

        updates.forEach((up)=>{task[up]=update[up]})
        await task.save()
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete task by id 
router.delete('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
        
    } catch (error) {
        res.status(500).send(error);
    }
})

//export task router
module.exports = router