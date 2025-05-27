function loadFullCartStore() {
  const saved = localStorage.getItem("cartStore");
  return saved ? JSON.parse(saved) : { html: [], prices: [] };
}

function updateCheckoutPrice(prices) {
  const total = prices.reduce((sum, price) => sum + price, 0).toFixed(2);
  const finalPriceEl = document.querySelector("#cartBottom #finalTotalPrice");

  if (finalPriceEl) finalPriceEl.textContent = `$${total}`;
}

let singleCartItems = [];
let singleCurrentIndex = 0;

function showSingleItem(index) {
  const allSlides = document.querySelectorAll(".cartItemSlide");
  allSlides.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    const leftBtn = el.querySelector(".prevItemBtn");
    const rightBtn = el.querySelector(".nextItemBtn");
    if (leftBtn) leftBtn.style.display = index > 0 ? "inline-block" : "none";
    if (rightBtn) rightBtn.style.display = index < singleCartItems.length - 1 ? "inline-block" : "none";
  });
}

function showSingleNext() {
  if (singleCurrentIndex < singleCartItems.length - 1) {
    singleCurrentIndex++;
    showSingleItem(singleCurrentIndex);
  }
}

function showSinglePrev() {
  if (singleCurrentIndex > 0) {
    singleCurrentIndex--;
    showSingleItem(singleCurrentIndex);
  }
}

function addSingleItem(itemHTML) {
  const container = document.createElement("div");
  container.classList.add("cartItemSlide");
  container.innerHTML = itemHTML;

  const prevBtn = container.querySelector(".prevItemBtn");
  if (prevBtn) prevBtn.addEventListener("click", showSinglePrev);
  const nextBtn = container.querySelector(".nextItemBtn");
  if (nextBtn) nextBtn.addEventListener("click", showSingleNext);

  document.getElementById("cartItems").appendChild(container);
  singleCartItems.push(container);

  singleCurrentIndex = singleCartItems.length - 1;
  showSingleItem(singleCurrentIndex);
}

window.addEventListener('DOMContentLoaded', () => {
  const store = loadFullCartStore();

  const sideCart = document.getElementById('sideCart');
  if (sideCart) {
    sideCart.classList.add('active');

    const cartBottom = document.getElementById('cartBottom');
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyMessage');

    if (cartBottom) cartBottom.style.display = 'block';
    if (cartItemsDiv) cartItemsDiv.style.display = 'block';
    if (emptyMessage) emptyMessage.style.display = 'none';

    store.html.forEach(html => {
      addSingleItem(html);  // <-- Use single version with buttons
    });

    updateCheckoutPrice(store.prices);

    const checkoutBtnLabel = document.querySelector("#checkoutBtn .cartCheckoutWord h1");
    if (checkoutBtnLabel) {
      checkoutBtnLabel.textContent = "Proceed Payment";
    }

    const cartTitle = document.querySelector(".cartTop h1");
    if (cartTitle) {
      cartTitle.textContent = "Your Item";
    }

    const closeBtn = document.getElementById("sideCartCloseBtn");
    if (closeBtn) {
      closeBtn.style.display = "none";
    }



  }
});
