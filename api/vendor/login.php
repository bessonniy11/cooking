<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $email = trim($request->data->email);
    $password = trim($request->data->password);

    // если какое-то поле пустое
    if (
        $email === '' ||
        $password === ''
    ) {
        $response = [
            'status'  => false,
            'message' => 'not all fields are filled in',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }


    $user = $db->prepare("SELECT * FROM `users` WHERE `email` = :email");

    $user->execute([
        "email" => $email
    ]);

    $user = $user->fetch();

    if (!$user) {
        $response = [
            'status'  => false,
            'email '  => $email,
            'message' => 'был введён неверный логин или пароль',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }

    if (password_verify($password, $user["password"]) === true) {
        $response = [
            'status'  => true,
            'userId'  => $user["userId"],
            'username'  => $user["username"],
            'email'  => $user["email"],
            'avatar'  => $user["avatar"],
            'viewsRoundAvatar'  => $user["viewsRoundAvatar"],
            'token'  => $user["password"],
            'message' => 'successful authorization',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    } else {
        $response = [
            'status'  => false,
            'email '  => $email,
            'message' => 'был введён неверный логин или пароль',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }
}
