
<?php

require_once "db.php";

header("Content-Type: application/json; charset=UTF-8");

$sql = "
    SELECT
        p.product_id,
        p.product_name,
        p.description,
        p.price,
        p.image_url,
        p.tag,
        p.stock,
        c.category_name,
        v.size,
        v.color
    FROM products p
    LEFT JOIN categories c
        ON p.category_id = c.category_id
    LEFT JOIN product_variants v
        ON p.product_id = v.product_id
    WHERE p.is_active = 1
    ORDER BY p.product_id
";

$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {

    $id = $row["product_id"];

    if (!isset($products[$id])) {
        $products[$id] = [
            "id" => (int)$id,
            "name" => $row["product_name"],
            "category" => $row["category_name"],
            "price" => (float)$row["price"],
            "tag" => $row["tag"],
            "image" => $row["image_url"],
            "description" => $row["description"],
            "stock" => (int)$row["stock"],
            "sizes" => [],
            "colors" => []
        ];
    }

    if (!empty($row["size"]) &&
        !in_array($row["size"], $products[$id]["sizes"])) {
        $products[$id]["sizes"][] = $row["size"];
    }

    if (!empty($row["color"]) &&
        !in_array($row["color"], $products[$id]["colors"])) {
        $products[$id]["colors"][] = $row["color"];
    }
}

echo json_encode(array_values($products), JSON_PRETTY_PRINT);

$conn->close();

?>
