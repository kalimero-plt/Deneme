var mongoose =require('mongoose');

var Schema=mongoose.Schema;

var urlSchema=new Schema({
    url_adi:String
},{collection:'urller'});

var Kullanici=mongoose.model('Kullanici',urlSchema);

module.exports=Kullanici;