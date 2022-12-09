<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $userId = trim($request->data->userId);

    $sth = $db->prepare(
        "SELECT dishes.dish_id, dishes.userId, dishes.dishName, dishes.dishDesc, json_arrayagg(img) images
        FROM `dishes`
        INNER JOIN `dish_images` ON dishes.dish_id = dish_images.dish_id
        WHERE `userId` = '$userId'
        GROUP BY dishes.dish_id, dishes.dishName"
    );

    $sth->execute([$userId]);
    $dishes = $sth->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        'status' => true,
        'message' => 'return user dishes',
        'message' => 'return user dishes',
        'result' => $dishes,
    ];

    echo json_encode(['data' => $response]);
    // print_r(json_decode(json_encode(['data' => $response])));

    return http_response_code(400);
}


