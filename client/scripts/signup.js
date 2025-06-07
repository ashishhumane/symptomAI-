document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm")

  // Form validation function
  function validateForm(e) {
    e.preventDefault()

    let isValid = true

    // Clear previous error messages
    const errorElements = document.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.textContent = ""
    })

    // Validate full name
    const fullName = document.getElementById("fullName")
    if (fullName.value.trim() === "") {
      document.getElementById("fullNameError").textContent = "Full name is required"
      isValid = false
    } else if (fullName.value.trim().length < 2) {
      document.getElementById("fullNameError").textContent = "Name must be at least 2 characters"
      isValid = false
    }

    // Validate email
    const email = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.value.trim() === "") {
      document.getElementById("emailError").textContent = "Email is required"
      isValid = false
    } else if (!emailRegex.test(email.value.trim())) {
      document.getElementById("emailError").textContent = "Please enter a valid email address"
      isValid = false
    }

    // Validate password
    const password = document.getElementById("password")
    if (password.value === "") {
      document.getElementById("passwordError").textContent = "Password is required"
      isValid = false
    } else if (password.value.length < 8) {
      document.getElementById("passwordError").textContent = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    const confirmPassword = document.getElementById("confirmPassword")
    if (confirmPassword.value === "") {
      document.getElementById("confirmPasswordError").textContent = "Please confirm your password"
      isValid = false
    } else if (confirmPassword.value !== password.value) {
      document.getElementById("confirmPasswordError").textContent = "Passwords do not match"
      isValid = false
    }

    // Validate date of birth
    const dob = document.getElementById("dob")
    if (dob.value === "") {
      document.getElementById("dobError").textContent = "Date of birth is required"
      isValid = false
    } else {
      // Check if user is at least 18 years old
      const dobDate = new Date(dob.value)
      const today = new Date()
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

      if (dobDate > today) {
        document.getElementById("dobError").textContent = "Date of birth cannot be in the future"
        isValid = false
      }
    }

    // Validate gender
    const gender = document.getElementById("gender")
    if (gender.value === "") {
      document.getElementById("genderError").textContent = "Please select your gender"
      isValid = false
    }

    // Validate terms checkbox
    const terms = document.getElementById("terms")
    if (!terms.checked) {
      document.getElementById("termsError").textContent = "You must agree to the terms and conditions"
      isValid = false
    }

    // If form is valid, submit
    if (isValid) {
      // In a real application, you would send the data to your server here
      showSuccessMessage()
    }
  }

  // Show success message function
  function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement("div")
    successMessage.className = "success-message"
    successMessage.style.backgroundColor = "#d4edda"
    successMessage.style.color = "#155724"
    successMessage.style.padding = "15px"
    successMessage.style.borderRadius = "4px"
    successMessage.style.marginBottom = "20px"
    successMessage.style.textAlign = "center"
    successMessage.textContent = "Account created successfully! Redirecting to dashboard..."

    // Insert before the form
    const formElement = document.getElementById("signupForm")
    formElement.parentNode.insertBefore(successMessage, formElement)

    // Hide the form
    formElement.style.display = "none"

    // In a real application, you would redirect to the dashboard or send a verification email
    setTimeout(() => {
      alert("In a real application, you would be redirected to the dashboard or asked to verify your email.")
    }, 2000)
  }

  // Add event listener to form submit
  form.addEventListener("submit", validateForm)

  // Add real-time validation for password strength
  const passwordInput = document.getElementById("password")
  passwordInput.addEventListener("input", function () {
    const password = this.value
    const passwordError = document.getElementById("passwordError")

    if (password.length > 0 && password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters"
    } else if (password.length >= 8) {
      // Check password strength
      let strength = 0
      if (password.match(/[a-z]+/)) strength += 1
      if (password.match(/[A-Z]+/)) strength += 1
      if (password.match(/[0-9]+/)) strength += 1
      if (password.match(/[^a-zA-Z0-9]+/)) strength += 1

      if (strength === 1) {
        passwordError.textContent = "Weak password"
        passwordError.style.color = "#e53935"
      } else if (strength === 2) {
        passwordError.textContent = "Moderate password"
        passwordError.style.color = "#ff9800"
      } else if (strength === 3) {
        passwordError.textContent = "Strong password"
        passwordError.style.color = "#4caf50"
      } else if (strength === 4) {
        passwordError.textContent = "Very strong password"
        passwordError.style.color = "#2e7d32"
      }
    } else {
      passwordError.textContent = ""
    }
  })

  // Add real-time validation for confirm password
  const confirmPasswordInput = document.getElementById("confirmPassword")
  confirmPasswordInput.addEventListener("input", function () {
    const password = document.getElementById("password").value
    const confirmPassword = this.value
    const confirmPasswordError = document.getElementById("confirmPasswordError")

    if (confirmPassword !== "" && confirmPassword !== password) {
      confirmPasswordError.textContent = "Passwords do not match"
    } else if (confirmPassword !== "" && confirmPassword === password) {
      confirmPasswordError.textContent = "Passwords match"
      confirmPasswordError.style.color = "#4caf50"
    } else {
      confirmPasswordError.textContent = ""
    }
  })
})
