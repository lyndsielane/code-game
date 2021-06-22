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
    document.getElementById("myInitials").value = "";
    document.getElementById("highScores").classList.add("hidden");
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

    //advise user of answer accuracy
    if (isCorrect) {
        document.getElementById("response").innerHTML = "Correct";
    } else {
        document.getElementById("response").innerHTML = "Wrong";
        timeLeft -= 12;
        document.getElementById("timer").innerHTML = timeLeft;
    }

    currentQuestion++;
    //sets the game to stop when no questions remain
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
    
//stop game instructions 
function stopGame() {
    clearInterval(gameTimer);
    //stops game when time runs out
    if (timeLeft < 0) {
        timeLeft = 0;
        gameTimerEl.innerHTML = timeLeft;
    }

    //hides question/answer 
    document.getElementById("question-content").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    //displays scores & asks for initials
    document.getElementById("myScore").innerHTML = ("Your Score: " + timeLeft);
    //TODO: clear initials for next game
    //TODO: prevent saving score if no initials are entered
}

//sets timer
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
//saving scores to local storage
function saveNewScore() {
    var initials = document.getElementById("myInitials").value;
    
    if (initials === "") {
        alert("Your initials are required.");
        return;
    }

    var highScores = JSON.parse(localStorage.getItem(localStorageName)) || { scores: [] };

    highScores.scores.push({
        initials: initials,
        score: timeLeft
    });

    highScores.scores.sort((score1, score2) => {
        if (score1.score < score2.score) {
           return 1; 
        }

        if (score1.score > score2.score) {
            return -1;
        }

        return 0;
    });

    var maxScores = 10;

    if (highScores.scores.length < maxScores) {
        maxScores = highScores.scores.length;
    }
    
    highScores.scores = highScores.scores.slice(0, maxScores);

    localStorage.setItem(localStorageName, JSON.stringify(highScores));
    showHighScores();
}
//displays scores to the high score table 
function showHighScores() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("results").classList.add("hidden");
    document.getElementById("highScores").classList.remove("hidden");

    var scoreListTbl = document.querySelector("#scoreList tbody");

    scoreListTbl.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem(localStorageName));
    
    highScores.scores.forEach(element => {
        var row = document.createElement("tr");
        var initialsTd = document.createElement("td");
        var scoreTd = document.createElement("td");

        initialsTd.innerHTML = element.initials;
        scoreTd.innerHTML = element.score;

        row.appendChild(initialsTd);
        row.appendChild(scoreTd);
        scoreListTbl.appendChild(row);
    });

}

init();