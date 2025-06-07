document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const forgotPasswordModal = document.getElementById("forgotPasswordModal")
  const forgotPasswordLink = document.querySelector(".forgot-password")
  const closeModal = document.querySelector(".close")
  const forgotPasswordForm = document.getElementById("forgotPasswordForm")
  const togglePassword = document.getElementById("togglePassword")
  const passwordInput = document.getElementById("password")

  // Demo user credentials for testing
  const demoUsers = [
    { email: "demo@symptom-ai.com", password: "demo123" },
    { email: "test@example.com", password: "password123" },
    { email: "user@health.com", password: "health456" },
  ]

  // Login form validation and submission
  function validateLoginForm(e) {
    e.preventDefault()

    let isValid = true

    // Clear previous error messages
    const errorElements = document.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.textContent = ""
      element.style.color = "#e53935"
    })

    // Get form values
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required"
      isValid = false
    } else if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address"
      isValid = false
    }

    // Validate password
    if (password === "") {
      document.getElementById("passwordError").textContent = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Password must be at least 6 characters"
      isValid = false
    }

    // If form is valid, attempt login
    if (isValid) {
      attemptLogin(email, password)
    }
  }

  // Simulate login attempt
  function attemptLogin(email, password) {
    // Show loading state
    const loginBtn = document.querySelector(".login-btn")
    const originalText = loginBtn.textContent
    loginBtn.textContent = "Signing In..."
    loginBtn.disabled = true

    // Simulate API call delay
    setTimeout(() => {
      // Check against demo users
      const user = demoUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        showSuccessMessage()
        // Store login state
        if (document.getElementById("rememberMe").checked) {
          localStorage.setItem("rememberedEmail", email)
        }
      } else {
        // Show error for invalid credentials
        document.getElementById("passwordError").textContent = "Invalid email or password"
        loginBtn.textContent = originalText
        loginBtn.disabled = false
      }
    }, 1500)
  }

  // Show success message
  function showSuccessMessage() {
    const successMessage = document.createElement("div")
    successMessage.className = "success-message"
    successMessage.textContent = "Login successful! Redirecting to your dashboard..."

    // Insert before the form
    const formElement = document.getElementById("loginForm")
    formElement.parentNode.insertBefore(successMessage, formElement)

    // Hide the form
    formElement.style.display = "none"

    // Simulate redirect
    setTimeout(() => {
    //   alert(
    //     "Welcome to SymptomAI Dashboard! In a real application, you would be redirected to your personalized health dashboard.",
    //   )
     window.location.href = '/dashboard';
    }, 2000)
  }

  // Toggle password visibility
  function togglePasswordVisibility() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    const eyeIcon = togglePassword.querySelector(".eye-icon")
    eyeIcon.textContent = type === "password" ? "👁️" : "🙈"
  }

  // Forgot password modal functions
  function openForgotPasswordModal() {
    forgotPasswordModal.style.display = "block"
  }

  function closeForgotPasswordModal() {
    forgotPasswordModal.style.display = "none"
    document.getElementById("forgotPasswordForm").reset()
    document.getElementById("resetEmailError").textContent = ""
  }

  // Handle forgot password form submission
  function handleForgotPassword(e) {
    e.preventDefault()

    const resetEmail = document.getElementById("resetEmail").value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (resetEmail === "") {
      document.getElementById("resetEmailError").textContent = "Email is required"
      return
    }

    if (!emailRegex.test(resetEmail)) {
      document.getElementById("resetEmailError").textContent = "Please enter a valid email address"
      return
    }

    // Show loading state
    const resetBtn = document.querySelector(".reset-btn")
    resetBtn.textContent = "Sending..."
    resetBtn.disabled = true

    // Simulate sending reset email
    setTimeout(() => {
      alert(`Password reset link has been sent to ${resetEmail}`)
      closeForgotPasswordModal()
      resetBtn.textContent = "Send Reset Link"
      resetBtn.disabled = false
    }, 2000)
  }

  // Social login handlers
  function handleGoogleLogin() {
    alert("Google login integration would be implemented here using Google OAuth")
  }

  function handleAppleLogin() {
    alert("Apple login integration would be implemented here using Apple Sign-In")
  }

  // Load remembered email on page load
  function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem("rememberedEmail")
    if (rememberedEmail) {
      document.getElementById("email").value = rememberedEmail
      document.getElementById("rememberMe").checked = true
    }
  }

  // Event listeners
  loginForm.addEventListener("submit", validateLoginForm)
  togglePassword.addEventListener("click", togglePasswordVisibility)
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault()
    openForgotPasswordModal()
  })
  closeModal.addEventListener("click", closeForgotPasswordModal)
  forgotPasswordForm.addEventListener("submit", handleForgotPassword)

  // Social login buttons
  document.querySelector(".google-btn").addEventListener("click", handleGoogleLogin)
  document.querySelector(".apple-btn").addEventListener("click", handleAppleLogin)

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === forgotPasswordModal) {
      closeForgotPasswordModal()
    }
  })

  // Real-time email validation
  document.getElementById("email").addEventListener("blur", function () {
    const email = this.value.trim()
    const emailError = document.getElementById("emailError")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email !== "" && !emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address"
    } else {
      emailError.textContent = ""
    }
  })

  // Load remembered email on page load
  loadRememberedEmail()

  // Add demo credentials info
  const demoInfo = document.createElement("div")
  demoInfo.style.cssText = `
    background-color: #e3f2fd;
    border: 1px solid #1a73e8;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #1565c0;
  `
  demoInfo.innerHTML = `
    <strong>Demo Credentials:</strong><br>
    Email: demo@symptom-ai.com<br>
    Password: demo123
  `

  const form = document.getElementById("loginForm")
  form.insertBefore(demoInfo, form.firstChild)
})
