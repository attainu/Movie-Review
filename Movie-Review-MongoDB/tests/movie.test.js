const index = require("../index");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
//const User = require("../models/user");
const request = require("supertest");

//------------For User-------------------//
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'arun kumar',
    email: 'arun@gmail.com',
    password: 'arun12345',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'movie-review')
    }]
}

//User Signup
test('Should signup a new user', async () => {
    await request(index).post('/users').send({
        name: 'arun kumar',
        email: 'arun@gmail.com',
        password: 'arun12345'
    }).expect(201)
})


//User Login
test('Should login existing user', async () => {
    await request(index).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

//------------For Admin-------------------//

const adminOneId = new mongoose.Types.ObjectId()
const adminOne = {
    _id: adminOneId,
    name: 'Mohit kumar',
    email: 'mohit@gmail.com',
    password: 'mohit12345',
    tokens: [{
        token: jwt.sign({ _id: adminOneId }, 'movie-review')
    }]
}

//Admin Signup
test('Should signup a new user', async () => {
    await request(index).post('/admin').send({
        name: 'Amar kumar',
        email: 'amar@gmail.com',
        password: 'amar12345'
    }).expect(201)
})

//Admin Login

test('Should login existing admin', async () => {
    await request(index).post('/admin/login').send({
        email: adminOne.email,
        password: adminOne.password
    }).expect(200)
})




