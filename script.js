
        // Product Data
        const products = [
            {
                id: 1,
                name: "Urban Runner Sneakers",
                category: "men sneakers",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 2,
                name: "Classic Leather Loafers",
                category: "men formal",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 3,
                name: "Elegant High Heels",
                category: "women formal",
                price: 109.99,
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 4,
                name: "Comfort Running Shoes",
                category: "women sneakers",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 5,
                name: "Casual Canvas Sneakers",
                category: "men sneakers",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 6,
                name: "Designer Stiletto Pumps",
                category: "women formal",
                price: 149.99,
                image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 7,
                name: "Oxford Dress Shoes",
                category: "men formal",
                price: 139.99,
                image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 8,
                name: "Fashionable Sandals",
                category: "women sneakers",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            }
        ];

        // Cart functionality
        let cart = [];
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');
        const cartCountElement = document.querySelector('.cart-count');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCartButton = document.querySelector('.close-cart');
        const cartIcon = document.querySelector('.cart-icon');
        const productsGrid = document.querySelector('.products-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            displayProducts(products);
            setupEventListeners();
            updateCart();
        });

        // Display products in the grid
        function displayProducts(productsToDisplay) {
            productsGrid.innerHTML = '';
            
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="wishlist"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    filterProducts(filter);
                });
            });
            
            // Cart icon click
            cartIcon.addEventListener('click', () => {
                cartSidebar.classList.add('active');
            });
            
            // Close cart
            closeCartButton.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
            });
            
            // Add to cart buttons (delegated event)
            productsGrid.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
                    const productId = e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id');
                    addToCart(parseInt(productId));
                }
            });
            
            // Wishlist buttons (delegated event)
            productsGrid.addEventListener('click', (e) => {
                if (e.target.classList.contains('wishlist') || e.target.parentElement.classList.contains('wishlist')) {
                    const wishlistBtn = e.target.classList.contains('wishlist') ? e.target : e.target.parentElement;
                    toggleWishlist(wishlistBtn);
                }
            });
            
            // Cart items events (delegated)
            cartItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item')) {
                    const itemId = parseInt(e.target.getAttribute('data-id'));
                    removeFromCart(itemId);
                } else if (e.target.classList.contains('quantity-btn')) {
                    const itemId = parseInt(e.target.getAttribute('data-id'));
                    const isIncrease = e.target.classList.contains('increase');
                    updateQuantity(itemId, isIncrease);
                }
            });
        }

        // Filter products
        function filterProducts(filter) {
            let filteredProducts;
            
            if (filter === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => 
                    product.category.includes(filter)
                );
            }
            
            displayProducts(filteredProducts);
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show confirmation
            const addButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
            const originalText = addButton.textContent;
            addButton.textContent = 'Added!';
            addButton.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                addButton.textContent = originalText;
                addButton.style.backgroundColor = '';
            }, 1500);
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Update quantity
        function updateQuantity(productId, isIncrease) {
            const item = cart.find(item => item.id === productId);
            
            if (isIncrease) {
                item.quantity += 1;
            } else {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeFromCart(productId);
                    return;
                }
            }
            
            updateCart();
        }

        // Update cart UI
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
            cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray);">Your cart is empty</p>';
            }
        }

        // Toggle wishlist
        function toggleWishlist(button) {
            const icon = button.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--secondary)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        }
