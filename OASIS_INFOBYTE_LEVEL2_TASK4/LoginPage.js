const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const securedPage = document.getElementById('secured-page');

const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');
const registerBtn = document.getElementById('register-btn');

const goToLogin = document.getElementById('go-to-login');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

const logoutBtn = document.getElementById('logout-btn');

// Event listener for registration
registerBtn.addEventListener('click', () => {
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();

  if (!username || !password) {
    alert('Please fill out all fields!');
    return;
  }

  // Save user credentials in localStorage
  if (localStorage.getItem(username)) {
    alert('Username already exists. Please choose a different username.');
  } else {
    localStorage.setItem(username, password);
    alert('Registration successful! You can now log in.');
    registerUsername.value = '';
    registerPassword.value = '';
  }
});

// Event listener to redirect to login page only if registered
goToLogin.addEventListener('click', (event) => {
  event.preventDefault();
  const users = Object.keys(localStorage);

  if (users.length === 0) {
    alert('No users registered yet. Please register first.');
  } else {
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
  }
});

// Event listener for login
loginBtn.addEventListener('click', () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    alert('Please fill out all fields!');
    return;
  }

  const storedPassword = localStorage.getItem(username);
  if (storedPassword && storedPassword === password) {
    alert('Login successful!');
    loginSection.style.display = 'none';
    securedPage.style.display = 'block';
  } else {
    alert('Invalid username or password!');
  }
});

// Event listener for logout
logoutBtn.addEventListener('click', () => {
  alert('You have logged out.');
  securedPage.style.display = 'none';
  registerSection.style.display = 'block';
});
