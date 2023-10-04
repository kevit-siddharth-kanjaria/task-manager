//import dependencies
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

//create new task
router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        const newTask = await task.save()
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error);
    }
})

//read all tasks
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true' //GET /tasks?completed=true
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),        //GET /tasks?limit=3
                skip: parseInt(req.query.skip),          //GET /tasks?skip=3
                sort                                     //GET /tasks?sortBy=createdAt:desc
            }
        })
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//read task by id 
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);

    } catch (error) {
        res.status(500).send(error);
    }
})

//update task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['description', 'completed']
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdates) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((up) => { task[up] = update[up] })
        await task.save()
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete task by id 
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
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