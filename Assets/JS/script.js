//start button functionality
var startButton = document.querySelector("#start");
startButton.addEventListener("click", init);

//variable for the questions and answers
var questions = {
    1: {
        question: "What is ...?",
        correctAnswer: "B",
        answers: {
            "A": "answer 1",
            "B": "answer 2",
            "C": "answer 3",
            "D": "answer 4"
        }
    },
    2: {
        question: "What is ...?",
        correctAnswer: "C",
        answers: {
            "A": "answer 1",
            "B": "answer 2",
            "C": "answer 3",
            "D": "answer 4"
        }
    }
};

//calling the questions
var currentQuestion = 0;
//changing the hidden visibility on the element to switch to the questions
function init() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("question-content").classList.remove("hidden");
    loadQuestion();
}

//formula to cycle through the questions
function loadQuestion() {
    var questionSelection = questions[currentQuestion++];

    var answers = [];

    for (var i = 0; i <= questionSelection.answers.length; i++) {
        var answer = document.createElement("li");

        answer.id = questionSelection.answers[i].key;
        answer.value = questionSelection.answers[i].value;
        answer.innerHTML = questionSelection.answers[i].value;

        document.getElementById("answers").appendChild(answer);
    }

}

//formula to keep track of score

//timer function - must subtract when the answer is wrong

//ask for initials and show score

//show list of scores

//use local storage to keep and pull high scores