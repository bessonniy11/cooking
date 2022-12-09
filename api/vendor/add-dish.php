<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    $user_id = trim($request->data->userId);
    $dish_images = $request->data->dishImg;
    $dish_name = trim($request->data->dishName);
    $dish_description = trim($request->data->dishDesc);

    // если какое-то поле пустое
    if (
        $user_id === '' ||
        $dish_name === '' ||
        $dish_description === ''
    ) {
        $response = [
            'status'  => false,
            'message' => 'not all fields are filled in',
        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }

    $store_dish = $db->prepare("INSERT INTO `dishes` (`userId`,`dishName`,`dishDesc`) VALUES ('$user_id', '$dish_name', '$dish_description')");

    $store_dish->execute([
         "userId" => $userId,
    ]);

    $query =  $db->prepare("SELECT LAST_INSERT_ID() FROM `dishes`");
    $query ->execute([
             "dish_id" => $dish_id,
        ]);
    $results = $query->fetch();
    $cur_auto_id = $results[0];

    foreach ($dish_images as $key=>$val) {
        $images = $db->prepare("INSERT INTO `dish_images` (`dish_id`,`img`) VALUES ('$cur_auto_id', '$val')");
        $images->execute([
             "dish_id" => $cur_auto_id,
        ]);
    }


    if ($store_dish) {
        $response = [
            'status'  => true,
            'message' => 'dish created',
            'result' => [
                'user_id' => $user_id,
                'dish_images'    => $dish_images,
                'dish_name'    => $dish_name,
                'dish_description'    => $dish_description,
                'max_id'    => $cur_auto_id,
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
