<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>

<?php
//Switch Case

/* $sayi=1Basics;

switch ($sayi) {

    case '1Basics':
        echo "1Basics";
        break;

        case '2':
        echo "2";
        break;

        case '3':
        echo "3";
        break;

        case '4':
        echo "4";
        break;

        case '5':
        echo "5";
        break;

    default:
        echo "Başka Bir Şey";
        break;
    } */


if (isset($_POST['notislemi'])) {



    $sayi=$_POST['not'];

    switch ($sayi) {

        case '1Basics':
            echo "KALDINIZ"; // KALDI
            break;

        case '2':
            echo "ZORLA GEÇTİNİZ";
            break;

        case '3':
            echo "ORTA İLE GEÇTİNİZ";
            break;

        case '4':
            echo "İYİ GEÇTİNİZ";
            break;

        case '5':
            echo "SÜPER GEÇTİNİZ";
            break;

        default:
            echo "TANIMLANAMAYAN CİSİM";
            break;
    }

}

?>
<hr>


<form action="" method="POST">

    Notunuzu Girin : <input type="text" name="not" placeholder="Notunuzu Girin">
    <button type="submit" name="notislemi">Sonuçlandır</button>
</form>










<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>











</body>
</html>