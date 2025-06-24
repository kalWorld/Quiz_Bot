// Handle Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("signupUser").value;
    const password = document.getElementById("signupPass").value;

    // Save to localStorage
    localStorage.setItem("quizUsername", username);
    localStorage.setItem("quizPassword", password);

    alert("Signup successful! Now login.");
    window.location.href = "index.html";
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginUser = document.getElementById("loginUser").value;
    const loginPass = document.getElementById("loginPass").value;

    const storedUser = localStorage.getItem("quizUsername");
    const storedPass = localStorage.getItem("quizPassword");

    if (loginUser === storedUser && loginPass === storedPass) {
      alert("Login successful!");
      window.location.href = "quiz.html"; // Go to quiz
    } else {
      alert("Invalid username or password");
    }
  });
}
// ------------------ QUIZ LOGIC ------------------

const quizData = [
  {
    question: "What is the capital of Nepal?",
    options: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
    answer: "Kathmandu"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Tesla", "Edison"],
    answer: "Einstein"
  },
  {
    question: "What is 5 + 7?",
    options: ["12", "10", "13", "14"],
    answer: "12"
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Text Markup Language", "Hyper Transfer Machine Language", "Home Tool Markup Language", "Hyperlinks Text Machine Language"],
    answer: "Hyper Text Markup Language"
  },
  // add more questions up to 10
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

if (questionEl) {
  loadQuestion();

  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    optionsEl.innerHTML = ""; // Clear old options
    feedbackEl.textContent = ""; // Clear feedback
    nextBtn.style.display = "none";

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => checkAnswer(option));
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      score++;
    } else {
      feedbackEl.textContent = `Wrong! Correct answer: ${correct}`;
      feedbackEl.style.color = "red";
    }

    // Disable all buttons
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    nextBtn.style.display = "block";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      // Save score and redirect
      localStorage.setItem("quizScore", score);
      window.location.href = "result.html";
    }
  });
}
