document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate credentials (for demo purposes)
        if (username === 'admin' && password === 'password') {
            document.getElementById('message').textContent = 'Login successful!';
            // Set a session token or perform other actions upon successful login
            // For demonstration, let's set a session token
            sessionStorage.setItem('loggedIn', 'true');
            // Redirect to dashboard or perform other actions upon successful login
            window.location.href = "overview.html";
        } else {
            document.getElementById('message').textContent = 'Invalid username or password';
        }
    });
    
});
    // Logout functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            // Clear session or remove authentication token
            sessionStorage.removeItem('loggedIn');
            // Redirect to login page
            window.location.href = "login.html";
        });
    });
