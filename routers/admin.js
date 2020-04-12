const express = require('express')
const User = require('../models/user')
const Movie = require('../models/movie')
const Review = require('../models/movie')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

//create admin
router.post('/admin', async (req, res) => {
    req.body.isAdmin = true;


    const user = new User(req.body)

    try {

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//admin login
router.post('/admin/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(user.isAdmin==false){
            throw new Error()
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//admin logout
router.post('/admin/logout', adminAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//admin logoutAll
router.post('/admin/logoutAll', adminAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/me', adminAuth, async (req, res) => {
    res.send(req.user)
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
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Admin operations - add, delete, update movies/reviews

router.post('/admin/addMovie', adminAuth, async(req,res) =>{
    const movie = new Movie({
        ...req.body,
        addedBy: req.user._id
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
        const movie = await Movie.findOne({ _id: req.params.id, addedBy: req.user._id})

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
        const movie = await Movie.findOneAndDelete({ _id: req.params.id, addedBy: req.user._id })

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
        const review = await Review.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!review) {
            res.status(404).send()
        }

        res.status(201).send(review)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router