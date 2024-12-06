document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const searchBox = document.getElementById('search-box');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const shop = [
        { id: 1, name: "Wyze Cam v3 1080 Camera", price: 59, image: "./assets/images/cam1.jpg", category: "Electronic" },
        { id: 2, name: "Playpen ball pool", price: 97, image: "./assets/images/pool1.jpg", category: "Health" },
        { id: 3, name: "Cotton Checked Kat Dress sz", price: 25, image: "./assets/images/cotten_dress1.jpg", category: "Fashion" },
        { id: 4, name: "Nivea Men 48 Hour Fresh Deodorant", price: 17, image: "./assets/images/deodorant1.jpg", category: "Health" },
        { id: 5, name: "Amazon Echo 2nd generation", price: 20, image: "./assets/images/amazon1.jpg", category: "Electronic" },
        { id: 6, name: "Woman High Heels", price: 39, image: "./assets/images/highheels1.jpg", category: "Fashion" },
        { id: 7, name: "Dana Love's Baby Soft Body Mist", price: 28, image: "./assets/images/love1.jpg", category: "Health" },
        { id: 8, name: "New Apple iPod Classic 7th Gen Black", price: 20, image: "./assets/images/ipod1.jpg", category: "Electronic" },
        { id: 9, name: "Christmas Holiday Dress Girls", price: 12, image: "./assets/images/girls_dress1.jpg", category: "Fashion" },
        { id: 10, name: "Abercrombie & Fitch Fierce", price: 49, image: "./assets/images/spray1.jpg", category: "Health" },
        { id: 11, name: "Nike Runner 3 Athletic Sneakers", price: 78, image: "./assets/images/sneakers_girls1.jpg", category: "Fashion" },
        { id: 12, name: "Sony ZV-1 20.1MP K Digital Camera", price: 674, image: "./assets/images/sony1.jpg", category: "Electronic" },
    ];

    // Function to render products
    function displayProducts(products) {
        productGrid.innerHTML = '';  // Clear the grid before adding new products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image" onError="this.onerror=null;this.src='./assets/images/placeholder.jpg';">
                </a>
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>`;
            productGrid.appendChild(productCard);

            // Add event listener for "Add to Cart" button
            const addToCartButton = productCard.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                addToCart(product.id);
            });
        });
    }

    // Function to display the confirmation message
    function showConfirmationMessage(productName) {
        const confirmationMessage = document.createElement('div');
        confirmationMessage.classList.add('confirmation-message');
        confirmationMessage.textContent = `${productName} has been added to your cart!`;
        document.body.appendChild(confirmationMessage);

        // Show the confirmation message
        confirmationMessage.style.display = 'block';

        // Remove the confirmation message after 2 seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 2000);
    }

    // Add product to the cart and update localStorage
    function addToCart(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve the cart from localStorage
        const product = shop.find(p => p.id === productId); // Find the product by ID
        
        if (product) {
            cart.push(product); // Add product to cart
            localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
            showConfirmationMessage(product.name); // Show confirmation message
        }
    
        updateCartBadge();
    }

    // Function to update the cart badge on the navbar
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage
        const cartBadge = document.querySelectorAll('.cart-total'); // Select both desktop and mobile cart badge
        cartBadge.forEach(badge => {
            badge.textContent = cart.length; // Update cart count on the navbar cart icon
        });
    }

    // Remove product from the cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
        updateCart();
    }

    // Update cart display
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPrice = document.getElementById('total-price');

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${item.id})">Remove</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Search functionality
    searchBox.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProducts = shop.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    // Filter products by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            let filteredProducts = [];
            if (category === 'All') {
                filteredProducts = shop;
            } else {
                filteredProducts = shop.filter(product => product.category === category);
            }
            displayProducts(filteredProducts);
        });
    });

    // Initial call to render all products
    displayProducts(shop);
});
