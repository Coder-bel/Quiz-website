const quizData = [
    {
        question: "What does 'CPU' stand for in computing?",
        a: "Central Process Unit",
        b: "Central Processing Unit",
        c: "Computer Personal Unit",
        d: "Computer Processing Unit",
        correct: "b"
    },
    {
        question: "Which of the following is an example of an output device?",
        a: "Keyboard",
        b: "Mouse",
        c: "Monitor",
        d: "Scanner",
        correct: "c"
    },
    {
        question: "What is the main purpose of an operating system?",
        a: "To provide an environment for software to run",
        b: "To play games",
        c: "To design websites",
        d: "To write documents",
        correct: "a"
    },
    {
        question: "Which programming language is commonly used to style web pages?",
        a: "HTML",
        b: "CSS",
        c: "Python",
        d: "Java",
        correct: "b"
    },
    {
        question: "Which of the following is a type of storage device?",
        a: "RAM",
        b: "CPU",
        c: "Hard Drive",
        d: "Router",
        correct: "c"
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const timerEl = document.createElement('div');  // Create a timer element

quiz.appendChild(timerEl);  // Append the timer to the quiz container

let currentQuiz = 0;
let score = 0;
let time = 10;  // 10 seconds for each question
let timerInterval;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    resetTimer();  // Start the timer when loading a new question
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function resetTimer() {
    clearInterval(timerInterval);  // Clear any previous timer
    time = 10;  // Reset the time to 10 seconds
    timerEl.innerText = `Time left: ${time}s`;  // Display the time

    // Start the countdown
    timerInterval = setInterval(() => {
        time--;
        timerEl.innerText = `Time left: ${time}s`;

        // If time runs out
        if (time === 0) {
            clearInterval(timerInterval);
            submitAnswer();  // Automatically submit the answer if time runs out
        }
    }, 1000);
}

function submitAnswer() {
    const answer = getSelected();

    // Check if the answer is correct and update score
    if (answer && answer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    // If there are more questions, load the next one
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        clearInterval(timerInterval);
        quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Reload</button>
        `;
    }
}

submitBtn.addEventListener('click', () => {
    clearInterval(timerInterval);  // Clear the timer if the user submits an answer
    submitAnswer();
});