<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    $userId = trim($request->data->userId);
    $dishImg = trim($request->data->dishImg);
    $dishName = trim($request->data->dishName);
    $dishDesc = trim($request->data->dishDesc);

    // если какое-то поле пустое
    if (
        $userId === '' ||
        $dishImg === '' ||
        $dishName === '' ||
        $dishDesc === ''
    ) {
        $response = [
            'status'  => false,
            'message' => 'not all fields are filled in',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }


    $store_dish = $db->prepare("INSERT INTO `dishes` (`userId`,`dishImg`,`dishName`,`dishDesc`) VALUES ('$userId', '$dishImg', '$dishName', '$dishDesc')");

    $store_dish->execute([
         "userId" => $userId,
         "dishImg" => $dishImg,
         "dishName" => $dishName,
         "dishDesc" => $dishDesc,
    ]);

    if ($store_dish) {
        $response = [
            'status'  => true,
            'message' => 'dish created',
            'result' => [
                'userId' => $userId,
                'dishImg'    => $dishImg,
                'dishName'    => $dishName,
                'dishDesc'    => $dishDesc,
            ]

        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }


    // if (trim($request->data->username) === 'hey') {
    //     $response = [
    //         'status'  => false,
    //         'username '  => $username,
    //         'email '  => $email,
    //         'password '  => $password,
    //         'passwordConfirm '  => $passwordConfirm,
    //         'message' => 'username failed',
    //     ];
    //     echo json_encode(['data' => $response]);
    //     return http_response_code(400);
    // }
}
