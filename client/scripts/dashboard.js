// Generate trend chart bars
const chartContainer = document.getElementById('trendChart');
const trendData = [45, 62, 38, 71, 55, 89, 67]; // Sample data
const maxValue = Math.max(...trendData);

trendData.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = `${(value / maxValue) * 160}px`;
    bar.title = `Day ${index + 1}: ${value}%`;
    chartContainer.appendChild(bar);
});

// Severity selector functionality
document.querySelectorAll('.severity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Medication pill interactions
document.querySelectorAll('.med-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        if (!pill.classList.contains('taken') && !pill.classList.contains('missed')) {
            pill.classList.add('taken');
            const timeDiv = pill.querySelector('.med-time');
            timeDiv.innerHTML = timeDiv.innerHTML.replace(/\d+:\d+ [AP]M/, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ✓');
        }
    });
});

// Quick log button functionality
document.querySelector('.quick-log-btn').addEventListener('click', () => {
    document.querySelector('.symptom-input').focus();
});

// Log symptom functionality
document.querySelector('.log-btn').addEventListener('click', () => {
    const symptom = document.querySelector('.symptom-input').value;
    const selectedSeverity = document.querySelector('.severity-btn.active');

    if (symptom && selectedSeverity) {
        // Add to timeline (this would typically send to backend)
        const timeline = document.querySelector('.symptom-timeline');
        const newItem = document.createElement('div');
        newItem.className = 'symptom-item';
        newItem.innerHTML = `
                    <div class="symptom-severity severity-${selectedSeverity.dataset.severity}"></div>
                    <div class="symptom-info">
                        <div class="symptom-name">${symptom}</div>
                        <div class="symptom-time">Just now</div>
                    </div>
                `;
        timeline.insertBefore(newItem, timeline.firstChild);

        // Clear form
        document.querySelector('.symptom-input').value = '';
        document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));

        // Show success feedback
        const logBtn = document.querySelector('.log-btn');
        const originalText = logBtn.textContent;
        logBtn.textContent = 'Logged! ✓';
        logBtn.style.background = '#2ed573';
        setTimeout(() => {
            logBtn.textContent = originalText;
            logBtn.style.background = '';
        }, 2000);
    }
});

// Animate health score on load
window.addEventListener('load', () => {
    const progressCircle = document.querySelector('.progress-ring-progress');
    const score = 78;
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.style.cursor = 'pointer';
}

// Emergency button functionality
document.querySelector('.emergency-btn').addEventListener('click', () => {
    if (confirm('This will call emergency services. Continue?')) {
        alert('Emergency services contacted. Help is on the way.');
    }
});

// Chart bar hover effects
document.querySelectorAll('.chart-bar').forEach((bar, index) => {
    bar.addEventListener('mouseenter', () => {
        bar.style.opacity = '0.8';
        const tooltip = document.createElement('div');
        tooltip.textContent = bar.title;
        tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    pointer-events: none;
                `;
        document.body.appendChild(tooltip);

        bar.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 30 + 'px';
        });

        bar.addEventListener('mouseleave', () => {
            tooltip.remove();
            bar.style.opacity = '';
        });
    });
});
