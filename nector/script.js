// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

fadeElements.forEach(el => observer.observe(el));

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);

        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

// Form Validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }
    });
    if (valid) {
        alert('Message sent!');
        form.reset();
    }
});

// On Load
updateCartCount();

// Cart Page Logic (if on cart.html)
if (window.location.pathname.includes('cart.html')) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(div);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Add checkout logic here
    });

    renderCart();
}