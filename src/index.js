//import dependencies
const app = require('./app')

//define port for app
const port = process.env.PORT

//run task-manager app
app.listen(port,()=>{
    console.log("Server is active on port "+port);
})