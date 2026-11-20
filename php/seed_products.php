
<?php

require_once "db.php";

header("Content-Type: text/plain; charset=UTF-8");

$categories = ["Summer", "Casual", "Formal", "Party", "Elegant"];

foreach ($categories as $category) {
    $stmt = $conn->prepare(
        "INSERT INTO categories (category_name)
         SELECT ? WHERE NOT EXISTS (
             SELECT 1 FROM categories WHERE category_name = ?
         )"
    );

    $stmt->bind_param("ss", $category, $category);
    $stmt->execute();
    $stmt->close();
}

$products = [
    ["Floral Summer Midi Dress", "Summer", "A beautiful floral midi dress perfect for sunny days.", 399, "BESTSELLER", 20, "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", ["XS","S","M","L","XL"], ["Pink","White","Blue"]],
    ["Elegant Satin Evening Dress", "Elegant", "An elegant satin dress for special occasions.", 599, "POPULAR", 15, "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600", ["S","M","L","XL"], ["Black","Champagne","Pink"]],
    ["Classic Casual Mini Dress", "Casual", "A simple and comfortable casual mini dress.", 349, "NEW", 18, "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600", ["XS","S","M","L"], ["Beige","Black","White"]],
    ["Romantic Party Dress", "Party", "A stylish dress for parties and celebrations.", 699, "TRENDING", 12, "https://images.unsplash.com/photo-1566479179817-c0c5c7a7e6c1?w=600", ["S","M","L","XL"], ["Red","Black","Pink"]],
    ["Minimalist White Dress", "Casual", "A clean and minimalist everyday dress.", 429, "NEW", 25, "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600", ["XS","S","M","L","XL"], ["White","Cream","Black"]],
    ["Floral Garden Maxi Dress", "Summer", "A lovely floral maxi dress for outdoor occasions.", 549, "POPULAR", 16, "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600", ["S","M","L","XL"], ["Pink","Green","Blue"]],
    ["Chic Black Formal Dress", "Formal", "A classy black dress for formal events.", 799, "BESTSELLER", 10, "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600", ["S","M","L","XL"], ["Black","Burgundy"]],
    ["Soft Pink Date Night Dress", "Party", "A soft and feminine dress for date nights.", 499, "NEW", 14, "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600", ["XS","S","M","L"], ["Pink","White","Red"]],
    ["Elegant Beige Midi Dress", "Elegant", "A neutral beige midi dress with an elegant look.", 649, "POPULAR", 17, "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600", ["S","M","L","XL"], ["Beige","Brown"]],
    ["Summer Breeze Dress", "Summer", "A light and comfortable dress for summer.", 379, "NEW", 22, "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600", ["XS","S","M","L"], ["Blue","Yellow","White"]],
    ["Modern Office Dress", "Formal", "A smart and stylish dress for office wear.", 729, "BESTSELLER", 11, "https://images.unsplash.com/photo-1506629905607-d9a9b7e7b0b5?w=600", ["S","M","L","XL"], ["Black","Beige","Brown"]],
    ["Romantic Floral Dress", "Casual", "A charming floral dress for everyday wear.", 459, "POPULAR", 19, "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", ["XS","S","M","L","XL"], ["Pink","Blue","White"]]
];

$inserted = 0;

foreach ($products as $item) {
    [$name, $category, $description, $price, $tag, $stock, $image, $sizes, $colors] = $item;

    $stmt = $conn->prepare("SELECT category_id FROM categories WHERE category_name = ? LIMIT 1");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $categoryRow = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    $categoryId = $categoryRow["category_id"];

    $stmt = $conn->prepare("SELECT product_id FROM products WHERE product_name = ? LIMIT 1");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $existing = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($existing) {
        $productId = $existing["product_id"];

        $stmt = $conn->prepare(
            "UPDATE products SET category_id=?, description=?, price=?, image_url=?, tag=?, stock=? WHERE product_id=?"
        );
        $stmt->bind_param("isdssii", $categoryId, $description, $price, $image, $tag, $stock, $productId);
        $stmt->execute();
        $stmt->close();
    } else {
        $stmt = $conn->prepare(
            "INSERT INTO products (category_id, product_name, description, price, image_url, tag, stock)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param("issdssi", $categoryId, $name, $description, $price, $image, $tag, $stock);
        $stmt->execute();
        $productId = $conn->insert_id;
        $stmt->close();
    }

    foreach ($sizes as $size) {
        foreach ($colors as $color) {
            $stmt = $conn->prepare(
                "SELECT variant_id FROM product_variants WHERE product_id=? AND size=? AND color=? LIMIT 1"
            );
            $stmt->bind_param("iss", $productId, $size, $color);
            $stmt->execute();
            $exists = $stmt->get_result()->num_rows > 0;
            $stmt->close();

            if (!$exists) {
                $stmt = $conn->prepare(
                    "INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, ?, ?, ?)"
                );
                $stmt->bind_param("issi", $productId, $size, $color, $stock);
                $stmt->execute();
                $stmt->close();
            }
        }
    }

    $inserted++;
}

echo "SUCCESS! DressCart products imported: " . $inserted;

$conn->close();

?>
