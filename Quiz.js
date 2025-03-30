const questions = [
    {
        question: "Who was the first person to ride a bicycle?",
        answers: [
            { text: "Justin Beiber", correct: false},
            { text: "Karl von Drais", correct: true},
            { text: "Bola Tinubu", correct: false},
            { text: "Draisine Laufma", correct: false},
        ],
    },
    {
        question: "Who founded Microsoft?",
        answers: [
            { text: "Bill Gates", correct: true},
            { text: "Shaya Zamora", correct: false},
            { text: "Bola Tinubu", correct: false},
            { text: "Queen Elizabeth", correct: false},
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Sahara", correct: false},
            { text: "Aso Rock", correct: false},
            { text: "Antarctic", correct: true},
        ],
    },
    {
        question: "2221 + 1?",
        answers: [
            { text: "2221", correct: false},
            { text: "what?", correct: false},
            { text: "2222", correct: true},
            { text: "22211", correct: false},
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(w){
    const selectedBtn = w.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        score ++;
    }
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "you scored " + score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        alert("Well Done!");
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();