var startQuizBtn = document.getElementById("start-quiz-btn");
var mainBody = document.getElementById("main-body");
var insertQuestion = document.getElementById("question-box");
var insertAnswers = document.getElementById("answers-box");
var currentQuestion = 0;
let timeLeft = 60;
var answerContainer = document.getElementById("answers-box");
var answerResponse = document.getElementById("answer-response");
var questions = [
   { question: "Commonly used data types do NOT include:", 
     answers: [
          "strings",
          "booleans",
          "alerts",
          "numbers",
     ],
         correctAnswer: "2",
     }, 
     { question: "The condition in an if / else statement is enclosed with ____.", 
     answers: [
          "quotes",
          "curly brackets",
          "parenthesis",
          "square brackets",
     ],
         correctAnswer: "2",
     }, 
     { question: "Arrays in JavaScript can be used to store _____.", 
     answers: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above",
     ],
         correctAnswer: "3",
     },
     { question: "String values must be enclosed within _____ when being assigned to variables.", 
     answers: [
          "commas",
          "curly brackets",
          "quotes",
          "parenthesis",
     ],
         correctAnswer: "2",
     },
];


function startTimer(){
    let timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
        };
        document.getElementById("display-time").textContent = "Time Left: " + timeLeft;
    }, 1000);
};

function startQuiz() {
    //hide first screen 
    var startQuizInfo = document.getElementById("start-quiz-info");
   startQuizInfo.classList.add("hidden");
    generateQuestion();
    startTimer(); 
};

 
// function to generate next question
function generateQuestion() {
 // insert question  
 insertAnswers.innerHTML = "";
 insertQuestion.innerHTML = "<h1>" + questions[currentQuestion].question + "</h1>";
 mainBody.appendChild(insertQuestion);
 
  // insert answer
  answerContainer.className= "question-list-box";
  mainBody.appendChild(answerContainer);
 var answerList = document.createElement("ul");
 answerList.className= "question-list";
 answerContainer.appendChild(answerList);
for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
 var li = document.createElement("li");
//  li.className = "question-list"
 var button = document.createElement("button");
 button.textContent = questions[currentQuestion].answers[i];
 button.setAttribute("value", i);
 button.className = "button-style";
 li.appendChild(button);
 answerList.appendChild(li);
};
};


// end game function

// high scores screen 

 answerContainer.addEventListener("click", function(event) {
    var clickedButton = event.target;
    var ansValue = clickedButton.value;
    if (ansValue !== questions[currentQuestion].correctAnswer) {
       timeLeft = timeLeft-10;
       function showWrong() {
       var wrongMessage = document.createElement("p");
       wrongMessage.textContent="Wrong!";
       answerResponse.appendChild(wrongMessage);
       setTimeout(() => {
           wrongMessage.remove();
       }, 1500);
    }
    showWrong();
    }
    else {
        function showRight() {
            var rightMessage = document.createElement("p");
            rightMessage.textContent="Correct!";
            answerResponse.appendChild(rightMessage);
            setTimeout(() => {
                rightMessage.remove();
            }, 1500);
         };
         showRight();
    };
    if (currentQuestion === questions.length -1) {
        alert("end of test");
        console.log(timeLeft);
        localStorage.setItem('score', timeLeft);
        enterHighscore();  
    }; 
    currentQuestion++;
    generateQuestion();
    // console.log(questions.length);
  });
  function enterHighscore() {
    mainBody.classList.add("hidden");
    var hsContentBox = document.getElementById("highscore-input-box");
    document.getElementById("all-done").textContent = "All done!";
    document.getElementById("score-display").textContent = "Your final score is " + timeLeft + ".";
  

  }

 

  document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);
