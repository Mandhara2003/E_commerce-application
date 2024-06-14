console.log("cart");

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});

function displayCart() {
  let cartCnt = document.getElementById("cartCnt");
  let totalPriceElement = document.getElementById("totalPrice");
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("cart:", cart);

  let totalPriceValue = 0;
  if (cart && cart.length > 0) {
    cartCnt.innerHTML = "";
    cart.forEach((item, index) => {
      console.log(item);
      let div = document.createElement("div");
      div.classList.add("cart-item");

      // Assuming you have a "quantity" property in each item object
      let quantity = item.quantity || 1; // Default quantity to 1 if not defined

      div.innerHTML = `
        <img src="${item.images[0]}" alt="productingImg" height="50"/>
        <div class="item-details">
          <p>${item.title}</p>
          <p>${item.description}</p>
          <p>$${item.price.toFixed(2)} x ${quantity} = $${(item.price * quantity).toFixed(2)}</p>
          <button class="remove-btn" onclick="removeItem(${index})">Remove Item</button>
          <button class="wish-list-btn" onclick="wishList(${index})">Wish List</button>
          <button class="buy-now-btn" onclick="buyNow(${index})">Buy This Now</button>
        </div>
      `;
      cartCnt.appendChild(div);
      totalPriceValue += item.price * quantity; // Update total price considering quantity
    });
    totalPriceElement.innerHTML = `$${totalPriceValue.toFixed(2)}`;
  } else {
    cartCnt.innerHTML = "There is no product in the cart";
    totalPriceElement.innerHTML = "$0.00";
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function saveForLater(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  savedItems.push(cart.splice(index, 1)[0]);
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("savedItems", JSON.stringify(savedItems));
  displayCart();
}

function buyNow(index) {
  // Implement buy now functionality as needed
  console.log("Buying now:", index);
  // Example: Redirect to checkout page or trigger checkout process
}
