<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>

<?php
//Formdan girilen sayının tek yada çift olduğunu bulma



if (isset($_POST['notislemi'])) {


    echo "Sayı : ".$not=$_POST['not']; echo " - ";

    if ($not%2) {

        echo "Bu sayı tektir.";
    } else {

        echo "Bu sayı çifttir";
    }


}

?>
<hr>


<form action="" method="POST">

    Sayı Girin : <input type="text" name="not" placeholder="Sayı Girin">
    <button type="submit" name="notislemi">Sonuçlandır</button>
</form>










<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>











</body>
</html>