<!doctype html>
<html>
<head>
    <title></title>
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
echo "eğitmen";echo " alptekin";
echo "<hr>";
echo "eğitmen"." alptekin"." ocakdan";
?>
<hr>
<?php
//Değişkenler
$ad="alptekin";
$soyad="ocakdan";
$egitimPlatform='udemy';
$no=500;
echo $ad.$no;
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
$ad="udemy"; //program akışında üstüne yazabiliyorsun.
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
$numara1=50;
$numara2=13;
echo $numara1+$numara2;
echo "<br>";
$topla=$numara2+$numara1;
echo $topla;
echo "<br>";
if ($topla>50){
    echo"elliden büyük";
}
echo "<br>";
echo "Toplama İşlemi";
echo "<br>";
echo "$numara1 + $numara2 = $topla";
echo "<hr>";

echo "Çıkarma İşlemi";
echo "<br>";
$cikar =$numara1-$numara2;
echo "$numara1 - $numara2 = $cikar";
echo "<br>";
echo "<hr>";

echo "Çarpma İşlemi";
echo "<br>";
$carp =$numara1*$numara2;
echo "$numara1 x $numara2 = $carp";
echo"<br>";
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
$atama=400;
echo "\$atama değişkeninin değeri : ".$atama;
echo "<hr>";

$atama+=500;
echo "\$atama değişkeninin değer : ".$atama;
echo "<hr>";


?>







</body>
</html>