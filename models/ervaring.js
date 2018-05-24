var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    student: {type: Schema.Types.ObjectId,ref:"Auth"},
    description: {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model('Ervaring', schema);
