
<?php

require_once "db.php";

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "POST method required."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid data."]);
    exit;
}

$firebase_uid = trim($data["firebase_uid"] ?? "");
$full_name = trim($data["full_name"] ?? "");
$email = trim($data["email"] ?? "");
$auth_provider = trim($data["auth_provider"] ?? "password");

if ($firebase_uid === "" || $email === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Customer ID and email are required."]);
    exit;
}

// Check if this Firebase customer already exists
$check = $conn->prepare(
    "SELECT customer_id FROM customers WHERE firebase_uid = ?"
);

$check->bind_param("s", $firebase_uid);
$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {

    // Update existing customer
    $update = $conn->prepare(
        "UPDATE customers
         SET full_name = ?, email = ?, auth_provider = ?
         WHERE firebase_uid = ?"
    );

    $update->bind_param(
        "ssss",
        $full_name,
        $email,
        $auth_provider,
        $firebase_uid
    );

    $success = $update->execute();

} else {

    // Add new customer
    $insert = $conn->prepare(
        "INSERT INTO customers
         (firebase_uid, full_name, email, auth_provider)
         VALUES (?, ?, ?, ?)"
    );

    $insert->bind_param(
        "ssss",
        $firebase_uid,
        $full_name,
        $email,
        $auth_provider
    );

    $success = $insert->execute();
}

if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Customer saved successfully."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not save customer."
    ]);
}

$conn->close();

?>
