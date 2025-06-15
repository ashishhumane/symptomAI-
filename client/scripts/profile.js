document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-link")
  const contentSections = document.querySelectorAll(".content-section")

  // Modal elements
  const modals = {
    changeEmail: document.getElementById("changeEmailModal"),
    changePassword: document.getElementById("changePasswordModal"),
    deleteAccount: document.getElementById("deleteAccountModal"),
  }

  // Button elements
  const buttons = {
    changeEmail: document.getElementById("changeEmailBtn"),
    changePassword: document.getElementById("changePasswordBtn"),
    deleteAccount: document.getElementById("deleteAccountBtn"),
    changeAvatar: document.getElementById("changeAvatarBtn"),
  }

  // Form elements
  const forms = {
    profile: document.getElementById("profileForm"),
    changeEmail: document.getElementById("changeEmailForm"),
    changePassword: document.getElementById("changePasswordForm"),
  }

  // Other elements
  const avatarInput = document.getElementById("avatarInput")
  const avatarImage = document.getElementById("avatarImage")
  const deleteConfirmation = document.getElementById("deleteConfirmation")
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")

  // Navigation between sections
  function switchSection(targetSection) {
    // Remove active class from all nav links and sections
    navLinks.forEach((link) => link.classList.remove("active"))
    contentSections.forEach((section) => section.classList.remove("active"))

    // Add active class to clicked nav link and corresponding section
    const activeNavLink = document.querySelector(`[data-section="${targetSection}"]`)
    const activeSection = document.getElementById(`${targetSection}-section`)

    if (activeNavLink && activeSection) {
      activeNavLink.classList.add("active")
      activeSection.classList.add("active")
    }
  }

  // Add click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.getAttribute("data-section")
      switchSection(section)
    })
  })

  // Modal functionality
  function openModal(modalName) {
    if (modals[modalName]) {
      modals[modalName].style.display = "block"
    }
  }

  function closeModal(modalName) {
    if (modals[modalName]) {
      modals[modalName].style.display = "none"
      // Reset forms when closing modals
      if (forms[modalName]) {
        forms[modalName].reset()
      }
    }
  }

  function closeAllModals() {
    Object.keys(modals).forEach((modalName) => {
      closeModal(modalName)
    })
  }

  // Add event listeners for modal buttons
  if (buttons.changeEmail) {
    buttons.changeEmail.addEventListener("click", () => openModal("changeEmail"))
  }

  if (buttons.changePassword) {
    buttons.changePassword.addEventListener("click", () => openModal("changePassword"))
  }

  if (buttons.deleteAccount) {
    buttons.deleteAccount.addEventListener("click", () => openModal("deleteAccount"))
  }

  // Close modal when clicking X or Cancel
  document.querySelectorAll(".close, .modal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", closeAllModals)
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    Object.values(modals).forEach((modal) => {
      if (e.target === modal) {
        closeAllModals()
      }
    })
  })

  // Avatar change functionality
  if (buttons.changeAvatar && avatarInput) {
    buttons.changeAvatar.addEventListener("click", () => {
      avatarInput.click()
    })

    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          avatarImage.src = e.target.result
          showSuccessMessage("Avatar updated successfully!")
        }
        reader.readAsDataURL(file)
      }
    })
  }

  // Form submission handlers
  if (forms.profile) {
    forms.profile.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate saving profile data
      showSuccessMessage("Profile updated successfully!")
    })
  }

  if (forms.changeEmail) {
    forms.changeEmail.addEventListener("submit", (e) => {
      e.preventDefault()
      const newEmail = document.getElementById("newEmail").value
      // Simulate email change
      showSuccessMessage(`Email will be changed to ${newEmail}. Please check your inbox for verification.`)
      closeModal("changeEmail")
    })
  }

  if (forms.changePassword) {
    forms.changePassword.addEventListener("submit", (e) => {
      e.preventDefault()
      const newPassword = document.getElementById("newPassword").value
      const confirmNewPassword = document.getElementById("confirmNewPassword").value

      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match!")
        return
      }

      // Simulate password change
      showSuccessMessage("Password updated successfully!")
      closeModal("changePassword")
    })
  }

  // Delete account confirmation
  if (deleteConfirmation && confirmDeleteBtn) {
    deleteConfirmation.addEventListener("input", (e) => {
      const isValid = e.target.value === "DELETE"
      confirmDeleteBtn.disabled = !isValid
    })

    confirmDeleteBtn.addEventListener("click", () => {
      alert("Account deletion process initiated. You will receive an email with further instructions.")
      closeModal("deleteAccount")
    })
  }

  // Toggle switches functionality
  document.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach((toggle) => {
    toggle.addEventListener("change", (e) => {
      const setting = e.target.id
      const isEnabled = e.target.checked
      console.log(`${setting} is now ${isEnabled ? "enabled" : "disabled"}`)

      // Special handling for two-factor authentication
      if (setting === "twoFactorToggle" && isEnabled) {
        alert("Two-factor authentication setup would be initiated here.")
      }
    })
  })

  // Export functionality
  const exportButtons = ["exportHealthProfile", "exportSymptomHistory", "exportAccountActivity"]

  exportButtons.forEach((buttonId) => {
    const button = document.getElementById(buttonId)
    if (button) {
      button.addEventListener("click", () => {
        const exportType = buttonId.replace("export", "")
        button.textContent = "Processing..."
        button.disabled = true

        // Simulate export process
        setTimeout(() => {
          showSuccessMessage(`${exportType} export has been requested. You'll receive an email when it's ready.`)
          button.textContent = "Request Export"
          button.disabled = false
        }, 2000)
      })
    }
  })

  // Notification settings save
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    if (btn.textContent.includes("Notification Settings")) {
      btn.addEventListener("click", () => {
        showSuccessMessage("Notification settings saved successfully!")
      })
    }
    if (btn.textContent.includes("Privacy Settings")) {
      btn.addEventListener("click", () => {
        showSuccessMessage("Privacy settings saved successfully!")
      })
    }
  })

  // Subscription management
  document.querySelectorAll(".btn-outline").forEach((btn) => {
    if (btn.textContent === "Change Plan") {
      btn.addEventListener("click", () => {
        alert("Plan change interface would be displayed here.")
      })
    }
    if (btn.textContent === "Cancel Subscription") {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure you want to cancel your subscription?")) {
          alert("Subscription cancellation process initiated.")
        }
      })
    }
    if (btn.textContent === "Update" && btn.closest(".payment-card")) {
      btn.addEventListener("click", () => {
        alert("Payment method update interface would be displayed here.")
      })
    }
  })

  // Billing history downloads
  document.querySelectorAll(".billing-item .btn-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const billingItem = btn.closest(".billing-item")
      const date = billingItem.querySelector(".billing-date").textContent
      alert(`Downloading invoice for ${date}...`)
    })
  })

  // Account deactivation
  document.querySelectorAll(".btn-outline").forEach((btn) => {
    if (btn.textContent === "Deactivate Account") {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure you want to temporarily deactivate your account?")) {
          alert("Account deactivation process initiated. You can reactivate within 30 days.")
        }
      })
    }
  })

  // Success message function
  function showSuccessMessage(message) {
    // Remove existing success messages
    const existingMessages = document.querySelectorAll(".success-message")
    existingMessages.forEach((msg) => msg.remove())

    // Create new success message
    const successDiv = document.createElement("div")
    successDiv.className = "success-message"
    successDiv.textContent = message

    // Insert at the top of the active content section
    const activeSection = document.querySelector(".content-section.active")
    if (activeSection) {
      activeSection.insertBefore(successDiv, activeSection.firstChild)

      // Remove message after 5 seconds
      setTimeout(() => {
        successDiv.remove()
      }, 5000)
    }
  }

  // Initialize with profile section active
  switchSection("profile")

  // Logout functionality
  document.querySelector(".logout-btn").addEventListener("click", (e) => {
    // e.preventDefault()
    if (confirm("Are you sure you want to logout?")) {
      alert("Logging out... In a real application, you would be redirected to the login page.")
      // In a real application: window.location.href = 'login.html'
    }
  })

  // Auto-save functionality for forms
  const autoSaveFields = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="number"], select, textarea',
  )

  autoSaveFields.forEach((field) => {
    field.addEventListener("blur", () => {
      // Simulate auto-save
      console.log(`Auto-saving ${field.name || field.id}:`, field.value)
    })
  })

  // Real-time validation for email change
  const newEmailInput = document.getElementById("newEmail")
  if (newEmailInput) {
    newEmailInput.addEventListener("input", (e) => {
      const email = e.target.value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = "#e53935"
      } else {
        e.target.style.borderColor = "#ddd"
      }
    })
  }

  // Password strength indicator for password change
  const newPasswordInput = document.getElementById("newPassword")
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", (e) => {
      const password = e.target.value
      let strength = 0

      if (password.length >= 8) strength += 1
      if (password.match(/[a-z]+/)) strength += 1
      if (password.match(/[A-Z]+/)) strength += 1
      if (password.match(/[0-9]+/)) strength += 1
      if (password.match(/[^a-zA-Z0-9]+/)) strength += 1

      // You could add a visual strength indicator here
      console.log(`Password strength: ${strength}/5`)
    })
  }
})
