const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        default:" "
    },
    // ratings: {
    //     type: Number,
    //     required:true
    // },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movie: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Movie'
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review