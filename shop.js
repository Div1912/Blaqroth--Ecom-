
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 1499,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "mens"
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 3,
    name: "Leather Watch",
    price: 8499,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
    category: "accessories"
  },
  {
    id: 4,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 5,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 6,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 7,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 8,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  {
    id: 9,
    name: "Elegant Summer Dress",
    price: 3999,  // Changed to rupees
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "womens"
  },
  // Add more products as needed
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam) {
    const checkbox = document.querySelector(`input[value="${categoryParam}"]`);
    if (checkbox) checkbox.checked = true;
  }

  // Update price range max value for rupees
  const priceRange = document.getElementById('priceRange');
  priceRange.max = "10000"; // Adjusted max price in rupees
  priceRange.value = "5000"; // Adjusted default value
  document.getElementById('priceValue').textContent = "₹5,000"; // Set initial display

  renderProducts(products);
  initializeFilters();
});

// Format price in Indian Rupees
function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

// Render products
function renderProducts(productsToRender) {
  const productsGrid = document.querySelector('.products-grid');
  productsGrid.innerHTML = '';

  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card animate-on-scroll';
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-details">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });

  // Initialize animation observer for new products
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

// Initialize filters
function initializeFilters() {
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const sortSelect = document.getElementById('sort');
  const filterInputs = document.querySelectorAll('.filter-section input');

  // Price range with rupee formatting
  priceRange.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    priceValue.textContent = formatPrice(value);
  });

  // Sort products
  sortSelect.addEventListener('change', (e) => {
    const sortedProducts = [...products].sort((a, b) => {
      switch(e.target.value) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
    renderProducts(sortedProducts);
  });

  // Apply filters button
  document.querySelector('.filters .btn-primary').addEventListener('click', () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(input => input.value);
    
    const maxPrice = parseInt(priceRange.value);

    let filteredProducts = products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    filteredProducts = filteredProducts.filter(product => 
      product.price <= maxPrice
    );

    renderProducts(filteredProducts);
  });
}

// Cart functionality
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
      cartCount++;
      updateCart(cartCount);
      
      // Show confirmation
      e.target.textContent = 'Added to Cart';
      e.target.disabled = true;
      setTimeout(() => {
        e.target.textContent = 'Add to Cart';
        e.target.disabled = false;
      }, 2000);
    }
  }
});