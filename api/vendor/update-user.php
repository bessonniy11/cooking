<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $id = trim($request->data->id);
    $username = trim($request->data->username);
    $email = trim($request->data->email);

    // если какое-то поле пустое
    if (
        $username === '' ||
        $email === ''
    ) {
        $response = [
            'status'  => false,
            'message' => 'not all fields are filled in',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }


    $updateUser = $db->prepare("UPDATE `users` SET `username` = '$username', `email` = '$email' WHERE `users`.`id` =  '$id'");

    $updateUser->execute([
        "id" => $id
    ]);

    $updateUser = $updateUser->fetch();

    $updateUserUsername = $updateUser['username'];
    $updateUserEmail = $updateUser['email'];


    $response = [
        'status'  => true,
        'message' => 'user data was successfully retrieved',
        'userData' => true,
        'newUser' => [
            'id'  => $id,
            'username'  => $username,
            'email'  => $updateUserEmail,
        ]
    ];
    echo json_encode(['data' => $response]);
    return http_response_code(400);
}
