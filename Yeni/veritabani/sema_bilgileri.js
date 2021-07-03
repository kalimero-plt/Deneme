var mongoose =require('mongoose');                      //mongoose modülünü mongoose değişkenine atıyoruz.

var Schema=mongoose.Schema;                             //mongoose.Schema metodu ile dökümanımıza kaydedeceğimiz satırların tiplerini ve özelliklerini belirtebiliyoruz.
                                                        //mongoose.Schema metodu ile Schema değişkeni oluşturuldu.
var veriSchema=new Schema({                             //Schema değişkeni ile veriSchema değişkeni oluşturuldu.
    türkce_hali:String,                                 //türkce_hali sadece String tipinde veri kabul ediyor.
    ingilizce_hali:String                               //ingilizce_hali sadece String tipinde veri kabul ediyor.
},{collection:'veriler'});                              //Collection ismini veriler olarak ayarlandı.

var Kullanici=mongoose.model('Kullanici',veriSchema);   //Hazırladığımız şemayı(veriSchema) dökümana bağladık.

module.exports=Kullanici;                               //Oluşturduğumuz model(Kullanici) dışarıya alındı.