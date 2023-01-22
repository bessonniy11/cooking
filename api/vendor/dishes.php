<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    $userId = trim($request->data->userId);

    if($userId == 'all') {
    $sth = $db->prepare(
        "SELECT
        dishes.dish_id,
        dishes.userId,
        dishes.dishVideo,
        dishes.dishName,
        dishes.dishDesc,
        dishes.dish_create_date,
        users.username,
        users.avatar,
        json_arrayagg(img) images
        FROM `dishes`
        INNER JOIN `dish_images` ON dishes.dish_id = dish_images.dish_id
        INNER JOIN `users` ON dishes.userId = users.userId
        GROUP BY dishes.dish_id, dishes.dishName
        ORDER BY dishes.dish_create_date DESC"
    );
    $sth->execute();

    } else {

    $sth = $db->prepare(
        "SELECT
        dishes.dish_id,
        dishes.userId,
        dishes.dishVideo,
        dishes.dishName,
        dishes.dishDesc,
        dishes.dish_create_date,
        json_arrayagg(img) images
        FROM `dishes`
        INNER JOIN `dish_images` ON dishes.dish_id = dish_images.dish_id
        WHERE `userId` = $userId
        GROUP BY dishes.dish_id, dishes.dishName
        ORDER BY dishes.dish_create_date DESC"
    );


   $sth->execute([$userId]);
   }

   $dishes = $sth->fetchAll(PDO::FETCH_ASSOC);


   foreach ($dishes as $key => $value) {

        $pics = $value["images"];
        $pics = substr($pics, 1, -1);
        $pics = str_replace('"', "",$pics);
        $pics = str_replace(', ', ",",$pics);
        $pics_arr = explode(',',$pics);
        $dishes[$key]["images"] = $pics_arr;
    }

   $response = [
      'status' => true,
      'message' => 'return user dishes',
      'result' => $dishes,
   ];
   //var_dump($response);
   echo json_encode(['data' => $response]);
    // print_r(json_decode(json_encode(['data' => $response])));

    return http_response_code(400);

}


