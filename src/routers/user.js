//import dependencies
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//create user
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
        res.send({user: user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//user logout
router.post('/users/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//user logout of all sessions (remove all auth tokens)
router.post('/users/logoutall', auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//read user profile
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

//update user by id
router.patch('/users/me', auth, async (req,res)=>{
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['name','email','age','password']
    const validUpdates = updates.every((update)=> allowedUpdates.includes(update))

    if(!validUpdates){
        return res.status(400).send({error:'Invalid update!'})
    }

    try {
        const user = req.user
        updates.forEach((up)=>{user[up] = update[up]})
        await user.save()
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//delete user by id
router.delete('/users/me', auth, async (req,res)=>{

    try {
        await User.findByIdAndDelete(req.user._id)
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error);
    }
})

//export router
module.exports = router
