document.getElementById("hamburger").onclick = function () {
    document.getElementById("sideNav").classList.add("active");
};

document.getElementById("cart").onclick = function () {
    document.getElementById("sideCart").classList.add("active");
};

sideNavCloseBtn.onclick = () => {
    sideNav.classList.remove('active');
};

sideCartCloseBtn.onclick = () => {
    sideCart.classList.remove('active');
};

document.getElementById("searchIcon").onclick = function () {
    document.getElementById("mobileSearchSectionBG").classList.add("active");
};

function toggleMobileSearch() {
    const dropdown = document.getElementById('mobileSearchSectionBG');
    const searchIcon = document.getElementById('searchIcon');
    const cartIcon = document.getElementById('cartIcon');
    const mobileLogoPng = document.getElementById('mobileLogoPng');
    const hamburgerIcon = document.getElementById('hamburger');
    const searchDropped = dropdown.classList.contains('active');
  
    dropdown.classList.toggle('active');
  
    if (searchDropped) {
        searchIcon.classList.remove('invert');
        cartIcon.classList.remove('invert');
        mobileLogoPng.classList.remove('invert');
        hamburgerIcon.classList.remove('invert');
    } else {
        searchIcon.classList.add('invert');
        cartIcon.classList.add('invert');
        mobileLogoPng.classList.add('invert');
        hamburgerIcon.classList.add('invert');
    }
  }

  document.getElementById('searchIcon').onclick = toggleMobileSearch;


/* cart to payment detail */
const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'paymentDetail.html';
    });
}

/* payment detail to confirmation */
const paymentDetailBtn = document.getElementById('paymentDetailbtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'confirmationPage.html';
    });
}

/* payment detail to confirmation */
const backToHomePageBtn = document.getElementById('homePageBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'home.html';
    });
}



const returnBtn = document.getElementById('paymentReturnBtn');
if (returnBtn) {
    returnBtn.addEventListener('click', () => {
    window.history.back();
  });
}


const basePrice = 34.99;

const locationPrices = {
  "Random": 0,
  "Chandrayaan-3": 10,
  "apollo 15 view lots": 10,
  "Sea of tranquility": 15,
  "Moon rabbit": 20
};

const areaPrices = {
  "Acre 1": 0,
  "Acre 5": 10,
  "Acre 8": 15,
  "Acre 10": 20,
  "Acre 15": 25,
  "Acre 20": 30
};

const addOnPrices = {
  nameOnDeed: 2.5,
  downloadPdf: 10
};


let cartItems = [];
let cartItemPrices = [];
let currentItemIndex = 0;

function addToCart(itemHTML, itemPrice) {
  const container = document.createElement("div");
  container.classList.add("cartItemSlide");
  container.innerHTML = itemHTML;

  cartItems.push(container);
  cartItemPrices.push(itemPrice);

  const cartItemsDiv = document.getElementById("cartItems");
  if (!cartItemsDiv) {
    console.error("No #cartItems container found!");
    return;
  }
  cartItemsDiv.appendChild(container);

  currentItemIndex = 0;
  showCartItem(currentItemIndex);

  document.getElementById("emptyMessage").style.display = "none";
  cartItemsDiv.style.display = "block";
  document.getElementById("cartBottom").style.display = "block";

  updateCheckoutPrice();
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

function updateCheckoutPrice() {
  const total = cartItemPrices.reduce((sum, price) => sum + price, 0).toFixed(2);
  const finalPriceEl = document.getElementById("finalTotalPrice");
  if (finalPriceEl) finalPriceEl.textContent = `$${total}`;
}


// check item buttons
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



// add to cart
function addToCart(itemHTML, itemPrice) {
  const container = document.createElement("div");
  container.classList.add("cartItemSlide");
  container.innerHTML = itemHTML;

  cartItems.push(container);
  cartItemPrices.push(itemPrice);

  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.appendChild(container);

  currentItemIndex = 0;
  showCartItem(currentItemIndex);

  document.getElementById("emptyMessage").style.display = "none";
  cartItemsDiv.style.display = "block";
  document.getElementById("cartBottom").style.display = "block";

  updateCheckoutPrice();

  const sideCart = document.getElementById("sideCart");
  if (!sideCart.classList.contains("active")) {
    sideCart.classList.add("active");
  }
}


document.getElementById("productFormm").addEventListener("submit", function (e) {
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
  const totalPrice = totalPriceNum.toFixed(2);


  const itemHTML = `
    <div class="cartItem">
      <div class="cartItemDisplay">
        <img src="../assets/img/moon.png" alt="" class="itemImg" />
        <p class="itemLabel">moon</p>

        <!-- Correctly placed buttons -->
        <button class="prevItemBtn" onclick="showPrevItem()">
          <img src="../assets/img/scrolldown_icon_b.png" alt="Previous" />
        </button>

        <button class="nextItemBtn" onclick="showNextItem()">
          <img src="../assets/img/scrolldown_icon_b.png" alt="Next" />
        </button>
      </div>
    </div>

    <div class="cartBottom">
      <div class="cartBottomInfo">
        <div>
          <div class="cartComfirmationLocation">
            <div class="cartComfirmationInfo location">
              <p>Location : ${location}</p>
              <p>$${locationPrice.toFixed(2)}</p>
            </div>
            <div id="mapLink">
              <a href="https://${location.toLowerCase().replace(/\s+/g, "")}.nasa.gov" target="_blank">where is that?</a>
            </div>
          </div>

          <div class="cartComfirmationInfo">
            <p>Area : ${area}</p>
            <p>$${areaPrice.toFixed(2)}</p>
          </div>

          <div class="cartComfirmationInfo">
            <p>Name on deed : ${name}</p>
            <p>$${namePrice.toFixed(2)}</p>
          </div>

          <div class="cartComfirmationInfo">
            <p>Download PDF : ${pdf ? "Yes" : "No"}</p>
            <p>$${pdfPrice.toFixed(2)}</p>
          </div>

          <hr id="totalPriceLine">
          <div class="totalPrice">
            <p>Total</p>
            <h1>$${totalPrice}</h1>
          </div>
        </div>
      </div>
    </div>
  `;
  
  addToCart(itemHTML, totalPriceNum);
});


/* Navigation buttons */
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


window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);