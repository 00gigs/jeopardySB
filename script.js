let currentScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});
//get questions data 
function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        .then(response => response.json())
        .then(data => setupGame(data.results))
        .catch(error => console.error('Error fetching data: ', error));
}


function setupGame(questions) {
    const gameBoard = document.getElementById('game-board');
    questions.forEach((question, index) => {
        const pointValue = (index + 1) * 100;
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerText = `${pointValue} points`;
        questionElement.onclick = () => showQuestion(question, pointValue);
        gameBoard.appendChild(questionElement);
    });
}

function showQuestion(question, pointValue) {
    const modal = document.getElementById('question-modal');
    const questionText = document.getElementById('question-text');
    questionText.innerHTML = `${question.question} <br> (For ${pointValue} points)`;

    const submitButton = modal.querySelector('button');
    submitButton.onclick = () => submitAnswer(question.correct_answer, pointValue);

    modal.style.display = "block";
}

function submitAnswer(correctAnswer, pointValue) {
    const userAnswer = document.getElementById('answer-input').value;
    const modal = document.getElementById('question-modal');

    // Normalize answers to lower case for comparison
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        alert('Correct!');
        updateScore(pointValue);
    } else {
        alert('Wrong answer!');
    }

    modal.style.display = "none";
    document.getElementById('answer-input').value = ''; // Reset input field
}

function updateScore(points) {
    currentScore += points;
    document.getElementById('score').innerText = currentScore;
}
