document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const featureCategories = document.querySelectorAll(".feature-category")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category

      // Remove active class from all tabs and categories
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      featureCategories.forEach((cat) => cat.classList.remove("active"))

      // Add active class to clicked tab and corresponding category
      button.classList.add("active")
      document.getElementById(category).classList.add("active")
    })
  })

  // Symptom analysis demo
  const symptomInput = document.getElementById("symptomInput")
  const analyzeBtn = document.getElementById("analyzeBtn")
  const demoResults = document.getElementById("demoResults")

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      const symptoms = symptomInput.value.trim()
      if (symptoms) {
        analyzeSymptoms(symptoms)
      } else {
        demoResults.innerHTML = '<p style="color: #666;">Please enter some symptoms to analyze.</p>'
      }
    })
  }

  if (symptomInput) {
    symptomInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        analyzeBtn.click()
      }
    })
  }

  function analyzeSymptoms(symptoms) {
    // Show loading state
    demoResults.innerHTML = '<p style="color: #666;">Analyzing symptoms...</p>'

    // Simulate AI analysis
    setTimeout(() => {
      const analysisResults = generateAnalysis(symptoms)
      displayAnalysisResults(analysisResults)
    }, 1500)
  }

  function generateAnalysis(symptoms) {
    const lowerSymptoms = symptoms.toLowerCase()
    const results = []

    // Simple keyword-based analysis for demo
    if (lowerSymptoms.includes("headache") || lowerSymptoms.includes("head")) {
      results.push({
        title: "Tension Headache",
        description:
          "Based on your symptoms, this appears to be a tension-type headache. Consider stress management and hydration.",
        confidence: "85%",
        urgency: "low",
      })
    }

    if (lowerSymptoms.includes("fever") || lowerSymptoms.includes("temperature")) {
      results.push({
        title: "Possible Viral Infection",
        description: "Elevated temperature may indicate a viral infection. Monitor symptoms and consider rest.",
        confidence: "78%",
        urgency: "medium",
      })
    }

    if (lowerSymptoms.includes("chest pain") || lowerSymptoms.includes("chest")) {
      results.push({
        title: "Chest Discomfort",
        description: "Chest pain requires immediate medical attention. Please consult a healthcare provider.",
        confidence: "92%",
        urgency: "high",
      })
    }

    if (lowerSymptoms.includes("nausea") || lowerSymptoms.includes("sick")) {
      results.push({
        title: "Gastrointestinal Upset",
        description: "Nausea may be related to dietary factors or stress. Stay hydrated and consider bland foods.",
        confidence: "72%",
        urgency: "low",
      })
    }

    if (results.length === 0) {
      results.push({
        title: "General Health Assessment",
        description:
          "Your symptoms require further evaluation. Consider consulting with a healthcare provider for personalized advice.",
        confidence: "65%",
        urgency: "medium",
      })
    }

    return results
  }

  function displayAnalysisResults(results) {
    const resultsHTML = results
      .map(
        (result) => `
            <div class="analysis-result">
                <div class="result-title">${result.title}</div>
                <div class="result-description">${result.description}</div>
                <div class="result-confidence">Confidence: ${result.confidence}</div>
            </div>
        `,
      )
      .join("")

    demoResults.innerHTML = resultsHTML
  }

  // Health monitoring demo
  function initHealthMonitor() {
    const heartRateElement = document.getElementById("heartRate")
    const sleepQualityElement = document.getElementById("sleepQuality")
    const stressLevelElement = document.getElementById("stressLevel")

    if (heartRateElement) {
      // Simulate real-time heart rate updates
      setInterval(() => {
        const heartRate = 68 + Math.floor(Math.random() * 10)
        heartRateElement.textContent = heartRate
      }, 3000)

      // Simulate sleep quality updates
      setInterval(() => {
        const sleepQuality = 80 + Math.floor(Math.random() * 15)
        sleepQualityElement.textContent = sleepQuality
      }, 5000)

      // Simulate stress level updates
      const stressLevels = ["Low", "Medium", "High"]
      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * stressLevels.length)
        stressLevelElement.textContent = stressLevels[randomIndex]
      }, 7000)
    }
  }

  // Health chart demo
  function initHealthChart() {
    const canvas = document.getElementById("healthChart")
    if (canvas) {
      const ctx = canvas.getContext("2d")
      drawHealthChart(ctx, canvas.width, canvas.height)
    }
  }

  function drawHealthChart(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, width, height)

    // Draw heart rate line
    ctx.strokeStyle = "#1a73e8"
    ctx.lineWidth = 2
    ctx.beginPath()

    const points = 20
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * width
      const y = height / 2 + Math.sin((i / points) * Math.PI * 4) * 30 + Math.random() * 10 - 5
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Add labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Poppins"
    ctx.fillText("Heart Rate", 10, 20)
    ctx.fillText("Time", width - 30, height - 10)
  }

  // Trends chart demo
  function initTrendsChart() {
    const canvas = document.getElementById("trendsChart")
    if (canvas) {
      const ctx = canvas.getContext("2d")
      drawTrendsChart(ctx, canvas.width, canvas.height)
    }
  }

  function drawTrendsChart(ctx, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background grid
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1

    // Vertical lines
    for (let i = 0; i <= 7; i++) {
      const x = (i / 7) * width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw symptom trend line
    ctx.strokeStyle = "#1a73e8"
    ctx.lineWidth = 3
    ctx.beginPath()

    const data = [80, 75, 60, 45, 50, 30, 25, 20]
    for (let i = 0; i < data.length; i++) {
      const x = (i / (data.length - 1)) * width
      const y = height - (data[i] / 100) * height
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Add data points
    ctx.fillStyle = "#1a73e8"
    for (let i = 0; i < data.length; i++) {
      const x = (i / (data.length - 1)) * width
      const y = height - (data[i] / 100) * height
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Add labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Poppins"
    ctx.fillText("Symptom Severity", 10, 20)
    ctx.fillText("Last 7 Days", width - 80, height - 10)
  }

  // Body diagram demo
  const bodyParts = document.querySelectorAll(".body-part-mini")
  bodyParts.forEach((part) => {
    part.addEventListener("click", () => {
      part.classList.toggle("selected")
    })
  })

  // Severity scale demo
  const severityDots = document.querySelectorAll(".severity-dot")
  severityDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      severityDots.forEach((d) => d.classList.remove("active"))
      dot.classList.add("active")

      // Update severity label
      const level = Number.parseInt(dot.dataset.level)
      const label = document.querySelector(".severity-label")
      if (label) {
        const labels = ["", "Very Mild", "Mild", "Moderate", "Severe", "Very Severe"]
        label.textContent = labels[level] || "Moderate"
      }
    })
  })

  // Trend selector demo
  const trendButtons = document.querySelectorAll(".trend-btn")
  trendButtons.forEach((button) => {
    button.addEventListener("click", () => {
      trendButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Update chart based on selection
      const canvas = document.getElementById("trendsChart")
      if (canvas) {
        const ctx = canvas.getContext("2d")
        drawTrendsChart(ctx, canvas.width, canvas.height)
      }
    })
  })

  // Device connection demo
  const deviceItems = document.querySelectorAll(".device-item:not(.connected)")
  deviceItems.forEach((device) => {
    device.addEventListener("click", () => {
      device.classList.add("connected")
      const status = device.querySelector(".device-status")
      if (status) {
        status.textContent = "Connected"
        status.style.background = "#d4edda"
        status.style.color = "#155724"
      }
    })
  })

  // App connection demo
  const connectionStatuses = document.querySelectorAll(".connection-status:not(.connected)")
  connectionStatuses.forEach((status) => {
    status.addEventListener("click", () => {
      status.classList.add("connected")
      status.textContent = "✓"
      status.style.background = "#d4edda"
      status.style.color = "#155724"
      status.style.cursor = "default"
    })
  })

  // Initialize demos
  initHealthMonitor()
  initHealthChart()
  initTrendsChart()

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe feature cards
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })

  // Pricing card hover effects
  const pricingCards = document.querySelectorAll(".pricing-card")
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("featured")) {
        card.style.borderColor = "#1a73e8"
      }
    })

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("featured")) {
        card.style.borderColor = "#e0e0e0"
      }
    })
  })

  // Demo result animations
  function animateResults() {
    const results = document.querySelectorAll(".analysis-result")
    results.forEach((result, index) => {
      result.style.opacity = "0"
      result.style.transform = "translateX(-20px)"
      setTimeout(() => {
        result.style.transition = "all 0.5s ease"
        result.style.opacity = "1"
        result.style.transform = "translateX(0)"
      }, index * 200)
    })
  }

  // Update the displayAnalysisResults function to include animation
  const originalDisplayResults = displayAnalysisResults
  displayAnalysisResults = (results) => {
    originalDisplayResults(results)
    setTimeout(animateResults, 100)
  }
})
