let cartItem = [];
let cartTotal = 0;
let itemCount = 0;

function cart() {
  const savedCart = localStorage.getItem("simplecart");
  if (savedCart !== null) {
    const cartData = JSON.parse(savedCart);
    if (cartData.items) {
      cartItem = cartData.items;
    } else {
      cartItem = [];
    }
    if (cartData.total) {
      cartTotal = cartData.total;
    } else {
      cartTotal = 0;
    }
    if (cartData.count) {
      itemCount = cartData.count;
    } else {
      itemCount = 0;
    }
    update();
  }
}

document.querySelector(".clear-cart").addEventListener("click", clear);

function savecart() {
  const cartData = {
    items: cartItem,
    total: cartTotal,
    count: itemCount,
  };
  localStorage.setItem("simplecart", JSON.stringify(cartData));
  // fun JSON.stringify() is used to convert the cartData object into a JSON string.
}

function addToCart(name, price) {
  let flag = false;
  for (let i = 0; i < cartItem.length; i++) {
    if (cartItem[i].name === name) {
      cartItem[i].quantity += 1;
      flag = true;
      break;
    }
  }

  if (!flag) {
    cartItem.push({ name: name, price: price, quantity: 1 });
  }

  updateall();
}

function incr(name) {
  for (let i = 0; i < cartItem.length; i++) {
    if (cartItem[i].name === name) {
      cartItem[i].quantity += 1;
      updateall();
      break;
    }
  }
}

function decr(name) {
  for (let i = 0; i < cartItem.length; i++) {
    if (cartItem[i].name === name) {
      if (cartItem[i].quantity <= 1) {
        cartItem = cartItem.filter((item) => item.name !== name);
        updateall();
      } else {
        cartItem[i].quantity -= 1;
      }
      updateall();
      break;
    }
  }
}

function clear() {
  cartItem = [];
  cartTotal = 0;
  itemCount = 0;
  savecart();
  update();
}

function updateall() {
  cartTotal = 0;
  itemCount = 0;
  for (let i = 0; i < cartItem.length; i++) {
    cartTotal += cartItem[i].price * cartItem[i].quantity;
    itemCount += cartItem[i].quantity;
  }
  savecart();
  update();
}

function update() {
  document.querySelector(".cart-count").textContent = itemCount;
  document.querySelector(".items-count").textContent = `${itemCount} item`;

  const list = document.querySelector(".cart-items");
  list.innerHTML = "";

  for (let i = 0; i < cartItem.length; i++) {
    const item = cartItem[i];
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <div class="name">${item.name}</div>
            <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="quan">
                <button class="quan-btn minus" data-name="${
                  item.name
                }">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quan-btn plus" data-name="${
                  item.name
                }">+</button>
            </div>`;
    list.appendChild(itemElement);
  }

  document.querySelector(
    ".cart-total"
  ).innerHTML = `<span>Total:</span> $${cartTotal.toFixed(2)}`;

  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      decr(name);
    });
  });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      incr(name);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  cart();
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".product");
      const name = product.querySelector("h3").textContent;
      const priceText = product.querySelector("p").textContent;
      const price = parseFloat(priceText.replace("Price: $", ""));
      addToCart(name, price);
    });
  });

  document.querySelector(".cart-icon").addEventListener("click", function () {
    document.querySelector(".cart").classList.toggle("show");
  });
});
//Done!!
//Ahmad Joba
