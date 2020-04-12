const mongoose = require('mongoose')
//const validator = require('validator')

//const User = require('./user')
//const Review = require('./review')


const movieSchema = new mongoose.Schema(
    {
        Name: {type: String},
        Release_Date: {type: String, default: 'None'},
        Category: {type: String},
        Description: {type: String},
        Images: {type: String},
        Video: {type: String},
        Director: {type: String},
        Stars: {type: String},
        Ratings: {type: Number, default:0},
        addedBy: {
            type: mongoose.Schema.Types.String,
            required: true,
            ref: 'User'
        }
    },
    
{
    timestamps: true
})

movieSchema.virtual('reviews', {
    ref: 'Review',
    localField: 'Name',
    foreignField: 'movie'
})




const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie