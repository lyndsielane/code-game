//start button functionality
var startButton = document.querySelector("#start");
startButton.addEventListener("click", init);

//variable for the questions
var questions = [
    {
        question: "What is JavaScript?",
        answers: {
            "A": "A document system",
            "B": "A computer game",
            "C": "A programming language",
            "D": "An animal from the Amazon"
        },
        correctAnswer: "C",
    },

    {
        question: "What is the purpose of CSS?",
        answers: {
            "A": "To sound confusing",
            "B": "To style a webpage",
            "C": "To add color to a document",
            "D": "To color something special"
        },
        correctAnswer: "B",
    },

];
//calling the questions
var currentQuestion = 0;

//changing the hidden visibility on the element to switch to the questions
function init() {
    currentQuestion = 0;
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("question-content").classList.remove("hidden");
    document.getElementById("results").classList.add("hidden");
    loadNextQuestion();
}
//formula to cycle through the questions
function loadNextQuestion() {
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

    currentQuestion++;

    if (questions.length === currentQuestion) {
        stop();
        return;
    }

    loadNextQuestion();
}

function stop() {
    //hide question
    document.getElementById("question-content").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    //ask for initials and display scores
}

//timer function - must subtract when the answer is wrong

//reload button
var replayButton = document.querySelector("#replay");
replayButton.addEventListener("click", init);

//use local storage to keep and pull high scores upon reload 