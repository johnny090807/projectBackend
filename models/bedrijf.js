var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    naam: {type:String, required:true},
    locatie: {type:String, required:true},
    ervaringen:[{type: Schema.Types.ObjectId, default:[]}]
});
module.exports = mongoose.model('Bedrijf', schema);
