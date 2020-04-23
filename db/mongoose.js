const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deepambahre-attainu:<password>@movie-review-hahgp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

/*
mongoose.connect('mongodb://127.0.0.1:27017/movie-review-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
*/