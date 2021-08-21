var startQuizBtn = document.getElementById("start-quiz-btn");
var mainBody = document.getElementById("main-body");
var insertQuestion = document.getElementById("question-box");
var insertAnswers = document.getElementById("answers-box");
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
var currentQuestion = 0;

function startQuiz() {
    //hide first screen 
    var startQuizInfo = document.getElementById("start-quiz-info");
   startQuizInfo.classList.add("hidden");
    generateQuestion();
}

 
// function to generate next question
function generateQuestion() {
 //insert first question and answer 
 insertAnswers.innerHTML = "";
 insertQuestion.innerHTML = "<h1>" + questions[currentQuestion].question + "</h1>";
 mainBody.appendChild(insertQuestion);
 
for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
 var li = document.createElement("li");
 var button = document.createElement("button");
 button.textContent = questions[currentQuestion].answers[i];
 button.setAttribute("value", i)
 li.appendChild(button);
 insertAnswers.appendChild(li);
 mainBody.appendChild(insertAnswers);
}
};


// end game function

// high scores screen 

 document.getElementById("answers-box").addEventListener("click", function(event) {
    var clickedButton = event.target;
    var ansValue = clickedButton.value;
    if (ansValue !== questions[currentQuestion].correctAnswer) {
        alert("test");
    }
    console.log(ansValue);
    currentQuestion++;
    generateQuestion();
  })
  document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);
