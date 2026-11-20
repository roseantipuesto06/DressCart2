
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
    echo json_encode(["success" => false, "message" => "Invalid order data."]);
    exit;
}

// CUSTOMER INFORMATION
$firebase_uid = trim($data["firebase_uid"] ?? "");
$customer_name = trim($data["customer_name"] ?? "");
$customer_email = trim($data["customer_email"] ?? "");
$customer_phone = trim($data["customer_phone"] ?? "");
$delivery_address = trim($data["delivery_address"] ?? "");

// ORDER INFORMATION
$subtotal = (float)($data["subtotal"] ?? 0);
$shipping_fee = (float)($data["shipping_fee"] ?? 0);
$total = (float)($data["total"] ?? 0);
$payment_method = trim($data["payment_method"] ?? "");
$items = $data["items"] ?? [];

$allowedPayments = [
    "Cash on Delivery",
    "GCash",
    "Card"
];

if (
    $firebase_uid === "" ||
    $customer_name === "" ||
    $customer_email === "" ||
    $customer_phone === "" ||
    $delivery_address === "" ||
    !in_array($payment_method, $allowedPayments, true) ||
    !is_array($items) ||
    count($items) === 0
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please provide complete order information."
    ]);
    exit;
}

// FIND CUSTOMER
$customerQuery = $conn->prepare(
    "SELECT customer_id FROM customers WHERE firebase_uid = ?"
);

$customerQuery->bind_param("s", $firebase_uid);
$customerQuery->execute();

$customerResult = $customerQuery->get_result();
$customer = $customerResult->fetch_assoc();

if (!$customer) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Customer account not found."
    ]);
    exit;
}

$customer_id = (int)$customer["customer_id"];

try {

    $conn->begin_transaction();

    // CREATE ORDER
    $order_code = "DC-" . date("YmdHis") . "-" . random_int(100, 999);
    $status = "Pending";

    $orderQuery = $conn->prepare(
        "INSERT INTO orders
        (
            customer_id,
            order_code,
            customer_name,
            customer_email,
            customer_phone,
            delivery_address,
            subtotal,
            shipping_fee,
            total,
            payment_method,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $orderQuery->bind_param(
        "isssssdddss",
        $customer_id,
        $order_code,
        $customer_name,
        $customer_email,
        $customer_phone,
        $delivery_address,
        $subtotal,
        $shipping_fee,
        $total,
        $payment_method,
        $status
    );

    $orderQuery->execute();

    $order_id = $conn->insert_id;

    // SAVE ORDER ITEMS
    $itemQuery = $conn->prepare(
        "INSERT INTO order_items
        (
            order_id,
            product_id,
            product_name,
            size,
            color,
            quantity,
            unit_price,
            item_total
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );

    foreach ($items as $item) {

        $product_id = (int)($item["id"] ?? 0);
        $product_name = trim($item["name"] ?? "");
        $size = trim($item["size"] ?? "");
        $color = trim($item["color"] ?? "");
        $quantity = (int)($item["quantity"] ?? 0);
        $unit_price = (float)($item["price"] ?? 0);
        $item_total = $unit_price * $quantity;

        if (
            $product_id <= 0 ||
            $product_name === "" ||
            $size === "" ||
            $color === "" ||
            $quantity <= 0
        ) {
            throw new Exception("Invalid order item.");
        }

        $itemQuery->bind_param(
            "iisssidd",
            $order_id,
            $product_id,
            $product_name,
            $size,
            $color,
            $quantity,
            $unit_price,
            $item_total
        );

        $itemQuery->execute();
    }

    // SAVE PAYMENT RECORD
    $payment_status = "Pending";

    $paymentQuery = $conn->prepare(
        "INSERT INTO payments
        (order_id, payment_method, amount, payment_status)
        VALUES (?, ?, ?, ?)"
    );

    $paymentQuery->bind_param(
        "isds",
        $order_id,
        $payment_method,
        $total,
        $payment_status
    );

    $paymentQuery->execute();

    // SAVE INITIAL ORDER STATUS
    $notes = "Order placed by customer.";

    $historyQuery = $conn->prepare(
        "INSERT INTO order_status_history
        (order_id, status, notes)
        VALUES (?, ?, ?)"
    );

    $historyQuery->bind_param(
        "iss",
        $order_id,
        $status,
        $notes
    );

    $historyQuery->execute();

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Order saved successfully!",
        "order_id" => $order_code
    ]);

} catch (Throwable $error) {

    $conn->rollback();

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Order could not be saved.",
        "error" => $error->getMessage()
    ]);

}

$conn->close();

?>
