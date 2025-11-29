//toggle class active
const navbarNav = document.querySelector("#navbarNav");
//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Smooth scroll untuk link navigasi
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      // Tutup menu mobile jika terbuka
      navbarNav.classList.remove("active");
    }
  });
});

// ========== ENHANCEMENTS ==========

// Back to top button functionality
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i data-feather="arrow-up"></i>';
backToTopButton.className = "back-to-top";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Form submission with loading state
const contactForm = document.querySelector(".contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = this.querySelector(".btn");
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.innerHTML = 'Mengirim... <span class="loading"></span>';
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(function () {
      // Show success message
      showToast("Pesan berhasil dikirim!");

      // Reset form
      contactForm.reset();

      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

      // Update feather icons
      feather.replace();
    }, 2000);
  });
}

// Toast notification function
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// ========== CART FUNCTIONALITY ==========

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemId, quantity = 1) {
  // Cari item di menuItems (jika ada di halaman order)
  let item;
  if (typeof menuItems !== "undefined") {
    item = menuItems.find((menuItem) => menuItem.id == itemId);
  } else {
    // Fallback untuk halaman utama
    item = {
      id: itemId,
      name: "Product " + itemId,
      price: 0,
      image: "img/placeholder.jpg",
    };
  }

  if (!item) return;

  // Cek apakah item sudah ada di keranjang
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id == itemId);

  if (existingItemIndex > -1) {
    // Jika item sudah ada, tambahkan jumlahnya
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Jika item belum ada, tambahkan item baru
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: quantity,
    });
  }

  // Simpan ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update tampilan keranjang
  updateCartDisplay();

  // Tampilkan notifikasi
  showToast(`${item.name} ditambahkan ke keranjang!`);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id != itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Fungsi untuk mengubah jumlah item di keranjang
function updateCartItemQuantity(itemId, newQuantity) {
  const itemIndex = cart.findIndex((item) => item.id == itemId);

  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      cart[itemIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
  const cartCount = document.querySelector(".cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");

  // Update jumlah item di ikon keranjang
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  // Update daftar item di modal keranjang
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML =
        '<div class="empty-cart">Keranjang belanja kosong</div>';
    } else {
      cartItems.innerHTML = "";
      let totalPrice = 0;

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p>Rp ${item.price.toLocaleString()}</p>
            </div>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
            <button class="remove-btn" data-id="${item.id}">Hapus</button>
          </div>
        `;

        cartItems.appendChild(cartItem);
      });

      // Update total harga
      if (cartTotalPrice) {
        cartTotalPrice.textContent = `Rp ${totalPrice.toLocaleString()}`;
      }

      // Add event listeners to cart controls
      document
        .querySelectorAll(".cart-item-controls .minus")
        .forEach((button) => {
          button.addEventListener("click", function () {
            const itemId = this.getAttribute("data-id");
            const item = cart.find((item) => item.id == itemId);
            if (item) {
              updateCartItemQuantity(itemId, item.quantity - 1);
            }
          });
        });

      document
        .querySelectorAll(".cart-item-controls .plus")
        .forEach((button) => {
          button.addEventListener("click", function () {
            const itemId = this.getAttribute("data-id");
            const item = cart.find((item) => item.id == itemId);
            if (item) {
              updateCartItemQuantity(itemId, item.quantity + 1);
            }
          });
        });

      document
        .querySelectorAll(".cart-item-controls .remove-btn")
        .forEach((button) => {
          button.addEventListener("click", function () {
            const itemId = this.getAttribute("data-id");
            removeFromCart(itemId);
          });
        });
    }
  }
}

// ========== CART MODAL ==========

const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const shoppingCart = document.getElementById("shopping-cart");

// Buka modal keranjang
if (shoppingCart) {
  shoppingCart.addEventListener("click", function (e) {
    e.preventDefault();
    if (cartModal) {
      cartModal.classList.add("show");
    }
  });
}

// Tutup modal keranjang
if (closeCart) {
  closeCart.addEventListener("click", function () {
    if (cartModal) {
      cartModal.classList.remove("show");
    }
  });
}

// Tutup modal keranjang ketika klik di luar
if (cartModal) {
  cartModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("show");
    }
  });
}

// ========== REDIRECT TO ORDER PAGE ==========

// Update event listener untuk tombol "Order Here"
const orderButton = document.querySelector(".hero .cta");
if (orderButton) {
  orderButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "order.html";
  });
}

// ========== INITIALIZE CART ON PAGE LOAD ==========

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();

  // Update feather icons
  feather.replace();

  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
});
