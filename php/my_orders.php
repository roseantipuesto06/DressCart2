
<?php

require_once "db.php";

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "POST method required."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$firebase_uid = trim($data["firebase_uid"] ?? "");

if ($firebase_uid === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Customer ID is required."
    ]);
    exit;
}

// FIND CUSTOMER ORDERS

$orderQuery = $conn->prepare(
    "SELECT o.*
     FROM orders o
     INNER JOIN customers c
     ON o.customer_id = c.customer_id
     WHERE c.firebase_uid = ?
     ORDER BY o.created_at DESC"
);

$orderQuery->bind_param("s", $firebase_uid);
$orderQuery->execute();

$orderResult = $orderQuery->get_result();

$orders = [];

while ($row = $orderResult->fetch_assoc()) {

    $order_id = (int)$row["order_id"];

    // GET ITEMS FOR THIS ORDER

    $itemQuery = $conn->prepare(
        "SELECT *
         FROM order_items
         WHERE order_id = ?"
    );

    $itemQuery->bind_param("i", $order_id);
    $itemQuery->execute();

    $itemResult = $itemQuery->get_result();

    $items = [];

    while ($item = $itemResult->fetch_assoc()) {

        $items[] = [
            "id" => (int)$item["product_id"],
            "name" => $item["product_name"],
            "size" => $item["size"],
            "color" => $item["color"],
            "quantity" => (int)$item["quantity"],
            "price" => (float)$item["unit_price"]
        ];

    }

    $orders[] = [
        "orderId" => $row["order_code"],
        "date" => date("m/d/Y, h:i A", strtotime($row["created_at"])),
        "createdAt" => $row["created_at"],

        "customer" => [
            "name" => $row["customer_name"],
            "email" => $row["customer_email"],
            "phone" => $row["customer_phone"],
            "address" => $row["delivery_address"],
            "notes" => ""
        ],

        "items" => $items,

        "subtotal" => (float)$row["subtotal"],
        "shipping" => (float)$row["shipping_fee"],
        "total" => (float)$row["total"],

        "paymentMethod" => $row["payment_method"],
        "status" => $row["status"]
    ];

}

echo json_encode([
    "success" => true,
    "orders" => $orders
]);

$conn->close();

?>
