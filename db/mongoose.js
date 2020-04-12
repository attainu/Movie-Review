const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deepam_bahre:<password>@cluster0-iiers.mongodb.net/test?retryWrites=true&w=majority', {
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