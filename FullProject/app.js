let email = "";
let password = "";
let submit = document.getElementById("submitButton");
submit.addEventListener("click", function () {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
});
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get email and password values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Call the API to validate the credentials
      const response = await fetch("https://localhost:7171/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the access token
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Redirect or perform actions for a successful login
        console.log("Login successful, token stored:", accessToken);
        window.location.href = "http://127.0.0.1:5500/admin-dashboard.html"; // Example redirect to a dashboard
        //alert("Login successful!");
      } else {
        // Display error message
        document.getElementById("error-message").textContent =
          data.message || "Invalid email or password";
      }
    } catch (error) {
      console.error("Error during login:", error);
      document.getElementById("error-message").textContent =
        "An error occurred. Please try again later.";
    }
  });
