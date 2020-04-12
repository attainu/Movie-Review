const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deepam_bahre:<MovieReview>@cluster0-iiers.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})