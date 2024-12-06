document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    // Function to update the cart display
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPrice = document.getElementById('total-price');

        cartItems.innerHTML = '';  // Clear current cart items
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');

            // Constructing the HTML for the cart item with the product image
            li.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p>${item.name}</p>
                        <p>$${item.price}</p>
                    </div>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;

            cartItems.appendChild(li);
            total += item.price;

            // Adding event listener to the remove button
            const removeButton = li.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to remove product from the cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
        updateCart();  // Re-render the cart
    }
});
