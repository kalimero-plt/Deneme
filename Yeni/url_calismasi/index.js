/*var express=require('express');
var router=express.Router();
var mongo=require('mongodb');
var assert=require('assert');

var url='mongodb://localhost/yenidb';

router.get('/',function(req,res){
    res.render('index');
});
router.post('/insert',function(req,res){
    var item={
        url_adi: req.body.isim,
    };
    mongo.connect(url,function(err,db){
        assert.equal(null,err);
        db.collection('urller').insertOne(item,function(err,result){
            assert.equal(null,err);
            console.log(result);
            db.close();
        });   
    });
    res.redirect('/');
});
//Deneme.js dosyasının içindekiler
module.exports.index=function(req,res){
	res.render('login');
}
module.exports.indexPost=function(req,res){
	console.log("indexPost");
	res.render('login');
}
*/
/*
var http=require('http');
var fs=require('fs');

function onRequest(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	fs.readFile('./Dosya.html',null,function(error,data){
		if(error){
			response.writeHead(404);
			response.write('File not found!');
		}else{
			response.write(data);
		}
		response.end();
	});
}
http.createServer(onRequest).listen(8000);
*/