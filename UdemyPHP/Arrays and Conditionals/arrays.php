<!--
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>
-->
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>

<?php

date_default_timezone_set('Europe/Istanbul');
//Diziler

$dizi=array("emrah","yüksel",10,20,30,40);

//echo $dizi;

print_r($dizi);
echo "<br>";

echo $dizi[0]; echo "<br>";
echo $dizi[1]; echo "<br>";
echo $dizi[2]; echo "<br>";
echo $dizi[3]; echo "<br>";
echo $dizi[4]; echo "<br>";
echo $dizi[5]; echo "<br>";

echo "<br>";
echo "<pre>";
print_r($dizi);
echo "</pre>";
echo "<br>";

//Dizilerde sık kullanılan hazır fonksiyonalr

//sort => küçükten büyüğe doğru sıralar

$dizi=array(10,9,8,7,6,12,5,4,3,2,1);

echo "<pre>";
sort($dizi);
print_r($dizi);
echo "</pre>";


//rsort => büyükten küçüğe doğru sıralar

$dizi=array(10,9,15,101,8,7,6,12,5,4,3,2,1);

echo "<pre>";
rsort($dizi);
print_r($dizi);
echo "</pre>";


//rsort => büyükten küçüğe doğru alfabetik sıralama

$dizi=array("a","b","c","d");

echo "<pre>";
rsort($dizi);
print_r($dizi);
echo "</pre>";

echo "<hr>";
//in_array => dizi içerisinde aradığımız değerin olup olmadığını denetler. Varsa 1 değerini döndürür.


$dizi=array("a","b","c","d");

echo $sonuc=in_array("z",$dizi);

if ($sonuc) {

    echo "var";
} else {

    echo "yok";
}

echo "<br>";
//implode dizi değerlerini birleştirmeye yarar

$dizi=array("a","b","c","d");

$sonuc=implode(",",$dizi);

echo $sonuc;

//explode değişkeni parçalayarak dizi haline getirir.
echo "<br>";
$zaman="27-10-2017 19:08";

$sonuc=explode(" ",$zaman);

echo "<pre>";
print_r($sonuc);
echo "</pre>";

echo "<br>";

echo "Tarih : ".$sonuc[0]." Saat:.".$sonuc[1];


echo "<hr>";

//Date Time Zone Ayarları ve anlık zaman alma

echo $zaman=date("d-m-y h:i:s");

$sonuc=explode(" ",$zaman);

echo "<pre>";
print_r($sonuc);
echo "</pre>";

echo "<br>";

echo "Tarih : ".$sonuc[0]." Saat:.".$sonuc[1];


?>











<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
?>











</body>
</html>