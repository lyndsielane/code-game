var currentQuestion = 0;
var gameTimerEl = document.getElementById("timer");
var gameTimer;
var timeLeft = 60;
var localStorageName = "gameHighScores";

function init() {
    //buttons for event listeners
    var startButton = document.querySelector("#start");
    var submitButton = document.getElementById("submitInitials");
    var replayButton = document.querySelector("#replay");
    var viewHighScores = document.querySelector("#viewHighScores");

    // set up event listeners
    startButton.addEventListener("click", startGame);
    submitButton.addEventListener("click", saveNewScore);
    replayButton.addEventListener("click", startGame);
    viewHighScores.addEventListener("click", showHighScores);
}

//changing the hidden visibility on the element to switch to the questions
function startGame() {
    currentQuestion = 0;
    timeLeft = 60;
    document.getElementById("timer").innerHTML = timeLeft;
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("question-content").classList.remove("hidden");
    document.getElementById("results").classList.add("hidden");
    startTimer();
    loadNextQuestion();
}

//formula to cycle through the questions
function loadNextQuestion() {
    document.getElementById("response").innerHTML = '';

    var answers = document.getElementById("answers");

    answers.innerHTML = '';

    var questionSelection = questions[currentQuestion];

    document.getElementById("question").innerHTML = questionSelection.question;

    for (letter in questionSelection.answers) {
        var answerText = questionSelection.answers[letter];
        var answer = document.createElement("li");

        // <li id="A" value="A">A document system</li>
        answer.id = letter;
        answer.innerHTML = answerText;
        answer.addEventListener("click", answerCheck);
        answers.appendChild(answer);
    }
}

//checking the answer choices
function answerCheck(event){
    var questionSelection = questions[currentQuestion];
    var isCorrect = event.target.id === questionSelection.correctAnswer;
    //do some stuff to the timer

    //tell them if it is correct or wrong
    if (isCorrect) {
        document.getElementById("response").innerHTML = "Correct";
    } else {
        document.getElementById("response").innerHTML = "Wrong";
        timeLeft -= 12;
        document.getElementById("timer").innerHTML = timeLeft;
    }

    currentQuestion++;

    if (questions.length === currentQuestion) {
        setTimeout(function() {
            stopGame();
        }, 1000);
        return;
    }

    setTimeout(function() {
        loadNextQuestion();
    }, 1000);
}
    

function stopGame() {
    clearInterval(gameTimer);

    if (timeLeft < 0) {
        timeLeft = 0;
        gameTimerEl.innerHTML = timeLeft;
    }

    //hides question
    document.getElementById("question-content").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    //displays scores & asks for initials
    document.getElementById("myScore").innerHTML = ("Your Score: " + timeLeft);


}

//timer function - must subtract when the answer is wrong
function startTimer() {
    gameTimer = setInterval(function() {
        timeLeft--;
        gameTimerEl.innerHTML = timeLeft;

        if(timeLeft <= 0) {
            clearInterval(gameTimer);
            stopGame();
        }
    }, 1000);
}

function saveNewScore() {
    var initials = document.getElementById("myInitials").value;
    var highScores = JSON.parse(localStorage.getItem(localStorageName)) || { scores: [] };

    highScores.scores.push({
        initials: initials,
        score: timeLeft
    });

    localStorage.setItem(localStorageName, JSON.stringify(highScores));

    showHighScores();
}

function showHighScores() {
    document.getElementById("results").classList.add("hidden");
    document.getElementById("highScores").classList.remove("hidden");

    var highScoresEl = document.getElementById("highScores");

    var highScores = JSON.parse(localStorage.getItem(localStorageName));
    

}

init();