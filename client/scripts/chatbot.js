const submit = document.querySelector(".submit")
const input = document.querySelector(".user-input")
const messageArea = document.querySelector(".message-field")
const typingIndicator = document.getElementById("typingIndicator")
const mic = document.querySelector(".mic")

submit.addEventListener("click", () => {
  console.log("clicked")
  fetchMessage()
})

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchMessage()
  }
})

function showTypingIndicator() {
  typingIndicator.classList.add("show")
  messageArea.scrollTop = messageArea.scrollHeight
}

function hideTypingIndicator() {
  typingIndicator.classList.remove("show")
}

async function fetchMessage() {
  if (!input.value.trim()) return

  const message = document.createElement("div")
  message.className = "message-box"
  message.textContent = input.value
  messageArea.appendChild(message)

  // Show typing indicator
  showTypingIndicator()

  // Disable submit button and input
  submit.disabled = true
  input.disabled = true

  // API result

 const api = "AIzaSyB83-azAwbZj8lBhIhRYTwuX6fHjqyP5DU"

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a professional medical assistant. Based on the symptoms and medical history provided, generate a detailed health report in a structured format.
                  
                  say i am a AI health assistant , how can i help u 
                
                  Always add a disclaimer that this is AI-generated and not a substitute for professional medical advice.`
                },
                { text: "Input: " + input.value }],
            },
          ],
        }),
      },
    )

    const data = await response.json()
    console.log(data)

    // Hide typing indicator
    hideTypingIndicator()

    const botMessage = document.createElement("div")
    botMessage.className = "botmessage"
    botMessage.innerHTML = marked.parse(data.candidates[0].content.parts[0].text || "No response")
    
    messageArea.appendChild(botMessage)
  } catch (error) {
    console.error("Error:", error)
    hideTypingIndicator()

    const errorMessage = document.createElement("div")
    errorMessage.className = "botmessage"
    errorMessage.textContent = "Sorry, there was an error processing your request."
    messageArea.appendChild(errorMessage)
  } finally {
    // Re-enable submit button and input
    submit.disabled = false
    input.disabled = false
    input.value = ""
    messageArea.scrollTop = messageArea.scrollHeight
    input.focus()
  }
}

// Speech recognition functionality
console.log(mic)
mic.addEventListener("click", (e) => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser")
    return
  }

  input.value = "listening....."
  mic.classList.add("listening")

  const recognition = new webkitSpeechRecognition()
  recognition.lang = "en-GB"

  recognition.onresult = (event) => {
    console.log(event)
    input.value = event.results[0][0].transcript
    mic.classList.remove("listening")
  }

  recognition.onerror = () => {
    input.value = "Cannot listen you...."
    mic.classList.remove("listening")
    setTimeout(() => {
      input.value = ""
    }, 2000)
  }

  recognition.onend = () => {
    mic.classList.remove("listening")
  }

  recognition.start()

  setTimeout(() => {
    if (input.value === "listening.....") {
      input.value = "Cannot listen you...."
    }
  }, 3000)

  setTimeout(() => {
    recognition.stop()
    if (input.value === "Cannot listen you....") {
      input.value = ""
    }
    mic.classList.remove("listening")
  }, 5000)
})

// Focus input on load
window.addEventListener("load", () => {
  input.focus()
})
