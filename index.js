// API: Gelen istekleri izler ve isteklere cevap gönderir.

// gerekli modülleri çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");

// kendi oluşturduğumuz fonksiyonu import et
const replaceTemplate = require("./modules/replaceTemplate");

/*
 * createServer(), veridğimiz dinleyici fonksiyonu api'a her istek geldiğinde tetikler.
 * Bu fonksiyon 2 parametre alır
 * 1) request > istek ile alakalı verileri içeren nesne
 * 2) response > cevap göndermemizi sağlayacak nesne
  
 * Bu fonksiyon içerisinde gelen isteğe göre cevap gönderilir.
 */

/*
 * Routing
 * API'a gelen isteğin hangi endpoint (uç nokta / yol)'e geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir
 * Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
 */

// html şablon verilerine eriş
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// json dosyasındaki verilere eriş
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

// json verisini js formatına çevir
const data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
  console.log("🥳🥳 API'a istek Geldi 🎉🎉");

  // istek url'ini parçalara ayırdık
  const { query, pathname } = url.parse(request.url, true);

  // gelen isteğin url'ine göre farklı cevap gönder
  switch (pathname) {
    case "/overview":
      // meyveler dizisindeki eleman sayısı kadar kart oluştur
      const cards = data.map((el) => replaceTemplate(tempCard, el));

      // anasayfa html'indeki kartlar alanına kart html kodlarını ekle
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);

      return response.end(tempOverview);

    case "/product":
      // 1) dizideki doğru elemanı bul
      const item = data.find((item) => item.id == query.id);

      // 2) detay sayfasının html'ini bulunan elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct, item);

      // 3) güncel html'i client'a gönder
      return response.end(output);

    default:
      return response.end("<h1>Tanimlanmayan Yol </h1>");
  }
});

// Bir dinleyeci oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz
server.listen(3535, "127.0.0.1", () => {
  console.log(
    "🎾 IP adresinin 3535 portuna gelen istekler dinlemeye alındı"
  );
});