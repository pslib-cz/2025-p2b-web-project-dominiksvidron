const products = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    brand: "Jordan",
    price: 180,
    image: "assets/images/sneaker_1.png",
    category: "High-Top",
    description: "The classic that started it all. The Air Jordan 1 Retro High offers premium leather and iconic styling for the ultimate streetwear look."
  },
  {
    id: 2,
    name: "Yeezy Boost 700 V2",
    brand: "Adidas",
    price: 300,
    image: "assets/images/sneaker_2.png",
    category: "Chunky",
    description: "Step into the future with the Yeezy Boost 700 V2. Featuring a bold, chunky silhouette and neon blue accents for a true statement piece."
  },
  {
    id: 3,
    name: "Nike Air Max Plus Triple Black",
    brand: "Nike",
    price: 175,
    image: "assets/images/sneaker_3.png",
    category: "Runner",
    description: "Sleek, futuristic, and comfortable. The Air Max Plus in Triple Black brings reflective details and legendary cushioning."
  },
  {
    id: 4,
    name: "Nike Dunk Low Retro",
    brand: "Nike",
    price: 110,
    image: "assets/images/sneaker_4.png",
    category: "Low-Top",
    description: "A retro classic returning to the streets. The Dunk Low features a clean white and crimson red colorway, perfect for any outfit."
  },
  {
    id: 5,
    name: "Vans Old Skool Pro",
    brand: "Vans",
    price: 75,
    image: "assets/images/sneaker_5.png",
    category: "Skater",
    description: "The definitive skate shoe. Built for durability and grip, featuring iconic styling that looks good on and off the board."
  },
  {
    id: 6,
    name: "Air Jordan 1 'Bred' Edition",
    brand: "Jordan",
    price: 200,
    image: "https://loremflickr.com/600/600/sneaker,jordan?lock=1",
    category: "High-Top",
    description: "An alternate take on the legendary classic. Featuring premium materials and iconic color-blocking."
  },
  {
    id: 7,
    name: "Yeezy 700 'Wave Runner'",
    brand: "Adidas",
    price: 320,
    image: "https://loremflickr.com/600/600/sneaker,yeezy?lock=1",
    category: "Chunky",
    description: "The silhouette that defined the chunky shoe era. Unmatched comfort and aggressive styling."
  },
  {
    id: 8,
    name: "Nike Air Max Plus 'Midnight'",
    brand: "Nike",
    price: 185,
    image: "https://loremflickr.com/600/600/sneaker,nike?lock=1",
    category: "Runner",
    description: "Tuned Air cushioning combined with a sleek, stealthy colorway perfect for night runs."
  },
  {
    id: 9,
    name: "Nike Dunk Low 'Chicago'",
    brand: "Nike",
    price: 130,
    image: "https://loremflickr.com/600/600/sneaker,dunk?lock=1",
    category: "Low-Top",
    description: "Bringing the classic Chicago hues to the iconic Dunk Low profile. A staple for every rotation."
  },
  {
    id: 10,
    name: "Vans Sk8-Hi Pro",
    brand: "Vans",
    price: 85,
    image: "https://loremflickr.com/600/600/sneaker,vans?lock=1",
    category: "Skater",
    description: "Upgraded for enhanced performance. The Sk8-Hi Pro delivers ultimate boardfeel and ankle support."
  }
];


let cart = JSON.parse(localStorage.getItem('apexkicks_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('apexkicks_wishlist')) || [];
let currentFilter = 'All';


const appContainer = document.getElementById('app');
const cartBadge = document.getElementById('cart-badge');
const wishlistBadge = document.getElementById('wishlist-badge');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


function init() {
  updateBadges();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);


  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });


    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}


function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const route = parts[0];
  const param = parts.length > 1 ? decodeURIComponent(parts[1]) : null;

  switch (route) {
    case 'home':
      renderHome();
      break;
    case 'shop':
      if (param) {
        currentFilter = param;
      } else {


        currentFilter = 'All';
      }
      renderShop();
      break;
    case 'product':
      renderProductDetail(parseInt(param));
      break;
    case 'cart':
      renderCart();
      break;
    case 'wishlist':
      renderWishlist();
      break;
    case 'about':
      renderAbout();
      break;
    case 'contact':
      renderContact();
      break;
    default:
      renderHome();
  }
  window.scrollTo(0, 0);
  updateActiveNav(route);
}

function updateActiveNav(route) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');

    if (a.getAttribute('href').startsWith(`#${route}`)) {
      a.classList.add('active');
    }
  });
}


function renderHome() {
  appContainer.innerHTML = `
    <section class="hero container">
      <div class="hero-content">
        <h1 class="heading-lg">Step Into The <br><span class="text-gradient">Future</span> Of<br>Streetwear</h1>
        <p class="text-muted" style="font-size: 1.2rem; margin-bottom: 2rem;">Discover exclusive drops, limited editions, and the most hyped sneakers on the planet.</p>
        <a href="#shop" class="btn btn-primary">Shop Now</a>
      </div>
      <div class="hero-image">
        <img src="assets/images/hero.png" alt="Featured Sneaker">
      </div>
    </section>

    <section class="section container">
      <h2 class="heading-md">Latest Drops</h2>
      <div class="product-grid">
        ${products.slice(0, 4).map(p => getProductCardHTML(p)).join('')}
      </div>
    </section>
  `;
}

function renderShop() {
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = currentFilter === 'All'
    ? products
    : products.filter(p => p.category === currentFilter);

  appContainer.innerHTML = `
    <div class="container section">
      <h2 class="heading-md">Shop Collection</h2>
      <div class="filters">
        ${categories.map(cat => `
          <button class="filter-btn ${currentFilter === cat ? 'active' : ''}" onclick="window.location.hash='shop/${encodeURIComponent(cat)}'">${cat}</button>
        `).join('')}
      </div>
      <div class="product-grid">
        ${filteredProducts.length > 0
      ? filteredProducts.map(p => getProductCardHTML(p)).join('')
      : '<p>No products found.</p>'}
      </div>
    </div>
  `;
}

function renderProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return renderHome();

  const inWishlist = wishlist.some(item => item.id === id);

  appContainer.innerHTML = `
    <div class="container section">
      <a href="#shop" style="color: var(--text-muted);"><i class="fas fa-arrow-left"></i> Back to Shop</a>
      <div class="product-detail-container">
        <div class="product-detail-image">
          <img src="${product.image}" alt="${product.name}" style="border-radius: 8px;">
        </div>
        <div class="product-detail-info">
          <div class="brand">${product.brand}</div>
          <h1 class="title">${product.name}</h1>
          <div class="price">$${product.price}</div>
          <p class="desc">${product.description}</p>
          
          <div class="size-selector">
            <h4>Select Size (US)</h4>
            <div class="sizes">
              ${[7, 8, 9, 10, 11, 12].map(size => `
                <button class="size-btn" onclick="selectSize(this)">${size}</button>
              `).join('')}
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary" style="flex-grow: 1" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="btn btn-icon" onclick="toggleWishlist(${product.id})" style="width: 50px; height: 50px; color: ${inWishlist ? 'var(--accent-red)' : 'white'}">
              <i class="${inWishlist ? 'fas' : 'far'} fa-heart" style="font-size: 1.2rem;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCart() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  appContainer.innerHTML = `
    <div class="container section">
      <h2 class="heading-md">Shopping Cart</h2>
      ${cart.length === 0 ? `
        <div class="empty-state">
          <i class="fas fa-shopping-cart" style="font-size: 4rem; margin-bottom: 1rem; color: #333;"></i>
          <h3>Your cart is empty</h3>
          <p style="margin: 1rem 0 2rem;">Looks like you haven't added any heat to your cart yet.</p>
          <a href="#shop" class="btn btn-primary">Start Shopping</a>
        </div>
      ` : `
        <div class="cart-container">
          <div class="cart-items">
            ${cart.map(item => `
              <div class="cart-item">
                <div class="cart-item-img">
                  <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-title">${item.name}</div>
                  <div style="color: var(--text-muted); font-size: 0.9rem;">Size: ${item.selectedSize || '10'}</div>
                  <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="cart-item-qty">
                  <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                  <span>${item.quantity}</span>
                  <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
              </div>
            `).join('')}
          </div>
          <div class="cart-summary">
            <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${total}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span style="color: var(--accent-blue);">$${total}</span>
            </div>
            <button class="btn btn-primary checkout-btn" onclick="alert('Checkout functionality coming soon!')">Proceed to Checkout</button>
          </div>
        </div>
      `}
    </div>
  `;
}

function renderWishlist() {
  appContainer.innerHTML = `
    <div class="container section">
      <h2 class="heading-md">Your Wishlist</h2>
      ${wishlist.length === 0 ? `
        <div class="empty-state">
          <i class="far fa-heart" style="font-size: 4rem; margin-bottom: 1rem; color: #333;"></i>
          <h3>Your wishlist is empty</h3>
          <p style="margin: 1rem 0 2rem;">Save your favorite drops here.</p>
          <a href="#shop" class="btn btn-primary">Explore Drops</a>
        </div>
      ` : `
        <div class="product-grid">
          ${wishlist.map(p => getProductCardHTML(p)).join('')}
        </div>
      `}
    </div>
  `;
}

function renderAbout() {
  appContainer.innerHTML = `
    <div class="container section" style="max-width: 800px;">
      <h2 class="heading-md text-center">About ApexKicks</h2>
      <img src="assets/images/hero.png" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; background: #111;">
      <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
        Founded in 2026, ApexKicks is the premier destination for high-end streetwear and exclusive sneaker drops. We believe that sneakers are more than just footwear—they are a culture, an art form, and a statement.
      </p>
      <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted);">
        Our mission is to provide sneakerheads with 100% authentic, hard-to-find pairs with an unparalleled shopping experience. Welcome to the future of streetwear.
      </p>
    </div>
  `;
}

function renderContact() {
  appContainer.innerHTML = `
    <div class="container section" style="max-width: 600px;">
      <h2 class="heading-md text-center">Contact Us</h2>
      <form onsubmit="event.preventDefault(); alert('Message sent successfully!'); this.reset();">
        <div class="form-group">
          <label style="display:block; margin-bottom: 0.5rem;">Name</label>
          <input type="text" class="form-control" required placeholder="Enter your name">
        </div>
        <div class="form-group">
          <label style="display:block; margin-bottom: 0.5rem;">Email</label>
          <input type="email" class="form-control" required placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label style="display:block; margin-bottom: 0.5rem;">Message</label>
          <textarea class="form-control" required placeholder="How can we help?"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
      </form>
    </div>
  `;
}


function getProductCardHTML(product) {
  const inWishlist = wishlist.some(item => item.id === product.id);
  return `
    <div class="product-card" onclick="window.location.hash = 'product/${product.id}'">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-brand">${product.brand}</div>
      <div class="product-title">${product.name}</div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="product-price">$${product.price}</div>
        <button class="btn-icon" onclick="event.stopPropagation(); toggleWishlist(${product.id})" style="color: ${inWishlist ? 'var(--accent-red)' : 'white'};">
          <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
    </div>
  `;
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const activeSizeBtn = document.querySelector('.size-btn.active');

  if (!activeSizeBtn) {
    alert('Please select a size before adding to cart.');

    const sizeSelector = document.querySelector('.size-selector');
    sizeSelector.style.border = '1px solid var(--accent-red)';
    sizeSelector.style.padding = '1rem';
    sizeSelector.style.borderRadius = '8px';
    setTimeout(() => {
      sizeSelector.style.border = 'none';
      sizeSelector.style.padding = '0';
    }, 2000);
    return;
  }

  const size = activeSizeBtn.innerText;

  const existingItem = cart.find(item => item.id === id && item.selectedSize === size);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1, selectedSize: size });
  }

  saveState();


  const btn = document.querySelector('.action-buttons .btn-primary');
  const originalText = btn.innerText;
  btn.innerText = 'Added!';
  btn.style.backgroundColor = '#4caf50';
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.backgroundColor = '';
  }, 1500);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveState();
  renderCart();
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveState();
      renderCart();
    }
  }
}

function toggleWishlist(id) {
  const product = products.find(p => p.id === id);
  const index = wishlist.findIndex(item => item.id === id);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(product);
  }

  saveState();


  const hash = window.location.hash.slice(1);
  if (hash.startsWith('product/')) renderProductDetail(id);
  else if (hash === 'wishlist') renderWishlist();
  else if (hash.startsWith('shop')) renderShop();
  else if (hash === 'home' || hash === '') renderHome();
}

function saveState() {
  localStorage.setItem('apexkicks_cart', JSON.stringify(cart));
  localStorage.setItem('apexkicks_wishlist', JSON.stringify(wishlist));
  updateBadges();
}

function updateBadges() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.innerText = cartCount;
  cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';

  wishlistBadge.innerText = wishlist.length;
  wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
}


document.addEventListener('DOMContentLoaded', init);
