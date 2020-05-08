// show cart
const showCartBtn = document.querySelector("#cart-info");

showCartBtn.addEventListener('click', () => {
  const cart = document.querySelector(".cart");
  cart.classList.toggle("show-cart");
})

// add items to the cart

const cartBtn = document.querySelectorAll(".store-item-icon");

cartBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("store-item-icon")) {

      // src of image
      let fullPath = e.target.parentElement.previousElementSibling.src;
      let positionInPath = fullPath.indexOf("img") + 3;
      let partPath = fullPath.slice(positionInPath);

      // name of item
      let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

      // price of item
      let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].textContent;

      const items = {
        img: `img-cart${partPath}`,
        name: name,
        price: price,
      }

      const cartItem = document.createElement('div');
      cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "text-capitalize", "my-3");

      cartItem.innerHTML =

        `<img src="${items.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${items.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price mb-0">${items.price}</span>
            </div>
            <a href="#" id="cart-item-remove" class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>`;

      // select cart
      const cart = document.querySelector("#cart");
      const total = document.querySelector(".cart-total");
      cart.insertBefore(cartItem, total);

      showTotal();

      // change img opacity after clicking shopping-cart icon
      const itemImg = e.target.parentElement.previousElementSibling;
      itemImg.classList.add("img-opacity");
    }
  })
})

// show total 

showTotal = () => {

  const total = [];
  const items = document.querySelectorAll(".cart-item-price");
  items.forEach(item => {
    total.push(parseFloat(item.textContent));
  })

  const totalPayment = total.reduce((prev, next) => {
    return prev + next
  }, 0);

  const finalPayment = totalPayment.toFixed(2);

  document.querySelector("#cart-total").textContent = finalPayment;
  document.querySelector(".item-total").textContent = finalPayment;
  document.querySelector("#item-count").textContent = total.length;

  // remove items from cart

  const removeBtn = document.querySelectorAll("#cart-item-remove");

  removeBtn.forEach(item => {
    item.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      showTotal();
    })
  });

  // remove ALL items

  const cartItem = document.querySelectorAll(".cart-item");
  const clearCartBtn = document.querySelector("#clear-cart");
  clearCartBtn.addEventListener('click', () => {
    cartItem.forEach(item => {
      item.remove();
      showTotal();
    })
  })
}

// menu scroll to section jQuery
$(document).ready(function () {
  // Add smooth scrolling to all links
  $(".nav-link").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1200, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// search
const inputSearch = document.querySelector("#search-item");
const itemNames = [...document.querySelectorAll("#store-item-name")];
const storeItems = document.querySelector("#store-items");

const searchStore = (e) => {
  const searchText = e.target.value.toLowerCase();
  let result = itemNames;
  result = result.filter(item => item.textContent.toLowerCase().includes(searchText));
  console.log(result)
  storeItems.textContent = "";
  itemNames.forEach(item => storeItems.appendChild(item.parentElement.parentElement));
}

inputSearch.addEventListener('input', searchStore);






