<?php

require_once 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    $dishId = trim($request->data->dishId);


    $removeDish = $db->prepare("DELETE FROM `dishes` WHERE `dish_id` = $dishId");
    $removeDishImages = $db->prepare("DELETE FROM `dish_images` WHERE `dish_id` = $dishId");

    $removeDish->execute([]);
    $resultsRemoveDish = $removeDish->fetch();

    $removeDishImages->execute([]);
    $resultsRemoveDishImages = $removeDishImages->fetchAll();

    if ($removeDish) {
        $response = [
            'status'  => true,
            'message' => 'dish was removed',
            'result' => [
                'dishId' => $dishId,
                'removeDishImages' => $removeDishImages,
            ]

        ];
        echo json_encode(['data' => $response]);
        return http_response_code(400);
    }

}
