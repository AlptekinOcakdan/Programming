<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>

<?php
// POST ve GET methodları

/*
echo $_POST['ad'];
echo "<br>";
echo $_POST['soyad'];
*/

echo $_GET['ad'];
echo "<br>";
echo $_GET['soyad'];
$kullanici_id=151;
?>

<form action="islem.php" method="GET">

    Ad <input type="text" name="ad" placeholder="Adınızı Girin">
    SoyAd <input type="text" name="soyad" placeholder="SoyAdınızı Girin">

    <input type="submit" value="Formu gönder" name="">


</form>



<a href="islem.php?kullanici_id=<?php echo $kullanici_id ?>"><button>Kullanıcıyı Sil</button></a>


<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>











</body>
</html>