document.addEventListener("DOMContentLoaded", () => {
  initProfileTabs();
});

/**
 * Initialize profile page tabs functionality
 */
function initProfileTabs() {
  const navLinks = document.querySelectorAll(".profile-nav-link");
  const tabs = document.querySelectorAll(".profile-tab");
  const defaultTabId = "accountDetailsTab";

  // Hide all tabs except the default one
  tabs.forEach((tab) => {
    if (tab.id === defaultTabId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });

  // Set the active class on the default tab link
  navLinks.forEach((link) => {
    if (link.getAttribute("data-tab") === defaultTabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Add click event listeners to all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const tabId = link.getAttribute("data-tab");

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to the clicked link
      link.classList.add("active");

      // Hide all tabs
      tabs.forEach((tab) => {
        tab.style.display = "none";
      });

      // Show the selected tab
      if (tabId && document.getElementById(tabId)) {
        document.getElementById(tabId).style.display = "block";
      }
    });
  });

  // Handle form submission for account details
  const accountForm = document.querySelector(".profile-form");
  if (accountForm) {
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate form fields
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!firstName || !lastName || !email) {
        showMessage("Please fill in all required fields", "error");
        return;
      }

      // Here you would typically send the data to your server
      // For demonstration, we'll just show a success message
      showMessage("Account details updated successfully", "success");
    });
  }
}

/**
 * Show a message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success, error, info)
 */
function showMessage(message, type = "info") {
  // Create a toast notification element
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__content">
      <span>${message}</span>
      <button class="toast__close">×</button>
    </div>
  `;

  // Add it to the page
  document.body.appendChild(toast);

  // Add visible class after a small delay (for animation)
  setTimeout(() => {
    toast.classList.add("toast--visible");
  }, 10);

  // Remove the toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("toast--visible");

    // Remove from DOM after fade out
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);

  // Handle close button click
  const closeBtn = toast.querySelector(".toast__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.classList.remove("toast--visible");

      // Remove from DOM after fade out
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    });
  }
}
