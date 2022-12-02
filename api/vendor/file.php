<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $avatar = $_FILES;

    $avatarName = $_FILES['file0']['type'];
    //$file = $_FILES['file0']['name'];
    //$img_type = $_FILES['name']['temp_name'];

    // вот это работает!!!
    $name = $_FILES['file0']['name'];
    $tmp_name = $_FILES['file0']['tmp_name'];

    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';

    $name = substr(str_shuffle($permitted_chars), 0, 16).'.jpg';

    move_uploaded_file($tmp_name, "../images/" . $name);

if (!empty($_FILES['name']['temp_name'])) $img = addslashes(file_get_contents($_FILES['name']['temp_name']));

    $db->query("INSERT INTO images (img) VALUES ('$img')");

    // if(move_uploaded_file($_FILES['name']['temp_name'], __DIR__.'images\\'._FILES['filename']['name']));

    $response = [
        'status'  => false,
        'message' => 'Попытка что-то сделать с файлом',
        'avatar' => $avatar,
        'avatarName' => $name,
        'file' => $file,
    ];
    echo json_encode(['data' => $response]);
    return http_response_code(400);
