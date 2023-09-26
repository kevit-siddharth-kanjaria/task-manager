//import dependencies
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// create user
router.post('/users', async (req,res)=>{
    
    const user = new User(req.body)

    try {
        const newUser = await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({newUser,token});
    } catch (error) {
        res.status(400).send(error);
    }
})

//user login
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findUserByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//read user profile
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

//read user by id
router.get('/users/:id', async (req,res)=>{
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
router.patch('/users/:id', async (req,res)=>{
    const _id = req.params.id
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['name','email','age','password']
    const validUpdates = updates.every((update)=> allowedUpdates.includes(update))

    if(!validUpdates){
        return res.status(400).send({error:'Invalid update!'})
    }

    try {
        const user = await User.findById(_id)
        updates.forEach((up)=>{user[up] = update[up]})
        await user.save()

        if (!user) {
            return res.status(404).send()
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

//delete user by id
router.delete('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router
