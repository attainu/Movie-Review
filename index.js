const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan');
require('./db/mongoose')
const port = process.env.PORT || 5000
const path = require("path");
const bodyParser = require('body-parser');

app.use(express.json())
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.use(require('./routers/user'))
app.use(require('./routers/review'))
app.use(require('./routers/admin'))
app.use(require('./routers/movie'))
app.use(morgan('dev'));
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.get('/', function(req, res){
    res.json({"Project" : "Build REST API with nodejs Successfully"});
    });

module.exports= app;