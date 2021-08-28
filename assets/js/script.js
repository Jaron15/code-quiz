var startQuizBtn = document.getElementById("start-quiz-btn");
var mainBody = document.getElementById("main-body");
var insertQuestion = document.getElementById("question-box");
var insertAnswers = document.getElementById("answers-box");
var currentQuestion = 0;
let timeLeft = 60;
var remainingTime; 
var answerContainer = document.getElementById("answers-box");
var answerResponse = document.getElementById("answer-response");
var startQuizInfo = document.getElementById("start-quiz-info");
var scoreSubmit = document.getElementById("enter-hs");
var highscoreScreen = document.getElementById("highscore-screen");
var timeScores = document.getElementById("time-scores");
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

var highscores = [];
var highscoreBank = JSON.parse(localStorage.getItem("highscores")) 

function startTimer(){
    remainingTime = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(remainingTime);
        };
        document.getElementById("display-time").textContent = "Time Left: " + timeLeft;
    }, 1000);
};

function startQuiz() {
    //hide first screen 
    currentQuestion = 0;
    timeLeft= 60;
    startQuizInfo.classList.remove("shown");
    mainBody.classList.add("shown");
    timeScores.classList.remove("hidden");
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
 var button = document.createElement("button");
 button.textContent = questions[currentQuestion].answers[i];
 button.setAttribute("value", i);
 button.className = "button-style";
 li.appendChild(button);
 answerList.appendChild(li);
};
};


// end game function



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
        enterHighscore();  
    } 
    else {
    currentQuestion++;
    generateQuestion();
};
  });


 
  function enterHighscore() {
    clearInterval(remainingTime);
    scoreSubmit.classList.add("shown");
    mainBody.classList.remove("shown");
    document.getElementById("all-done").textContent = "All done!";
    document.getElementById("score-display").textContent = "Your final score is " + timeLeft + ".";
    var nameInput = document.getElementById("initial-input");
    nameInput.innerHTML = "";
    var label = document.createElement("label");
    label.setAttribute("for", "name-box")
    label.textContent = "Enter initials: ";
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "name-box");
    input.setAttribute("name", "name-box");
    var button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "Submit");
    button.className= "initial-submit";
    nameInput.appendChild(label);
    nameInput.appendChild(input);
    nameInput.appendChild(button);

    button.addEventListener('click', function(event){
        var userInitials = document.querySelector("#name-box").value;
        event.preventDefault();
        var local = JSON.parse(localStorage.getItem("highscores"));
        if (local) {
            highscores = local;
        } 
        console.log(highscores);
        highscores.push({
            name: userInitials,
            score: timeLeft
        })
        console.log(highscores);
        highscores.sort(function (a, b) {
            return b.score - a.score;
        });
        
        localStorage.setItem("highscores", JSON.stringify(highscores));
        
        saveScore();
    });
};

function saveScore() {
    scoreSubmit.classList.remove("shown");
    document.getElementById("time-scores").classList.add("hidden");

    scoreScreen();
};

function homeScreen() {
    startQuizInfo.classList.add("shown");
};

function hideScoreScreen() {
    highscoreScreen.classList.remove("shown");
   
    homeScreen();
  };
function scoreScreen() {
    highscoreScreen.classList.add("shown")
    timeScores.classList.remove("shown");
    var hsListBox = document.getElementById("hs-list-box");
    var backButton;
    var clearHsButton;
 function showhsList() {
    hsListBox.innerHTML = "";
    var heading = document.createElement("h1").textContent = "High Scores";
    var hsList = document.createElement("ol");
    hsList.className = "hs-list-class"
    hsListBox.append(heading);
    // var hsInfo = JSON.parse(localStorage.getItem("highscores"));
    for (var i = 0; i < highscores.length; i++) {
    var listItems = document.createElement("li");
    listItems.textContent = highscores[i].name + ': ' + highscores[i].score;
    // listItems.append(hsName, hsScore);
        hsList.append(listItems);
    };
    hsListBox.append(hsList);
    backButton = document.createElement("button");
    backButton.className = "button-style";
    backButton.textContent = "Go Back";
    hsListBox.append(backButton);

    clearHsButton = document.createElement("button");
    clearHsButton.className = "button-style";
    clearHsButton.textContent = "Clear Highscores";
    hsListBox.append(clearHsButton);
};
showhsList();
    backButton.addEventListener('click', function(event) {
        hideScoreScreen();

    });

    
    clearHsButton.addEventListener('click', function(event) {
        localStorage.clear();
        highscores = [];
        showhsList();
    });

  };
  

 

  document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);
