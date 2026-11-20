
/* =====================================
   DRESSCART ADMIN DASHBOARD
===================================== */

// DEMO ADMIN LOGIN
// These credentials are for your school project demo.
// They are NOT secure authentication for a real store.

const ADMIN_EMAIL = "admin@dresscart.com";
const ADMIN_PASSWORD = "admin123";



const loginForm = document.getElementById("adminLoginForm");
const loginScreen = document.getElementById("adminLogin");
const dashboard = document.getElementById("adminDashboard");
const loginMessage = document.getElementById("adminLoginMessage");

// MONEY FORMAT
function formatMoney(amount) {
    return Number(amount || 0).toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP"
    });
}

// GET ORDERS
function getAdminOrders() {
    return JSON.parse(
        localStorage.getItem("dresscart_orders") || "[]"
    );
}

// GET ARCHIVED ORDERS
function getArchivedOrders() {
    return JSON.parse(
        localStorage.getItem("dresscart_archive") || "[]"
    );
}

// LOGIN
if (loginForm) {
    loginForm.onsubmit = function(event) {
        event.preventDefault();

        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem("dresscart_admin_logged_in", "true");

            loginScreen.hidden = true;
            dashboard.hidden = false;

            loginMessage.textContent = "";
            loadAdminDashboard();

        } else {
            loginMessage.textContent = "Incorrect email or password.";
        }
    };
}

// LOGOUT
const logoutButton = document.getElementById("adminLogout");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        sessionStorage.removeItem("dresscart_admin_logged_in");

        dashboard.hidden = true;
        loginScreen.hidden = false;

        loginForm.reset();
        loginMessage.textContent = "";
    });
}

// CHECK LOGIN SESSION
if (sessionStorage.getItem("dresscart_admin_logged_in") === "true") {
    if (loginScreen && dashboard) {
        loginScreen.hidden = true;
        dashboard.hidden = false;
        loadAdminDashboard();
    }
}

// NAVIGATION
document.querySelectorAll(".admin-sidebar nav button").forEach(button => {
    button.addEventListener("click", function() {
        const section = this.dataset.section;

        document.querySelectorAll(".admin-sidebar nav button")
            .forEach(navButton => navButton.classList.remove("active"));

        this.classList.add("active");

        document.querySelectorAll(".admin-section").forEach(item => {
            item.hidden = true;
        });

        const selectedSection = document.getElementById(section + "Section");

        if (selectedSection) {
            selectedSection.hidden = false;
        }

        const titles = {
            overview: "Dashboard Overview",
            transactions: "All Transactions",
            analytics: "Sales Analytics",
            archive: "Archived Transactions"
        };

        document.getElementById("sectionTitle").textContent =
            titles[section] || "Dashboard";
    });
});

// DASHBOARD DATA
function loadAdminDashboard() {
    const orders = getAdminOrders();

    // Exclude cancelled orders from sales totals
    const validOrders = orders.filter(order => order.status !== "Cancelled");

    const totalSales = validOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const pending = orders.filter(order => order.status === "Pending").length;

    const completed = orders.filter(order => order.status === "Delivered").length;

    document.getElementById("totalSales").textContent =
        formatMoney(totalSales);

    document.getElementById("totalTransactions").textContent =
        orders.length;

    document.getElementById("pendingOrders").textContent = pending;

    document.getElementById("completedOrders").textContent = completed;

    renderRecentTransactions(orders);
    renderTransactions(orders);
    renderSalesAnalytics(validOrders);
    renderArchive();
}

// RECENT TRANSACTIONS
function renderRecentTransactions(orders) {
    const container = document.getElementById("recentTransactions");

    if (!orders.length) {
        container.innerHTML =
            '<p class="empty-message">No transactions yet.</p>';
        return;
    }

    container.innerHTML = orders.slice(-5).reverse().map(order => `
        <div class="archive-item">
            <div>
                <strong>${escapeAdminText(order.orderId)}</strong>
                <p>${escapeAdminText(order.customer?.name || "Customer")}</p>
            </div>
            <div>
                <strong>${formatMoney(order.total)}</strong>
                <p>${escapeAdminText(order.status || "Pending")}</p>
            </div>
        </div>
    `).join("");
}

// ALL TRANSACTIONS
function renderTransactions(orders) {
    const table = document.getElementById("transactionsTable");

    if (!orders.length) {
        table.innerHTML =
            '<tr><td colspan="6" class="empty-message">No transactions found.</td></tr>';
        return;
    }

    table.innerHTML = orders.slice().reverse().map(order => `
        <tr>
            <td>${escapeAdminText(order.orderId)}</td>
            <td>${escapeAdminText(order.customer?.name || "Customer")}</td>
            <td>${escapeAdminText(order.date || "Date unavailable")}</td>
            <td>${escapeAdminText(order.paymentMethod || "N/A")}</td>
            <td>${formatMoney(order.total)}</td>
            <td><span class="status-badge">${escapeAdminText(order.status || "Pending")}</span></td>
        </tr>
    `).join("");
}

// SALES ANALYTICS
function getOrderDate(order) {
    if (order.createdAt) {
        const date = new Date(order.createdAt);
        if (!Number.isNaN(date.getTime())) return date;
    }

    if (order.date) {
        const date = new Date(order.date);
        if (!Number.isNaN(date.getTime())) return date;
    }

    return null;
}

function renderSalesAnalytics(orders) {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    function sumSince(startDate) {
        return orders.reduce((sum, order) => {
            const orderDate = getOrderDate(order);

            if (orderDate && orderDate >= startDate && orderDate <= now) {
                return sum + Number(order.total || 0);
            }

            return sum;
        }, 0);
    }

    const daily = sumSince(startOfDay);
    const weekly = sumSince(startOfWeek);
    const monthly = sumSince(startOfMonth);

    document.getElementById("dailySales").textContent = formatMoney(daily);
    document.getElementById("weeklySales").textContent = formatMoney(weekly);
    document.getElementById("monthlySales").textContent = formatMoney(monthly);

    document.getElementById("analyticsMessage").textContent =
        "Sales are calculated from non-cancelled orders recorded in this browser. " +
        "Daily sales start at midnight. Weekly sales start on Monday. " +
        "Monthly sales start on the first day of the current month.";
}

// ARCHIVE
function renderArchive() {
    const container = document.getElementById("archiveTransactions");
    const archivedOrders = getArchivedOrders();

    if (!archivedOrders.length) {
        container.innerHTML =
            '<p class="empty-message">No archived transactions yet.</p>';
        return;
    }

    container.innerHTML = archivedOrders.map(order => `
        <div class="archive-item">
            <div>
                <strong>${escapeAdminText(order.orderId)}</strong>
                <p>${escapeAdminText(order.customer?.name || "Customer")}</p>
            </div>
            <strong>${formatMoney(order.total)}</strong>
        </div>
    `).join("");
}

// SAFE TEXT DISPLAY
function escapeAdminText(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


// SHOW / HIDE ADMIN PASSWORD

const toggleAdminPassword = document.getElementById("toggleAdminPassword");
const adminPasswordInput = document.getElementById("adminPassword");

if (toggleAdminPassword && adminPasswordInput) {
    toggleAdminPassword.addEventListener("click", function() {
        if (adminPasswordInput.type === "password") {
            adminPasswordInput.type = "text";
            toggleAdminPassword.textContent = "Hide";
        } else {
            adminPasswordInput.type = "password";
            toggleAdminPassword.textContent = "Show";
        }
    });
}