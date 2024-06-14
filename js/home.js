console.log("home")
let cntv = document.getElementById("cnt")
let productDetails = ""
let products = []

// Fetch the data
function fetchData() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((result) => {
      console.log(result.products)
      products = result.products
      localStorage.setItem("products", JSON.stringify(products)) // Store data in browser
      displayProducts(products) // Call function
    })
    .catch((error) => console.log(error)) // Debug the error
}

function displayProducts(products) {
  productDetails = ""
  products.map((val) => {
    console.log(val)
    productDetails += `
      <div class="product-item">
        <img src=${val.images[0]} title="product img" />
        <p class="title">${val.title}</p>
        <p class="category">${val.category}</p>
        <p class="rating">${val.rating} <span><i class="fa-solid fa-star"></i></span></P>
        <div class="price-cnt">
          <p>$ ${val.price}</p>
          <button onclick="viewMore(${val.id})">view more</button>
          <button class="add-to-wishlist" data-product-id="${val.id}">Add to Wishlist</button>
        </div>
      </div>
    `
  });
  cntv.innerHTML = productDetails; // Display data
  addWishlistEventListeners(); // Add event listeners to wishlist buttons
}

function viewMore(id) {
  localStorage.setItem("selectedProductid", JSON.stringify(id))
  window.location.href = "viewproduct.html"
}

document.getElementById("searchProduct").addEventListener("input", searchProduct)

function searchProduct(event) {
  let searchTerm = event.target.value;
  console.log(searchTerm)
  let filterData = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  displayProducts(filterData)
}

function addWishlistEventListeners() {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.productId);
      addToWishlist(productId);
    });
  });
}

function addToWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (!wishlist.some(item => item.id === productId)) {
    wishlist.push({
      id: product.id,
      title: product.title,
      imageUrl: product.images[0],
      description: product.description
    });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Added to wishlist!');
  } else {
    alert('Already in wishlist!');
  }
}

fetchData()
