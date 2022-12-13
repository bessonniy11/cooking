<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $username = trim($request->data->username);
    $email = trim($request->data->email);
    $password = trim($request->data->password);
    $passwordConfirm = trim($request->data->passwordConfirm);

    // если какое-то поле пустое
    if (
        $username === '' ||
        $email === '' ||
        $password === '' ||
        $passwordConfirm === ''
    ) {
        $response = [
            'status'  => false,
            'message' => 'not all fields are filled in',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }

    // если пароли не совпадают
    if (
        $password !== $passwordConfirm
    ) {
        $response = [
            'status'  => false,
            'message' => 'password is not equal to password confirmation',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }

    $store_user = $db->prepare(
    "INSERT INTO `users` (`username`, `email`, `password`) VALUES (:username, :email, :password)"
    );

    $store_user->execute([
        "username" => $username,
        "email" => $email,
        "password"  => password_hash($password, PASSWORD_DEFAULT)
    ]);

    // $user = $store_user->fetchAll(PDO::FETCH_ASSOC);

    if ($store_user) {
        $response = [
            'status'  => true,
            'message' => 'user created',
            'result' => [
                'username' => $username,
                'email'    => $email,
                'store_user'    => $store_user,
            ]
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }
}
