const request = require('supertest')
const app = require("../src/app")
const User = require('../src/models/user')

const userOne = {
    name:'mike',
    email:'mike@example.com',
    password:'siddharth'
}

beforeEach(async()=>{
   await User.deleteMany()
   await new User(userOne).save()
})

test('should signup a new user', async ()=>{
   await request(app).post('/users').send({
       name:'Adrew',
       email:'andrew@gmail.com',
       password:'siddharth'
   }).expect(201)
})


test('should signup a new user', async ()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
})
 

test('should signup a new user', async ()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'gggggggggg'
    }).expect(400)
})