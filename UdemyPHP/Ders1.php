<!doctype html>
<html>
<head>
    <title></title>
    <meta charset="UTF-8">
</head>
<body>
<!-- PHP -->
<?php
//echo komutu
echo "alptekin ocakdan";
?>
<hr>
<?php
//print komutu
print "alptekin ocakdan";
?>
<?php
// bu bir yorum satırıdır
#bu bir yorum satırıdır
/*bu bir yorum satırıdır
bu bir yorum satırıdır
 */

?>
<hr>
<?php
//hatalara genel bakış

echo "eğitmen alptekin";

?>
<hr>
<?php
//birleştirme operatörü
echo "eğitmen";
echo " alptekin";
echo "<hr>";
echo "eğitmen" . " alptekin" . " ocakdan";
?>
<hr>
<?php
//Değişkenler
$ad = "alptekin";
$soyad = "ocakdan";
$egitimPlatform = 'udemy';
$no = 500;
echo $ad . $no;
/*
-Değişkenler $ işareti ile başlar
-değişkene değer ataması yapılırken = işareti kullanılır
-Değişkene metinsel ifadeler aktarılırken "" veya ' ' kullanılabilir
-Değişkene integer sayırsal değer akaktarılırken direkt olarak yazabiliriz.
-Değişkenlerde ufak büyük harf ayrımı vardır.
-Değişkenler rakam ile başlamaz. Özel karakterler de buna da dahil
-Değişkenlerde boşluk bırakılmaz.
-Değişkenlerde alt çizgi kullanılabilir.
-Değişkenlerde Türkçe karakter kullanılmaz.
*/
echo "<hr>";
$ad = "udemy"; //program akışında üstüne yazabiliyorsun.
echo $ad;


?>
<hr>
<?php
/*matematiksel işlemler
+ toplama
-çıkarma
/bölme
*çarpma

*/
$numara1 = 50;
$numara2 = 13;
echo $numara1 + $numara2;
echo "<br>";
$topla = $numara2 + $numara1;
echo $topla;
echo "<br>";
if ($topla > 50) {
    echo "elliden büyük";
}
echo "<br>";
echo "Toplama İşlemi";
echo "<br>";
echo "$numara1 + $numara2 = $topla";
echo "<hr>";

echo "Çıkarma İşlemi";
echo "<br>";
$cikar = $numara1 - $numara2;
echo "$numara1 - $numara2 = $cikar";
echo "<br>";
echo "<hr>";

echo "Çarpma İşlemi";
echo "<br>";
$carp = $numara1 * $numara2;
echo "$numara1 x $numara2 = $carp";
echo "<br>";
echo "<hr>";

echo "Bölme İşlemi";
echo "<br>";
$bol = $numara1 / $numara2;
echo "$numara1 / $numara2 = $bol";
echo "<br>";
echo "<hr>";
?>
<?php
/*
Atama İşlemleri
*/
$atama = 400;
echo "\$atama değişkeninin değeri : " . $atama;
echo "<hr>";

$atama += 500;
echo "\$atama değişkeninin değer : " . $atama;
echo "<hr>";


?>
<?php
/*
Artırma ve eksiltme işlemleri

*/
$atama++;
echo "\$atama değişkenin değeri : " . $atama;
echo "<hr>";

$atama--;
echo "\$atama değişkenin değeri : " . $atama;
echo "<hr>";


for ($atama; $atama < 905; $atama++) {
    echo $atama;
    echo "<br>";
}
echo "<hr>";
//Hazır fonksiyonlara bakış
// rand belirlenen aralıkta sayı üretir.
echo $sayi = rand(0, 10);
echo "<br>";
if ($sayi >= 5) {
    echo "kazandın";
} else {
    echo "kaybettin dostum";
}
echo "<hr>";
/*
"Çift tırnak ve ' tek tırnak arasında ki farklar.

-çift tırnak içerisinde değişken içerikleri okunabilir, tek tırnak içerisinde değişken içerikler okunmaz...


 */
$ad = "Alptekin";
$soyad = "Ocakdan";
echo "Benim adım $ad";
echo "<br>";
echo 'Benim adım $ad';
echo "<hr>";


/*
Yok sayma işaretleri
 */
echo "Ben Udemy Kursuna kayıt oldum";
echo "<br>";
echo 'Ben "Udemy" Kursuna kayıt oldum';
echo "<br>";
echo "Ben $ad \"Udemy\" Kursuna kayıt oldum";
echo "<br>";
echo "Ben \$ad \"Udemy\" Kursuna kayıt oldum";
echo "<hr>";
//Hazır string fonksiyonlar

//strtolower => büyük metni ufak metne çevirir.


echo $yazi = "BEN UDEMY ILERI SEVIYE PHP KURSUNA KAYITLIYIM";
echo "<br>";
echo $yazi = strtolower($yazi);
echo "<br>";
//strtoupper => küçük metni bütük metne çevirir.
echo $yazi;
echo "<br>";
echo $yazi = strtoupper($yazi);
echo "<br>";
//ucwords => küçük metnin ilk harflerini büyük metne çevirir.
echo $yazi = strtolower($yazi); //yazıyı küçültmek için
echo "<br>";
echo $yazi;
echo "<br>";
echo $yazi = ucwords($yazi);
//ucfirst => Metnin ilk harfini büyük yazar.
echo "<br>";
echo $yazi = strtolower($yazi); //yazıyı küçültmek için
echo "<br>";
echo $yazi = ucfirst($yazi);
//strlen => metnin karakter sayısını verir.
echo "<br>";
echo $yazi = strtolower($yazi); //yazıyı küçültmek için
echo "<br>";
echo "\$yazi içerdiği karakter sayısı : " . strlen($yazi);
//substr => Metnin belirtilen karakter sayıda kısmını alır.
echo "<br>";
echo $yazi = substr($yazi, 0, 10);
echo "<br>";
echo "<hr>";
//Devamını oku
$haber="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur cum laboriosam voluptatum? Assumenda, 
distinctio dolor doloribus in, inventore molestiae nesciunt omnis pariatur porro quam reiciendis tempore vitae voluptate voluptatum
.lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut consequatur, cumque, deleniti eos eveniet expedita fugit i
ste iusto nulla obcaecati porro quisquam quod, rerum sapiente sint tempora vero voluptate.";
echo "<h1>HABER BAŞLIĞI</h1>";
echo "<p>".substr($haber,0,247)."...</p>";
echo "<a href=\"#\"> Devamını Oku</a>"

?>


</body>
</html>