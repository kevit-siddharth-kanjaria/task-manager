//import dependencies
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//auth middleware
const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'taskmanager')
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

//export auth middleware
module.exports = auth