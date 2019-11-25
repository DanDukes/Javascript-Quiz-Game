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

function buildQuiz() {
  // we'll need a place to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // we'll want to store the list of answer choices
    const answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      // if answer is wrong or blank
      // color the answers red
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;

  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }

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

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

// display quiz right away
buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

// on submit, show results
submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
