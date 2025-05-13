// Sample product data (in a real app, this would come from an API)
const products = [
    {
        id: 1,
        title: "Celestial Diamond Necklace",
        price: 3499,
        originalPrice: 3999,
        category: "jewelry",
        images: [
            "product1-1.jpg",
            "product1-2.jpg",
            "product1-3.jpg"
        ],
        description: "A breathtaking necklace featuring a 2.5 carat ethically sourced diamond set in 18k white gold. The celestial design captures the essence of the night sky with smaller diamonds surrounding the centerpiece.",
        sku: "GC-JWL-001",
        sizes: ["16in", "18in", "20in"],
        badge: "Bestseller"
    },
    {
        id: 2,
        title: "Grandeur Platinum Watch",
        price: 12500,
        originalPrice: 14500,
        category: "watches",
        images: [
            "product2-1.jpg",
            "product2-2.jpg",
            "product2-3.jpg"
        ],
        description: "Swiss-made automatic movement with 72-hour power reserve. Platinum case with sapphire crystal and exhibition case back. Water resistant to 100m.",
        sku: "GC-WCH-002",
        sizes: ["Men's", "Women's"],
        badge: "Limited"
    },
    {
        id: 3,
        title: "Silk Twill Scarf",
        price: 450,
        category: "accessories",
        images: [
            "product3-1.jpg",
            "product3-2.jpg"
        ],
        description: "Hand-rolled 100% silk twill scarf featuring exclusive artwork. Made in Italy with heritage craftsmanship techniques dating back to the Renaissance.",
        sku: "GC-ACC-003",
        sizes: ["90x90cm", "140x140cm"]
    },
    {
        id: 4,
        title: "Emerald Halo Earrings",
        price: 7800,
        category: "jewelry",
        images: [
            "product4-1.jpg",
            "product4-2.jpg"
        ],
        description: "Pair of exquisite earrings featuring 3 carat Colombian emeralds surrounded by brilliant cut diamonds. Set in 18k yellow gold with platinum prongs.",
        sku: "GC-JWL-004",
        sizes: ["Standard", "Large"],
        badge: "New"
    },
    {
        id: 5,
        title: "Vintage Leather Briefcase",
        price: 2200,
        originalPrice: 2500,
        category: "accessories",
        images: [
            "product5-1.jpg",
            "product5-2.jpg",
            "product5-3.jpg"
        ],
        description: "Handcrafted from full-grain Italian leather with brass hardware. Features a removable shoulder strap and multiple interior compartments for organization.",
        sku: "GC-ACC-005"
    },
    {
        id: 6,
        title: "Tourbillon Masterpiece",
        price: 85000,
        category: "watches",
        images: [
            "product6-1.jpg",
            "product6-2.jpg"
        ],
        description: "Limited edition tourbillon watch with manual winding movement. 18k rose gold case with alligator leather strap. Only 50 pieces worldwide.",
        sku: "GC-WCH-006",
        sizes: ["42mm"],
        badge: "Exclusive"
    },
    {
        id: 7,
        title: "Pearl Strand Bracelet",
        price: 3200,
        category: "jewelry",
        images: [
            "product7-1.jpg",
            "product7-2.jpg"
        ],
        description: "Luxury bracelet featuring 45 perfectly matched South Sea pearls with diamond-encrusted 18k white gold clasp. Adjustable length from 7 to 7.5 inches.",
        sku: "GC-JWL-007",
        sizes: ["7in", "7.5in"]
    },
    {
        id: 8,
        title: "Cashmere Travel Wrap",
        price: 950,
        category: "accessories",
        images: [
            "product8-1.jpg",
            "product8-2.jpg"
        ],
        description: "Ultra-soft 100% Mongolian cashmere wrap in a generous size perfect for travel. Available in an array of exclusive colors dyed using traditional methods.",
        sku: "GC-ACC-008",
        sizes: ["One Size"],
        badge: "Bestseller"
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const resetFilters = document.getElementById('reset-filters');
const loadMoreBtn = document.getElementById('load-more-btn');
const quickViewModal = document.getElementById('quick-view-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Display products
function displayProducts(productsToShow) {
    productsContainer.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="product-badge">${product.badge}</div>`;
        }
        
        let originalPriceHTML = '';
        if (product.originalPrice) {
            originalPriceHTML = `<span class="original-price">$${product.originalPrice.toLocaleString()}</span>`;
        }
        
        productCard.innerHTML = `
            ${badgeHTML}
            <div class="product-image">
                <img src="images/products/${product.images[0]}" alt="${product.title}">
                <div class="product-actions">
                    <button class="action-btn quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toLocaleString()}</span>
                    ${originalPriceHTML}
                </div>
                <div class="product-category">${product.category.toUpperCase()}</div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            openQuickView(productId);
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(productId, 1);
        });
    });
}

// Filter products
function filterProducts() {
    const category = categoryFilter.value;
    const sortValue = sortBy.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch(sortValue) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // Assuming newer products have higher IDs
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    displayProducts(filteredProducts);
}

// Open quick view modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Set modal content
    document.getElementById('modal-product-title').textContent = product.title;
    document.getElementById('modal-product-price').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-sku').textContent = product.sku;
    document.getElementById('modal-product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    
    // Set main image
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = `images/products/${product.images[0]}`;
    mainImage.alt = product.title;
    
    // Set thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="images/products/${image}" alt="${product.title}">`;
        thumbnail.addEventListener('click', () => {
            mainImage.src = `images/products/${image}`;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        
        if (index === 0) thumbnail.classList.add('active');
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Set size options
    const sizeSelect = document.getElementById('size-select');
    sizeSelect.innerHTML = '<option value="">Select Size</option>';
    
    if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
    } else {
        sizeSelect.innerHTML = '<option value="One Size">One Size</option>';
    }
    
    // Quantity selector functionality
    const quantityInput = document.getElementById('quantity-input');
    const quantityMinus = document.querySelector('.quantity-minus');
    const quantityPlus = document.querySelector('.quantity-plus');
    
    quantityMinus.addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    quantityPlus.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    
    // Add to cart button in modal
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    modalAddToCart.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const size = sizeSelect.value;
        addToCart(productId, quantity, size);
        closeQuickView();
    });
    
    // Show modal
    quickViewModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close quick view modal
function closeQuickView() {
    quickViewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add to cart function
function addToCart(productId, quantity = 1, size = '') {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    
    if (existingItemIndex !== -1) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity,
            size
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.title} added to cart`);
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild