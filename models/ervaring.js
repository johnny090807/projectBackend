var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    student: {type: Schema.Types.ObjectId,ref:"Auth"},
    beschrijving: {type: String, required: true},
    punten: {type: Number, required: true}
});
//
// schema.post('remove', function (identifier) {
//     User.findById(identifier.user, function (err, user) {
//         user.identifiers.pull(identifier);
//         user.save();
//     });
// });

module.exports = mongoose.model('Ervaring', schema);
