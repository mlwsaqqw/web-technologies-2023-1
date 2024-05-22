<?php
date_default_timezone_set('Asia/Yekaterinburg');
$h1 = 'Первая страничка на PHP';
$title = 'PHP';
$year = date("Y");
function getCurrentTime(): string
{
    $hour = intval(date('H'));
    $minutes = intval(date('i'));

    if (($hour >= 5 && $hour <= 20) || $hour == 0) {
        $hourText = ' часов ';
    } elseif (($hour >= 2 && $hour <= 4) || ($hour >= 22 && $hour <= 24)) {
        $hourText = ' часа ';
    } else {
        $hourText = ' час ';
    }

    if ($minutes > 20 || $minutes < 10) {
        if ($minutes % 10 == 1)
            $minutesText = ' минута';
        else if ($minutes % 10 == 2 || $minutes % 10 == 3 || $minutes % 10 == 4)
            $minutesText = ' минуты';
        else $minutesText = ' минут';
    } else $minutesText = ' минут';

    return $hour . $hourText . $minutes . $minutesText;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php echo $title ?></title>
</head>
<body>
<h1><?php echo $h1 ?></h1>
<p><?php echo $year ?></p>
<p>Текущее время: <?php echo getCurrentTime() ?></p>
</body>
</html>