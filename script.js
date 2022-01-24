// variables of all our html selected elements
var $startPrompt = document.querySelector("#start-prompt");
var $startBtn = document.querySelector("#start-button");
var $questionPrompt = document.querySelector("#question-prompt");
var $questionText = document.querySelector("#question-text");
var $questionOptions = document.querySelector("#options");
var $timer = document.querySelector("#timer");
var $score = document.querySelector("#score");
var $resetBtn = document.querySelector("#reset-button");
var $highScoreBtn = document.querySelector("#high-score");
var $viewHighScore = document.querySelector("#highScore");
var $hideScoreBtn = document.querySelector("#hide-score");
// 
var timerInterval;

var questionIndex = 0;

var scoreBoard = 0;

var timeLeft = 60;

var questions = [
  {
    text: "Which of the following is NOT a comparison operator?",
    correctAnswer: "====",
    options: ["=", "==", "===", "===="],
  },
  {
    text: "The logical NOT operator is ___",
    correctAnswer: "!",
    options: ["!", "?", "{}", ";;"],
  },
  {
    text: "What does HTML stand for?",
    correctAnswer: "Hyper Text Markup Language",
    options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
  },
  {
    text: "Which of the following is a JavaScript Primitive object?",
    correctAnswer: "String",
    options: ["RAM", "Yarn", "String"],
  },
  {
    text: "A ______ is a named variable passed into a function",
    correctAnswer: "Parameter",
    options: ["Parameter", "Function()", "Method()", "Logical Operator"],
  },
  {
    text: "Choose the correct HTML element for the largest heading:",
    correctAnswer: "H1",
    options: ["Heading", "H1", "H6", "Head"],
  },
  {
    text: "Which character is used to indicate an end tag?",
    correctAnswer: "/",
    options: ["*", "<", ">", "/"],
  },
  {
    text: "How can you open a link in a new tab/browser window?",
    correctAnswer: "<a href='url'target='_blank'>",
    options: ["<a href='url'target='_blank'>", "<a href='url'target='new'>", "<a href='url'new'>"],
  },
];
// added event listener of click to Start button
$startBtn.addEventListener("click", function (e) {
  // clicking start button will hide the main prompt
  $startPrompt.classList.add("hide");
  // will show the question
  $questionPrompt.classList.remove("hide");
  // will show the timer
  $timer.classList.remove("hide");
  // will show the score
  $score.classList.remove("hide");
  // will show the reset button
  $resetBtn.classList.remove("hide");
  startTimer();
  renderQuestion();
});

// Render Question
function renderQuestion() {
  //
  // get the questions from the questions array
  $questionText.textContent = questions[questionIndex].text;
  // clears out the buttons after click
  $questionOptions.innerHTML = "";
  // creates a button for each of the answer choices
  questions[questionIndex].options.forEach(function (item) {
    var $btn = document.createElement("button");
    $btn.textContent = item;
    $questionOptions.append($btn);
  });
}

// populates ANSWERS, checks if WRONG or RIGHT
$questionOptions.addEventListener("click", function (e) {
 
  // if tartget value is incorrect exit early
  if (!e.target.matches("button")) return;
  // val is equal to the click event target's textContent
  var val = e.target.textContent;
  // if val is equal to the correctAnswer in the question array
  if (val === questions[questionIndex].correctAnswer) {
    // add one to the score
    scoreBoard++;
    // Shows the score on the HTML
    $score.textContent = scoreBoard;     
  }
  
  else {
    // deduct time from timer
    timeLeft= timeLeft-20;
    $timer.textContent = timeLeft;
  }
  questionIndex++;
  if (questionIndex === questions.length) {
    // End Game
    saveScore();

  }
  else {
    renderQuestion();
  }
});

// SAVE SCORE function
function saveScore () {
  // save value to local storage
  var userArray = [];
  var scoreArray = [];
  localStorage.setItem("Score", JSON.stringify(scoreBoard));
  // save user initials input
var userName = prompt("Enter you initials to save");
// saves initial s to local storage
localStorage.setItem("User", JSON.stringify(userName));
}


// write foreach to get array items into view
// VIEW SCORE function 
function viewScore () {
  $hideScoreBtn.classList.remove("hide");
  $highScoreBtn.classList.add("hide");
var currentScore = localStorage.getItem("Score");
var currentUser = localStorage.getItem("User");
// print values on screen
$viewHighScore.classList.remove("hide");
var $scoreValue = document.createElement("p");
$scoreValue.innerText = `${currentUser} earned a score of ${currentScore} `
$viewHighScore.append($scoreValue);
}

// SHOW and HIDE the score buttons
$hideScoreBtn.addEventListener("click", function(){
  // hide itself
  $hideScoreBtn.classList.add("hide");
  $highScoreBtn.classList.remove("hide");
$viewHighScore.innerHTML = "";
})

$highScoreBtn.addEventListener("click", viewScore);


// TIMER
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    $timer.textContent = timeLeft;
    if (timeLeft === 0) {
      // End the game
      // Stop the timer
      clearInterval(timerInterval);
    }
    // when timer hits 0, end game
  }, 1000);
  return timeLeft;
}