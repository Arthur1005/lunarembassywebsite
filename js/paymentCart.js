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
  if (currentItemIndex < cartItems.length - 1) {
    currentItemIndex++;
    showCartItem(currentItemIndex);
  }
}

function showSinglePrev() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
    showCartItem(currentItemIndex);
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
      cartTitle.id = "yourItem";
    }

    const cartReturn = document.querySelector(".cartTop a");
    if (cartReturn) {
      cartReturn.textContent = "return";
      cartReturn.id = "returnMobile";
    }

    const proceedBtn = document.getElementById("checkoutBtn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        window.location.href = "confirmationPage.html";
      });
    }

    const returnButtonMobile = document.getElementById('returnMobile');
    if (returnButtonMobile) {
      returnButtonMobile.style.display = 'block';

      returnButtonMobile.addEventListener('click', () => {
        window.history.back();
      });
    }

    }
  });



/* no finished yet*/
window.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkoutForm');
  const submitBtn = document.getElementById('checkoutBtn');

  function toggleSubmitButton() {
    if (checkoutForm.checkValidity()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  checkoutForm.addEventListener('input', toggleSubmitButton);

  toggleSubmitButton();
});




window.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".paymentFormMobile");
  forms.forEach((form, index) => {
    if (index > 0) {
      form.remove();
    }
  });

  const cartBottomInfos = document.querySelectorAll(".cartBottomInfo");
  cartBottomInfos.forEach(el => {
    el.style.borderRadius = "0 0 0 0";
  });


  if (window.innerWidth <= 768) {
  const specialBtns = document.querySelectorAll(".only-show-on-second");
  specialBtns.forEach(el => {
    el.style.display = "flex";
    el.style.gap = "8px";
    el.style.flexDirection = "row";
    el.style.justifyContent = "center";
    el.style.marginTop = "16px";
  });
}


  const tryBtns = document.querySelector(".tryshow");
  const Btn1 = document.getElementById("Btn1");
  const Btn2 = document.getElementById("Btn2");
  const cartBottomInfo = document.querySelector(".cartBottomInfo");

  function showform() {
    cartBottomInfo.style.visibility = "hidden";
    tryBtns.style.display = "block";
  }

  function hiddenform() {
    cartBottomInfo.style.visibility = "visible";
    tryBtns.style.display = "none";
  }

  const container = document.querySelector(".hidden-cart-buttons");

  if (Btn2 && container) {
  Btn2.addEventListener("click", () => {
    container.classList.remove("show-left-border");
    container.classList.add("show-right-border");
    showform();
  });
}

if (Btn1 && container) {
  Btn1.addEventListener("click", () => {
    container.classList.remove("show-right-border");
    container.classList.add("show-left-border");
    hiddenform();
  });
}


});


