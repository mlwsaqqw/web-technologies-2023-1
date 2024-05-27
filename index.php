<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Галерея фотографий</title>
  <style>
    .gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 20px;
    }
    .gallery a {
      margin: 10px;
    }
    .gallery img {
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <?php
    function build_gallery($dir) {
      $handle = opendir($dir);
      $files = array();
      while ($file = readdir($handle)) {
        if (preg_match("/\.(jpg|png|gif)$/i", $file)) {
          $files[] = $file;
        }
      }
      closedir($handle);
      sort($files);
      echo "<div class='gallery'>";
      foreach ($files as $file) {
        list($width, $height) = getimagesize($dir . "/" . $file);
        $thumb_width = 200;
        $thumb_height = $height * $thumb_width / $width;
        echo "<a href='$dir/$file' target='_blank'>";
        echo "<img src='$dir/$file' width='$thumb_width' height='$thumb_height'>";
        echo "</a>";
      }
      echo "</div>";
    }

    function upload_image($dir) {
      if (isset($_FILES['image'])) {
        if (preg_match("/\.(jpg|png|gif)$/i", $_FILES['image']['name'])) {
          if ($_FILES['image']['size'] <= 5 * 1024 * 1024) {
            $name = $_FILES['image']['name'];
            $ext = pathinfo($name, PATHINFO_EXTENSION);
            $new_name = uniqid() . "." . $ext;
            move_uploaded_file($_FILES['image']['tmp_name'], $dir . "/" . $new_name);
            list($width, $height) = getimagesize($dir . "/" . $new_name);
            $thumb_width = 200;
            $thumb_height = $height * $thumb_width / $width;
            $thumb = imagecreatetruecolor($thumb_width, $thumb_height);
            switch ($ext) {
              case "jpg":
                $source = imagecreatefromjpeg($dir . "/" . $new_name);
                break;
              case "png":
                $source = imagecreatefrompng($dir . "/" . $new_name);
                break;
              case "gif":
                $source = imagecreatefromgif($dir . "/" . $new_name);
                break;
            }
            imagecopyresized($thumb, $source, 0, 0, 0, 0, 
                             $thumb_width, $thumb_height, 
                             $width, $height);
            switch ($ext) {
              case "jpg":
                imagejpeg($thumb, $dir . "/" . $new_name);
                break;
              case "png":
                imagepng($thumb, $dir . "/" . $new_name);
                break;
              case "gif":
                imagegif($thumb, $dir . "/" . $new_name);
                break;
            }
            imagedestroy($thumb);
            imagedestroy($source);
            return $new_name;
          } else {
            echo "<p>Файл слишком большой. Максимальный размер - 5 МБ.</p>";
          }
        } else {
          echo "<p>Файл не является изображением. Допустимые форматы - jpg, png, gif.</p>";
        }
      }
    }

    $dir = "images";
    if (!file_exists($dir)) {
      mkdir($dir);
    }
    $uploaded = upload_image($dir);
    if ($uploaded) {
      header("Location: " . $_SERVER['PHP_SELF']);
      exit();
    }
    echo "<form method='post' enctype='multipart/form-data'>";
    echo "<input type='file' name='image'>";
    echo "<input type='submit' value='Загрузить'>";
    echo "</form>";
    build_gallery($dir);
  ?>
</body>
</html>