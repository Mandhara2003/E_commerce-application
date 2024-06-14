document.addEventListener("DOMContentLoaded", () => {
    let productDetails = document.getElementById("productDetails")
    let products = JSON.parse(localStorage.getItem("products"))
    let pid = JSON.parse(localStorage.getItem("selectedProductid"))
    console.log("pid", pid)
    if (products && pid) {
        let selectedProduct = products.find(val => val.id == pid)
        if (selectedProduct) {
            console.log(selectedProduct)
            productDetails.innerHTML = `
            <div class="product-cnt">
                <img src="${selectedProduct.images[0]}" height="120" />
                <div class="prod-details">
                    <h1 class="p-title">${selectedProduct.title}</h1>
                    <p>${selectedProduct.description}</p>
                    <p> <b>Category:</b> ${selectedProduct.category}</p>
                    <p><b>Price:</b> $${selectedProduct.price}</p>
                    <p><b>Rating: </b>${selectedProduct.rating}</p>
                    <button class="add-to-cart" id="addToCart">Add to Cart</button>
                    <button class="buy-now" id="buyNow">Buy now</button>
                </div>

            </div>
            <div class="review">
            <h1>Product Review</h1>
            <hr/>
            ${
                selectedProduct.reviews.map((review)=>
                `<div class="review-cnt">
                <p class="comment"><b>Comment:</b>${review.comment}</p>
                <p class="rating"><b>Rating:</b>${review.rating}</p>
                <p class="reviewerName"><b>reviewerName:</b>${review.reviewerName} </p>
                 </div>
                <hr/>
                `
                )
            }
            </div>
            `
            document.getElementById("addToCart").addEventListener("click",()=>
                addToCart(selectedProduct)
            )
        } else {
            productDetails.innerHTML = "<p>Product not found</p>"
        }
    } else {
        productDetails.innerHTML = "<p>Product not found</p>"
    }
})


function addToCart(product){
    let cart= JSON.parse(localStorage.getItem("cart")) ||[]
    cart.push(product)
    localStorage.setItem("cart",JSON.stringify(cart))
    alert("product added to cart")
}