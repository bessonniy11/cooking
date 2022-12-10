<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $userId = trim($request->data->userId);

    $user = $db->prepare("SELECT * FROM `users` WHERE `userId` = $userId");

    $user->execute([$userId]);

    $user = $user->fetch();

    $userId = $user['userId'];
    $username = $user['username'];
    $email = $user['email'];
    $avatar = $user['avatar'];
    $viewsRoundAvatar = $user['viewsRoundAvatar'];

    $response = [
        'status'  => true,
        'message' => 'user data was successfully retrieved',
        'userData' => true,
        'user' => [
            'userId'  => $userId,
            'username'  => $username,
            'email'  => $email,
            'avatar'  => $avatar,
            'viewsRoundAvatar'  => $viewsRoundAvatar,
        ]
    ];
    echo json_encode(['data' => $response]);
    return http_response_code(400);


}


