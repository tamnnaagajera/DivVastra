// =========================
// SIDE MENU
// =========================

function openMenu() {
    document.querySelector(".side-menu").classList.add("open");
    document.querySelector(".overlay").classList.add("show");
}

function closeMenu() {
    document.querySelector(".side-menu").classList.remove("open");
    document.querySelector(".overlay").classList.remove("show");
}


// =========================
// BUY PRODUCT SIZE
// =========================

let selectedSize = "";

function selectBuySize(button) {

    document.querySelectorAll(".sizes button").forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedSize = button.innerText;
}
function buyOnWhatsApp() {

    if (selectedSize === "") {
        alert("Please select your size first.");
        return;
    }

    const productName =
        document.getElementById("productName").innerText;

    const productPrice =
        document.getElementById("productPrice").innerText;

    const message =
        "Hello DIV VASTRA,%0A%0A" +
        "I want to purchase this product.%0A%0A" +
        "Product: " + productName + "%0A" +
        "Price: " + productPrice + "%0A" +
        "Selected Size: " + selectedSize + "%0A%0A" +
        "Please confirm availability and purchase details.";

    window.open(
        "https://wa.me/919898605800?text=" + message,
        "_blank"
    );
}


// =========================
// RENT PRODUCT SIZE
// =========================

let selectedRentSize = "";

function selectRentSize(button) {

    document.querySelectorAll(".sizes button").forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedRentSize = button.innerText;
}

function rentOnWhatsApp() {

    if (selectedRentSize === "") {
        alert("Please select your size first.");
        return;
    }

    const productName =
        document.getElementById("rentProductName").innerText;

    const productPrice =
        document.getElementById("rentProductPrice").innerText;

    const message =
        "Hello DIV VASTRA,%0A%0A" +
        "I want to rent this product.%0A%0A" +
        "Product: " + productName + "%0A" +
        "Rent Price: " + productPrice + "%0A" +
        "Selected Size: " + selectedRentSize + "%0A%0A" +
        "Please confirm availability and rental duration.";

    window.open(
        "https://wa.me/919898605800?text=" + message,
        "_blank"
    );
}


// =========================
// BUY PRODUCT DETAILS
// =========================

const buyParams = new URLSearchParams(window.location.search);
const buyProductNumber = buyParams.get("product");

const products = {

    1: {
        name: "Kurta 1",
        price: "₹1,499",
        description: "Beautiful handcrafted kurta made with premium quality fabric."
    },

    2: {
        name: "Kurta 2",
        price: "₹1,699",
        description: "Elegant handcrafted kurta designed for special occasions."
    },

    3: {
        name: "Kurta 3",
        price: "₹1,899",
        description: "Premium traditional kurta with beautiful detailing."
    },

    4: {
        name: "Kurta 4",
        price: "₹1,999",
        description: "Classic handcrafted kurta made with fine fabric."
    }

};


if (buyProductNumber && products[buyProductNumber]) {

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");

    if (productName) {
        productName.innerText = products[buyProductNumber].name;
    }

    if (productPrice) {
        productPrice.innerText = products[buyProductNumber].price;
    }

    if (productDescription) {
        productDescription.innerText = products[buyProductNumber].description;
    }
}


// =========================
// RENT PRODUCT DETAILS
// =========================

const rentParams = new URLSearchParams(window.location.search);
const rentProductNumber = rentParams.get("product");

const rentProducts = {

    1: {
        name: "Rent Kurta 1",
        price: "₹799 / Rental",
        description: "Beautiful handcrafted kurta available for rent."
    },

    2: {
        name: "Rent Kurta 2",
        price: "₹899 / Rental",
        description: "Elegant handcrafted kurta available for special occasions."
    },

    3: {
        name: "Rent Kurta 3",
        price: "₹999 / Rental",
        description: "Premium traditional kurta available for rent."
    },

    4: {
        name: "Rent Kurta 4",
        price: "₹1,099 / Rental",
        description: "Classic handcrafted kurta available for rental."
    }

};


if (rentProductNumber && rentProducts[rentProductNumber]) {

    const rentProductName =
        document.getElementById("rentProductName");

    const rentProductPrice =
        document.getElementById("rentProductPrice");

    const rentProductDescription =
        document.getElementById("rentProductDescription");

    if (rentProductName) {
        rentProductName.innerText =
            rentProducts[rentProductNumber].name;
    }

    if (rentProductPrice) {
        rentProductPrice.innerText =
            rentProducts[rentProductNumber].price;
    }

    if (rentProductDescription) {
        rentProductDescription.innerText =
            rentProducts[rentProductNumber].description;
    }
}


// =========================
// CUSTOMIZE SIZE
// =========================

let selectedCustomSize = "";

function selectSize(button) {

    document.querySelectorAll(".custom-size button").forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedCustomSize = button.innerText;
}


// =========================
// CUSTOMIZE → WHATSAPP
// =========================

function sendCustomizeRequest() {

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const fabric =
        document.getElementById("fabric").value;

    const color =
        document.getElementById("color").value;

    const requirements =
        document.getElementById("requirements").value;


    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (phone === "") {
        alert("Please enter your WhatsApp number.");
        return;
    }

    if (fabric === "") {
        alert("Please select a fabric.");
        return;
    }

    if (color === "") {
        alert("Please select a color.");
        return;
    }

    if (selectedCustomSize === "") {
        alert("Please select your size.");
        return;
    }


    const message =
        "Hello DIV VASTRA,%0A%0A" +

        "I want to customize a Kurta.%0A%0A" +

        "Name: " + name + "%0A" +

        "WhatsApp Number: " + phone + "%0A" +

        "Fabric: " + fabric + "%0A" +

        "Color: " + color + "%0A" +

        "Size: " + selectedCustomSize + "%0A%0A" +

        "Design Requirements:%0A" +
        requirements;


    window.open(
        "https://wa.me/919898605800?text=" + message,
        "_blank"
    );
}