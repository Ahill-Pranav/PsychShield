let questionsData = [];
let currentQuestionIndex = 0;
let userAnswers = []; // Array of { trigger, weight }

async function initQuiz() {
    try {
        const res = await fetch('data/questions.json');
        if (!res.ok) throw new Error("Could not fetch questions");
        const data = await res.json();
        questionsData = data.questions;
        currentQuestionIndex = 0;
        userAnswers = [];
        renderQuestion(0);
    } catch (e) {
        console.error(e);
        showToast("Error loading quiz data", "error");
    }
}

function renderQuestion(index) {
    const container = document.getElementById('quiz-content');
    if (!container) return;

    const q = questionsData[index];
    const progressPercent = Math.round(((index) / questionsData.length) * 100);

    container.innerHTML = `
    <div class="quiz-header">
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); font-weight:600; font-size: 0.95rem;">
        <span>Question ${index + 1} of ${questionsData.length}</span>
        <span>${progressPercent}% Complete</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
      </div>
    </div>
    
    <div class="question-card active" id="q-card-${index}">
      <div class="scenario-text">${q.scenario}</div>
      <div class="question-text">${q.question}</div>
      <div class="options-grid">
        ${q.options.map((opt, i) => `
          <button class="option-btn" onclick="selectOption(${index}, '${opt.trigger}', ${opt.weight})">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectOption(qIndex, trigger, weight) {
    // Save answer
    userAnswers.push({ trigger, weight });

    // Transition out
    const card = document.getElementById(`q-card-${qIndex}`);
    if (card) {
        card.classList.remove('active');
        card.classList.add('exiting');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsData.length) {
            renderQuestion(currentQuestionIndex);
        } else {
            finishQuiz();
        }
    }, 400); // Wait for transition
}

function finishQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('context-container').style.display = 'block';
    setTimeout(() => document.querySelector('.context-card').classList.add('fade-up', 'visible'), 50);
}

function finishContext(skip = false) {
    let userContext = {};
    if (!skip) {
        userContext = {
            name: document.getElementById('ctx-name').value.trim(),
            college: document.getElementById('ctx-college').value.trim(),
            dept: document.getElementById('ctx-dept').value.trim()
        };
    }

    const profile = calculateProfile(userAnswers);
    // Encode data to pass via URL params since we have no backend
    const dataToPass = {
        profile,
        context: userContext
    };

    const encoded = btoa(JSON.stringify(dataToPass));
    window.location.href = `results.html?data=${encoded}`;
}

// Toast System included for scope of index
function showToast(msg, type = "info") {
    const colors = { info: '#4F3AC0', warning: '#D97706', error: '#DC2626', success: '#059669' };
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const t = document.createElement('div');
    t.className = 'toast';
    t.style.background = colors[type];
    t.textContent = msg;
    toastContainer.appendChild(t);

    requestAnimationFrame(() => t.classList.add('visible'));
    setTimeout(() => {
        t.classList.remove("visible");
        setTimeout(() => t.remove(), 300);
    }, 3500);
}

window.initQuiz = initQuiz;
