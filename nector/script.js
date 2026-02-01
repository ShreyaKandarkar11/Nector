document.addEventListener("DOMContentLoaded", function () {

// ---- NAVBAR / HAMBURGER ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ---- FADE IN ----
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    fadeElements.forEach(el => observer.observe(el));
}

// ---- CART STORAGE ----
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ---- CART COUNT ----
function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    el.textContent = count;
}

// ---- ADD TO CART ----
const addToCartButtons = document.querySelectorAll('.add-to-cart');

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            if (!card) return;

            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            const found = cart.find(item => item.id === id);
            if (found) {
                found.qty++;
            } else {
                cart.push({ id, name, price, qty: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });
}

updateCartCount();

});
