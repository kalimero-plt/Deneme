var express/*değişken*/=require('express'/*modül*/);									//express modülünü express değişkenine atıyoruz. express değişkeni ile express modülünün tüm içeriğine erişebiliriz.
var bodyParser=require('body-parser');													//body-parser modülünü bodyParser değişkenine atıyoruz.
var fs=require('fs');																	//Dosya okumak için fs modülünü fs değişkenine atıyoruz.
var app=express();																		//Express modülü kullanılarak app değişkeni oluşturuldu.
const mongoose=require("mongoose");														//Veritabanına bağlanmak için mongoose modülünü mongoose değişkenine atıyoruz.
const crypto=require('crypto');															//Rasgele veriler ile şifre oluşturmak için crypto modülünü crypto değişkenine atıyoruz.
var ejs=require('ejs');																	//ejs modülünü ejs değişkenine atıyoruz.
var sifre = crypto.randomBytes(20).toString('hex').slice(0,6);							//Oluşturulan rasgele şifrenin ilk 6'sını slice(0,6) sayesinde alıyoruz.
																						//randomBytes(size)=> size: Bağımsız(rasgele) değişken üretmek için bayt sayısını belirten bir sayıdır.
																						//toString('hex')=> Binary veriler hex'e dönüştürüldü.
																						//=> f26d60305dae929ef8640a75e70dd78ab809cfe9

																						//POST işlemini çözümlemek için gerekli bir ayrıştırıcı
app.use(bodyParser.urlencoded({extended: true}));										//app.use()=>Belirli katman işlevini veya belirtilen yolda işlevleri monte eder. Bu satırı routerdan önce yazmamız gerekiyor. Yoksa veri tipini tanımsız(undefined) alıyor.
app.engine('.ejs',ejs.__express);														//Verilen şablon motorunu(.ejs) callback(ejs.__express) olarak kaydeder.
app.set('views',__dirname+'/views');													//app.set(ad,değer)=>Ayar adını değere atar.

mongoose.connect("mongodb://localhost/yenidb",function(err,db){							//Mongoose ile veritabanına bağlantı kurmak için kullandık. Callback yapıldı.
																						//Callback: Bir geri çağırma fonksiyonu, başka bir fonksiyona geçirilen bir parametre şeklindeki fonksiyondur. Asenkron olarak çalışırlar. Yani aynı anda başka bir fonksiyonda çalıştırabilir, engellemez. function(err,db) callback'tir. 	
	if (err) throw err; 																//Eğer bağlanmıyorsa hatayı fırlatmasını istedik.

	app.get('/',function(req,res){														//app.get()=> Get isteklerini işlemek için kullanılır. Eğer kullanıcı localhost:8000 veya localhost:8000/ girerse tarayıcıya bu kısma girecek. Callback yapıldı.
		fs.createReadStream('./views/Dosya.ejs').pipe(res);								//Dosya.ejs dosyanın yolu verilip okundu.
	});

	app.post('/login',function(req,res){												//app.post()=> Post isteklerini işlemek için kullanılır. Dosya.ejs e gerekli veriler girilip butona(URL Kısalt) basınca bu kısma gelecek. Callback yapıldı.
			var URL=require('../app_server/models/url_sifre_bilgileri');				//Veritabanı için oluşturduğumuz şemaya erişmek için dosya yolunu kullanıp URL değişkeni oluşturuldu.
			var yeni_url=new URL({														//URL den verileri eklemek için yeni_url oluşturuldu.
				url_adi:req.body.isim,													//Formdan veri çekerken req.body.isim şeklinde çekip veritabanındaki url_adi kısmına yerleştirdik. req.body formda girilen tüm bilgileri, req.body.isim ise formdaki name'si isim olan kısımdaki veriyi getirir.
				sifrelenmis_hali:sifre													//Yukarıda oluşturulan şifreyi de veritabanında sifrelenmis_hali kısmına yerleştirdik.
			});
			yeni_url.save(function(err){												//Yerleştirilen verileri kaydetme işlemi yapıldı.
				if(err){																//Eğer hata varsa
					console.log(err);													//Hata consol'a yazdırıldı. 
				}else{																	//Eğer hata yoksa 
					console.log('Url kaydedildi.');										//Consol'a "Url kaydedildi." yazıldı. 
				}
			});
		res.redirect('/kullaniciListesi?code='+ sifre);									//res.redirect()=>Bir isteği yönlendirir. Redirect kullanarak şifre ile beraber istenilen yere yönlendirildi.
	});
	
	app.get("/kullaniciListesi",function(req,res){										//Girilen url nin kısaltılmış halini göstermek için yazıldı. Callback yapıldı.
		db.collection("urller").findOne({sifrelenmis_hali: req.query.code})				//Veri tabanında collection olan urller den bir tane kayıt bulması istendi.
		.then(result => {																//Eğer istenen veri varsa
			res.render('./dosya1.ejs',{													//res.render()=>Görünüm şablonu oluşturmaya yarar.dosya1.ejs dosyasını işledik. 
				kisaltilmis_url: "http://localhost:8000/l?uri="+ result.sifrelenmis_hali//uri degişkeni ile şifremizi tutuyoruz. dosya1.ejs kısmında text kısmındaki kisaltilmis_url kısmına '"http://localhost:8000/l?uri="+ result.sifrelenmis_hali' yazıldı .
			});																			// text kısmına eklerken localhost:8000 den sonra /l eklendiği için app.get("/l",(req, res) => { kısmına gidecek.
		});
	});

	app.get("/l",(req, res) => {														//text kısmına eklerken localhost:8000 den sonra /l eklendiği için bu kısma girmesini bekliyoruz. Şifrelenmiş url yi gerçek url ye yönlendirme yapmak için kullanıldı. Callback yapıldı.
		console.log(req.query);															//uri kısmındaki şifrelenen yer alındı.
		
		db.collection("urller").findOne({sifrelenmis_hali: req.query.uri})				//veri tabanındaki urller collection dan sifrelenmis_hali kısmı req.query.uri olan veriyi bulması istendi.
		.then(result => {																//Eğer bulunduysa
			console.log(result)															//Bulunan kayıt kısmı consol'a yazdırıldı.
			res.redirect(result.url_adi)												//Bulunan kayıt kısmındaki url_adi na yönlendirildi.
		})
	})
});

app.listen(8000,function(){																//app.listen()=> Verilen yoldaki bağlantıları dinler. 8000 portunu dinleniyor.
	console.log('Sunucu çalışıyor...');													//Eğer 8000 e giriş yapılırsa consol'a "Sunucu çalışıyor" yazıldı.
});
//https://kenanatmaca.com/node-js-ile-express-ejs-kullanimi/ ejs kurulumu bu arada nodemon kurulumu ve yararı yazılsın.