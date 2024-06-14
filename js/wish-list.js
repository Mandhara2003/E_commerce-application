const wishlistItemsContainer = document.getElementById('wishlist-items');

function displayWishlist() {
  const wishlist = getWishlistFromLocalStorage();

  wishlistItemsContainer.innerHTML = ''; // Clear previous content

  if (wishlist && wishlist.length > 0) {
    wishlist.forEach(item => {
      const wishlistItem = document.createElement('div');
      wishlistItem.classList.add('wishlist-item');

      // Adjust this based on your product data structure in localStorage
      wishlistItem.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}">
        <div class="wishlist-item-info">
          <p class="wishlist-item-title">${item.title}</p>
          <p>${item.description ? item.description.slice(0, 50) + '...' : ''}</p>
        </div>
        <div class="wishlist-item-actions">
          <button class="remove-from-wishlist-btn" data-item-id="${item.id}">Remove</button>
          <button class="view-details-btn">View Details</button> 
        </div>
      `;

      wishlistItemsContainer.appendChild(wishlistItem);
    });
  } else {
    wishlistItemsContainer.innerHTML = '<p>Your wishlist is currently empty.</p>';
  }
}

function getWishlistFromLocalStorage() {
  try {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      return JSON.parse(storedWishlist);
    }
  } catch (error) {
    console.error('Error retrieving wishlist from localStorage:', error);
  }
  return []; // Empty array if no wishlist found
}

function removeFromWishlist(itemId) {
  const wishlist = getWishlistFromLocalStorage();

  const updatedWishlist = wishlist.filter(item => item.id !== itemId);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

  displayWishlist(); // Update displayed list
}

// Event Listeners
document.addEventListener('DOMContentLoaded', displayWishlist); // Display on page load

wishlistItemsContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('remove-from-wishlist-btn')) {
    const itemId = target.dataset.itemId;
    removeFromWishlist(itemId);
  }

  // Add functionality for "View Details" button here (optional)
});
