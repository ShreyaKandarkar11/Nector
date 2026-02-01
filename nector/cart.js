const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

if (cartItems && cartTotal) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty 🌸</p>';
            cartTotal.textContent = '0';
            return;
        }

        cart.forEach((item, index) => {
            total += Number(item.price) * Number(item.qty);

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                ${item.name} × ${item.qty} — ₹${(item.price * item.qty).toFixed(2)}
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItems.appendChild(div);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    renderCart();
}
