var startBtn = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var mainEl = document.querySelector("#main");
var highscoreLink = document.querySelector("#highscore-link");

var timerInterval;
var secondsLeft;
var questionList;
var quizAnswers;

// Quiz Questions
var questionList = [
    "What does HTML stand for?",
    "What does CSS stand for?",
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed with:",
    "A very useful tool for debugging and development for printing content to the debugger:",
    "Arrays in JavaScript can be used to store:",
    "What must string values must be enclosed in when being assigned to variables?"
];


// Quiz Answers
var answerList = [
    [["hyper text markup language", true], ["height text main language", false], ["harmful things manipulate language", false], ["how to make lists", false]],
    [["coding source sequence", false], ["cascading style sheet", true], ["carding style source", false], ["cascading sourcing sheet", false]],
    [["numbers", false], ["strings", false], ["alerts", true], ["booleans", false]],
    [["quotes", false], ["curly brackets"], ["parenthesis", true], ["square brackets", false]],
    [["JavaScript", false], ["terminal/bash", false], ["for loops", false], ["console log", true]],
    [["numbers and strings", false], ["other arrays", false], ["booleans", false], ["all of the above", true]],
    [["commas", false], ["curly brackets", false], ["quotes", true], ["parenthesis", false]],
];


function init() {
    renderHome();
}

highscoreLink.addEventListener("click", renderHighScores);

function initializeTimer() {
    secondsLeft = 75;

if(!timerInterval) {
    timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft <=0) {
            endQuiz();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTime(){
    secondsLeft = 0;
    timerEl.textContent = secondsLeft;
}

function renderHome() {
    resetQuiz();
    if(timerInterval) {
        stopTimer();
    }

    mainEl.textContent ="";

    displayTitle("Coding Quiz");

    var paragraph = document.createElement("p");
    paragraph.textContent = "Click below to start the coding quiz. If you miss a question you will get another chance, but you will lose 15 seconds off the timer. Good Luck!";

    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz!";
    startButton.setAttribute("id", "start-button");
    startButton.addEventListener("click", startQuiz);

    mainEl.appendChild(paragraph);
    mainEl.appendChild(startButton);
}

function renderHighScores() {
    mainEl.textContent = "";
    resetQuiz();

    if(timerInterval) {
        stopTimer();
    }

    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

    
    displayTitle("Highscores")

    if (!scoreboard) {
        var paragraph = document.createElement('p');
        paragraph.textContent = 'Play the game!'
        mainEl.appendChild(paragraph);
       
        var button = document.createElement('button');
        button.textContent = 'Back to Home';
        button.addEventListener('click', renderHome);
        mainEl.appendChild(button)

        return
    }

    var playerUl = document.createElement("ul");
    playerUl.classList.add("scoreboard-list");

    for (let i=0; i < scoreboard.length; i++) {
        let playerList = document.createElement("li");
        playerList.classList.add("scoreboard-item");
        playerList.textContent = `${scoreboard[i].name} ... ${scoreboard[i].score}`;
        playerUl.appendChild(playerList);
    }

    var homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", renderHome);

    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Highscores'
    resetButton.addEventListener('click', function() {
        localStorage.clear();
        renderHighScores();
    });

    mainEl.appendChild(playerUl);
    mainEl.appendChild(homeButton);
    mainEl.appendChild(resetButton);
}

function addHighScore(){
    var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    if(scoreboard==null) {
        scoreboard = [];
    }

    var playerName = document.getElementById("initials-input").value.toUpperCase();
    var playerScore = secondsLeft + secondsLeft;

    var player = {
        "name": playerName,
        "score": playerScore
    };

    scoreboard.push(player);
    scoreboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

function startQuiz (){
    // setQuiz();
    mainEl.textContent = "";
    initializeTimer();
    renderQuestion1();
}

function setQuiz(){
    questionList = JSON.parse(JSON.stringify(questionList));
    quizAnswers = JSON.parse(JSON.stringify(quizAnswers));
}

function resetQuiz() {
    questionList = null;
    quizAnswers = null;
    resetTime();
}

function endQuiz() {
    if (secondsLeft<0) {
        secondsLeft = 0;
        timerEl.textContent = secondsLeft;
    }
    stopTimer();

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "All Done!";

    var quizResult = document.createElement("p");
    quizResult.textContent = "Your Score: "+ (secondsLeft * 2);

    var initialsPropt = document.createElement("p")
    initialsPropt.textContent = "Enter your initials:"
    initialsPropt.classList.add("enter-initials")

    var initialsInput = document.createElement("input");
    initialsInput.classList.add("initials-input");
    initialsInput.setAttribute("id", "initials-input");
    initialsInput.maxLength = 3;
    initialsInput.size = 4;

    var highscoreButton = document.createElement("button");
    highscoreButton.textContent = "Submit";

    highscoreButton.addEventListener("click", function() {
        if(initialsInput.value) {
            addHighScore();
            resetQuiz();
            renderHighScores();
        }
    })

    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(quizResult);
    mainEl.appendChild(initialsPropt);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(highscoreButton);
};

console.log(randomNumber(questionList.length));

function renderQuestion1() {

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "Question 1: ";

    var questionList = document.createElement("p");
    questionList.textContent = "HTML stands for hyper text markup language:";

    var answerUList = document.createElement("ul")
    answerUList.textContent = ""
    answerUList.classList.add("answer-list")

    var answerList = document.createElement("li")
    answerList.textContent = ""
    answerList.classList.add("answer-list")

    var answer1 = document.createElement("button")
    answer1.textContent = "True"
    answer1.classList.add("answer1")

    answer1.addEventListener("click", renderQuestion2)

    var answer2 = document.createElement("button")
    answer2.textContent = "False"
    answer2.classList.add("answer2")

    answer2.addEventListener("click", decreaseTime, renderQuestion2)

    function decreaseTime(){
        secondsLeft -=15;
        alert("incorrect");
    }

 
    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(questionList);
    mainEl.appendChild(answerUList);
    mainEl.appendChild(answerList);
    mainEl.appendChild(answer1);
    mainEl.appendChild(answer2);
};

function renderQuestion2() {

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "Question 2: ";

    var questionList = document.createElement("p");
    questionList.textContent = "CSS stands for Cascading Style Sheet";

    var answerUList = document.createElement("ul")
    answerUList.textContent = ""
    answerUList.classList.add("answer-list")

    var answerList = document.createElement("li")
    answerList.textContent = ""
    answerList.classList.add("answer-list")

    var answer1 = document.createElement("button")
    answer1.textContent = "True"
    answer1.classList.add("answer1")

    answer1.addEventListener("click", renderQuestion3)

    var answer2 = document.createElement("button")
    answer2.textContent = "False"
    answer2.classList.add("answer2")

    answer2.addEventListener("click", decreaseTime, renderQuestion3)

    function decreaseTime(){
        secondsLeft -=15;
        alert('incorrect');
    }

 
    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(questionList);
    mainEl.appendChild(answerUList);
    mainEl.appendChild(answerList);
    mainEl.appendChild(answer1);
    mainEl.appendChild(answer2);
}; 

function renderQuestion3() {

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "Question 3: ";

    var questionList = document.createElement("p");
    questionList.textContent = "ALERTS are commonly used data-types.";

    var answerUList = document.createElement("ul")
    answerUList.textContent = ""
    answerUList.classList.add("answer-list")

    var answerList = document.createElement("li")
    answerList.textContent = ""
    answerList.classList.add("answer-list")

    var answer1 = document.createElement("button")
    answer1.textContent = "True"
    answer1.classList.add("answer1")

    answer1.addEventListener("click", decreaseTime, renderQuestion4)

    var answer2 = document.createElement("button")
    answer2.textContent = "False"
    answer2.classList.add("answer2")

    answer2.addEventListener("click", renderQuestion4)

    function decreaseTime(){
        secondsLeft -=15;
        alert('incorrect');
    }

 
    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(questionList);
    mainEl.appendChild(answerUList);
    mainEl.appendChild(answerList);
    mainEl.appendChild(answer1);
    mainEl.appendChild(answer2);
}; 

function renderQuestion4() {

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "Question 4: ";

    var questionList = document.createElement("p");
    questionList.textContent = "The EVENT LISTENER is very useful tool for debugging and development for printing content to the debugger";

    var answerUList = document.createElement("ul")
    answerUList.textContent = ""
    answerUList.classList.add("answer-list")

    var answerList = document.createElement("li")
    answerList.textContent = ""
    answerList.classList.add("answer-list")

    var answer1 = document.createElement("button")
    answer1.textContent = "True"
    answer1.classList.add("answer1")

    answer1.addEventListener("click", decreaseTime, renderQuestion5)

    var answer2 = document.createElement("button")
    answer2.textContent = "False"
    answer2.classList.add("answer2")

    answer2.addEventListener("click", renderQuestion5)

    function decreaseTime(){
        secondsLeft -=15;
        alert('incorrect');
    }

 
    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(questionList);
    mainEl.appendChild(answerUList);
    mainEl.appendChild(answerList);
    mainEl.appendChild(answer1);
    mainEl.appendChild(answer2);
}; 

function renderQuestion5() {

    var pageTitle = document.createElement("h1");
    pageTitle.textContent = "Question 5: ";

    var questionList = document.createElement("p");
    questionList.textContent = "The condition in an if/else statement is enclosed with parenthesis.";

    var answerUList = document.createElement("ul")
    answerUList.textContent = ""
    answerUList.classList.add("answer-list")

    var answerList = document.createElement("li")
    answerList.textContent = ""
    answerList.classList.add("answer-list")

    var answer1 = document.createElement("button")
    answer1.textContent = "True"
    answer1.classList.add("answer1")

    answer1.addEventListener("click", endQuiz)

    var answer2 = document.createElement("button")
    answer2.textContent = "False"
    answer2.classList.add("answer2")

    answer2.addEventListener("click", decreaseTime, endQuiz)

    function decreaseTime(){
        secondsLeft -=15;
        alert('incorrect');
    }

 
    mainEl.textContent = "";

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(questionList);
    mainEl.appendChild(answerUList);
    mainEl.appendChild(answerList);
    mainEl.appendChild(answer1);
    mainEl.appendChild(answer2);
}; 

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}


function displayTitle(titleContent) {
    var title = document.createElement("h1");
    title.textContent = titleContent;
    title.classList.add("page-title");

    mainEl.appendChild(title);
}

function renderQuestionsTitle(titleContent) {
    var title = document.createElement("h2");
    title.textContent = titleContent;
    title.classList.add("question-title");

    return title;
}

init();

