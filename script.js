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

var currentQuestion = 0;

var startButton = document.querySelector("#start");

startButton.addEventListener("click", loadQuestion);

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