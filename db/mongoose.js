const mongoose = require('mongoose')

mongoose.connect('mongo "mongodb+srv://cluster0-iiers.mongodb.net/test"  --username deepam_bahre', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
/*
mongoose.connect('mongodb://127.0.0.1:27017/movie-review-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
*/