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
    console.warn("Fetch failed (likely file:// protocol). Using local fallback data.");
    const fallbackData = {
      "questions": [
        { "id": 1, "scenario": "A message arrives: 'Your HDFC account has been flagged. Call 1800-XXX immediately or it will be frozen in 2 hours.'", "question": "What is your first instinct?", "options": [{ "text": "Call immediately — I don't want to lose access", "trigger": "urgency", "weight": 3 }, { "text": "Forward to family — they'll know what to do", "trigger": "authority", "weight": 2 }, { "text": "Check if the number is official first", "trigger": "none", "weight": 0 }, { "text": "Ignore — banks don't send messages like this", "trigger": "none", "weight": 0 }] },
        { "id": 2, "scenario": "A senior from your college messages on LinkedIn: 'I referred you for a Google internship. Need your resume + Aadhaar copy ASAP — deadline is today.'", "question": "How do you respond?", "options": [{ "text": "Send everything — they're a senior I trust", "trigger": "liking", "weight": 3 }, { "text": "Send resume only — Aadhaar feels too much", "trigger": "authority", "weight": 2 }, { "text": "Ask them to call first to verify", "trigger": "none", "weight": 0 }, { "text": "Check Google's careers page independently", "trigger": "none", "weight": 0 }] },
        { "id": 3, "scenario": "You get a message: 'You\\'ve won ₹10,000 UPI cashback from Paytm. Only 5 slots left to claim!'", "question": "What runs through your mind?", "options": [{ "text": "Click it quickly before the slots are gone!", "trigger": "scarcity", "weight": 3 }, { "text": "Wonder why Paytm is giving free money", "trigger": "reciprocity", "weight": 2 }, { "text": "It's a scam, delete the message", "trigger": "none", "weight": 0 }, { "text": "Check Paytm app directly for offers", "trigger": "none", "weight": 0 }] },
        { "id": 4, "scenario": "A caller says: 'This is CBI Cyber Cell. A parcel in your name contains illegal substances. Do not disconnect.'", "question": "How do you react?", "options": [{ "text": "Panic and listen to their instructions", "trigger": "authority", "weight": 3 }, { "text": "Ask for their ID and official number", "trigger": "urgency", "weight": 2 }, { "text": "Hang up and call 1930 Cyber Helpline", "trigger": "none", "weight": 0 }, { "text": "Argue with them that it's a mistake", "trigger": "none", "weight": 0 }] },
        { "id": 5, "scenario": "Your college WhatsApp group has a message from the Class Rep: 'Emergency fundraiser for a student. 40 people already donated ₹500.'", "question": "What is your immediate action?", "options": [{ "text": "Donate ₹500 immediately since everyone else did", "trigger": "social_proof", "weight": 3 }, { "text": "Wait to see if more friends mention it", "trigger": "liking", "weight": 2 }, { "text": "Call the Class Rep to confirm before paying", "trigger": "none", "weight": 0 }, { "text": "Ignore the message completely", "trigger": "none", "weight": 0 }] },
        { "id": 6, "scenario": "An app developer emails: 'Thanks for beta testing our app last month! Here is a free ₹500 Amazon voucher code.'", "question": "How do you proceed?", "options": [{ "text": "Click to claim it — I did help them out", "trigger": "reciprocity", "weight": 3 }, { "text": "Check if a friend verified this developer", "trigger": "social_proof", "weight": 2 }, { "text": "Don't click, search the developer's official site", "trigger": "none", "weight": 0 }, { "text": "Mark as spam", "trigger": "none", "weight": 0 }] },
        { "id": 7, "scenario": "An attractive stranger you've been chatting with on Instagram mentions: 'I lost my wallet, can you UPI me ₹500 for a cab? I\\'ll pay tomorrow.'", "question": "What is your approach?", "options": [{ "text": "Send the money right away to help out", "trigger": "liking", "weight": 3 }, { "text": "Feel obliged to return a past favor", "trigger": "reciprocity", "weight": 2 }, { "text": "Suggest they call a friend instead", "trigger": "none", "weight": 0 }, { "text": "Block and report the account", "trigger": "none", "weight": 0 }] },
        { "id": 8, "scenario": "An email about a data science workshop states: '50 of your batchmates already applied. Only 3 seats left for our campus!'", "question": "What do you do?", "options": [{ "text": "Register instantly so I don't miss out", "trigger": "scarcity", "weight": 3 }, { "text": "Register because all my batchmates are going", "trigger": "social_proof", "weight": 3 }, { "text": "Check the workshop's actual credibility", "trigger": "none", "weight": 0 }, { "text": "Ignore it, probably another paid course", "trigger": "none", "weight": 0 }] }
      ]
    };
    questionsData = fallbackData.questions;
    currentQuestionIndex = 0;
    userAnswers = [];
    renderQuestion(0);
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
