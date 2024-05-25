<?php
function log_gallery_activity() {
    $log_directory = 'logs/';
    !is_dir($log_directory) && mkdir($log_directory);
    
    $log_file_path = $log_directory . 'log.txt';
    $log_entry = date('l, Y/m/d. H:i:s, e.') . PHP_EOL;
    
    count(file($log_file_path)) > 9 && rename($log_file_path, $log_directory . 'log' . (count(array_slice(scandir($log_directory), 2)) - 1) . '.txt');
    
    file_put_contents($log_file_path, $log_entry, FILE_APPEND);
}
log_gallery_activity();

$messages = [
    'ok' => "Файл загружен",
    'error' => "Ошибка"
];

if (!empty($_FILES)) {
    $check_result = validate_uploaded_file();
    $message_key = ($check_result === true ? (move_uploaded_file($_FILES['img_file']['tmp_name'], "img/big/" . $_FILES["img_file"]["name"]) ? 'ok' : 'error') : 'error');
    header("Location: index.php?status=$message_key");
    die();
}   

$message = !empty($_GET['status']) ? $messages[$_GET['status']] : '';

function display_gallery($path)
{
    !is_dir($path) && mkdir($path, 0777, true);

    foreach (glob($path . 'big/*.{jpg,jpeg,png,gif}', GLOB_BRACE) as $image) {
        $image_name = basename($image);
        $small_image = $path . 'small/' . $image_name;
        echo '<a target="_blank" href="' . $image . '"><img src="' . $small_image . '" alt="' . $image_name . '"></a>';
    }
}

function validate_uploaded_file() {
    $image_file = "img/big/" . basename($_FILES['img_file']['name']);
    $image_info = getimagesize($_FILES['img_file']['tmp_name']);

    return (file_exists($image_file) ? "Файл существует!" : ($_FILES['img_file']['size'] > 1024 * 1024 * 5 ? "Размер больше 5 МБ!" : ($image_info === false || $image_info['mime'] != 'image/jpeg' ? "Формат не поддерживается!" : true)));
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Галерея</title>
</head>
<body>
    <?=$message?>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="img_file" onchange="hideMessage()">
        <input type="submit" value="Загрузить">
    </form>
    <?php
        display_gallery('img/');
    ?>
<script>
    function hideMessage() {
        var messageElement = document.querySelector('.message');
        messageElement && (messageElement.innerText = '');
    }

	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				msg.data == 'reload' ? window.location.reload() : (msg.data == 'refreshcss' ? refreshCSS() : null);
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Обновите браузер');
	}
</script>
</body>
</html>
