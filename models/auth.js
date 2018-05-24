var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean},
    ervaringen: {type: Schema.Types.ObjectId, ref:"Ervaring",default: undefined},
    bedrijf: {type: Schema.Types.ObjectId, ref:"Bedrijf", default: undefined}
});

// Auth.find({userName: 'admin'},function(err, auth){
//     if(!auth){
//         var auth = new Auth({
//             userName: 'admin',
//             password: 'geheim'
//         })
//     }
// });


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Auth', schema);