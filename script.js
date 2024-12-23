const questions = [
  {
    question: "what is the capital of India?",
    answer: [
      { text: "Mumbai", correct: false },
      { text: "Delhi", correct: true },
      { text: "Kolkata", correct: false },
      { text: "Bangalore", correct: false },
    ],
  },
  {
    question: "which is the richest city in India?",
    answer: [
      { text: "Mumbai", correct: true },
      { text: "Kolkata", correct: false },
      { text: "Delhi", correct: false },
      { text: "Bangalore", correct: false },
    ],
  },
  {
    question: "National animal of India?",
    answer: [
      { text: "Hyenna", correct: false },
      { text: "Jaguar", correct: false },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: true },
    ],
  },
  {
    question: "Richest Person of India?",
    answer: [
      { text: "Gautam Adani", correct: false },
      { text: "Jindal and Family", correct: false },
      { text: "Mukesh Ambani", correct: true },
      { text: "Rohit Sharma", correct: false },
    ],
  },
  {
    question: "Which Indian state has the largest population?",
    answer: [
      { text: "Maharashtra", correct: false },
      { text: "Uttar Pradesh", correct: true },
      { text: "Bihar", correct: false },
      { text: "Rajasthan", correct: false },
    ],
  },
  {
    question: "What is the national aquatic animal of India?",
    answer: [
      { text: "Ganges River Dolphin", correct: true },
      { text: "Blue Whale", correct: false },
      { text: "Olive Ridley Turtle", correct: false },
      { text: "Indian Starfish", correct: false },
    ],
  },
  {
    question: "Which Indian city is known as the 'Silicon Valley of India'?",
    answer: [
      { text: "Mumbai", correct: false },
      { text: "Hyderabad", correct: false },
      { text: "Bengaluru", correct: true },
      { text: "Pune", correct: false },
    ],
  },
  {
    question: "Who was the first Indian to win a Nobel Prize?",
    answer: [
      { text: "C.V. Raman", correct: false },
      { text: "Rabindranath Tagore", correct: true },
      { text: "Mother Teresa", correct: false },
      { text: "Amartya Sen", correct: false },
    ],
  },
  {
    question: "What is the oldest language in India?",
    answer: [
      { text: "Hindi", correct: false },
      { text: "Sanskrit", correct: true },
      { text: "Tamil", correct: false },
      { text: "Telugu", correct: false },
    ],
  },
  {
    question: "In which year did India gain independence?",
    answer: [
      { text: "1945", correct: false },
      { text: "1947", correct: true },
      { text: "1950", correct: false },
      { text: "1935", correct: false },
    ],
  },
  {
    question: "What is the capital of Arunachal Pradesh?",
    answer: [
      { text: "Dispur", correct: false },
      { text: "Itanagar", correct: true },
      { text: "Guwahati", correct: false },
      { text: "Kohima", correct: false },
    ],
  },
  {
    question: "Which Indian sportsperson has won the most Olympic medals?",
    answer: [
      { text: "P.V. Sindhu", correct: false },
      { text: "Leander Paes", correct: true },
      { text: "Abhinav Bindra", correct: false },
      { text: "Sushil Kumar", correct: false },
    ],
  },
  {
    question: "What is the national motto of India?",
    answer: [
      { text: "Satyameva Jayate", correct: true },
      { text: "Jai Hind", correct: false },
      { text: "Vande Mataram", correct: false },
      { text: "Bharat Mata Ki Jai", correct: false },
    ],
  },
  {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    answer: [
      { text: "Punjab", correct: true },
      { text: "Haryana", correct: false },
      { text: "Himachal Pradesh", correct: false },
      { text: "Uttarakhand", correct: false },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

// Success and failure animations
const playCelebrationAnimation = () => {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
};

const playFailureAnimation = () => {
  confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
};

// Start quiz
const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  prevButton.style.display = "none";
  scoreContainer.classList.add("hidden");
  showQuestion();
};

// Show question and answers
const showQuestion = () => {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  // Display question number and total questions
  document.getElementById("question-number").innerText =
    currentQuestionIndex + 1;
  document.getElementById("total-questions").innerText = questions.length;

  currentQuestion.answer.forEach((answer) => {
    createAnswerButton(answer);
  });

  // Toggle visibility of previous and next buttons
  prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
  nextButton.style.display = "none"; // Hide until an answer is selected
};

// Reset state
const resetState = () => {
  answerButtons.innerHTML = "";
};

// Create and display answer buttons
const createAnswerButton = (answer) => {
  const button = document.createElement("button");
  button.innerText = answer.text;
  button.classList.add("btn");
  button.addEventListener("click", () => selectAnswer(answer, button));
  answerButtons.appendChild(button);
};

// Handle answer selection
const selectAnswer = (answer, button) => {
  const buttons = Array.from(answerButtons.children);

  // Disable all buttons and highlight selected one
  buttons.forEach((button) => (button.disabled = true));
  button.classList.add("selected");

  if (answer.correct) {
    score++;
  }

  nextButton.style.display = "block";
};

// Show next question or score
const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

// Handle previous button
const handlePrevButton = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
};

// Show final score and result
function showScore() {
  questionContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreElement.innerText = score;

  // Hide next and prev buttons on the result page
  nextButton.style.display = "none";
  prevButton.style.display = "none";

  // Add Try Again button
  const tryAgainButton = document.createElement("button");
  tryAgainButton.innerText = "Try Again";
  tryAgainButton.classList.add("btn", "try-again-btn");
  tryAgainButton.addEventListener("click", startQuiz); // Restart the quiz when clicked

  // Append the Try Again button first
  scoreContainer.appendChild(tryAgainButton);

  // Checking users' performance
  if (score > 10) {
    scoreContainer.innerHTML = ` 
            <h2>🎉 Success Party! 🎉</h2>
            <p>Congratulations! You scored ${score} out of ${questions.length}.</p>
            <p>Amazing performance! 🎊</p>
       `;
    document.body.style.backgroundColor = "#28a745"; // Success background
    playCelebrationAnimation(); // Trigger success animation
  } else {
    scoreContainer.innerHTML = ` 
            <h2>😞 Better Luck Next Time!</h2>
            <p>You scored ${score} out of ${questions.length}.</p>
            <p>Don't worry, keep practicing! 👍</p>
      `;
    document.body.style.backgroundColor = "#dc3545"; // Failure background
    playFailureAnimation(); // Trigger failure animation
  }
}

// Event listeners for buttons
nextButton.addEventListener("click", handleNextButton);
prevButton.addEventListener("click", handlePrevButton);

// Initialize quiz
startQuiz();
