//import dependencies
const mongoose = require('mongoose')

//connect to db using mongoose
mongoose.connect(process.env.MONGODB_URL)