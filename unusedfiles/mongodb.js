const {MongoClient, ObjectId} = require('mongodb') // setup mongo client

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


// const id = new ObjectId()
// console.log(id.toString());
// console.log(id.getTimestamp());
// console.log(id.id.length);
// console.log(id.toHexString().length);


//it will have to be wraped in a async function

async function dbconnection(url,dbname) {
    try {
        const client = await MongoClient.connect(url)
        console.log("Connected");
        const db = client.db(dbname)

        //----------------------Create-------------------
        // const data = await db.collection("users").insertOne(
        //     {
        //         // _id:id,
        //         name:"siddharth",
        //         age:22
        //     }
        // )
        // console.log(data);
        
        // const data = await db.collection("tasks").insertMany(
        //     [
        //         {
        //             description:"learn node",
        //             completed:false
        //         },
        //         {
        //             description:'learn express',
        //             completed:true
        //         },
        //         {
        //             description:'learn mongo',
        //             completed:false
        //         }]
        // )
        // console.log(data);

        //---------------------Read---------------------------

        //.find() returns cursor(pointer to the first match in db)
        // const users_20 = await db.collection("users").find({age:20}).toArray()
        // const users_20 = await db.collection("users").find({age:20}).count()
        // console.log(users_20);

        // const user =await db.collection("users").findOne({name:"siddharth"})
        // console.log(user);

        // const unfinishedTasks = await db.collection("tasks").find({completed:false}).toArray()
        // const taskId = await db.collection("tasks").findOne({_id:new ObjectId("650a96f975feb88fec960d27")})
        // console.log(unfinishedTasks);
        // console.log(taskId);

        //-------------------------Update-----------------------------

        // const update = await db.collection("users").updateOne({
        //     _id:new ObjectId("650a8fb2ede1d052bb962916")
        // },
        // {
        //     $inc:{
        //         age:1
        //     }
        // })
        // console.log(update);

        // const updateMany = await db.collection("tasks").updateMany({
        //     completed:false
        // },{
        //     $set:{
        //         completed: true
        //     }
        // })
        // console.log(updateMany);


        //-------------------Delete------------------

        // const del = await db.collection("users").deleteOne({age:20})
        // const delMany = await db.collection("tasks").deleteMany({completed:true})
        // console.log(del);
        // console.log(delMany);
        

    } catch (error) {
        console.log("Error: " + error);
    }
}


dbconnection(connectionURL,databaseName)