document.addEventListener("DOMContentLoaded", () => {
  // Initialize product page
  initProductPage();
  initGallery();
  initColorOptions();
  initSizeOptions();
  initQuantity();
  initAccordion();
  initModals();
  initAddToCart();
});

// Initialize product page with data from URL
function initProductPage() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // In a real app, you would fetch product data from an API
  // For this demo, we'll use the product ID to set a mock product

  if (productId) {
    // Simulate product data fetch
    fetchProductData(productId);
  }
}

// Simulate fetching product data
function fetchProductData(productId) {
  // In a real app, this would be an API call
  // For simplicity, we'll just set mock data

  const mockProducts = {
    1: {
      name: "Minimalist Linen Shirt",
      price: 59,
      category: "mens",
      description:
        "Pure linen shirt with a relaxed fit and minimal details for an effortless look. Perfect for warm weather, this breathable piece offers comfort with a refined aesthetic.",
    },
    2: {
      name: "Cotton Blend T-Shirt",
      price: 35,
      category: "mens",
      description:
        "Soft cotton blend t-shirt with a clean, modern cut. Essential for everyday wear with a comfortable fit and minimal design.",
    },
    3: {
      name: "Relaxed Fit Trousers",
      price: 75,
      category: "mens",
      description:
        "Comfortable trousers with a relaxed silhouette and clean lines. Versatile design that pairs well with any top in your wardrobe.",
    },
    4: {
      name: "Organic Cotton Dress",
      price: 89,
      category: "womens",
      description:
        "Elegant dress made from organic cotton with minimal design elements. Flattering silhouette with attention to sustainable materials.",
    },
  };

  // Get product data
  const product = mockProducts[productId] || mockProducts["1"];

  // Update page with product data
  updateProductInfo(product);
}

// Update product information on the page
function updateProductInfo(product) {
  // Update title and meta
  document.title = `${product.name} | MINIMA`;

  // Update product information
  const productTitle = document.getElementById("productTitle");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const productCategory = document.getElementById("productCategory");
  const productName = document.getElementById("productName");

  if (productTitle) productTitle.textContent = product.name;
  if (productPrice) productPrice.textContent = `$${product.price}`;
  if (productDescription)
    productDescription.innerHTML = `<p>${product.description}</p>`;
  if (productCategory)
    productCategory.textContent = getCategoryLabel(product.category);
  if (productName) productName.textContent = product.name;
}

// Get readable category label
function getCategoryLabel(category) {
  const labels = {
    womens: "Women's",
    mens: "Men's",
    accessories: "Accessories",
    footwear: "Footwear",
  };

  return labels[category] || "Shop";
}

// Initialize gallery
function initGallery() {
  const mainImage = document.getElementById("mainImage");
  const mainImageSrc = document.getElementById("mainImageSrc");
  const thumbnails = document.querySelectorAll(".gallery-thumbnail");

  if (!mainImage || !mainImageSrc || thumbnails.length === 0) return;

  // Set up thumbnail clicks
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      thumbnail.classList.add("active");

      // Update main image
      const imageUrl = thumbnail.dataset.image;
      mainImageSrc.src = imageUrl;

      // Fade effect
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.style.opacity = 1;
      }, 10);
    });
  });

  // Set up image zoom
  mainImage.addEventListener("click", () => {
    openImageZoom(mainImageSrc.src);
  });
}

// Open image zoom modal
function openImageZoom(imageUrl) {
  const modal = document.getElementById("imageZoomModal");
  const zoomedImage = document.getElementById("zoomedImage");

  if (!modal || !zoomedImage) return;

  // Set image source
  zoomedImage.src = imageUrl;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Initialize color options
function initColorOptions() {
  const colorOptions = document.querySelectorAll(".color-option");
  const selectedColor = document.getElementById("selectedColor");

  if (colorOptions.length === 0 || !selectedColor) return;

  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove active class from all options
      colorOptions.forEach((o) => o.classList.remove("active"));

      // Add active class to clicked option
      option.classList.add("active");

      // Update selected color text
      selectedColor.textContent = option.dataset.color;
    });
  });
}

// Initialize size options
function initSizeOptions() {
  const sizeOptions = document.querySelectorAll(".size-option");
  const selectedSize = document.getElementById("selectedSize");

  if (sizeOptions.length === 0 || !selectedSize) return;

  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove active class from all options
      sizeOptions.forEach((o) => o.classList.remove("active"));

      // Add active class to clicked option
      option.classList.add("active");

      // Update selected size text
      selectedSize.textContent = option.dataset.size;
    });
  });
}

// Initialize quantity selector
function initQuantity() {
  const decrementBtn = document.querySelector(".quantity-btn.decrement");
  const incrementBtn = document.querySelector(".quantity-btn.increment");
  const quantityInput = document.querySelector(".quantity-input");

  if (!decrementBtn || !incrementBtn || !quantityInput) return;

  decrementBtn.addEventListener("click", () => {
    let value = parseInt(quantityInput.value);
    value = Math.max(1, value - 1);
    quantityInput.value = value;
  });

  incrementBtn.addEventListener("click", () => {
    let value = parseInt(quantityInput.value);
    value = Math.min(10, value + 1);
    quantityInput.value = value;
  });

  quantityInput.addEventListener("change", () => {
    let value = parseInt(quantityInput.value);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    quantityInput.value = value;
  });
}

// Initialize accordions
function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  if (accordionHeaders.length === 0) return;

  accordionHeaders.forEach((header) => {
    // Set initial state
    const content = header.nextElementSibling;

    // Default first one to open
    if (header === accordionHeaders[0]) {
      header.setAttribute("aria-expanded", "true");
      content.style.display = "block";
    } else {
      header.setAttribute("aria-expanded", "false");
      content.style.display = "none";
    }

    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // Toggle state
      header.setAttribute("aria-expanded", !isExpanded);

      // Toggle content visibility
      if (isExpanded) {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}

// Initialize modals
function initModals() {
  // Size guide modal
  const sizeGuideBtn = document.getElementById("sizeGuideBtn");
  const sizeGuideModal = document.getElementById("sizeGuideModal");

  if (sizeGuideBtn && sizeGuideModal) {
    sizeGuideBtn.addEventListener("click", () => {
      openModal(sizeGuideModal);
    });
  }

  // Close buttons for all modals
  const closeButtons = document.querySelectorAll(".modal-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  // Close on click outside
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

// Open modal
function openModal(modal) {
  if (!modal) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Initialize add to cart
function initAddToCart() {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const addedToCartModal = document.getElementById("addedToCartModal");

  if (!addToCartBtn || !addedToCartModal) return;

  addToCartBtn.addEventListener("click", () => {
    // Get selected options
    const selectedColor = document.getElementById("selectedColor").textContent;
    const selectedSize = document.getElementById("selectedSize").textContent;
    const quantity = document.querySelector(".quantity-input").value;

    // Validate selections
    if (selectedSize === "Select a size") {
      alert("Please select a size");
      return;
    }

    // Update cart count
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent =
        parseInt(cartCount.textContent) + parseInt(quantity);
    }

    // Update modal content
    const addedProductName = document.getElementById("addedProductName");
    const addedProductDetails = document.getElementById("addedProductDetails");
    const addedProductPrice = document.getElementById("addedProductPrice");

    if (addedProductName && addedProductDetails && addedProductPrice) {
      const productTitle = document.getElementById("productTitle").textContent;
      const productPrice = document.getElementById("productPrice").textContent;

      addedProductName.textContent = productTitle;
      addedProductDetails.textContent = `Color: ${selectedColor}, Size: ${selectedSize}, Qty: ${quantity}`;
      addedProductPrice.textContent = productPrice;
    }

    // Show modal
    openModal(addedToCartModal);
  });

  // Add wishlist functionality
  const wishlistBtn = document.querySelector(".wishlist-btn");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      wishlistBtn.classList.toggle("active");

      // Animation effect
      wishlistBtn.classList.add("pulse");
      setTimeout(() => {
        wishlistBtn.classList.remove("pulse");
      }, 300);
    });
  }
}

// Add animation for "Add to Cart" button
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Only apply the animation if the button is not disabled
      if (!addToCartBtn.disabled) {
        // Add animation class
        addToCartBtn.classList.add("btn-animate");

        // Remove animation class after animation completes
        setTimeout(() => {
          addToCartBtn.classList.remove("btn-animate");
        }, 300);
      }
    });
  }
});
