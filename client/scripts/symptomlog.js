document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  let currentStep = 1
  const totalSteps = 4
  let selectedSymptoms = []
  let selectedTriggers = []
  let selectedSeverity = null
  let selectedFrequency = null
  let selectedActivity = null
  let uploadedFiles = []
  let isRecording = false
  let recordingStartTime = null
  let recordingInterval = null

  // Symptom suggestions database
  const symptomDatabase = [
    "Headache",
    "Migraine",
    "Nausea",
    "Vomiting",
    "Dizziness",
    "Fatigue",
    "Fever",
    "Chills",
    "Sweating",
    "Cough",
    "Sore throat",
    "Runny nose",
    "Congestion",
    "Shortness of breath",
    "Chest pain",
    "Heart palpitations",
    "Back pain",
    "Neck pain",
    "Shoulder pain",
    "Joint pain",
    "Muscle pain",
    "Stomach ache",
    "Abdominal pain",
    "Bloating",
    "Constipation",
    "Diarrhea",
    "Loss of appetite",
    "Weight loss",
    "Weight gain",
    "Insomnia",
    "Drowsiness",
    "Anxiety",
    "Depression",
    "Mood swings",
    "Irritability",
    "Memory problems",
    "Confusion",
    "Blurred vision",
    "Eye pain",
    "Hearing problems",
    "Ear pain",
    "Skin rash",
    "Itching",
    "Swelling",
    "Bruising",
    "Numbness",
    "Tingling",
    "Weakness",
    "Tremors",
    "Seizures",
  ]

  // Initialize the application
  init()

  function init() {
    setupEventListeners()
    updateProgressBar()
    setDefaultDateTime()
  }

  function setupEventListeners() {
    // Navigation buttons
    document.getElementById("nextBtn").addEventListener("click", nextStep)
    document.getElementById("prevBtn").addEventListener("click", prevStep)

    // Symptom search
    const symptomSearch = document.getElementById("symptomSearch")
    symptomSearch.addEventListener("input", handleSymptomSearch)
    symptomSearch.addEventListener("blur", () => {
      setTimeout(() => hideSearchSuggestions(), 200)
    })

    // Body diagram
    document.querySelectorAll(".body-part").forEach((part) => {
      part.addEventListener("click", handleBodyPartClick)
    })

    // Popular symptom tags
    document.querySelectorAll(".symptom-tag").forEach((tag) => {
      tag.addEventListener("click", handleSymptomTagClick)
    })

    // Severity options
    document.querySelectorAll(".severity-option").forEach((option) => {
      option.addEventListener("click", handleSeverityClick)
    })

    // Frequency options
    document.querySelectorAll(".frequency-option").forEach((option) => {
      option.addEventListener("click", handleFrequencyClick)
    })

    // Trigger categories
    document.querySelectorAll(".trigger-category").forEach((category) => {
      category.addEventListener("click", handleTriggerClick)
    })

    // Activity options
    document.querySelectorAll(".activity-option").forEach((option) => {
      option.addEventListener("click", handleActivityClick)
    })

    // Custom trigger
    document.getElementById("addTriggerBtn").addEventListener("click", addCustomTrigger)
    document.getElementById("customTrigger").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addCustomTrigger()
      }
    })

    // File uploads
    document.getElementById("photoUpload").addEventListener("click", () => {
      document.getElementById("photoInput").click()
    })
    document.getElementById("photoInput").addEventListener("change", handlePhotoUpload)

    // Voice recording
    document.getElementById("recordBtn").addEventListener("click", toggleRecording)

    // Medication options
    document.querySelectorAll('input[name="medication"]').forEach((radio) => {
      radio.addEventListener("change", handleMedicationChange)
    })

    // Draft save
    document.getElementById("saveDraftBtn").addEventListener("click", saveDraft)

    // Progress step clicks
    document.querySelectorAll(".progress-step").forEach((step) => {
      step.addEventListener("click", function () {
        const stepNumber = Number.parseInt(this.dataset.step)
        if (stepNumber < currentStep || stepNumber === 1) {
          goToStep(stepNumber)
        }
      })
    })
  }

  function setDefaultDateTime() {
    const now = new Date()
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    document.getElementById("startTime").value = localDateTime
  }

  function handleSymptomSearch(e) {
    const query = e.target.value.toLowerCase()
    const suggestions = document.getElementById("searchSuggestions")

    if (query.length < 2) {
      hideSearchSuggestions()
      return
    }

    const matches = symptomDatabase
      .filter((symptom) => symptom.toLowerCase().includes(query) && !selectedSymptoms.includes(symptom))
      .slice(0, 5)

    if (matches.length > 0) {
      suggestions.innerHTML = matches
        .map((symptom) => `<div class="suggestion-item" onclick="selectSymptom('${symptom}')">${symptom}</div>`)
        .join("")
      suggestions.style.display = "block"
    } else {
      hideSearchSuggestions()
    }
  }

  function hideSearchSuggestions() {
    document.getElementById("searchSuggestions").style.display = "none"
  }

  function selectSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
      selectedSymptoms.push(symptom)
      updateSelectedSymptoms()
      document.getElementById("symptomSearch").value = ""
      hideSearchSuggestions()
    }
  }

  function updateSelectedSymptoms() {
    const container = document.getElementById("selectedSymptoms")
    container.innerHTML = selectedSymptoms
      .map(
        (symptom) =>
          `<span class="symptom-chip">
                ${symptom}
                <button class="remove-symptom" onclick="removeSymptom('${symptom}')">×</button>
            </span>`,
      )
      .join("")
  }

  function removeSymptom(symptom) {
    selectedSymptoms = selectedSymptoms.filter((s) => s !== symptom)
    updateSelectedSymptoms()

    // Remove selection from tags and body parts
    document.querySelectorAll(".symptom-tag").forEach((tag) => {
      if (tag.dataset.symptom === symptom.toLowerCase().replace(" ", "-")) {
        tag.classList.remove("selected")
      }
    })
  }

  function handleBodyPartClick(e) {
    const part = e.target
    const partName = part.getAttribute("title")

    part.classList.toggle("selected")

    if (part.classList.contains("selected")) {
      selectSymptom(`${partName} pain`)
    } else {
      removeSymptom(`${partName} pain`)
    }
  }

  function handleSymptomTagClick(e) {
    const tag = e.target
    const symptom = tag.textContent

    tag.classList.toggle("selected")

    if (tag.classList.contains("selected")) {
      selectSymptom(symptom)
    } else {
      removeSymptom(symptom)
    }
  }

  function handleSeverityClick(e) {
    document.querySelectorAll(".severity-option").forEach((opt) => opt.classList.remove("selected"))
    e.currentTarget.classList.add("selected")
    selectedSeverity = e.currentTarget.dataset.severity
  }

  function handleFrequencyClick(e) {
    document.querySelectorAll(".frequency-option").forEach((opt) => opt.classList.remove("selected"))
    e.currentTarget.classList.add("selected")
    selectedFrequency = e.currentTarget.dataset.frequency
  }

  function handleTriggerClick(e) {
    const trigger = e.currentTarget
    const triggerName = trigger.dataset.trigger

    trigger.classList.toggle("selected")

    if (trigger.classList.contains("selected")) {
      if (!selectedTriggers.includes(triggerName)) {
        selectedTriggers.push(triggerName)
        updateSelectedTriggers()
      }
    } else {
      selectedTriggers = selectedTriggers.filter((t) => t !== triggerName)
      updateSelectedTriggers()
    }
  }

  function handleActivityClick(e) {
    document.querySelectorAll(".activity-option").forEach((opt) => opt.classList.remove("selected"))
    e.currentTarget.classList.add("selected")
    selectedActivity = e.currentTarget.dataset.activity
  }

  function addCustomTrigger() {
    const input = document.getElementById("customTrigger")
    const trigger = input.value.trim()

    if (trigger && !selectedTriggers.includes(trigger)) {
      selectedTriggers.push(trigger)
      updateSelectedTriggers()
      input.value = ""
    }
  }

  function updateSelectedTriggers() {
    const container = document.getElementById("selectedTriggers")
    container.innerHTML = selectedTriggers
      .map(
        (trigger) =>
          `<span class="trigger-chip">
                ${trigger}
                <button class="remove-trigger" onclick="removeTrigger('${trigger}')">×</button>
            </span>`,
      )
      .join("")
  }

  function removeTrigger(trigger) {
    selectedTriggers = selectedTriggers.filter((t) => t !== trigger)
    updateSelectedTriggers()

    // Remove selection from trigger categories
    document.querySelectorAll(".trigger-category").forEach((cat) => {
      if (cat.dataset.trigger === trigger) {
        cat.classList.remove("selected")
      }
    })
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0]
    if (file) {
      const fileInfo = {
        name: file.name,
        size: formatFileSize(file.size),
        type: "photo",
        icon: "📷",
      }
      uploadedFiles.push(fileInfo)
      updateUploadedFiles()
    }
  }

  function toggleRecording() {
    const recordBtn = document.getElementById("recordBtn")
    const recordingTime = document.getElementById("recordingTime")

    if (!isRecording) {
      startRecording()
      recordBtn.classList.add("recording")
      recordBtn.textContent = "⏹️"
      recordingTime.style.display = "block"
      recordingStartTime = Date.now()

      recordingInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000)
        const minutes = Math.floor(elapsed / 60)
          .toString()
          .padStart(2, "0")
        const seconds = (elapsed % 60).toString().padStart(2, "0")
        recordingTime.textContent = `${minutes}:${seconds}`
      }, 1000)
    } else {
      stopRecording()
      recordBtn.classList.remove("recording")
      recordBtn.textContent = "🎤"
      recordingTime.style.display = "none"
      clearInterval(recordingInterval)

      const duration = Math.floor((Date.now() - recordingStartTime) / 1000)
      const fileInfo = {
        name: `Voice note (${duration}s)`,
        size: "Audio recording",
        type: "audio",
        icon: "🎤",
      }
      uploadedFiles.push(fileInfo)
      updateUploadedFiles()
    }

    isRecording = !isRecording
  }

  function startRecording() {
    // In a real app, this would start actual audio recording
    console.log("Starting audio recording...")
  }

  function stopRecording() {
    // In a real app, this would stop audio recording and save the file
    console.log("Stopping audio recording...")
  }

  function updateUploadedFiles() {
    const container = document.getElementById("uploadedFiles")
    container.innerHTML = uploadedFiles
      .map(
        (file, index) =>
          `<div class="uploaded-file">
                <span class="file-icon">${file.icon}</span>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${file.size}</div>
                </div>
                <button class="remove-file" onclick="removeFile(${index})">×</button>
            </div>`,
      )
      .join("")
  }

  function removeFile(index) {
    uploadedFiles.splice(index, 1)
    updateUploadedFiles()
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  function handleMedicationChange(e) {
    const medicationList = document.getElementById("medicationList")
    if (e.target.value === "yes") {
      medicationList.style.display = "block"
    } else {
      medicationList.style.display = "none"
    }
  }

  function nextStep() {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep++
        updateStepDisplay()
        updateProgressBar()
      } else {
        submitForm()
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--
      updateStepDisplay()
      updateProgressBar()
    }
  }

  function goToStep(stepNumber) {
    currentStep = stepNumber
    updateStepDisplay()
    updateProgressBar()
  }

  function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll(".step").forEach((step) => {
      step.classList.remove("active")
    })

    // Show current step
    document.getElementById(`step${currentStep}`).classList.add("active")

    // Update step counter
    document.getElementById("currentStep").textContent = currentStep

    // Update navigation buttons
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")

    prevBtn.style.display = currentStep > 1 ? "block" : "none"
    nextBtn.textContent = currentStep === totalSteps ? "Submit" : "Next"

    // Update progress steps
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      step.classList.remove("active", "completed")
      if (index + 1 < currentStep) {
        step.classList.add("completed")
      } else if (index + 1 === currentStep) {
        step.classList.add("active")
      }
    })
  }

  function updateProgressBar() {
    const progressFill = document.getElementById("progressFill")
    const percentage = (currentStep / totalSteps) * 100
    progressFill.style.width = `${percentage}%`
  }

  function validateCurrentStep() {
    switch (currentStep) {
      case 1:
        if (selectedSymptoms.length === 0) {
          alert("Please select at least one symptom.")
          return false
        }
        break
      case 2:
        if (!selectedSeverity) {
          alert("Please rate the severity of your symptom.")
          return false
        }
        if (!document.getElementById("startTime").value) {
          alert("Please specify when the symptom started.")
          return false
        }
        if (!document.getElementById("duration").value) {
          alert("Please select the duration of your symptom.")
          return false
        }
        break
      case 3:
        // Context step is optional, no validation required
        break
      case 4:
        // Notes step is optional, no validation required
        break
    }
    return true
  }

  function saveDraft() {
    const draftData = {
      symptoms: selectedSymptoms,
      severity: selectedSeverity,
      frequency: selectedFrequency,
      startTime: document.getElementById("startTime").value,
      duration: document.getElementById("duration").value,
      triggers: selectedTriggers,
      activity: selectedActivity,
      notes: document.getElementById("additionalNotes").value,
      medication: document.querySelector('input[name="medication"]:checked')?.value,
      medicationList: document.getElementById("medicationList").value,
      uploadedFiles: uploadedFiles,
      currentStep: currentStep,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("symptomDraft", JSON.stringify(draftData))

    // Show confirmation
    const originalText = document.getElementById("saveDraftBtn").textContent
    document.getElementById("saveDraftBtn").textContent = "Draft Saved!"
    setTimeout(() => {
      document.getElementById("saveDraftBtn").textContent = originalText
    }, 2000)
  }

  function loadDraft() {
    const draftData = localStorage.getItem("symptomDraft")
    if (draftData) {
      const data = JSON.parse(draftData)

      // Restore form data
      selectedSymptoms = data.symptoms || []
      selectedSeverity = data.severity
      selectedFrequency = data.frequency
      selectedTriggers = data.triggers || []
      selectedActivity = data.activity
      uploadedFiles = data.uploadedFiles || []

      // Restore form fields
      if (data.startTime) document.getElementById("startTime").value = data.startTime
      if (data.duration) document.getElementById("duration").value = data.duration
      if (data.notes) document.getElementById("additionalNotes").value = data.notes
      if (data.medicationList) document.getElementById("medicationList").value = data.medicationList

      // Restore selections
      updateSelectedSymptoms()
      updateSelectedTriggers()
      updateUploadedFiles()

      if (data.severity) {
        document.querySelector(`[data-severity="${data.severity}"]`)?.classList.add("selected")
      }

      if (data.frequency) {
        document.querySelector(`[data-frequency="${data.frequency}"]`)?.classList.add("selected")
      }

      if (data.activity) {
        document.querySelector(`[data-activity="${data.activity}"]`)?.classList.add("selected")
      }

      if (data.medication) {
        document.querySelector(`input[name="medication"][value="${data.medication}"]`).checked = true
        handleMedicationChange({ target: { value: data.medication } })
      }

      // Go to saved step
      if (data.currentStep) {
        currentStep = data.currentStep
        updateStepDisplay()
        updateProgressBar()
      }
    }
  }

  function submitForm() {
    const formData = {
      symptoms: selectedSymptoms,
      severity: selectedSeverity,
      frequency: selectedFrequency,
      startTime: document.getElementById("startTime").value,
      duration: document.getElementById("duration").value,
      triggers: selectedTriggers,
      activity: selectedActivity,
      notes: document.getElementById("additionalNotes").value,
      medication: document.querySelector('input[name="medication"]:checked')?.value,
      medicationList: document.getElementById("medicationList").value,
      uploadedFiles: uploadedFiles,
      submittedAt: new Date().toISOString(),
    }

    // Simulate form submission
    console.log("Submitting form data:", formData)

    // Show success modal
    document.getElementById("successOverlay").style.display = "flex"

    // Clear draft
    localStorage.removeItem("symptomDraft")

    // In a real app, this would send data to the server
    // fetch('/api/symptoms', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
  }

  // Make functions globally accessible for onclick handlers
  window.selectSymptom = selectSymptom
  window.removeSymptom = removeSymptom
  window.removeTrigger = removeTrigger
  window.removeFile = removeFile

  // Load draft on page load
  loadDraft()

  // Auto-save draft every 30 seconds
  setInterval(saveDraft, 30000)
})
