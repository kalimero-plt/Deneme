var mongoose =require('mongoose');                      //mongoose modülünü mongoose değişkenine atıyoruz.

var Schema=mongoose.Schema;                             //mongoose.Schema metodu ile dökümanımıza kaydedeceğimiz satırların tiplerini ve özelliklerini belirtebiliyoruz.
                                                        //mongoose.Schema metodu ile Schema değişkeni oluşturuldu.
var urlSchema=new Schema({                              //Schema değişkeni ile urlSchema değişkeni oluşturuldu.
    url_adi:String,                                     //url_adi sadece String tipinde veri kabul ediyor.
    sifrelenmis_hali:String                             //sifrelenmis_hali sadece String tipinde veri kabul ediyor.
},{collection:'urller'});                               //Collection(Koleksiyon) ismi urller olarak ayarlandı.

var Kullanici=mongoose.model('Kullanici',urlSchema);    //Şema tanımımızı kullanmak için urlSchema yı modele dönüştürmemiz gerekiyor.
                                                        //Hazırladığımız şemayı(urlSchema) dökümana bağladık.

module.exports=Kullanici;                               //Oluşturduğumuz model(Kullanici) dışarıya alındı.