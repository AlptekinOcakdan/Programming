<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>

<?php
/*
if koşulu

== 			=> eşit ise
===			=> aynısı ise
<			=> küçük ise
>			=> büyük ise
<= 			=> küçük yada eşit ise
>=			=> büyük yada eşit ise

else ek parametreler

ifelse => sürekli tekrar eden sorgu
else => son kapanış koşulu

*/
$say=801;


if ($say==5) {

    echo "5";

} elseif ($say==6) {

    echo "6";

} elseif ($say==7) {

    echo "7";

} elseif ($say==8) {

    echo "8";

} else {

    echo "Başka bir şey";
}

echo "<br>";
echo "<hr>";

//Kısa if kullanımı

echo $say=='800' ? 'doğru' : 'yanlış';


echo "<br>";
$deger="Armut";

?>



<select>


    <option <?php echo $deger=='Armut' ? 'selected' : '' ?>>Armut</option>
    <option <?php echo $deger=='Elma' ? 'selected' : '' ?>>Elma</option>

</select>



<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>











</body>
</html>