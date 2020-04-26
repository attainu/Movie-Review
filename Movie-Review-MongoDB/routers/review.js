const express = require('express')
const Review = require('../models/review')
const auth = require('../middleware/auth')
const router = new express.Router()


//create review
router.post('/review/:id', auth, async (req, res) => {
    const review = new Review({
        ...req.body,
        owner: req.user._id,
        movie: req.params.id
    })

    try {
        await review.save()
        res.status(201).send(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all reviews of an user id
router.get('/users/reviews/:id', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'reviews',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.reviews)
    } catch (e) {
        res.status(500).send()
    }
})


//get review :id
router.get('/reviews/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const review = await Review.findOne({ _id, owner: req.user._id })

        if (!review) {
            return res.status(404).send()
        }

        res.send(review)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/reviews/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const review = await Review.findOne({ _id: req.params.id, owner: req.user._id})

        if (!review) {
            return res.status(404).send()
        }

        updates.forEach((update) => review[update] = req.body[update])
        await review.save()
        res.send(review)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.delete('/reviews/:id', auth, async (req, res) => {
//     try {
//         const review = await Review.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!review) {
//             res.status(404).send()
//         }

//         res.send(review)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router