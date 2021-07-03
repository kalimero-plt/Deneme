//express sunucusunu kullanmak
/*var express=require('express');//express kütüphanesini kullandık
var app=express();//express objesi oluşturuldu.
var server=app.listen(8000,function(){
	console.log('sunucu calisiyor');
});
*/
var express=require('express');
var app=express();
var fs=require('fs');
app.get('/listele',function(req,res){
	//res.send('Kullanicilari Listeleyen Cagri');
	fs.readFile('kullanici.json','utf8',function(err,data){
		console.log(data);
		res.end(data);
	});
});
app.get('/ekle',function(req,res){
	//res.end('Kullanici Ekleyen Cagri');
	var yenikullanici={
		"k3":{
			"isim":req.query.isim,
			"sifre":req.query.sifre,
			"email":req.query.email
		}
	};
	fs.readFile('kullanici.json','utf8',function(err,data){
		data=JSON.parse(data);//diziye çevirme işlemi yani parçalama yapıldı.
		data["k3"]=yenikullanici["k3"];//dizi haline getirdik
		console.log(data);
		res.end(JSON.stringify(data));
		fs.writeFile('kullanici.json',JSON.stringify(data),function(err){
			console.log('bir hata olustu');
		});
	});
});
app.get('/sil',function(req,res){
	//res.end('Kullanici Silen Cagri');
	fs.readFile('kullanici.json','utf8',function(err,data){
		data=JSON.parse(data);
		var id="k" + req.query.id;
		delete data[id];
		console.log(data);
		res.end(JSON.stringify(data));
		fs.writeFile('kullanici.json',JSON.stringify(data),function(err){
			console.log('bir hata olustu');
		});
	});
});
app.get('/sorgula',function(req,res){
	//res.end('Kullanici Sorgulayan Cagri');
	fs.readFile('kullanici.json','utf8',function(err,data){
		data=JSON.parse(data);
		var id="k" + req.query.id;
		console.log(data[id]);
		res.end(JSON.stringify(data[id]));
	});
});
var server=app.listen(8000,function(){
	console.log('sunucu calisiyor');
});
/*Web sunucusu üzerinden basit bir JSON dosyasını erişime açıyor, ekleme, silme, listeleme gibi temel özellikleri 
çalıştırarak basit bir kullanıcı yönetimini express modülü ile çalıştırıyoruz. Express modünlünün npm ile kurulması 
ile başlıyor, dosya okuma yazma işlemlerini kullanıyor JSON nesnesi ve string (dizgi) arasında geçişi gösteriyor ve 
API okumakla ilgili bilgiler vermeye çalışıyoruz.*/