var mongoose=require('mongoose');

mongoose.Promise=require('bluebird');

var mongoDB='mongodb://localhost/NodeProje';

mongoose.connect(mongoDB,function(err,err){
    if(err){
        console.log('mongoose hatasi: ',err);
    }else{
        console.log('mongoose baglandi: ',+mongoDB);
    }
});
/*
var crypto=require('crypto');
function randomValueHex(len){
	return crypto.randomBytes(Math.ceil(len/2)).          //şifreleme için
		toString('hex').
		slice(0,len);
}
var value=randomValueHex(5);
console.log(value);
*/