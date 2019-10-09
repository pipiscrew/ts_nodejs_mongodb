const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title :{type: String},
    description :{type: String},
    shortDescription :{type: String},
    duration :{type: String},
    releaseDate :{type: String},
    imageCover :{type: String},
    imagePoster :{type: String},
    genre :{type: String}
});


// Export the model
module.exports = mongoose.model('Movie', MovieSchema);