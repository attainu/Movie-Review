var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    Description: {type: String, required: true},
    MovieId: mongoose.Schema.Types.ObjectId
});


// Export the model
module.exports = mongoose.model('reviews', ReviewSchema);