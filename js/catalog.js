document.addEventListener("DOMContentLoaded", () => {
  // Initialize catalog page
  initProducts();
  initFilters();
  initViewToggle();
  initSorting();
  initMobileFilters();
  initPagination();
});

// Mock product data
const products = [
  {
    id: 1,
    name: "Minimalist Linen Shirt",
    price: 59,
    image: "../images/product-1.jpg",
    category: "mens",
    colors: ["white", "beige", "black"],
    sizes: ["s", "m", "l", "xl"],
    description:
      "Pure linen shirt with a relaxed fit and minimal details for an effortless look.",
  },
  {
    id: 2,
    name: "Cotton Blend T-Shirt",
    price: 35,
    image: "../images/product-2.jpg",
    category: "mens",
    colors: ["white", "gray", "lavender"],
    sizes: ["xs", "s", "m", "l", "xl"],
    description: "Soft cotton blend t-shirt with a clean, modern cut.",
  },
  {
    id: 3,
    name: "Relaxed Fit Trousers",
    price: 75,
    image: "../images/product-3.jpg",
    category: "mens",
    colors: ["black", "beige", "gray"],
    sizes: ["s", "m", "l", "xl"],
    description:
      "Comfortable trousers with a relaxed silhouette and clean lines.",
  },
  {
    id: 4,
    name: "Organic Cotton Dress",
    price: 89,
    image: "../images/product-4.jpg",
    category: "womens",
    colors: ["white", "lavender", "beige"],
    sizes: ["xs", "s", "m", "l"],
    description:
      "Elegant dress made from organic cotton with minimal design elements.",
  },
  {
    id: 5,
    name: "Wool Blend Coat",
    price: 120,
    image: "../images/product-5.jpg",
    category: "womens",
    colors: ["black", "beige"],
    sizes: ["s", "m", "l"],
    description:
      "Timeless wool blend coat with clean lines and a minimalist design.",
  },
  {
    id: 6,
    name: "Premium Denim Jeans",
    price: 85,
    image: "../images/product-6.jpg",
    category: "womens",
    colors: ["black", "gray"],
    sizes: ["xs", "s", "m", "l", "xl"],
    description:
      "Premium denim jeans with a comfortable fit and minimal detailing.",
  },
  {
    id: 7,
    name: "Canvas Tote Bag",
    price: 45,
    image: "../images/product-7.jpg",
    category: "accessories",
    colors: ["white", "black", "beige"],
    sizes: [],
    description: "Minimalist canvas tote bag, perfect for everyday use.",
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 55,
    image: "../images/product-8.jpg",
    category: "accessories",
    colors: ["black", "beige"],
    sizes: [],
    description:
      "Sleek leather wallet with minimal design and multiple card slots.",
  },
  {
    id: 9,
    name: "Minimalist Sneakers",
    price: 95,
    image: "../images/product-9.jpg",
    category: "footwear",
    colors: ["white", "black", "gray"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description: "Clean, minimalist sneakers made from premium materials.",
  },
];

// Current filter and sort state
const state = {
  filters: {
    category: [],
    color: [],
    size: [],
    priceMin: 0,
    priceMax: 300,
  },
  sort: "featured",
  view: "grid",
  page: 1,
};

// Initialize products
function initProducts() {
  const productsContainer = document.getElementById("productsContainer");

  if (!productsContainer) return;

  // Show loading skeleton first
  showLoadingSkeleton(productsContainer);

  // Simulate network delay for loading products
  setTimeout(() => {
    renderProducts(products, productsContainer);
  }, 800);
}

// Show loading skeleton
function showLoadingSkeleton(container) {
  let skeletonHTML = "";

  for (let i = 0; i < 6; i++) {
    skeletonHTML += `
            <div class="product-card">
                <div class="product-card__image skeleton" style="height: 300px;"></div>
                <div class="product-card__content">
                    <div class="skeleton" style="height: 24px; width: 80%; margin-bottom: 8px;"></div>
                    <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: 16px;"></div>
                    <div class="skeleton" style="height: 36px; width: 100%;"></div>
                </div>
            </div>
        `;
  }

  container.innerHTML = skeletonHTML;
}

// Render products
function renderProducts(products, container) {
  if (products.length === 0) {
    container.innerHTML = `
            <div class="no-products">
                <p>No products match your current filters. Try adjusting your filter criteria.</p>
                <button class="btn btn--primary clear-all-filters">Clear All Filters</button>
            </div>
        `;

    const clearButton = container.querySelector(".clear-all-filters");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        clearAllFilters();
      });
    }

    return;
  }

  let html = "";

  products.forEach((product) => {
    html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${
      product.name
    }" loading="lazy">
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__price">$${product.price}</p>
                    
                    ${
                      state.view === "list"
                        ? `<p class="product-card__description">${product.description}</p>`
                        : ""
                    }
                    
                    <div class="product-card__colors">
                        ${product.colors
                          .map(
                            (color) =>
                              `<span class="product-card__color" style="background-color: var(--color-${
                                color === "white" ? "background" : color
                              })"></span>`
                          )
                          .join("")}
                    </div>
                    
                    <div class="product-card__actions">
                        <a href="product.html?id=${
                          product.id
                        }" class="btn btn--outline">View Details</a>
                        <button class="btn btn--primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;

  // Add event listeners to Add to Cart buttons
  const addToCartButtons = container.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
}

// Handle Add to Cart click
function handleAddToCart(e) {
  const productCard = e.target.closest(".product-card");
  const productId = productCard.dataset.id;

  // Add to cart animation
  const button = e.target;
  button.innerHTML = "Added ✓";
  button.disabled = true;

  // Increment cart count
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
  }

  // Reset button after delay
  setTimeout(() => {
    button.innerHTML = "Add to Cart";
    button.disabled = false;
  }, 2000);

  // In a real app, you would send this to a cart service
  console.log(`Added product ID ${productId} to cart`);
}

// Initialize filters
function initFilters() {
  // Category filters
  const categoryCheckboxes = document.querySelectorAll(
    'input[name="category"]'
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateFilters();
    });
  });

  // Color filters
  const colorCheckboxes = document.querySelectorAll('input[name="color"]');
  colorCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateFilters();
    });
  });

  // Size filters
  const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
  sizeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateFilters();
    });
  });

  // Price range
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const inputMin = document.querySelector(".min-price");
  const inputMax = document.querySelector(".max-price");

  if (rangeMin && rangeMax && inputMin && inputMax) {
    // Range inputs to text inputs
    rangeMin.addEventListener("input", () => {
      inputMin.value = rangeMin.value;
      updatePriceRange();
    });

    rangeMax.addEventListener("input", () => {
      inputMax.value = rangeMax.value;
      updatePriceRange();
    });

    // Text inputs to range inputs
    inputMin.addEventListener("change", () => {
      rangeMin.value = inputMin.value;
      updatePriceRange();
    });

    inputMax.addEventListener("change", () => {
      rangeMax.value = inputMax.value;
      updatePriceRange();
    });
  }

  // Apply filters button
  const applyFiltersBtn = document.querySelector(".apply-filters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      applyFilters();
    });
  }

  // Clear filters
  const clearFiltersBtn = document.querySelector(".clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      clearAllFilters();
    });
  }

  // Check URL for initial filters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");

  if (categoryParam) {
    const checkbox = document.querySelector(
      `input[name="category"][value="${categoryParam}"]`
    );
    if (checkbox) {
      checkbox.checked = true;
      updateFilters();
      applyFilters();
    }
  }
}

// Update price range
function updatePriceRange() {
  const minVal = parseInt(document.querySelector(".range-min").value);
  const maxVal = parseInt(document.querySelector(".range-max").value);

  // Ensure min doesn't exceed max
  if (minVal > maxVal) {
    document.querySelector(".min-price").value = maxVal;
    document.querySelector(".range-min").value = maxVal;
  }
}

// Update filters state
function updateFilters() {
  // Categories
  const categoryCheckboxes = document.querySelectorAll(
    'input[name="category"]:checked'
  );
  state.filters.category = Array.from(categoryCheckboxes).map((cb) => cb.value);

  // Colors
  const colorCheckboxes = document.querySelectorAll(
    'input[name="color"]:checked'
  );
  state.filters.color = Array.from(colorCheckboxes).map((cb) => cb.value);

  // Sizes
  const sizeCheckboxes = document.querySelectorAll(
    'input[name="size"]:checked'
  );
  state.filters.size = Array.from(sizeCheckboxes).map((cb) => cb.value);

  // Price
  state.filters.priceMin = parseInt(document.querySelector(".min-price").value);
  state.filters.priceMax = parseInt(document.querySelector(".max-price").value);
}

// Apply filters
function applyFilters() {
  updateFilters();

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (
      state.filters.category.length > 0 &&
      !state.filters.category.includes(product.category)
    ) {
      return false;
    }

    // Color filter
    if (
      state.filters.color.length > 0 &&
      !state.filters.color.some((color) => product.colors.includes(color))
    ) {
      return false;
    }

    // Size filter
    if (
      state.filters.size.length > 0 &&
      !state.filters.size.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    // Price filter
    if (
      product.price < state.filters.priceMin ||
      product.price > state.filters.priceMax
    ) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = sortProducts(filteredProducts, state.sort);

  // Render products
  const productsContainer = document.getElementById("productsContainer");
  renderProducts(sortedProducts, productsContainer);

  // Update filter tags
  updateFilterTags();

  // Update filter count
  updateFilterCount();

  // Close mobile filters if open
  const mobileFilters = document.getElementById("mobileFilters");
  if (mobileFilters && mobileFilters.classList.contains("active")) {
    mobileFilters.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Update filter tags
function updateFilterTags() {
  const filterTagsContainer = document.querySelector(".filter-tags");
  if (!filterTagsContainer) return;

  let tagsHtml = "";

  // Category tags
  state.filters.category.forEach((category) => {
    tagsHtml += createFilterTag(
      "category",
      category,
      getCategoryLabel(category)
    );
  });

  // Color tags
  state.filters.color.forEach((color) => {
    tagsHtml += createFilterTag(
      "color",
      color,
      color.charAt(0).toUpperCase() + color.slice(1)
    );
  });

  // Size tags
  state.filters.size.forEach((size) => {
    tagsHtml += createFilterTag("size", size, size.toUpperCase());
  });

  // Price tag
  if (state.filters.priceMin > 0 || state.filters.priceMax < 300) {
    tagsHtml += createFilterTag(
      "price",
      "price",
      `$${state.filters.priceMin} - $${state.filters.priceMax}`
    );
  }

  filterTagsContainer.innerHTML = tagsHtml;

  // Add event listeners to remove tags
  const removeButtons =
    filterTagsContainer.querySelectorAll(".filter-tag button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const tag = e.target.closest(".filter-tag");
      const type = tag.dataset.type;
      const value = tag.dataset.value;

      removeFilter(type, value);
    });
  });
}

// Create a filter tag HTML
function createFilterTag(type, value, label) {
  return `
        <div class="filter-tag" data-type="${type}" data-value="${value}">
            ${label}
            <button aria-label="Remove filter">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    `;
}

// Get category label
function getCategoryLabel(category) {
  const labels = {
    womens: "Women's",
    mens: "Men's",
    accessories: "Accessories",
    footwear: "Footwear",
  };

  return labels[category] || category;
}

// Remove a specific filter
function removeFilter(type, value) {
  if (type === "category" || type === "color" || type === "size") {
    // Find and uncheck the corresponding checkbox
    const checkbox = document.querySelector(
      `input[name="${type}"][value="${value}"]`
    );
    if (checkbox) {
      checkbox.checked = false;
    }

    // Update state
    state.filters[type] = state.filters[type].filter((item) => item !== value);
  } else if (type === "price") {
    // Reset price range
    const rangeMin = document.querySelector(".range-min");
    const rangeMax = document.querySelector(".range-max");
    const inputMin = document.querySelector(".min-price");
    const inputMax = document.querySelector(".max-price");

    if (rangeMin && rangeMax && inputMin && inputMax) {
      rangeMin.value = 0;
      rangeMax.value = 300;
      inputMin.value = 0;
      inputMax.value = 300;

      state.filters.priceMin = 0;
      state.filters.priceMax = 300;
    }
  }

  // Apply filters
  applyFilters();
}

// Update filter count
function updateFilterCount() {
  const filterCount = document.querySelector(".filter-count");
  if (!filterCount) return;

  let count = 0;
  count += state.filters.category.length;
  count += state.filters.color.length;
  count += state.filters.size.length;
  if (state.filters.priceMin > 0 || state.filters.priceMax < 300) {
    count += 1;
  }

  filterCount.textContent =
    count === 1 ? "1 filter applied" : `${count} filters applied`;
}

// Clear all filters
function clearAllFilters() {
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reset price range
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const inputMin = document.querySelector(".min-price");
  const inputMax = document.querySelector(".max-price");

  if (rangeMin && rangeMax && inputMin && inputMax) {
    rangeMin.value = 0;
    rangeMax.value = 300;
    inputMin.value = 0;
    inputMax.value = 300;
  }

  // Reset state
  state.filters = {
    category: [],
    color: [],
    size: [],
    priceMin: 0,
    priceMax: 300,
  };

  // Apply filters
  applyFilters();
}

// Initialize view toggle
function initViewToggle() {
  const viewButtons = document.querySelectorAll(".view-option");
  const productsContainer = document.getElementById("productsContainer");

  if (!viewButtons.length || !productsContainer) return;

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Update state
      state.view = button.dataset.view;

      // Update products container class
      if (state.view === "grid") {
        productsContainer.classList.remove("list-view");
      } else {
        productsContainer.classList.add("list-view");
      }

      // Re-render products to show/hide descriptions
      applyFilters();
    });
  });
}

// Initialize sorting
function initSorting() {
  const sortSelect = document.getElementById("sort");

  if (!sortSelect) return;

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    applyFilters();
  });
}

// Sort products
function sortProducts(products, sortBy) {
  const productsCopy = [...products];

  switch (sortBy) {
    case "newest":
      // In a real app, you'd sort by date
      return productsCopy.reverse();
    case "price-low":
      return productsCopy.sort((a, b) => a.price - b.price);
    case "price-high":
      return productsCopy.sort((a, b) => b.price - a.price);
    case "featured":
    default:
      return productsCopy;
  }
}

// Initialize mobile filters
function initMobileFilters() {
  // Add a filter toggle button for mobile
  const catalogToolbar = document.querySelector(".catalog-toolbar");
  if (catalogToolbar) {
    const filterToggle = document.createElement("button");
    filterToggle.className = "filter-toggle";
    filterToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            Filters
        `;

    catalogToolbar.parentNode.insertBefore(filterToggle, catalogToolbar);

    filterToggle.addEventListener("click", () => {
      openMobileFilters();
    });
  }

  // Mobile filters drawer
  const mobileFilters = document.getElementById("mobileFilters");
  const closeBtn = document.querySelector(".mobile-filters-close");
  const mobileFiltersContent = document.querySelector(
    ".mobile-filters-content"
  );

  if (!mobileFilters || !closeBtn || !mobileFiltersContent) return;

  // Clone desktop filters into mobile drawer
  const desktopFilters = document.querySelector(".filters-card");
  if (desktopFilters) {
    mobileFiltersContent.innerHTML = desktopFilters.innerHTML;
  }

  // Close button
  closeBtn.addEventListener("click", () => {
    mobileFilters.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Apply and clear buttons
  const applyMobileFiltersBtn = document.getElementById("applyMobileFilters");
  const clearMobileFiltersBtn = document.getElementById("clearMobileFilters");

  if (applyMobileFiltersBtn) {
    applyMobileFiltersBtn.addEventListener("click", () => {
      // Sync mobile filter changes to desktop filters
      syncMobileFilters();
      applyFilters();
    });
  }

  if (clearMobileFiltersBtn) {
    clearMobileFiltersBtn.addEventListener("click", () => {
      clearAllFilters();
    });
  }
}

// Open mobile filters drawer
function openMobileFilters() {
  const mobileFilters = document.getElementById("mobileFilters");
  if (!mobileFilters) return;

  mobileFilters.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Sync mobile filters to desktop filters
function syncMobileFilters() {
  // Categories
  const mobileCategories = document.querySelectorAll(
    '#mobileFilters input[name="category"]'
  );
  const desktopCategories = document.querySelectorAll(
    '.filters-sidebar input[name="category"]'
  );

  mobileCategories.forEach((checkbox, index) => {
    desktopCategories[index].checked = checkbox.checked;
  });

  // Colors
  const mobileColors = document.querySelectorAll(
    '#mobileFilters input[name="color"]'
  );
  const desktopColors = document.querySelectorAll(
    '.filters-sidebar input[name="color"]'
  );

  mobileColors.forEach((checkbox, index) => {
    desktopColors[index].checked = checkbox.checked;
  });

  // Sizes
  const mobileSizes = document.querySelectorAll(
    '#mobileFilters input[name="size"]'
  );
  const desktopSizes = document.querySelectorAll(
    '.filters-sidebar input[name="size"]'
  );

  mobileSizes.forEach((checkbox, index) => {
    desktopSizes[index].checked = checkbox.checked;
  });

  // Price range
  const mobileMin = document.querySelector("#mobileFilters .min-price");
  const mobileMax = document.querySelector("#mobileFilters .max-price");
  const desktopMin = document.querySelector(".filters-sidebar .min-price");
  const desktopMax = document.querySelector(".filters-sidebar .max-price");
  const desktopRangeMin = document.querySelector(".filters-sidebar .range-min");
  const desktopRangeMax = document.querySelector(".filters-sidebar .range-max");

  if (
    mobileMin &&
    mobileMax &&
    desktopMin &&
    desktopMax &&
    desktopRangeMin &&
    desktopRangeMax
  ) {
    desktopMin.value = mobileMin.value;
    desktopMax.value = mobileMax.value;
    desktopRangeMin.value = mobileMin.value;
    desktopRangeMax.value = mobileMax.value;
  }
}

// Pagination settings
let currentPage = 1;
const itemsPerPage = 9;
let filteredProducts = [...products];

function loadProducts() {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) return;

  // Get applied filters - in a real app, this would be more sophisticated
  // For this demo, we'll just use all the products
  filteredProducts = [...products];

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);

  // Update products container
  productsContainer.innerHTML = "";

  if (pageProducts.length === 0) {
    productsContainer.innerHTML =
      '<div class="no-products">No products found matching your criteria.</div>';
    return;
  }

  pageProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });

  // Update pagination UI
  updatePaginationUI(totalPages);
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  productCard.innerHTML = `
    <div class="product-card__image">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-card__actions">
        <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      </div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">${product.name}</h3>
      <div class="product-card__price">${product.price}</div>
    </div>
  `;

  // Add event listeners
  const quickViewBtn = productCard.querySelector(".quick-view-btn");
  const addToCartBtn = productCard.querySelector(".add-to-cart-btn");

  quickViewBtn.addEventListener("click", () => {
    // In a real app, this would open a quick view modal
    console.log(`Quick view for product ID: ${product.id}`);
  });

  addToCartBtn.addEventListener("click", () => {
    // Add product to cart
    addToCart(product);
  });

  // Make the whole card clickable to view the product
  productCard.addEventListener("click", (e) => {
    // Ignore if the click was on a button
    if (e.target.tagName === "BUTTON") return;
    // In a real app, this would navigate to the product page
    window.location.href = `product.html?id=${product.id}`;
  });

  return productCard;
}

function initPagination() {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;

  const prevBtn = pagination.querySelector(".pagination__prev");
  const nextBtn = pagination.querySelector(".pagination__next");
  const pagesContainer = pagination.querySelector(".pagination__pages");

  // Add event listeners
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadProducts();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      loadProducts();
    }
  });

  // Add event listeners to page buttons (these will be created in updatePaginationUI)
  pagesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("pagination__page")) {
      currentPage = parseInt(e.target.textContent);
      loadProducts();
    }
  });
}

function updatePaginationUI(totalPages) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;

  const prevBtn = pagination.querySelector(".pagination__prev");
  const nextBtn = pagination.querySelector(".pagination__next");
  const pagesContainer = pagination.querySelector(".pagination__pages");

  // Update previous/next buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Update page numbers
  pagesContainer.innerHTML = "";

  // If there are 7 or fewer pages, show all
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `pagination__page ${
        i === currentPage ? "active" : ""
      }`;
      pageBtn.textContent = i;
      pagesContainer.appendChild(pageBtn);
    }
  } else {
    // More than 7 pages, show dots
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // First page
    if (startPage > 1) {
      const pageBtn = document.createElement("button");
      pageBtn.className = "pagination__page";
      pageBtn.textContent = 1;
      pagesContainer.appendChild(pageBtn);

      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.className = "pagination__dots";
        dots.textContent = "...";
        pagesContainer.appendChild(dots);
      }
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `pagination__page ${
        i === currentPage ? "active" : ""
      }`;
      pageBtn.textContent = i;
      pagesContainer.appendChild(pageBtn);
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.className = "pagination__dots";
        dots.textContent = "...";
        pagesContainer.appendChild(dots);
      }

      const pageBtn = document.createElement("button");
      pageBtn.className = "pagination__page";
      pageBtn.textContent = totalPages;
      pagesContainer.appendChild(pageBtn);
    }
  }
}

// Cart functionality
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
  const cartCountElem = document.querySelector(".cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = cartCount;

    // Show/hide count
    if (cartCount > 0) {
      cartCountElem.style.display = "flex";
    } else {
      cartCountElem.style.display = "none";
    }
  }
}

function toggleCartSidebar(show) {
  const cartSidebar = document.getElementById("cartSidebar");
  if (!cartSidebar) return;

  if (show) {
    cartSidebar.classList.add("active");
    document.body.classList.add("cart-open");
    updateCartItems();
  } else {
    cartSidebar.classList.remove("active");
    document.body.classList.remove("cart-open");
  }
}

function updateCartItems() {
  const cartItemsContainer = document.querySelector(".cart-sidebar__items");
  if (!cartItemsContainer) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Your cart is empty</div>';
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
  const totalElem = document.querySelector(".cart-summary__total .value");

  if (!subtotalElem || !totalElem) return;

  // Calculate shipping (free over $100)
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  // Update summary
  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".cart-summary__shipping .value").textContent =
    shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;
}
