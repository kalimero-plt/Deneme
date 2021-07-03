var express=require('express');                                             //express modülünü express değişkenine atıyoruz. express değişkeni ile express modülünün tüm içeriğine erişebiliriz.
var bodyParser=require('body-parser');                                      //body-parser: Kullanıcı tarafından ilgili datayı bize gönderme görevini icra etmekle görevli bir modüldür. Body-parser modülünü bodyParser değişkenine atıyoruz.
var app=express();                                                          //Express modülü kullanılarak app değişkeni oluşturuldu.
const mongoose=require("mongoose");                                         //Veritabanına bağlanmak için mongoose modülünü mongoose değişkenine atıyoruz.
const ObjectId = require("mongodb").ObjectId;                               //Yeni bir ObjectId oluşturmak için mongodb modülünün ObjectId özelliği kullanılarak ObjectId değişkeni oluşturuldu.
var router=express.Router();                                                //express.Router(): Yönlendirici düzeyinde ara katman yazılımı, bir uygulama örneğine bağlı olması dışında uygulama düzeyinde ara katman yazılımı ile aynı şekilde çalışır. Bu yazılımdan router adlı değişken oluşturuldu. 
var Kullanici=require('./sema_bilgileri');                                  // Veritabaındaki bilgilerin kaydedileceği şemanın olduğu dosyadan Kullanici değişkeni oluşturuldu.
                                                                            
                                                                            //POST işlemini çözümlemek için gerekli bir ayrıştırıcı
app.use(bodyParser.urlencoded({extended: false}));                          // app.use(): Belirli katman işlevini veya belirtilen yolda işlevleri monte eder. Bu satırı routerdan önce yazmamız gerekiyor. Yoksa alınan verinin tipini tanımsız(undefined) alıyor.
app.use('/',router);                                                        // '/' kısmına router ile gideceğimizi söylüyoruz.
app.use('/ceviri',router);                                                  // '/ceviri' kısmına router ile gideceğimizi söylüyoruz. 

mongoose.connect("mongodb://localhost/veri_tabani",function(err,db){                                                //Mongoose ile veritabanına bağlantı kurmak için kullandık. Callback yapıldı.
                                                                                                                    //Callback: Bir geri çağırma fonksiyonu, başka bir fonksiyona geçirilen bir parametre şeklindeki fonksiyondur. Asenkron olarak çalışırlar. Yani aynı anda başka bir fonksiyonda çalıştırabilir, engellemez. function(err,db) callback'tir.
		if (err) throw err;                                                                                         //Eğer hata varsa hatayı fırlatması istendi.
    
        router.post('/',function(req,res){                                                                          //router.post(): Post yöntemiyle yönlendirme yapmayı sağlar. Mobil uygulamadan 192.168.1.12/localhost:8005/ şeklinde url yazılınca buraya girer. Burada amacımız uygulamadan girilen türkçe bilgiyi veritabanına kaydetmektir.
            var data = req.body;                                                                                    //Gönderilen veri data değişkenine atıldı. Gönderilen veriyi req.body şeklinde almış oluyoruz.
            var türkce=data.türkce_hali;                                                                            //data değişkeninin türkce_hali'ni türkce değişkenine atıyoruz.
            var yeni_url=new Kullanici({                                                                            //URL den verileri eklemek için yeni_url oluşturuldu.
			    türkce_hali:türkce,                                                                                 //Veritabanındaki türkce_hali kısmına değişkenimiz olan türkce eklendi.
			    ingilizce_hali:''                                                                                   //Veritabanındaki bu kısma(ingilizce_hali) şimdilik birşey eklenmedi. Sonradan güncellenecek.
            });
		    yeni_url.save(function(err){                                                                            //Yerleştirilen verileri kaydetme işlemi yapıldı.
			    if(err){                                                                                            //Eğer hata varsa
				    console.log(err);                                                                               //Hata consol'a yazdırıldı. 
			    }else{                                                                                              //Eğer hata yoksa 
				    console.log('Veriler kaydedildi.');                                                             //Consol'a "Url kaydedildi." yazıldı.
			    }
            });
            res.end();                                                                                              //Yanıt süreci sonlandırıldı.
        });

        router.get('/ceviri',function(req,res){                                                                     //router.get(): Get yöntemiyle yönlendirme yapmayı sağlar. Mobil uygulamadan 192.168.1.12/localhost:8005/ceviri şeklinde url yazılınca buraya girer. Burada amacımız veritabanındaki verilerin hepsini uygulamaya göndermektir.
                if(err) throw err;                                                                                  //Eğer hata varsa hatayı fırlatması istendi.
                db.collection("veriler").find({}).toArray(function(err,result){                                     //Veritabanındaki veriler collection'undan bütün verileri bulup dizi halinde göndermesi istendi. Callback yapıldı.
                    if(err) throw err;                                                                              //Eğer hata varsa hatayı fırlatması istendi.
                    res.send(result);                                                                               //res.send(): HTTP yanıtını gönderir. Yanıt olarak elde edilen veriler(result) gönderildi.
                });
        });

        router.post('/ceviri',function(req,res){                                                                    //Mobil uygulamadan 192.168.1.12/localhost:8005/ceviri şeklinde url yazılınca buraya girer. Burada amacımız uygulamadan gelen verinin id kısmını karşılaştırıp veritabanındaki ingilizce_hali kısmını güncellemektir.
            var data = req.body;                                                                                    //Gönderilen veri data değişkenine atıldı. Gönderilen veriyi req.body şeklinde almış oluyoruz.
            var ingilizce = data.ingilizce_hali;                                                                    //Data değişkeninin ingilizce_hali'ni ingilizce değişkenine atıyoruz. Bu değişken veritabanındaki ingilizce_hali kısmını güncelleyeceğimiz kısım olacak.
            Kullanici.updateOne({_id: new ObjectId(req.body._id)},{ ingilizce_hali: ingilizce }, (error, data) => { //Kullanici değişkeninin updateOne özelliği ile id leri karşılaştırıp veritabanındaki ingilizce hali güncellendi. Callback yapıldı.
                                                                                                                    //new ObjectId(req.body._id): Yeni bir ObjectId oluşturuldu.
                if (error) {                                                                                        //Eğer hata varsa
                    console.log(error);                                                                             //Hata consol'a yazdırıldı.
                }
                else {                                                                                              //Eğer hata yoksa
                    console.log(data);                                                                              //Güncellenen kayıt ekrana yazdırıldı.
                    res.json(data);                                                                                 //res.json(): Bir JSON yanıtı gönderir. Güncelleme yapılan kayıt ekrana yazdırıldı.
                }
            });
        });
});

app.listen(8005,function(){                                                                                          //app.listen(): Verilen yoldaki bağlantıları dinler. 8000 portunu dinleniyor.
	console.log('Sunucu çalışıyor...');                                                                              //Eğer 8000 e giriş yapılırsa consol'a "Sunucu çalışıyor" yazıldı.
});