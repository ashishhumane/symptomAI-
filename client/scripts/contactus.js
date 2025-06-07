document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value
      const newsletter = document.getElementById("newsletter").checked

      // Validate form
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Show loading state
      const submitBtn = document.querySelector(".submit-btn")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.textContent = "Thank you for your message! We'll get back to you soon."

        // Insert before the form
        contactForm.parentNode.insertBefore(successMessage, contactForm)

        // Reset form
        contactForm.reset()

        // Restore button
        submitBtn.textContent = originalText
        submitBtn.disabled = false

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }, 1500)
    })
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
          otherItem.querySelector(".toggle-icon").textContent = "+"
        }
      })

      // Toggle current item
      item.classList.toggle("active")

      // Update toggle icon
      const toggleIcon = item.querySelector(".toggle-icon")
      toggleIcon.textContent = item.classList.contains("active") ? "−" : "+"
    })
  })

  // Form field validation
  const formFields = document.querySelectorAll(".contact-form input, .contact-form textarea")

  formFields.forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.required && field.value.trim() === "") {
        field.style.borderColor = "#e53935"
      } else if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value) && field.value.trim() !== "") {
          field.style.borderColor = "#e53935"
        } else {
          field.style.borderColor = "#ddd"
        }
      } else {
        field.style.borderColor = "#ddd"
      }
    })
  })
})
