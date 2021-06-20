var currentQuestion = 0;
var gameTimerEl = document.getElementById("timer");
var gameTimer;
var timeLeft = 60;

function init() {
    //buttons for event listeners
    var startButton = document.querySelector("#start");
    var replayButton = document.querySelector("#replay");

    // set up event listeners
    startButton.addEventListener("click", startGame);
    replayButton.addEventListener("click", startGame);
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

    //hide question
    document.getElementById("question-content").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    //ask for initials and display scores
}

//timer function - must subtract when the answer is wrong
function startTimer() {
    gameTimer = setInterval(function() {
        console.log(timeLeft);
        timeLeft--;
        gameTimerEl.innerHTML = timeLeft;
    }, 1000);
}
//use local storage to keep and pull high scores upon reload 

init();