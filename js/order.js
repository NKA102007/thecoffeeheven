// Data menu lengkap
const menuItems = [
  {
    id: 1,
    name: "Dark Coffee",
    price: 34200,
    image: "img/dark-coffee.jpg",
    category: "minuman",
    rating: 4.5,
    description:
      "Kopi hitam pekat dengan rasa yang kuat dan aroma yang menggugah selera. Disajikan panas untuk pengalaman kopi yang autentik.",
  },
  {
    id: 2,
    name: "Red Dragon Fruit Juice",
    price: 23000,
    image: "img/red-dragon-fruit-juice.jpg",
    category: "minuman",
    rating: 4.3,
    description:
      "Jus buah naga merah segar yang kaya akan antioksidan. Menyegarkan dan baik untuk kesehatan.",
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 39500,
    image: "img/Cappuccino.jpg",
    category: "minuman",
    rating: 4.7,
    description:
      "Cappuccino klasik dengan perpaduan sempurna antara espresso, steamed milk, dan foam yang lembut.",
  },
  {
    id: 4,
    name: "Fettuccine Carbonara",
    price: 89300,
    image: "img/Fettuccine-Carbonara.jpg",
    category: "makanan",
    rating: 4.8,
    description:
      "Pasta fettuccine dengan saus carbonara krim, keju parmesan, dan daging asap. Hidangan Italia yang lezat dan memuaskan.",
  },
  {
    id: 5,
    name: "Chicken Katsu",
    price: 67000,
    image: "img/Chicken-Katsu.jpg",
    category: "makanan",
    rating: 4.6,
    description:
      "Ayam goreng tepung krispi ala Jepang yang disajikan dengan saus khusus dan nasi putih.",
  },
  {
    id: 6,
    name: "Chocolate Cake",
    price: 32400,
    image: "img/cake.jpg",
    category: "snack",
    rating: 4.4,
    description:
      "Kue cokelat lembut dengan lapisan ganache yang kaya. Cocok untuk penutup makanan atau camilan.",
  },
  {
    id: 7,
    name: "Espresso",
    price: 28000,
    image: "img/espresso.jpg",
    category: "minuman",
    rating: 4.5,
    description:
      "Shot espresso murni dengan crema yang sempurna. Untuk pecinta kopi yang menyukai rasa kuat.",
  },
  {
    id: 8,
    name: "Latte",
    price: 37500,
    image: "img/latte.jpg",
    category: "minuman",
    rating: 4.6,
    description:
      "Perpaduan sempurna antara espresso dan steamed milk dengan lapisan foam yang tipis.",
  },
  {
    id: 9,
    name: "Matcha Latte",
    price: 42000,
    image: "img/matcha-latte.jpg",
    category: "minuman",
    rating: 4.7,
    description:
      "Green tea matcha premium dicampur dengan steamed milk. Rasa yang unik dan menenangkan.",
  },
  {
    id: 10,
    name: "Beef Burger",
    price: 55000,
    image: "img/beef-burger.jpg",
    category: "makanan",
    rating: 4.5,
    description:
      "Burger dengan patty daging sapi premium, keju, sayuran segar, dan saus spesial dalam roti yang lembut.",
  },
  {
    id: 11,
    name: "Caesar Salad",
    price: 45000,
    image: "img/caesar-salad.jpg",
    category: "makanan",
    rating: 4.2,
    description:
      "Salad segar dengan daun romaine, crouton, parmesan, dan saus caesar yang creamy.",
  },
  {
    id: 12,
    name: "Croissant",
    price: 22000,
    image: "img/croissant.jpg",
    category: "snack",
    rating: 4.3,
    description:
      "Croissant Prancis asli dengan tekstur berlapis dan rasa mentega yang khas.",
  },
  {
    id: 13,
    name: "memek goreng",
    price: 1,
    image: "img/croissant.jpg",
    category: "snack",
    rating: 4.3,
    description: "Croissant Pcihuy.",
  },
];

// Variabel global
let currentFilter = "all";
let currentSearch = "";

// Fungsi untuk menampilkan menu
function displayMenuItems(items) {
  const orderGrid = document.getElementById("order-grid");
  const searchResults = document.getElementById("search-results");

  // Filter items berdasarkan pencarian
  let filteredItems = items;

  if (currentSearch) {
    filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  // Filter items berdasarkan kategori
  if (currentFilter !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.category === currentFilter
    );
  }

  // Tampilkan pesan hasil pencarian
  if (currentSearch && filteredItems.length === 0) {
    orderGrid.innerHTML = `
      <div class="no-results">
        <i data-feather="search"></i>
        <h3>Tidak ada hasil untuk "${currentSearch}"</h3>
        <p>Coba dengan kata kunci lain atau lihat semua menu</p>
      </div>
    `;
    feather.replace();
    return;
  }

  if (currentSearch) {
    searchResults.textContent = `Menampilkan ${filteredItems.length} hasil untuk "${currentSearch}"`;
    searchResults.style.display = "block";
  } else {
    searchResults.style.display = "none";
  }

  // Tampilkan items
  orderGrid.innerHTML = "";

  filteredItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.setAttribute("data-category", item.category);

    // Generate stars based on rating
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(item.rating)) {
        stars += '<i data-feather="star" fill="currentColor"></i>';
      } else if (
        i === Math.ceil(item.rating) &&
        !Number.isInteger(item.rating)
      ) {
        stars += '<i data-feather="star" fill="currentColor"></i>';
      } else {
        stars += '<i data-feather="star"></i>';
      }
    }

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="order-card-img">
      <div class="order-card-content">
        <h3 class="order-card-title">${item.name}</h3>
        <div class="rating">
          ${stars}
          <span>${item.rating}</span>
        </div>
        <p class="order-card-desc">${item.description.substring(0, 100)}...</p>
        <p class="order-card-price">Rp ${item.price.toLocaleString()}</p>
        <div class="order-actions">
          <button class="btn-detail" data-id="${item.id}">Detail</button>
          <button class="btn-cart" data-id="${item.id}">Keranjang</button>
        </div>
      </div>
    `;

    orderGrid.appendChild(card);
  });

  // Update feather icons
  feather.replace();

  // Add event listeners to buttons
  document.querySelectorAll(".btn-detail").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      showProductDetail(itemId);
    });
  });

  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      addToCart(itemId, 1);
    });
  });
}

// Fungsi untuk setup search
function setupSearch() {
  const searchInput = document.getElementById("order-search");
  const clearSearch = document.getElementById("clear-search");

  // Real-time search
  searchInput.addEventListener("input", function () {
    currentSearch = this.value.trim();

    // Tampilkan/sembunyikan tombol clear
    if (currentSearch) {
      clearSearch.style.display = "flex";
    } else {
      clearSearch.style.display = "none";
    }

    // Filter dan tampilkan menu
    displayMenuItems(menuItems);
  });

  // Clear search
  clearSearch.addEventListener("click", function () {
    searchInput.value = "";
    currentSearch = "";
    clearSearch.style.display = "none";
    displayMenuItems(menuItems);
  });

  // Tutup search results ketika klik di luar
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !clearSearch.contains(e.target)) {
      // Tidak perlu melakukan apa-apa, biarkan search tetap terbuka
    }
  });
}

// Fungsi filter menu
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      currentFilter = this.getAttribute("data-filter");
      displayMenuItems(menuItems);
    });
  });
}

// Fungsi untuk menampilkan detail produk
function showProductDetail(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id == itemId);
  if (!item) return;

  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");

  // Generate stars based on rating
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(item.rating)) {
      stars += '<i data-feather="star" fill="currentColor"></i>';
    } else if (i === Math.ceil(item.rating) && !Number.isInteger(item.rating)) {
      stars += '<i data-feather="star" fill="currentColor"></i>';
    } else {
      stars += '<i data-feather="star"></i>';
    }
  }

  modalBody.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="modal-img">
    <div class="modal-info">
      <h2 class="modal-title">${item.name}</h2>
      <div class="modal-rating">
        ${stars}
        <span>${item.rating}</span>
      </div>
      <p class="modal-price">Rp ${item.price.toLocaleString()}</p>
      <p class="modal-desc">${item.description}</p>
      <div class="modal-add-cart">
        <div class="quantity-controls">
          <button class="quantity-btn minus">-</button>
          <input type="number" class="quantity-input" value="1" min="1">
          <button class="quantity-btn plus">+</button>
        </div>
        <button class="add-to-cart-btn" data-id="${
          item.id
        }">Tambahkan ke Keranjang</button>
      </div>
    </div>
  `;

  modal.classList.add("show");

  // Update feather icons
  feather.replace();

  // Add event listeners
  document
    .querySelector(".quantity-btn.minus")
    .addEventListener("click", function () {
      const input = document.querySelector(".quantity-input");
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });

  document
    .querySelector(".quantity-btn.plus")
    .addEventListener("click", function () {
      const input = document.querySelector(".quantity-input");
      input.value = parseInt(input.value) + 1;
    });

  document
    .querySelector(".add-to-cart-btn")
    .addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      const quantity = parseInt(
        document.querySelector(".quantity-input").value
      );
      addToCart(itemId, quantity);
      modal.classList.remove("show");
    });
}

// Inisialisasi halaman order
document.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menuItems);
  setupSearch();
  setupFilterButtons();

  // Close modal when clicking X
  document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("product-modal").classList.remove("show");
  });

  // Close modal when clicking outside
  document
    .getElementById("product-modal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("show");
      }
    });
});
