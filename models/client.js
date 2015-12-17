var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClientSchema   = new Schema({
    company_name: String,
    phone: String,
    name: String,
    date_added: Date
});

module.exports = mongoose.model('Client', ClientSchema);