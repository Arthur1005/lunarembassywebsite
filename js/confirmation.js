let currentIndex = 0;
let cartData = null;
const prevBtn = document.querySelector(".prevItemBtn");
const nextBtn = document.querySelector(".nextItemBtn");

function generateLunarCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function parseCartHtml(htmlString) {
  const container = document.createElement('div');
  container.innerHTML = htmlString;

  const locationP = container.querySelector('.cartConfirmationLocation .location p');
  const locationText = locationP ? locationP.textContent.replace(/^Location : /, '') : '';

  const infoDivs = container.querySelectorAll('.cartConfirmationInfo');
  let areaText = '';
  if (infoDivs.length > 1) {
    const areaP = infoDivs[1].querySelector('p');
    areaText = areaP ? areaP.textContent.replace(/^Area : /, '') : '';
  }

  let nameOnDeedText = '';
  if (infoDivs.length > 2) {
    const nameP = infoDivs[2].querySelector('p');
    nameOnDeedText = nameP ? nameP.textContent.replace(/^Name on deed : /, '') : '';
  }

  const img = container.querySelector('.itemImg');
  const imgSrc = img ? img.src : '';

  const itemLabel = container.querySelector('.itemLabel');
  const itemLabelText = itemLabel ? itemLabel.textContent.trim() : '';

  return {
    locationText,
    areaText,
    nameOnDeedText,
    imgSrc,
    itemLabelText,
  };
}

function ensureLunarCodes() {
  if (!cartData || !cartData.html) return;

  if (!cartData.lunarCodes) {
    cartData.lunarCodes = [];
  }

  // Assign a code to each item if missing
  cartData.html.forEach((itemHtml, idx) => {
    if (!cartData.lunarCodes[idx]) {
      cartData.lunarCodes[idx] = generateLunarCode();
    }
  });

  // Save updated cartData with lunarCodes back to localStorage
  localStorage.setItem('cartStore', JSON.stringify(cartData));
}

function updateDisplay() {
  if (!cartData) return;

  const data = parseCartHtml(cartData.html[currentIndex]);

  // Update only the 3 <h2> elements (skip lunar code)
  const h2Elements = document.querySelectorAll('.confirmPagePlanetInfo h2');
  if (h2Elements.length >= 3) {
    h2Elements[0].textContent = data.locationText || 'N/A';
    h2Elements[1].textContent = data.areaText || 'N/A';
    h2Elements[2].textContent = data.nameOnDeedText || 'N/A';
  }

  // Update the lunar code h2 (4th h2)
  if (h2Elements.length >= 4 && cartData.lunarCodes && cartData.lunarCodes[currentIndex]) {
    h2Elements[3].textContent = cartData.lunarCodes[currentIndex];
  } else if (h2Elements.length >= 4) {
    // fallback: generate and store if somehow missing
    const newCode = generateLunarCode();
    h2Elements[3].textContent = newCode;
    if (!cartData.lunarCodes) cartData.lunarCodes = [];
    cartData.lunarCodes[currentIndex] = newCode;
    localStorage.setItem('cartStore', JSON.stringify(cartData));
  }

  // Update main cart item image and label
  const itemImg = document.querySelector('.cartItemDisplay .itemImg');
  const itemLabel = document.querySelector('.cartItemDisplay .itemLabel');
  if (itemImg) itemImg.src = data.imgSrc;
  if (itemLabel) itemLabel.textContent = data.itemLabelText || 'N/A';

  updateButtonsVisibility();
}

function updateButtonsVisibility() {
  let nextBtn = document.querySelector('.nextItemBtn');
  let prevBtn = document.querySelector('.prevItemBtn');

  const itemCount = cartData.html.length;

  if (itemCount === 1) {
    // Only one item, hide both buttons
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
  } else if (itemCount === 2) {
    if (currentIndex === 0) {
      // First item: show only next button on right, hide prev
      if (nextBtn) nextBtn.style.display = 'inline-block';
      if (prevBtn) prevBtn.style.display = 'none';
    } else if (currentIndex === 1) {
      // Second item: show only prev button on left, hide next
      if (prevBtn) {
        prevBtn.style.display = 'inline-block';
        // rotate prevBtn icon 90deg left:
        const img = prevBtn.querySelector('img');
        if (img) img.style.transform = 'rotate(90deg)';
      }
      if (nextBtn) nextBtn.style.display = 'none';
    }
  } else {
    // More than 2 items: show both buttons
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (prevBtn) {
      prevBtn.style.display = 'inline-block';
      const img = prevBtn.querySelector('img');
      if (img) img.style.transform = 'rotate(0deg)';
    }
  }
}

function setupButtons() {
  const prevBtn = document.querySelector('.prevItemBtn');
  const nextBtn = document.querySelector('.nextItemBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < cartData.html.length - 1) {
        currentIndex++;
        updateDisplay();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('cartStore');
  if (!stored) {
    alert('No cart data found.');
    return;
  }

  cartData = JSON.parse(stored);

  if (!cartData.html || cartData.html.length === 0) {
    alert('Cart data is empty.');
    return;
  }

  ensureLunarCodes();  // assign persistent lunar codes

  updateDisplay();
  setupButtons();

  // Select the button by its ID
const homePageBtn = document.getElementById('homePageBtn');

// Add a click event listener to the button
homePageBtn.addEventListener('click', () => {
  // When clicked, clear the cart data from localStorage
  localStorage.removeItem('cartStore');
  // Then redirect the user to the homepage (root URL)
  window.location.href = 'moon.html';
});


});
