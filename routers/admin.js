const express = require('express')
//const User = require('../models/user')
const Admin = require('../models/admin')
const Movie = require('../models/movie')
const Review = require('../models/movie')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

//create admin
router.post('/admin', async (req, res) => {
    req.body.isAdmin = true;


    const admin = new Admin(req.body)

    try {

        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//admin login
router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        if(admin.isAdmin==false){
            throw new Error()
        }
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send()
    }
})

//admin logout
router.post('/admin/logout', adminAuth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//admin logoutAll
router.post('/admin/logoutAll', adminAuth, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/me', adminAuth, async (req, res) => {
    res.send(req.admin)
})

//admin update profile
router.patch('/admin/me', adminAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.admin[update] = req.body[update])
        await req.admin.save()
        res.send(req.admin)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Admin operations - add, delete, update movies/reviews

router.post('/admin/addMovie', adminAuth, async(req,res) =>{
    const movie = new Movie({
        ...req.body,
        addedBy: req.admin._id
    })

    try {
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    } 

})

router.patch('/admin/upadteMovie/:id', adminAuth, async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'Release_Date', 'Category', 'Description','Director','Stars']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const movie = await Movie.findOne({ _id: req.params.id, addedBy: req.admin._id})

        if (!movie) {
            return res.status(404).send()
        }

        updates.forEach((update) => movie[update] = req.body[update])
        await movie.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    } 

})


router.delete('/admin/deleteMovie/:id', adminAuth, async(req,res) =>{
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id, addedBy: req.admin._id })

        if (!movie) {
            res.status(404).send()
        }

        res.status(201).send(movie)
    } catch (e) {
        res.status(500).send()
    } 

})


router.delete('/admin/deleteReview/:id', adminAuth, async(req,res) =>{
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, owner: req.admin._id })

        if (!review) {
            res.status(404).send()
        }

        res.status(201).send(review)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router