<?php
//1
echo("<h4>Задание 1</h4>");
$a = -10;
$b = -2;

$result = ($a >= 0 && $b >= 0) ? $a - $b : (($a < 0 && $b < 0) ? $a * $b : $a + $b);
echo $result;

//2
echo("<h4>Задание 2</h4>");
$a = rand(0, 15);

echo "a = $a<br>"; 

switch ($a) {
    case 0:
        echo "0 ";
    case 1:
        echo "1 ";
    case 2:
        echo "2 ";
    case 3:
        echo "3 ";
    case 4:
        echo "4 ";
    case 5:
        echo "5 ";
    case 6:
        echo "6 ";
    case 7:
        echo "7 ";
    case 8:
        echo "8 ";
    case 9:
        echo "9 ";
    case 10:
        echo "10 ";
    case 11:
        echo "11 ";
    case 12:
        echo "12 ";
    case 13:
        echo "13 ";
    case 14:
        echo "14 ";
    case 15:
        echo "15 ";
        break;
}


//3
echo("<h4>Задание 3</h4>");
$a = 10;
$b = 5;

function addition($a, $b) {
    return $a + $b;
}

function subtraction($a, $b) {
    return $a - $b;
}

function multiplication($a, $b) {
    return $a * $b;
}

function division($a, $b) {
    if ($b != 0) {
        return $a / $b;
    } else return "Деление на ноль!";
}

echo "Сумма: " . addition($a, $b) . "<br>";
echo "Разность: " . subtraction($a, $b) . "<br>";
echo "Произведение: " . multiplication($a, $b) . "<br>";
echo "Частное: " . division($a, $b) . "<br>";


//4
echo("<h4>Задание 4</h4>");
function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case 'addition':
            return addition($arg1, $arg2);
        case 'subtraction':
            return subtraction($arg1, $arg2);
        case 'multiplication':
            return multiplication($arg1, $arg2);
        case 'division':
            return division($arg1, $arg2);
    }
}
echo "Сумма: " . mathOperation($a, $b, 'addition') . "<br>";
echo "Разность: " . mathOperation($a, $b, 'subtraction') . "<br>";
echo "Произведение: " . mathOperation($a, $b, 'multiplication') . "<br>";
echo "Частное: " . mathOperation($a, $b, 'division') . "<br>";


//6
echo("<h4>Задание 6</h4>");
function power($val, $pow) {
    if ($pow === 0) {
        return 1;
    }
    elseif ($pow > 0) {
        return $val * power($val, $pow - 1);
    }
	elseif ($pow == 1) {
        return $val;
    }
    else {
        return 1 / power($val, -$pow);
    }
}
echo power(2, 3); 
echo("<br>");
echo power(5, -2);
echo("<br>");
echo power(9, 0);
echo("<br>");
echo power(3, 1); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Текущий год: <?php echo date('Y'); ?></p>
</body>
</html>