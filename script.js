document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('close-cart')) return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Product Data
    const products = {
        courses: [
            {
                id: 'course1',
                title: 'Advanced Python Programming',
                description: 'Master Python with this comprehensive course covering advanced concepts and real-world applications.',
                price: 20.00,
                image: 'pic/python.jpg',
                badge: 'Bestseller'
            },
            {
                id: 'course2',
                title: 'Web Development Bootcamp',
                description: 'Learn full-stack web development with HTML, CSS, JavaScript, Node.js, and React.',
                price: 15.00,
                image: 'pic/web.jpg',
                badge: 'New'
            },
            {
                id: 'course3',
                title: 'Data Science Fundamentals',
                description: 'Introduction to data science with Python, Pandas, and machine learning basics.',
                price: 15.00,
                image: 'pic/data.jpg'
            },
            {
                id: 'course4',
                title: 'UI/UX Design Masterclass',
                description: 'Learn professional UI/UX design principles and tools like Figma and Adobe XD.',
                price: 15.00,
                image: 'pic/ui.jpg'
            },
            {
                id: 'course5',
                title: 'Ethical hacking',
                description: 'Learn ethical hacking and penetration testing with hands-on labs and real-world scenarios.',
                price: 15.00,
                image: 'pic/hacking.webp'
            },
            {
                id: 'course6',
                title: 'Cryptocurrency trading 2025',
                description: 'Complete cryptocurrency tranding in less then three months',
                price: 15.00,
                image: 'pic/crypto.jpg'
            },
            {
                id: 'course7',
                title: 'NodeJS 2025',
                description: 'Introduction to nodaJS.',
                price: 15.00,
                image: 'pic/nodejs.png'
            },
            {
                id: 'course8',
                title: 'C++ Learning for beginners',
                description: 'Introduction to C++',
                price: 15.00,
                image: 'pic/C++.jpg'
            },
            {
                id: 'course9',
                title: 'ReactJS Classes 2025',
                description: 'Introduction to reactJS',
                price: 15.00,
                image: 'pic/react.jpg'
            },
        ],
        tools: [
            {
                id: 'tool1',
                title: 'OTP bypass',
                description: 'A folder with 10 otp bypesser',
                price: 9.99,
                image: 'pic/otp.jpg',
                badge: 'new'
            },
            {
                id: 'tool2',
                title: 'Steam ByPass Tool',
                description: 'A powerful tool to bypass steam game without any payment. ',
                price: 50.00,
                image: 'pic/steam.jpg',
                badge: 'new'
            },
            {
                id: 'tool3',
                title: 'FakeID Maker',
                description: 'Best tool to create fake IDs for site verification.100% working and safe to use.',
                price: 20.00,
                image: 'pic/fakeID.jpg',
                badge: 'popular'
            },
            {
                id: 'tool4',
                title: 'iRemoval pro v5.5',
                description: 'iRemoval PRO v5 fixed checkra1n jailbreak detection,fixed password untethered bug',
                price: 14.99,
                image: 'pic/iremove.jpg',
                badge: 'popular'
            }
        ],
        accounts: [
            {
                id: 'account1',
                title: 'Netflix Premium (1 Year)',
                description: 'Premium Netflix account with 4K UHD streaming. Guaranteed for 1 year.',
                price: 9.99,
                image: 'pic/netflix.png',
                badge: 'Hot Deal'
            },
            {
                id: 'account2',
                title: 'Spotify Family Plan',
                description: 'Spotify Family plan with 6 premium accounts. 6 months guaranteed.',
                price: 9.99,
                image: 'pic/spotify.png'
            },
            {
                id: 'account3',
                title: 'Steam Wallet ($100)',
                description: '$100 Steam wallet code for purchasing games and in-game items.',
                price: 120.00,
                image: 'pic/card.jpg'
            },
            {
                id: 'account5',
                title: 'Apple One',
                description: 'Apple music,Icloud storage and Apple Tv',
                price: 9.99,
                image: 'pic/apple.jpg'
            },
            {
                id: 'account6',
                title: 'Capcut Premium',
                description: 'Capcut pro provides premium features for free',
                price: 9.99,
                image: 'pic/capcup.jpg'
            }
        ]
    };
    
    // Load Products
    function loadProducts(category, containerSelector) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';
        
        products[category].forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                ${badgeHTML}
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
                </div>
            `;
            
            container.appendChild(productCard);
        });
        
        // Add event listeners to new add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    // Load all products on page load
    loadProducts('courses', '#courses .products-grid');
    loadProducts('tools', '#tools .products-grid');
    loadProducts('accounts', '#accounts .products-grid');
    
    // Cart Functionality
    let cart = [];
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    
    // Toggle Cart Modal
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    function toggleCart() {
        cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        if (cartModal.style.display === 'block') {
            updateCartDisplay();
        }
    }
    
    // Add to Cart
    function addToCart(e) {
        const button = e.target;
        const id = button.getAttribute('data-id');
        const title = button.getAttribute('data-title');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                title,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCartCount();
        
        // Animation feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = 'var(--primary-color)';
        }, 1000);
    }
    
    // Update Cart Count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;

        // Add pulse animation to the checkout button if cart is not empty
        const checkoutButton = document.querySelector('.proceed-to-checkout');
        if (count > 0) {
            checkoutButton.classList.add('pulse');
        } else {
            checkoutButton.classList.remove('pulse');
        }

        // Animation for cart icon
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Update Cart Display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)} (${item.quantity}x)</div>
                </div>
                <i class="fas fa-times remove-item" data-id="${item.id}"></i>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
        
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
    
    // Remove from Cart
    function removeFromCart(e) {
        const id = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
    }

    // Proceed to Checkout
    function proceedToCheckout() {
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        if (totalPrice === 0) {
            alert('Your cart is empty. Please add items to proceed.');
            return;
        }

        FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-60631f6def2c240e3323fc46ca66ab03-X", // Replace with your Flutterwave public key
            tx_ref: "TX_" + Date.now(),
            amount: totalPrice,
            currency: "USD", // Change to your preferred currency
            payment_options: "card, mobilemoney, ussd",
            customer: {
                email: "twisthero15@gmail.com", // Replace with the user's email
                phone_number: "+233550778863", // Replace with the user's phone number
                name: "TWIST HERO" // Replace with the user's name
            },
            callback: function (data) {
                if (data.status === "successful") {
                    alert("Payment successful! Transaction ID: " + data.transaction_id);
                    cart = []; // Clear the cart after successful payment
                    updateCartCount();
                    updateCartDisplay();
                } else {
                    alert("Payment failed. Please try again.");
                }
            },
            onclose: function () {
                console.log("Payment modal closed");
            },
            customizations: {
                title: "TWISTHub", // Replace with your store name
                description: "Payment for items in cart",
                logo: "pic/logo.png" // Replace with your store logo URL
            }
        });
    }

    // Add event listener to the "Proceed to Checkout" button
    const checkoutButton = document.querySelector('.proceed-to-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', proceedToCheckout);
    }
});