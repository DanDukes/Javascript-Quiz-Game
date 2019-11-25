//Define Questions and Answers as an Array of Objects

const myQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "javascript",
      b: "script",
      c: "js"
    },
    correctAnswer: "b"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "The body section",
      b: "The head section",
      c: "Trick question; they're both ok"
    },
    correctAnswer: "c"
  },
  {
    question: "The external JavaScript file must contain the script tag.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: 'How do you write "Hello World" in an alert box??',
    answers: {
      a: 'msg("Hello World");',
      b: 'prompt("Hello World");',
      c: 'alertBox("Hello World");',
      d: 'alert("Hello World");'
    },
    correctAnswer: "d"
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: {
      a: "function myFunction()",
      b: "function = myFunction()",
      c: "make.function.myFunction()",
      d: "function:myFunction()"
    },
    correctAnswer: "a"
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: {
      a: "call myFunction()",
      b: "read myFunction()",
      c: "myFunction()",
      d: "run.myFunction()"
    },
    correctAnswer: "c"
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    answers: {
      a: "if (i == 5)",
      b: "if i = 5 then",
      c: "if i=== 5 then",
      d: "if i = 5"
    },
    correctAnswer: "a"
  },
  {
    question: "!= means what in javascript?",
    answers: {
      a: "Or",
      b: "And",
      c: "Plus and equal to",
      d: "not equal to"
    },
    correctAnswer: "d"
  },
  {
    question: "What characters contains an array?",
    answers: {
      a: "< >",
      b: "{ }",
      c: "[ ]",
      d: "# #"
    },
    correctAnswer: "c"
  }
];

//Define Universal Constants and variables
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("startQuiz");
const startOverButton = document.getElementById("startOver");
const quizArea = document.getElementById("quizArea");
const countdown = document.getElementById("countdown");
const nextButton = document.getElementById("next");
var timeleft = 90;
var downloadTimer;

buildQuiz(); //Have to call the function here, as the .answers and .slide classes are placed into the DOM by the function
const answerContainers = quizContainer.querySelectorAll(".answers");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let score = 0;

//***************************
//Functions Section
//***************************

//Function to assemble the quiz out of the myQuestions Array, puts each questions and answer on its own "slide" div
function buildQuiz() {
  const output = [];
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(
        // ...add an HTML radio button
        `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
      );
    }
    output.push(
      // add this question and its answers to the output
      `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
    );
  });
  quizContainer.innerHTML = output.join(""); // finally combine our output list into one string of HTML and put it on the page
}
//Function to cause the area containing the slides to be visible when the "start quiz" button is pressed
function showquiz() {
  quizArea.classList.add("show");
}

//Function to start the countdown clock when the "start quiz" button is pressed
function startClock() {
  countdown.innerHTML = "Time Remaining: " + timeleft;
  if (timeleft <= 0) {
    stopClock();
    showResults();
  } else {
    timeleft -= timeleft;
    downloadTimer = setTimeout(startClock, 1000);
  }
}

function stopClock() {
  downloadTimer = clearInterval(downloadTimer);
  countdown.innerHTML = "Finished";
  showResults();
}

//Function to Display the question slides one at at time via adding and removing the "active-slide class"
function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  //if else logic to only show the submit button on the last slide
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showResults() {
  let numCorrect = 0;
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    } else {
      timeleft = timeleft - 10;
    }
  });
  var score = timeleft;
  resultsContainer.innerHTML = `${numCorrect} out of ${
    myQuestions.length
  } Your score is ${score + 1}!`;
  quizArea.classList.remove("show");
}

/*function recordScore() {
  var score = timeleft;
  clearInterval(downloadTimer);
  countdown.innerHTML = "Finished";
}*/

//Script Execution Area
showSlide(0);
startButton.addEventListener("click", showquiz); //start button shows the quiz area
startButton.addEventListener("click", startClock);
submitButton.addEventListener("click", stopClock); // on submit, show results
nextButton.addEventListener("click", showNextSlide);
