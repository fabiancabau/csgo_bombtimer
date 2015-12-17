var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProjectSchema   = new Schema({
    name: String,
    description: String,
    value: Number,
    installments: Number,
    client_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Project', ProjectSchema);