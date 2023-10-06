//import dependencies
const express = require('express')
const User = require('../models/user')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')

//upload middleware
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return callback(
                new Error("Only .jpg, .png or .jpeg file allowed.")
            )
        } callback(undefined, true)
    }
})

//create user
router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        const newUser = await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ newUser, token });
    } catch (error) {
        res.status(400).send(error);
    }
})

//user login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//user logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//user logout of all sessions (remove all auth tokens)
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//read user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//update user by id
router.patch('/users/me', auth, async (req, res) => {
    const update = req.body
    const updates = Object.keys(update)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const validUpdates = updates.every((update) => allowedUpdates.includes(update))

    if (!validUpdates) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const user = req.user
        updates.forEach((up) => { user[up] = update[up] })
        await user.save()
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//delete user by id
router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error);
    }
})

//create(upload) or update avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize(
        {width: 250, height:250 }
    ).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res)=>{
    res.status(400).send(error.message)
})

//delete avatar
router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

//read(display) avatar by id
router.get('/users/:id/avatar', async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user|| ! user.avatar){
            throw new Error()
        } 
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

//export user router
module.exports = router
