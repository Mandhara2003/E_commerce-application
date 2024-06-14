function setActiveTab(tabId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const tabs = document.querySelectorAll('.tabs li');
  
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId + '-form').style.display = 'block';
  
    if (tabId === 'login') {
      signupForm.style.display = 'none';
      forgotPasswordForm.style.display = 'none';
    } else if (tabId === 'signup') {
      loginForm.style.display = 'none';
      forgotPasswordForm.style.display = 'none';
    } else if (tabId === 'forgot-password') {
      loginForm.style.display = 'none';
      signupForm.style.display = 'none';
    }
  }
  const isLoggedIn = checkCredentials(username, password); // Replace with your logic

  if (isLoggedIn) {
    localStorage.setItem("isLoggedIn", JSON.stringify({isLoggedIn: true}));
    window.location.href = "wishlist.html"; // Redirect to wishlist page
  } else {
    // Display error message
    alert("Invalid username or password!");
  }
;
  
  function showForgotPassword() {
    setActiveTab('forgot-password');
  }
  