let cartItems = [];
let cartItemPrices = [];
let currentItemIndex = 0;

const basePrice = 34.99;
const locationPrices = {
  "Random": 0,
  "Chandrayaan-3": 10,
  "apollo 15 view lots": 15,
  "Sea of tranquility": 20,
  "Moon rabbit": 25
};
const areaPrices = {
  "Acre 1": 5,
  "Acre 5": 10,
  "Acre 8": 15,
  "Acre 10": 20,
  "Acre 15": 25,
  "Acre 20": 30
};
const addOnPrices = {
  nameOnDeed: 2.50,
  downloadPdf: 10.00
};


function toggleMobileSearch() {
  const mobileSearchBG = document.getElementById('mobileSearchSectionBG');
  if (mobileSearchBG) {
    mobileSearchBG.classList.toggle('active');
  }
}



function loadCartStore() {
  const saved = localStorage.getItem("cartStore");
  return saved ? JSON.parse(saved) : { html: [], prices: [] };
}

function saveCartStore(store) {
  localStorage.setItem("cartStore", JSON.stringify(store));
}

function updateCartCount() {
  const count = cartItems.length;
  const countEl = document.getElementById("cartCount");
  if (!countEl) return;

  if (count === 0) {
    countEl.style.display = "none";
    countEl.textContent = "";
  } else {
    countEl.style.display = "inline";
    countEl.textContent = `${count}`;
  }
}

function clearCartStore() {
  localStorage.removeItem("cartStore");
}

function clearCart() {
  clearCartStore();

  const cartItemsDiv = document.getElementById('cartItems');
  const cartBottom = document.getElementById('cartBottom');
  const emptyMessage = document.getElementById('emptyMessage');
  const finalTotal = document.getElementById('finalTotalPrice');
  const clearBtn = document.getElementById('clearCartBtn');

  if (cartItemsDiv) {
    cartItemsDiv.innerHTML = '';
    cartItemsDiv.style.display = 'none';
  }
  if (cartBottom) cartBottom.style.display = 'none';
  if (emptyMessage) emptyMessage.style.display = 'block';
  if (finalTotal) finalTotal.textContent = '$0.00';
  if (clearBtn) clearBtn.style.display = 'none';


  cartItems = [];
  cartItemPrices = [];
  currentItemIndex = 0;

  updateCartCount();
}

function updateCheckoutPrice() {
  const total = cartItemPrices.reduce((sum, price) => sum + price, 0).toFixed(2);
  const finalPriceEl = document.getElementById("finalTotalPrice");
  if (finalPriceEl) finalPriceEl.textContent = `$${total}`;
}

function showCartItem(index) {
  const allSlides = document.querySelectorAll("#cartItems .cartItemSlide");
  allSlides.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    const leftBtn = el.querySelector(".prevItemBtn");
    const rightBtn = el.querySelector(".nextItemBtn");
    if (leftBtn) leftBtn.style.display = index > 0 ? "inline-block" : "none";
    if (rightBtn) rightBtn.style.display = index < cartItems.length - 1 ? "inline-block" : "none";
  });
}

function showNextItem() {
  if (currentItemIndex < cartItems.length - 1) {
    currentItemIndex++;
    showCartItem(currentItemIndex);
  }
}

function showPrevItem() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
    showCartItem(currentItemIndex);
  }
}

function addToCart(itemHTML, itemPrice, save = true) {

  const container = document.createElement("div");
  container.classList.add("cartItemSlide");
  container.innerHTML = itemHTML;

  const prevBtn = container.querySelector(".prevItemBtn");
  if (prevBtn) prevBtn.addEventListener("click", showPrevItem);
  const nextBtn = container.querySelector(".nextItemBtn");
  if (nextBtn) nextBtn.addEventListener("click", showNextItem);

  cartItems.push(container);
  cartItemPrices.push(itemPrice);
  const cartItemsDiv = document.getElementById("cartItems");
  if (cartItemsDiv) {
    cartItemsDiv.appendChild(container);
  }
  currentItemIndex = cartItems.length - 1;
  showCartItem(currentItemIndex);

  const emptyMessage = document.getElementById("emptyMessage");
  if (emptyMessage) emptyMessage.style.display = "none";
  if (cartItemsDiv) cartItemsDiv.style.display = "block";
  const cartBottom = document.getElementById("cartBottom");
  if (cartBottom) cartBottom.style.display = "block";
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) clearBtn.style.display = "inline-block";



  updateCheckoutPrice();
  updateCartCount();

  const sideCart = document.getElementById("sideCart");
 if (save) {
  const sideCart = document.getElementById("sideCart");
  if (sideCart && !sideCart.classList.contains("active")) {
    sideCart.classList.add("active");
  }
}


  if (save) {
    const store = loadCartStore();
    store.html.push(itemHTML);
    store.prices.push(itemPrice);
    saveCartStore(store);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cartInitialized')) {
    clearCartStore();
    localStorage.setItem('cartInitialized', '1');
  }

  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearCart);
  }

  const store = loadCartStore();
  if (store.html && store.html.length > 0) {
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) emptyMessage.style.display = 'none';

    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) cartItemsDiv.style.display = 'block';

    const cartBottom = document.getElementById('cartBottom');
    if (cartBottom) cartBottom.style.display = 'block';

    if (clearBtn) clearBtn.style.display = 'inline-block';

    store.html.forEach((html, i) => {
      addToCart(html, store.prices[i], false);
    });
  } else {
    if (clearBtn) clearBtn.style.display = 'none';
  }

  const sideNavCloseBtn = document.getElementById('sideNavCloseBtn');
  const sideCartCloseBtn = document.getElementById('sideCartCloseBtn');
  const sideNav = document.getElementById('sideNav');
  const sideCart = document.getElementById('sideCart');

  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.onclick = function () {
      if (sideNav) sideNav.classList.add("active");
    };
  }

// mark for my self

  const cartBtn = document.getElementById("cart");
  const cartMoBtn = document.getElementById("cartIcon") ;

  if (cartBtn) {
    cartBtn.onclick = function () {
      if (sideCart) sideCart.classList.add("active");
    };
  }

  if (cartMoBtn) {
  cartMoBtn.addEventListener("click", function () {
    if (sideCart) {
      sideCart.classList.add("active");
    }
  });
}

  if (sideNavCloseBtn && sideNav) {
    sideNavCloseBtn.onclick = () => {
      sideNav.classList.remove('active');
    };
  }

  if (sideCartCloseBtn && sideCart) {
    sideCartCloseBtn.onclick = () => {
      sideCart.classList.remove('active');
    };
  }

  const searchIcon = document.getElementById("searchIcon");
  if (searchIcon) {
    searchIcon.onclick = toggleMobileSearch;
  }

  const productForm = document.getElementById("productFormm");
  if (productForm) { 
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const location = document.getElementById("chooseLocation").value;
      const area = document.getElementById("chooseArea").value;
      const name = document.getElementById("nameOnDeed").value || "N/A";
      const pdf = document.getElementById("downloadPdf").checked;

      const locationPrice = locationPrices[location] || 0;
      const areaPrice = areaPrices[area] || 0;
      const namePrice = name !== "N/A" ? addOnPrices.nameOnDeed : 0;
      const pdfPrice = pdf ? addOnPrices.downloadPdf : 0;

      const totalPriceNum = basePrice + locationPrice + areaPrice + namePrice + pdfPrice;

      const itemHTML = `
        <div class="cartItem">
          <div class="cartItemDisplay">
            <img src="../assets/img/moon.png" alt="" class="itemImg" />
            <p class="itemLabel">moon</p>

            <button class="prevItemBtn">
              <img src="../assets/img/scrolldown_icon_b.png" alt="Previous" />
            </button>

            <button class="nextItemBtn">
              <img src="../assets/img/scrolldown_icon_b.png" alt="Next" />
            </button>
          </div>
        </div>

        <a href="#" class="paymentReturnMobile" id="paymentReturnBtnMobile">return</a>
            

        <div class="cartBottom">
          <div class="hidden-cart-buttons only-show-on-second">
            <button id="Btn1">Item Info</button>
            <button id="Btn2">Payment Detail</button>
          </div>

    
          <div class="cartBottomInfo">
              <div class="cartConfirmationLocation">
                <div class="cartConfirmationInfo location">
                  <p>Location : ${location}</p>
                  <p>$${locationPrice.toFixed(2)}</p>
                </div>
                <div id="mapLink">
                  <a href="https://${location.toLowerCase().replace(/\s+/g, "")}.nasa.gov" target="_blank">where is that?</a>
                </div>
              </div>

              <div class="cartConfirmationInfo">
                <p>Area : ${area}</p>
                <p>$${areaPrice.toFixed(2)}</p>
              </div>

              <div class="cartConfirmationInfo">
                <p>Name on deed : ${name}</p>
                <p>$${namePrice.toFixed(2)}</p>
              </div>

              <div class="cartConfirmationInfo">
                <p>Download PDF : ${pdf ? "Yes" : "No"}</p>
                <p>$${pdfPrice.toFixed(2)}</p>
              </div>

              <hr id="totalPriceLine">
              <div class="totalPrice">
                <p>Total</p>
                <h1>$${totalPriceNum.toFixed(2)}</h1>
              </div>
          </div>

          <div class="tryshow">
                <form id="checkoutFormMobile" class="paymentFormMobile">

                <h2>Payment Details *</h2>

                <label for="cardName">Cardholder Name</label>
                <input type="text" id="cardName" name="cardName" required />

                <label for="cardNumber">Card Number </label>
                <input type="text" id="cardNumber" name="cardNumber" inputmode="numeric" pattern="[0-9\s]{13,19}" required />

                <div class="expAndCvvMobile">
                    <div class="expiryMobile">
                        <label for="expiry">Expiry Date</label>
                        <div class="expiryMonthandYearMobile">
                            <input type="text" id="expiryMonth" name="expiryMonth" placeholder="MM" required/>
                            <input type="text" id="expiryYear" name="expiryYear" placeholder="YYYY" required/>
                        </div>
                    </div>
                    <div class="cvvMobile">
                        <label for="cvv">CVV / CVC</label>
                        <input type="password" id="cvv" name="cvv" placeholder="xxx" inputmode="numeric" pattern="\d{3,4}" required/>
                    </div>
                </div>

                <h2>Shipping Information</h2>
                
                <label for="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required />

                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required />

                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone"/>

                <label for="address">Shipping Address *</label>
                <input type="text" id="address" name="address" required />

                <label for="city">City *</label>
                <input type="text" id="city" name="city" required />

                <label for="state">State / Province</label>
                <input type="text" id="state" name="state"/>

                <label for="zip">ZIP / Postal Code *</label>
                <input type="text" id="zip" name="zip" required />

                <label for="country">Country *</label>
                <input type="text" id="country" name="country" required />
              </form>
          </div>




            </div>
          </div>
        </div>
      `;
      addToCart(itemHTML, totalPriceNum);
    });
  }
     
});


const checkoutButton = document.getElementById('checkoutBtn');
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    window.location.href = 'paymentDetail.html';
  });
}

const paymentDetailButton = document.getElementById('paymentDetailbtn');
if (paymentDetailButton) {
  paymentDetailButton.addEventListener('click', () => {
    window.location.href = 'confirmationPage.html';
  });
}

const backToHomePageButton = document.getElementById('homePageBtn');
if (backToHomePageButton) {
  backToHomePageButton.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
}

const returnButton = document.getElementById('paymentReturnBtn');
if (returnButton) {
  returnButton.addEventListener('click', () => {
    window.history.back();
  });
}


document.addEventListener("DOMContentLoaded", function () {
    const cartData = JSON.parse(localStorage.getItem("cartStore"));

    if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
        const currentItem = cartData.cartItems[0]; // or track an index if navigating multiple

        document.getElementById("confirmLocation").innerText = currentItem.location || "N/A";
        document.getElementById("confirmArea").innerText = currentItem.area || "N/A";
        document.getElementById("confirmName").innerText = currentItem.name || "N/A";
        document.getElementById("confirmCode").innerText = currentItem.code || "N/A";
    }
});


document.getElementById("searchBox").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = this.value.trim();
    if (query) {
      window.location.href = `searchResult.html?q=${encodeURIComponent(query)}`;
    }
  }
});


document.getElementById("searchBox").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = this.value.trim();
    if (query) {
      window.location.href = `searchResult.html?q=${encodeURIComponent(query)}`;
    }
  }
});




