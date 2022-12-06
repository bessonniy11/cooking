<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $userId = trim($request->data->userId);

    $dishes = $db->prepare("SELECT * FROM `dishes` WHERE `userId` = '$userId'");

    $dishes->execute([
        "userId" => $userId
    ]);

    $dishes = $dishes->fetch();

    $userId = $dishes['userId'];
    $dishImg = $dishes['dishImg'];
    $dishName = $dishes['dishName'];
    $dishDesc = $dishes['dishDesc'];


    $response = [
        'status'  => true,
        'message' => 'return user dishes',
        'dishes' => [
            'userId'  => $userId,
            'dishImg'  => $dishImg,
            'dishName'  => $dishName,
            'dishDesc'  => $dishDesc,
        ]
    ];
    echo json_encode(['data' => $response]);
    return http_response_code(400);


}


