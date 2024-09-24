// Card html'ini ve ürün bilgilerini parametre olarak alıcak
// Card html'inin içerisnde değişken olarak tanımlanan değerlerin yerine ürünü bilgilerini ekleyecek bir fonksiyon yazalım

const replaceTemplate = (html, data) => {
    // html şablonundaki değişkenlerin yerine data nesnesindeki verileri ekliyoruz
    let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);
  
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/%QUANTITY%/g, data.quantity);
    output = output.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%FROM%}/g, data.from);
  
    // eğer ürün organik değilse {notorganic} değişkeni yerine not-organic class'ı ekle
    if (data.organic === false) {
      output = output.replace("{%NOT_ORGANIC%}", "not-organic");
    }
  
    // oluşturudğumuz yeni - güncellenmil card html'ini döndür
    return output;
  };
  
  // replaceTemaplate isim,indeki fonksiyonu farklı dosyalarda kullanma niyetimiz varsa export etmemiz gerekli
  module.exports = replaceTemplate;