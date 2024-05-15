function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    // Redirect to home.html after storing data
    window.location.href = "home.html";
}
