const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const reviewRouter = require('./routers/review')
const adminRouter = require('./routers/admin')

const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(userRouter)
app.use(reviewRouter)
app.use(adminRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Review = require('./models/review')
const User = require('./models/user')

