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
  document.getElementById('checkoutBtn').addEventListener('click', function () {
    window.location.href = 'paymentDetail.html';
  });

/* payment detail to confirmation */
document.getElementById('paymentDetailbtn').addEventListener('click', function () {
  window.location.href = 'confirmationPage.html';
});

/* payment detail to confirmation */
document.getElementById('homePageBtn').addEventListener('click', function () {
  window.location.href = 'home.html';
});

const returnBtn = document.getElementById('paymentReturnBtn');
if (returnBtn) {
    returnBtn.addEventListener('click', () => {
    window.history.back();
  });
}


