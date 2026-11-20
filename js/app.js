
/* =====================================
   DRESSCART 2.0 - CUSTOMER FUNCTIONS
===================================== */

// PRODUCT DATABASE (SAMPLE PRODUCTS)

let products = [
    {
        id: 1,
        name: "Floral Summer Midi Dress",
        category: "Summer",
        price: 399,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
        description: "A beautiful floral-inspired dress perfect for sunny days and casual outings.",
        colors: [
            {name: "Pink", code: "#d99aaa"},
            {name: "White", code: "#f4eee8"},
            {name: "Blue", code: "#8faac4"}
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 20
    },
    {
        id: 2,
        name: "Elegant Satin Evening Dress",
        category: "Elegant",
        price: 599,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
        description: "An elegant satin-inspired look for special occasions and evening events.",
        colors: [
            {name: "Black", code: "#252525"},
            {name: "Champagne", code: "#d9c5a1"},
            {name: "Pink", code: "#d99aaa"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 15
    },
    {
        id: 3,
        name: "Classic Casual Mini Dress",
        category: "Casual",
        price: 349,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600",
        description: "A simple and comfortable dress for everyday wear.",
        colors: [
            {name: "Beige", code: "#c9b69d"},
            {name: "Black", code: "#252525"},
            {name: "White", code: "#f4eee8"}
        ],
        sizes: ["XS", "S", "M", "L"],
        stock: 18
    },
    {
        id: 4,
        name: "Romantic Party Dress",
        category: "Party",
        price: 699,
        tag: "TRENDING",
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600",
        description: "A stylish dress made for parties, celebrations, and memorable nights.",
        colors: [
            {name: "Red", code: "#a52b43"},
            {name: "Black", code: "#252525"},
            {name: "Pink", code: "#d99aaa"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 12
    },
    {
        id: 5,
        name: "Minimalist White Dress",
        category: "Casual",
        price: 429,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600",
        description: "A timeless minimalist dress that is easy to style for any occasion.",
        colors: [
            {name: "White", code: "#f4eee8"},
            {name: "Cream", code: "#e8ddc9"},
            {name: "Black", code: "#252525"}
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 25
    },
    {
        id: 6,
        name: "Floral Garden Maxi Dress",
        category: "Summer",
        price: 549,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
        description: "A flowy maxi dress with a feminine look for outdoor occasions.",
        colors: [
            {name: "Pink", code: "#d99aaa"},
            {name: "Green", code: "#81977b"},
            {name: "Blue", code: "#8faac4"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 16
    },
    {
        id: 7,
        name: "Chic Black Formal Dress",
        category: "Formal",
        price: 799,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600",
        description: "A sophisticated black dress for formal dinners and elegant gatherings.",
        colors: [
            {name: "Black", code: "#252525"},
            {name: "Burgundy", code: "#741e35"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 10
    },
    {
        id: 8,
        name: "Soft Pink Date Night Dress",
        category: "Party",
        price: 499,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
        description: "A lovely pink dress for dates, dinners, and special moments.",
        colors: [
            {name: "Pink", code: "#d99aaa"},
            {name: "White", code: "#f4eee8"},
            {name: "Red", code: "#a52b43"}
        ],
        sizes: ["XS", "S", "M", "L"],
        stock: 14
    },
    {
        id: 9,
        name: "Elegant Beige Midi Dress",
        category: "Elegant",
        price: 649,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
        description: "A refined neutral dress with an elegant silhouette.",
        colors: [
            {name: "Beige", code: "#c9b69d"},
            {name: "Brown", code: "#684b3c"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 17
    },
    {
        id: 10,
        name: "Summer Breeze Dress",
        category: "Summer",
        price: 379,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
        description: "A lightweight summer-inspired dress for warm and sunny days.",
        colors: [
            {name: "Blue", code: "#8faac4"},
            {name: "Yellow", code: "#e8d28b"},
            {name: "White", code: "#f4eee8"}
        ],
        sizes: ["XS", "S", "M", "L"],
        stock: 22
    },
    {
        id: 11,
        name: "Modern Office Dress",
        category: "Formal",
        price: 729,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
        description: "A polished and modern dress suitable for professional settings.",
        colors: [
            {name: "Black", code: "#252525"},
            {name: "Beige", code: "#c9b69d"},
            {name: "Brown", code: "#684b3c"}
        ],
        sizes: ["S", "M", "L", "XL"],
        stock: 11
    },
    {
        id: 12,
        name: "Romantic Floral Dress",
        category: "Casual",
        price: 459,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600",
        description: "A charming floral style for casual dates and everyday adventures.",
        colors: [
            {name: "Pink", code: "#d99aaa"},
            {name: "Blue", code: "#8faac4"},
            {name: "White", code: "#f4eee8"}
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 19
    }
];

// MAIN VARIABLES

let cart = [];
let currentCategory = "All";
let currentProduct = null;
let selectedSize = "";
let selectedColor = "";
let selectedQuantity = 1;
let wishlist = [];

const peso = amount =>
    "₱" + Number(amount).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });


// ELEMENT REFERENCES

const productGrid = document.getElementById("productGrid");
const productTotal = document.getElementById("productTotal");
const emptyMessage = document.getElementById("emptyMessage");

const productModal = document.getElementById("productModal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");


// TOAST MESSAGE

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ICON REFRESH

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}


// DISPLAY PRODUCTS

function displayProducts() {

    let filtered = [...products];

    if (currentCategory !== "All") {
        filtered = filtered.filter(product =>
            product.category === currentCategory
        );
    }

    const searchValue =
        document.getElementById("searchInput").value.toLowerCase().trim();

    if (searchValue) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue)
        );
    }

    const sortValue =
        document.getElementById("sortProducts").value;

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    productGrid.innerHTML = "";

    productTotal.textContent = `${filtered.length} Products`;

    emptyMessage.hidden = filtered.length !== 0;

    filtered.forEach(product => {

        const isLiked = wishlist.includes(product.id);

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image" data-view="${product.id}">

                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

                <span class="product-tag">${product.tag}</span>

                <button class="wishlist-btn ${isLiked ? "liked" : ""}"
                    data-wishlist="${product.id}"
                    aria-label="Add to wishlist">
                    <i data-lucide="heart"></i>
                </button>

            </div>

            <div class="product-info">

                <p class="product-category">${product.category}</p>

                <h3 class="product-name">${product.name}</h3>

                <p class="product-price">${peso(product.price)}</p>

                <button class="product-action"
                    data-view="${product.id}">
                    VIEW DETAILS
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });

    refreshIcons();
}


// CATEGORY FILTERS

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category-card").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        displayProducts();

    });

});


// PRODUCT SORTING

document.getElementById("sortProducts")
    .addEventListener("change", displayProducts);


// SEARCH

document.getElementById("searchBtn").addEventListener("click", () => {

    document.getElementById("searchPanel").classList.toggle("show");

    document.getElementById("searchInput").focus();

});

document.getElementById("closeSearch").addEventListener("click", () => {
    document.getElementById("searchPanel").classList.remove("show");
});

document.getElementById("searchInput")
    .addEventListener("input", displayProducts);


// CLEAR FILTERS

document.getElementById("clearFilters").addEventListener("click", () => {

    currentCategory = "All";

    document.getElementById("searchInput").value = "";
    document.getElementById("sortProducts").value = "default";

    document.querySelectorAll(".category-card").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === "All"
        );
    });

    displayProducts();

    showToast("Filters cleared!");

});


// OPEN PRODUCT DETAILS

function openProductDetails(id) {

    currentProduct = products.find(product => product.id === id);

    if (!currentProduct) return;

    selectedSize = "";
    selectedColor = "";
    selectedQuantity = 1;

    document.getElementById("modalImage").src = currentProduct.image;
    document.getElementById("modalImage").alt = currentProduct.name;

    document.getElementById("modalName").textContent =
        currentProduct.name;

    document.getElementById("modalPrice").textContent =
        peso(currentProduct.price);

    document.getElementById("modalDescription").textContent =
        currentProduct.description;

    document.getElementById("modalQuantity").textContent = "1";

    document.getElementById("stockNote").textContent =
        `${currentProduct.stock} pieces available`;

    // SIZE OPTIONS

    const sizeContainer = document.getElementById("sizeOptions");

    sizeContainer.innerHTML = "";

    currentProduct.sizes.forEach(size => {

        const button = document.createElement("button");

        button.className = "size-option";
        button.textContent = size;

        button.addEventListener("click", () => {

            selectedSize = size;

            document.querySelectorAll(".size-option").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

        });

        sizeContainer.appendChild(button);

    });

    // COLOR OPTIONS

    const colorContainer = document.getElementById("colorOptions");

    colorContainer.innerHTML = "";

    currentProduct.colors.forEach(color => {

        const button = document.createElement("button");

        button.className = "color-option";

        button.style.backgroundColor = color.code;
        button.title = color.name;
        button.setAttribute("aria-label", color.name);

        button.addEventListener("click", () => {

            selectedColor = color.name;

            document.querySelectorAll(".color-option").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

        });

        colorContainer.appendChild(button);

    });

    productModal.classList.add("show");

    refreshIcons();
}


// PRODUCT CLICK EVENTS

productGrid.addEventListener("click", event => {

    const wishlistButton = event.target.closest("[data-wishlist]");

    if (wishlistButton) {

        const id = Number(wishlistButton.dataset.wishlist);

        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(item => item !== id);
            showToast("Removed from wishlist");
        } else {
            wishlist.push(id);
            showToast("Added to wishlist!");
        }

        displayProducts();

        return;
    }

    const productButton = event.target.closest("[data-view]");

    if (productButton) {
        openProductDetails(Number(productButton.dataset.view));
    }

});


// CLOSE PRODUCT MODAL

document.getElementById("closeProductModal")
    .addEventListener("click", () => {
        productModal.classList.remove("show");
    });

productModal.addEventListener("click", event => {

    if (event.target === productModal) {
        productModal.classList.remove("show");
    }

});


// PRODUCT QUANTITY

document.getElementById("modalMinus").addEventListener("click", () => {

    if (selectedQuantity > 1) {
        selectedQuantity--;
        document.getElementById("modalQuantity").textContent =
            selectedQuantity;
    }

});

document.getElementById("modalPlus").addEventListener("click", () => {

    if (!currentProduct) return;

    if (selectedQuantity < currentProduct.stock) {
        selectedQuantity++;
        document.getElementById("modalQuantity").textContent =
            selectedQuantity;
    } else {
        showToast("Maximum available stock reached");
    }

});


// ADD TO CART

document.getElementById("modalAddCart").addEventListener("click", () => {

    if (!currentProduct) return;

    if (!selectedSize) {
        showToast("Please choose a size first!");
        return;
    }

    if (!selectedColor) {
        showToast("Please choose a color first!");
        return;
    }

    const existingItem = cart.find(item =>
        item.id === currentProduct.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    const currentCartQuantity = existingItem
        ? existingItem.quantity
        : 0;

    if (currentCartQuantity + selectedQuantity > currentProduct.stock) {
        showToast("Not enough stock available!");
        return;
    }

    if (existingItem) {

        existingItem.quantity += selectedQuantity;

    } else {

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            size: selectedSize,
            color: selectedColor,
            quantity: selectedQuantity
        });

    }

    productModal.classList.remove("show");

    updateCart();

    showToast("Added to your shopping bag!");

});


// OPEN CART

function openCart() {

    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");

    updateCart();

}

function closeCart() {

    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");

}

document.getElementById("cartBtn")
    .addEventListener("click", openCart);

document.getElementById("closeCart")
    .addEventListener("click", closeCart);

document.getElementById("continueShopping")
    .addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const subtotal = document.getElementById("cartSubtotal");

    cartItems.innerHTML = "";

    let total = 0;

    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>♡</p>
                <h3>Your shopping bag is empty.</h3>
                <p>Discover something beautiful today!</p>
            </div>
        `;

    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div>

                <h4>${item.name}</h4>

                <p>Size: ${item.size}</p>

                <p>Color: ${item.color}</p>

                <strong>${peso(item.price)}</strong>

                <div class="cart-quantity">

                    <button data-decrease="${index}">−</button>

                    <span>${item.quantity}</span>

                    <button data-increase="${index}">+</button>

                </div>

                <button class="remove-item"
                    data-remove="${index}">
                    Remove
                </button>

            </div>

            <strong>${peso(itemTotal)}</strong>

        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalQuantity;

    subtotal.textContent = peso(total);

}


// CART BUTTON EVENTS

document.getElementById("cartItems")
    .addEventListener("click", event => {

        const decrease = event.target.closest("[data-decrease]");
        const increase = event.target.closest("[data-increase]");
        const remove = event.target.closest("[data-remove]");

        if (decrease) {

            const index = Number(decrease.dataset.decrease);

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            updateCart();

        }

        if (increase) {

            const index = Number(increase.dataset.increase);

            const item = cart[index];

            const product = products.find(p => p.id === item.id);

            if (item.quantity < product.stock) {
                item.quantity++;
                updateCart();
            } else {
                showToast("Maximum stock reached");
            }

        }

        if (remove) {

            const index = Number(remove.dataset.remove);

            cart.splice(index, 1);

            updateCart();

            showToast("Item removed from cart");

        }

    });


// CHECKOUT PLACEHOLDER


// ==========================================
// PART 3: SHOPPING CART & CHECKOUT
// ==========================================

const checkoutOverlay = document.getElementById("checkoutOverlay");
const confirmationOverlay = document.getElementById("confirmationOverlay");
const checkoutForm = document.getElementById("checkoutForm");

const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");

let latestReceiptText = "";

function checkoutPeso(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function checkoutEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function getCheckoutAmounts() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 1500 ? 0 : 50;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping
  };
}

function updateCheckoutSummary() {
  const amounts = getCheckoutAmounts();

  checkoutSubtotal.textContent = checkoutPeso(amounts.subtotal);
  checkoutShipping.textContent =
    amounts.shipping === 0 ? "FREE" : checkoutPeso(amounts.shipping);

  checkoutTotal.textContent = checkoutPeso(amounts.total);
}

// Open checkout - Login Required
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your shopping cart is empty.");
    return;
  }

  // Check if customer is logged in
  const currentUser = window.currentUser;

  if (!currentUser) {
    closeCart();

    // Open Login/Register modal
    document.getElementById("authModal").classList.add("show");

    showToast("Please log in or register before checking out.");
    return;
  }

  updateCheckoutSummary();
  closeCart();
  checkoutOverlay.classList.add("show");
});

// Close checkout
document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutOverlay.classList.remove("show");
});

// Close checkout by clicking outside
checkoutOverlay.addEventListener("click", event => {
  if (event.target === checkoutOverlay) {
    checkoutOverlay.classList.remove("show");
  }
});

// Place order

checkoutForm.addEventListener("submit", async event => {

    event.preventDefault();

    if (cart.length === 0) {
        showToast("Your shopping cart is empty.");
        checkoutOverlay.classList.remove("show");
        return;
    }

    const payment = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!payment) {
        showToast("Please select a payment method.");
        return;
    }

    const currentUser = window.currentUser;

    if (!currentUser) {
        showToast("Please log in before placing your order.");
        return;
    }

    const submitButton = checkoutForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.disabled = true;
    }

    try {

        const amounts = getCheckoutAmounts();

        const order = {
            orderId: "DC-" + Date.now(),

            date: new Date().toLocaleString("en-PH"),

            createdAt: new Date().toISOString(),

            customer: {
                name: document.getElementById("customerName").value.trim(),
                email: document.getElementById("customerEmail").value.trim(),
                phone: document.getElementById("customerPhone").value.trim(),
                address: document.getElementById("customerAddress").value.trim(),
                notes: document.getElementById("orderNotes").value.trim()
            },

            items: cart.map(item => ({ ...item })),

            subtotal: amounts.subtotal,
            shipping: amounts.shipping,
            total: amounts.total,

            paymentMethod: payment.value,
            status: "Pending"
        };

        // SEND ORDER TO MYSQL

        const response = await fetch("php/place_order.php", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                firebase_uid: currentUser.uid,

                customer_name: order.customer.name,
                customer_email: order.customer.email,
                customer_phone: order.customer.phone,
                delivery_address: order.customer.address,

                subtotal: order.subtotal,
                shipping_fee: order.shipping,
                total: order.total,

                payment_method: order.paymentMethod,

                items: order.items

            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || result.error || "Order could not be saved."
            );
        }

        // USE DATABASE ORDER NUMBER

        order.orderId = result.order_id;

        // SAVE A COPY FOR THE WEBSITE DISPLAY

        const savedOrders = JSON.parse(
            localStorage.getItem("dresscart_orders") || "[]"
        );

        savedOrders.push(order);

        localStorage.setItem(
            "dresscart_orders",
            JSON.stringify(savedOrders)
        );

        // CREATE RECEIPT

        displayOrderReceipt(order);

        // CLEAR CART

        cart.length = 0;
        updateCart();

        checkoutForm.reset();

        checkoutOverlay.classList.remove("show");
        confirmationOverlay.classList.add("show");

        showToast("Your order has been placed successfully!");

        console.log("Order successfully saved in MySQL!");

    } catch (error) {

        console.error("Order saving error:", error);

        showToast(error.message || "Something went wrong. Please try again.");

    } finally {

        if (submitButton) {
            submitButton.disabled = false;
        }

    }

});


// Display receipt
function displayOrderReceipt(order) {
  const receiptContent = document.getElementById("receiptContent");

  const itemLines = order.items.map(item => {
    return `
      <div class="receipt-line">
        <span>
          ${checkoutEscape(item.name)}
          (${checkoutEscape(item.size)}, ${checkoutEscape(item.color)})
          × ${item.quantity}
        </span>
        <strong>${checkoutPeso(item.price * item.quantity)}</strong>
      </div>
    `;
  }).join("");

  receiptContent.innerHTML = `
    <h3>DRESSCART RECEIPT</h3>
    <p><strong>Order ID:</strong> ${checkoutEscape(order.orderId)}</p>
    <p><strong>Date:</strong> ${checkoutEscape(order.date)}</p>
    <hr>

    <p><strong>Customer:</strong> ${checkoutEscape(order.customer.name)}</p>
    <p><strong>Email:</strong> ${checkoutEscape(order.customer.email)}</p>
    <p><strong>Phone:</strong> ${checkoutEscape(order.customer.phone)}</p>
    <p><strong>Address:</strong> ${checkoutEscape(order.customer.address)}</p>

    <hr>
    <strong>ORDER ITEMS</strong>
    ${itemLines}
    <hr>

    <div class="receipt-line">
      <span>Subtotal</span>
      <strong>${checkoutPeso(order.subtotal)}</strong>
    </div>

    <div class="receipt-line">
      <span>Shipping</span>
      <strong>${order.shipping === 0 ? "FREE" : checkoutPeso(order.shipping)}</strong>
    </div>

    <div class="receipt-line">
      <strong>Total</strong>
      <strong>${checkoutPeso(order.total)}</strong>
    </div>

    <p><strong>Payment:</strong> ${checkoutEscape(order.paymentMethod)}</p>
    <p><strong>Status:</strong> ${checkoutEscape(order.status)}</p>
    <hr>
    <p style="text-align:center;">Thank you for shopping at DressCart!</p>
  `;

  latestReceiptText = [
    "DRESSCART RECEIPT",
    "Order ID: " + order.orderId,
    "Date: " + order.date,
    "Customer: " + order.customer.name,
    "Email: " + order.customer.email,
    "Phone: " + order.customer.phone,
    "Address: " + order.customer.address,
    "",
    "ORDER ITEMS",
    ...order.items.map(item =>
      `${item.name} - ${item.size} - ${item.color} x ${item.quantity} = ${checkoutPeso(item.price * item.quantity)}`
    ),
    "",
    "Subtotal: " + checkoutPeso(order.subtotal),
    "Shipping: " + checkoutPeso(order.shipping),
    "TOTAL: " + checkoutPeso(order.total),
    "Payment: " + order.paymentMethod,
    "Status: " + order.status,
    "",
    "Thank you for shopping at DressCart!"
  ].join("\n");
}

// Print receipt
document.getElementById("printReceipt").addEventListener("click", () => {
  window.print();
});

// Download receipt
document.getElementById("downloadReceipt").addEventListener("click", () => {
  const receiptFile = new Blob(
    [latestReceiptText],
    { type: "text/plain;charset=utf-8" }
  );

  const fileURL = URL.createObjectURL(receiptFile);
  const downloadLink = document.createElement("a");

  downloadLink.href = fileURL;
  downloadLink.download = "DressCart-Receipt.txt";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  URL.revokeObjectURL(fileURL);
});

// Close confirmation
document.getElementById("closeConfirmation").addEventListener("click", () => {
  confirmationOverlay.classList.remove("show");
});

document.getElementById("finishShopping").addEventListener("click", () => {
  confirmationOverlay.classList.remove("show");
  showToast("Happy shopping at DressCart!");
});



// SIDEBAR

const sidebar = document.getElementById("sidebar");

const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("show");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");
}

document.getElementById("menuBtn")
    .addEventListener("click", openSidebar);

document.getElementById("closeSidebar")
    .addEventListener("click", closeSidebar);

sidebarOverlay.addEventListener("click", closeSidebar);


// SIDEBAR LINKS

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", closeSidebar);

});





// LIGHT AND DARK MODE

const themeBtn = document.getElementById("themeBtn");

function setTheme(dark) {

    document.body.classList.toggle("dark-mode", dark);

    themeBtn.innerHTML = dark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    localStorage.setItem("dresscart-theme", dark ? "dark" : "light");

    refreshIcons();

}

const savedTheme = localStorage.getItem("dresscart-theme");

setTheme(savedTheme === "dark");

themeBtn.addEventListener("click", () => {

    const isDark = document.body.classList.contains("dark-mode");

    setTheme(!isDark);

});


// ESCAPE KEY

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSidebar();
        closeCart();

        productModal.classList.remove("show");

        document.getElementById("searchPanel")
            .classList.remove("show");

    }

});


// INITIALIZE WEBSITE

displayProducts();

updateCart();

refreshIcons();

console.log("DressCart customer homepage initialized successfully!");

// LOAD PRODUCTS FROM MYSQL DATABASE

const colorCodes = {
    Pink: "#d99aaa",
    White: "#f4eee8",
    Blue: "#8faac4",
    Black: "#252525",
    Champagne: "#d9c5a1",
    Beige: "#c9b69d",
    Red: "#a52b43",
    Cream: "#e8ddc9",
    Green: "#81977b",
    Burgundy: "#741e35",
    Brown: "#684b3c",
    Yellow: "#e8d28b"
};

fetch("php/products.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load database products.");
        }
        return response.json();
    })
    .then(databaseProducts => {

        products = databaseProducts.map(product => ({
            ...product,
            colors: product.colors.map(colorName => ({
                name: colorName,
                code: colorCodes[colorName] || "#d99aaa"
            }))
        }));

        displayProducts();

        console.log("Products successfully loaded from MySQL!");
    })
    .catch(error => {
        console.error("Database product loading error:", error);
        showToast("Using sample products. Database connection failed.");
    });



// ==========================================
// PART 4: CUSTOMER ORDER MANAGEMENT
// ==========================================

const ordersOverlay = document.getElementById("ordersOverlay");
const orderDetailsOverlay = document.getElementById("orderDetailsOverlay");
const cancelOrderOverlay = document.getElementById("cancelOrderOverlay");

function getSavedOrders() {
  return JSON.parse(localStorage.getItem("dresscart_orders") || "[]");
}

// LOAD CUSTOMER ORDERS FROM MYSQL

async function loadCustomerOrders() {

    const currentUser = window.currentUser;

    if (!currentUser) {
        return;
    }

    try {

        const response = await fetch("php/my_orders.php", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                firebase_uid: currentUser.uid
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Could not load customer orders."
            );
        }

        localStorage.setItem(
            "dresscart_orders",
            JSON.stringify(result.orders)
        );

        renderCustomerOrders();

        console.log("Customer orders loaded from MySQL!");

    } catch (error) {

        console.error("Order loading error:", error);

        showToast("Could not load your orders from the database.");

    }

}


function saveOrders(orders) {
  localStorage.setItem("dresscart_orders", JSON.stringify(orders));
}

function renderCustomerOrders() {
  const container = document.getElementById("customerOrdersList");
  const orders = getSavedOrders();

  if (!orders.length) {
    container.innerHTML = '<p class="orders-empty">You haven\'t placed any orders yet.</p>';
    return;
  }

  container.innerHTML = orders.slice().reverse().map(order => `
    <div class="order-card">
      <div class="order-card-top">
        <div>
          <h3>${checkoutEscape(order.orderId)}</h3>
          <p>${checkoutEscape(order.date)}</p>
        </div>
        <span class="order-status">${checkoutEscape(order.status)}</span>
      </div>

      <p>${order.items.length} item(s) · ${checkoutPeso(order.total)}</p>

      <div class="order-card-bottom">
        <strong>${checkoutPeso(order.total)}</strong>
        <div class="order-actions">

    <button class="view-order-btn"
        data-view-order="${checkoutEscape(order.orderId)}">
        View Details
    </button>

    <button class="track-order-btn"
        data-track-order="${checkoutEscape(order.orderId)}">
        <i data-lucide="map-pin"></i> Track Order
    </button>

    ${["Pending", "Processing"].includes(order.status) ? `
        <button class="cancel-order-btn"
            data-cancel-order="${checkoutEscape(order.orderId)}">
            Cancel
        </button>
    ` : ""}

</div>
      </div>
    </div>
  `).join("");
}

// Open orders from existing sidebar/menu link
function openCustomerOrders() {
  renderCustomerOrders();
  ordersOverlay.classList.add("show");
}

// Close orders
document.getElementById("closeOrders").addEventListener("click", () => {
  ordersOverlay.classList.remove("show");
});

document.getElementById("closeOrderDetails").addEventListener("click", () => {
  orderDetailsOverlay.classList.remove("show");
});

document.getElementById("closeCancelOrder").addEventListener("click", () => {
  cancelOrderOverlay.classList.remove("show");
});



// View, track, and cancel order buttons
document.getElementById("customerOrdersList").addEventListener("click", event => {

    const viewButton = event.target.closest("[data-view-order]");
    const cancelButton = event.target.closest("[data-cancel-order]");
    const trackButton = event.target.closest("[data-track-order]");

    // VIEW ORDER DETAILS
    if (viewButton) {
        const order = getSavedOrders().find(
            item => item.orderId === viewButton.dataset.viewOrder
        );

        if (!order) return;

        document.getElementById("orderDetailsContent").innerHTML = `
            <p><strong>Order ID:</strong> ${checkoutEscape(order.orderId)}</p>
            <p><strong>Date:</strong> ${checkoutEscape(order.date)}</p>
            <p><strong>Status:</strong> ${checkoutEscape(order.status)}</p>
            <p><strong>Payment:</strong> ${checkoutEscape(order.paymentMethod)}</p>
            <hr>
            ${order.items.map(item => `
                <div class="order-detail-line">
                    <span>${checkoutEscape(item.name)} × ${item.quantity}</span>
                    <strong>${checkoutPeso(item.price * item.quantity)}</strong>
                </div>
            `).join("")}
            <hr>
            <p><strong>Delivery Address:</strong> ${checkoutEscape(order.customer.address)}</p>
            <h3>Total: ${checkoutPeso(order.total)}</h3>
            ${order.cancelReason ? `<p><strong>Cancellation reason:</strong> ${checkoutEscape(order.cancelReason)}</p>` : ""}
        `;

        orderDetailsOverlay.classList.add("show");
    }

    // TRACK ORDER
    if (trackButton) {
        const order = getSavedOrders().find(
            item => item.orderId === trackButton.dataset.trackOrder
        );

        if (!order) return;

        openOrderTracking(order);
    }

    // CANCEL ORDER
    if (cancelButton) {
        document.getElementById("cancelOrderForm").reset();

        document.getElementById("cancelOrderId").value =
            cancelButton.dataset.cancelOrder;

        cancelOrderOverlay.classList.add("show");
    }

});


// Cancel order
document.getElementById("cancelOrderForm").addEventListener("submit", event => {
  event.preventDefault();

  const orderId = document.getElementById("cancelOrderId").value;
  const reason = document.getElementById("cancelReason").value;
  const explanation = document.getElementById("cancelExplanation").value.trim();

  const orders = getSavedOrders();
  const order = orders.find(item => item.orderId === orderId);

  if (!order) {
    showToast("Order not found.");
    return;
  }

  if (!["Pending", "Processing"].includes(order.status)) {
    showToast("This order can no longer be cancelled.");
    return;
  }

  order.status = "Cancelled";
  order.cancelReason = reason;
  order.cancelExplanation = explanation;

  saveOrders(orders);

  cancelOrderOverlay.classList.remove("show");
  renderCustomerOrders();

  showToast("Order cancelled successfully.");
});

// Make orders available to the existing sidebar button
window.openCustomerOrders = openCustomerOrders;

document.getElementById("ordersBtn").addEventListener("click", () => {
    openCustomerOrders();
});
// =====================================
// PART 5 - ORDER TRACKING MAP
// =====================================

// Approximate Lapu-Lapu City center
const dressCartLocation = [10.3103, 123.9494];

let trackingMap = null;
let customerMarker = null;
let deliveryRoute = null;
let selectedTrackingOrder = null;

// UPDATE DELIVERY TIMELINE

function updateTrackingTimeline(status) {
    const steps = document.querySelectorAll(".tracking-step");
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];

    const currentIndex = statuses.indexOf(status);

    steps.forEach((step, index) => {
        step.classList.toggle(
            "active",
            status !== "Cancelled" && index <= currentIndex
        );
    });

    const cancelledMessage = document.getElementById(
        "trackingCancelledMessage"
    );

    if (cancelledMessage) {
        cancelledMessage.hidden = status !== "Cancelled";
    }
}

// Open tracking map
function openOrderTracking(order) {

    selectedTrackingOrder = order;

    const trackingOverlay =
        document.getElementById("trackingOverlay");

    trackingOverlay.classList.add("show");

    document.getElementById("trackingOrderStatus").textContent =
        "Order Status: " + (order.status || "Pending");
    updateTrackingTimeline(order.status || "Pending");
    if (!trackingMap) {

        trackingMap = L.map("deliveryMap").setView(
            dressCartLocation,
            14
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors"
            }
        ).addTo(trackingMap);

        L.marker(dressCartLocation)
            .addTo(trackingMap)
            .bindPopup("DressCart - Lapu-Lapu City")
            .openPopup();

        trackingMap.on("click", function(event) {
            setDeliveryLocation(
                event.latlng.lat,
                event.latlng.lng
            );
        });
    }

    setTimeout(() => {
        trackingMap.invalidateSize();
    }, 200);

    // Restore previously selected destination
    if (order.trackingDestination) {

        setDeliveryLocation(
            order.trackingDestination.lat,
            order.trackingDestination.lng
        );

    } else {

        trackingMap.setView(dressCartLocation, 14);

    }
}


// Select customer delivery location
async function setDeliveryLocation(lat, lng) {

    if (!selectedTrackingOrder) return;

    if (customerMarker) {
        trackingMap.removeLayer(customerMarker);
    }

    customerMarker = L.marker([lat, lng])
        .addTo(trackingMap)
        .bindPopup("Customer Delivery Location")
        .openPopup();

    // Save selected location
    selectedTrackingOrder.trackingDestination = {
        lat: lat,
        lng: lng
    };

    const orders = getSavedOrders();

    const index = orders.findIndex(order =>
        order.orderId === selectedTrackingOrder.orderId
    );

    if (index !== -1) {
        orders[index] = selectedTrackingOrder;
        saveOrders(orders);
    }

    // Remove previous route
    if (deliveryRoute) {
        trackingMap.removeLayer(deliveryRoute);
    }

    try {

        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${dressCartLocation[1]},${dressCartLocation[0]};` +
            `${lng},${lat}?overview=full&geometries=geojson`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {

            deliveryRoute = L.geoJSON(
                data.routes[0].geometry
            ).addTo(trackingMap);

            trackingMap.fitBounds(
                deliveryRoute.getBounds(),
                { padding: [30, 30] }
            );

        }

    } catch (error) {

        console.error("Route loading error:", error);

        showToast("Could not load the delivery route.");

    }
}


// Close tracking
document.getElementById("closeTracking")
    .addEventListener("click", () => {

        document.getElementById("trackingOverlay")
            .classList.remove("show");

    });


// Close by clicking outside
document.getElementById("trackingOverlay")
    .addEventListener("click", event => {

        if (event.target.id === "trackingOverlay") {
            event.currentTarget.classList.remove("show");
        }

    });


// Track latest order
document.getElementById("trackLatestOrderBtn")
    ?.addEventListener("click", () => {

        const orders = getSavedOrders();

        if (!orders.length) {
            showToast("You don't have any orders yet.");
            return;
        }

        openOrderTracking(orders[orders.length - 1]);

    });