
// Sample analysis data
const sampleAnalysis = {
    medications: [{
        name: "Lisinopril",
        dosage: "10mg once daily",
        purpose: "Blood pressure management",
        genericName: "Lisinopril"
    }, {
        name: "Metformin",
        dosage: "500mg twice daily",
        purpose: "Diabetes management",
        genericName: "Metformin HCl"
    }, {
        name: "Atorvastatin",
        dosage: "20mg once daily",
        purpose: "Cholesterol management",
        genericName: "Atorvastatin Calcium"
    }],
    interactions: [{
        type: "minor",
        description: "No significant interactions detected between your current medications.",
        severity: "success"
    }],
    sideEffects: [{
        medication: "Lisinopril",
        effects: ["Dry cough", "Dizziness", "Fatigue"],
        severity: "Common"
    }, {
        medication: "Metformin",
        effects: ["Nausea", "Diarrhea", "Stomach upset"],
        severity: "Common"
    }],
    recommendations: [
        "Take Metformin with meals to reduce stomach upset",
        "Monitor blood pressure regularly while on Lisinopril",
        "Schedule regular lab tests to monitor kidney function",
        "Maintain consistent medication timing for best results"
    ],
    assessment: {
        type: "success",
        message: "Your prescription appears safe with no major concerns detected. Continue following your doctor's instructions and monitor for any unusual symptoms."
    }
};

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.upload-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + '-content').classList.add('active');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        // processFile(file);
        showAnalysis();

    }
}

function clearResults() {
    ['medicationsList', 'interactionsList', 'sideEffectsList', 'recommendationsList', 'overallAssessment']
        .forEach(id => document.getElementById(id).innerHTML = '');
}


// function processFile(file) {
//     if (file.size > 10 * 1024 * 1024) {
//         alert('File size too large. Please select a file under 10MB.');
//         return;
//     }

//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {

//         alert('Please select a valid image (JPG, PNG) or PDF file.');
//         return;


//     }
// }



function showAnalysis() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('analysisResults').style.display = 'none';

    // Animate step progress
    let step = 1;
    const interval = setInterval(() => {
        if (step > 4) {
            clearInterval(interval);
            renderResults(sampleAnalysis);
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('analysisResults').style.display = 'block';
            return;
        }
        for (let i = 1; i <= 4; i++) {
            const stepElem = document.getElementById(`step${i}`);
            stepElem.classList.remove('active', 'completed');
            if (i < step) stepElem.classList.add('completed');
            else if (i === step) stepElem.classList.add('active');
        }
        step++;
    }, 600);
}


function renderResults(data) {
    const medsContainer = document.getElementById('medicationsList');
    const interactionsContainer = document.getElementById('interactionsList');
    const sideEffectsContainer = document.getElementById('sideEffectsList');
    const recommendationsContainer = document.getElementById('recommendationsList');
    const overallContainer = document.getElementById('overallAssessment');

    // Medications
    medsContainer.innerHTML = '';
    data.medications.forEach(med => {
        medsContainer.innerHTML += `
            <div class="medication-item">
                <div class="medication-name">${med.name}</div>
                <div class="medication-details">${med.dosage} • ${med.purpose}</div>
            </div>
        `;
    });

    // Interactions
    interactionsContainer.innerHTML = '';
    data.interactions.forEach(inter => {
        interactionsContainer.innerHTML += `
            <div class="alert-box ${inter.severity}">
                <div class="alert-header">
                    <i class="fa-solid fa-circle-info alert-icon"></i>
                    <div class="alert-title">${inter.severity.charAt(0).toUpperCase() + inter.severity.slice(1)} Interaction</div>
                </div>
                <div class="alert-text">${inter.description}</div>
            </div>
        `;
    });

    // Side Effects
    sideEffectsContainer.innerHTML = '';
    data.sideEffects.forEach(side => {
        sideEffectsContainer.innerHTML += `
            <div class="alert-box warning">
                <div class="alert-header">
                    <i class="fa-solid fa-exclamation-triangle alert-icon"></i>
                    <div class="alert-title">${side.medication}</div>
                </div>
                <div class="alert-text">${side.effects.join(', ')} (${side.severity})</div>
            </div>
        `;
    });

    // Recommendations
    recommendationsContainer.innerHTML = '';
    data.recommendations.forEach(rec => {
        recommendationsContainer.innerHTML += `<p>✅ ${rec}</p>`;
    });

    // Assessment
    overallContainer.innerHTML = `
        <div class="alert-box ${data.assessment.type}">
            <div class="alert-header">
                <i class="fa-solid fa-check-circle alert-icon"></i>
                <div class="alert-title">Assessment</div>
            </div>
            <div class="alert-text">${data.assessment.message}</div>
        </div>
    `;
}


function analyzeManualInput() {
    showAnalysis();
}

function processFile(file) {
    // ... validation ...
    showAnalysis();
}

function downloadReport() {
    alert("Downloading PDF report... (PDF export will be implemented in next version)");
}

function consultDoctor() {
    alert("Redirecting to doctor consultation...");
}

function analyzeAnother() {
    location.reload(); // or clear inputs and hide results
}

function switchTab(tabName) {
    document.querySelectorAll('.upload-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + '-content').classList.add('active');

    // Optional: reset results and inputs
    document.getElementById('analysisResults').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
}
