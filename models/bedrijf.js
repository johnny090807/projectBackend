var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    naam: {type:String, required:true},
    locatie: {type:String, required:true},
    ervaringen:[{type: Schema.Types.ObjectId, default:[]}]
});
//
// schema.post('remove', function (identifier) {
//     User.findById(identifier.user, function (err, user) {
//         user.identifiers.pull(identifier);
//         user.save();
//     });
// });

module.exports = mongoose.model('Bedrijf', schema);
