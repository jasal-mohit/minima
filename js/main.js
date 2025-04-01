document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  initMobileNav();
  initSearchOverlay();
  initCookieBanner();
  initNewArrivals();
  initScrollButtons();
  initNewsletterForm();
  initThemeToggle();
  initCart();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (!themeToggle) return;

  // Check for saved user preference
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme or check user's system preference
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-theme");
  }

  // Add transition class after initial load to prevent flash on page load
  setTimeout(() => {
    document.body.classList.add("theme-transition");
  }, 100);

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    // Toggle dark class on body
    document.body.classList.toggle("dark-theme");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// Mobile Navigation
function initMobileNav() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.querySelector(".mobile-nav__close");

  if (!menuToggle || !mobileNav || !closeBtn) return;

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close on click outside
  document.addEventListener("click", (e) => {
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Search Overlay
function initSearchOverlay() {
  const searchBtn = document.querySelector(".search-btn");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeBtn = document.querySelector(".search-overlay__close");
  const searchInput = document.querySelector(".search-form input");

  if (!searchBtn || !searchOverlay || !closeBtn || !searchInput) return;

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });

  closeBtn.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Search form submission
  const searchForm = document.querySelector(".search-form");
  const searchResults = document.querySelector(".search-results");

  if (searchForm && searchResults) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();

      if (query.length > 0) {
        // Simulate search - in a real app, this would be an API call
        simulateSearch(query, searchResults);
      }
    });
  }
}

// Simulate search results
function simulateSearch(query, resultsContainer) {
  // In a real app, this would fetch from an API
  const demoProducts = [
    {
      name: "Minimalist Linen Shirt",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    },
    {
      name: "Cotton Blend T-Shirt",
      price: "$35",
      image:
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    {
      name: "Relaxed Fit Trousers",
      price: "$75",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
    },
    {
      name: "Organic Cotton Dress",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  ];

  // Simple filtering for demo purposes
  const filteredProducts = demoProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Add loading state
  resultsContainer.innerHTML = '<div class="loading">Searching...</div>';

  // Simulate network delay
  setTimeout(() => {
    if (filteredProducts.length > 0) {
      resultsContainer.innerHTML = filteredProducts
        .map(
          (product) => `
                <a href="pages/product.html" class="search-result">
                    <div class="search-result__image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="search-result__info">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                </a>
            `
        )
        .join("");
    } else {
      resultsContainer.innerHTML = `<p class="no-results">No products found matching "${query}"</p>`;
    }
  }, 500);
}

// Cookie Banner
function initCookieBanner() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const declineBtn = document.getElementById("cookieDecline");

  if (!cookieBanner || !acceptBtn || !declineBtn) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieChoice");

  if (!cookieChoice) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add("active");
    }, 1000);
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieChoice", "accepted");
    cookieBanner.classList.remove("active");
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookieChoice", "declined");
    cookieBanner.classList.remove("active");
  });
}

// Populate New Arrivals
function initNewArrivals() {
  const productsRow = document.querySelector(".products-row");

  if (!productsRow) return;

  // Demo products - in a real app, this would come from an API
  const products = [
    {
      name: "Minimalist Linen Shirt",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    },
    {
      name: "Cotton Blend T-Shirt",
      price: "$35",
      image:
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    {
      name: "Relaxed Fit Trousers",
      price: "$75",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
    },
    {
      name: "Organic Cotton Dress",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      name: "Wool Blend Coat",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
    {
      name: "Premium Denim Jeans",
      price: "$85",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    },
  ];

  // Create product cards
  productsRow.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__price">${product.price}</p>
            </div>
        </div>
    `
    )
    .join("");
}

// Horizontal scroll buttons
function initScrollButtons() {
  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");
  const productsRow = document.querySelector(".products-row");

  if (!scrollLeftBtn || !scrollRightBtn || !productsRow) return;

  const scrollAmount = 320; // Approx width of product card + gap

  scrollLeftBtn.addEventListener("click", () => {
    productsRow.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  scrollRightBtn.addEventListener("click", () => {
    productsRow.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
}

// Newsletter form submission
function initNewsletterForm() {
  const form = document.querySelector(".newsletter__form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email) {
      // In a real app, this would send the email to a server

      // Show success message
      const formContent = form.innerHTML;
      form.innerHTML =
        '<p class="success-message">Thank you for subscribing!</p>';

      // Reset form after delay
      setTimeout(() => {
        form.innerHTML = formContent;
        initNewsletterForm(); // Re-initialize the form
      }, 3000);
    }
  });
}

// Intersection Observer for fade-in animations
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    fadeElements.forEach((element) => {
      fadeObserver.observe(element);
    });
  }
});

// Lazy Loading images (using native loading="lazy" in modern browsers)
// This is a fallback for browsers that don't support native lazy loading
document.addEventListener("DOMContentLoaded", () => {
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }

  // Fallback for browsers without native lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

// Cart functionality
function initCart() {
  // Initialize cart count on page load
  updateCartCount();

  // Add event listeners to cart buttons
  const cartBtns = document.querySelectorAll(".cart-btn");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartClose = document.querySelector(".cart-sidebar__close");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartContinueShopping = document.querySelector(
    ".cart-continue-shopping"
  );
  const checkoutBtn = document.querySelector(".cart-checkout-btn");

  if (cartBtns.length) {
    cartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleCartSidebar(true);
      });
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", () => {
      toggleCartSidebar(false);
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      toggleCartSidebar(false);
    });
  }

  if (cartContinueShopping) {
    cartContinueShopping.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCartSidebar(false);
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      // In a real app, this would navigate to the checkout page
      alert("Proceeding to checkout...");
    });
  }

  // Add to cart functionality for "Add to Cart" buttons throughout the site
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  if (addToCartBtns.length) {
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get product details
        const productCard = btn.closest(".product-card");
        if (!productCard) return;

        const productImage = productCard.querySelector("img").src;
        const productName = productCard.querySelector(
          ".product-card__title"
        ).textContent;
        const productPrice = productCard.querySelector(
          ".product-card__price"
        ).textContent;
        const productId =
          btn.dataset.productId || Math.random().toString(36).substring(2, 15);

        // Create product object
        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
        };

        // Add to cart
        addToCart(product);
      });
    });
  }
}

function addToCart(product) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product is already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex >= 0) {
    // If product is already in cart, increment quantity
    cart[existingProductIndex].quantity += 1;
  } else {
    // Add product to cart with quantity 1
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Show cart sidebar
  toggleCartSidebar(true);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart count in header
  const cartCountElems = document.querySelectorAll(".cart-count");
  if (cartCountElems.length) {
    cartCountElems.forEach((elem) => {
      elem.textContent = cartCount;

      // Show/hide count
      if (cartCount > 0) {
        elem.style.display = "flex";
      } else {
        elem.style.display = "none";
      }
    });
  }
}

function toggleCartSidebar(show) {
  const cartSidebar = document.getElementById("cartSidebar");
  const body = document.body;

  if (!cartSidebar) return;

  if (show) {
    cartSidebar.classList.add("active");
    body.classList.add("cart-open");
    updateCartItems();
  } else {
    cartSidebar.classList.remove("active");
    body.classList.remove("cart-open");
  }
}

function updateCartItems() {
  const cartItemsContainer = document.querySelector(".cart-sidebar__items");
  if (!cartItemsContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Your cart is empty</div>';
    updateCartSummary(0);
    return;
  }

  // Clear cart items
  cartItemsContainer.innerHTML = "";

  // Add cart items
  let subtotal = 0;

  cart.forEach((item) => {
    const itemPrice = parseFloat(item.price.replace("$", ""));
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item__image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item__content">
        <h3 class="cart-item__title">${item.name}</h3>
        <div class="cart-item__price">${item.price}</div>
        <div class="cart-item__quantity">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    cartItemsContainer.appendChild(cartItem);

    // Add event listeners
    const minusBtn = cartItem.querySelector(".minus");
    const plusBtn = cartItem.querySelector(".plus");
    const removeBtn = cartItem.querySelector(".cart-item__remove");

    minusBtn.addEventListener("click", () => {
      updateCartItemQuantity(item.id, -1);
    });

    plusBtn.addEventListener("click", () => {
      updateCartItemQuantity(item.id, 1);
    });

    removeBtn.addEventListener("click", () => {
      removeCartItem(item.id);
    });
  });

  // Update cart summary
  updateCartSummary(subtotal);
}

function updateCartItemQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += change;

  if (cart[itemIndex].quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart = cart.filter((item) => item.id !== productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartItems();
}

function removeCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartItems();
}

function updateCartSummary(subtotal) {
  const subtotalElem = document.querySelector(".cart-summary__subtotal .value");
  const shippingElem = document.querySelector(".cart-summary__shipping .value");
  const totalElem = document.querySelector(".cart-summary__total .value");

  if (!subtotalElem || !shippingElem || !totalElem) return;

  // Calculate shipping (free over $100)
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  // Update summary
  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  shippingElem.textContent =
    shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;
}
