/* =============
Preloader
================*/
 $(window).on('load', function() {
 	$('#status').fadeOut();
 	$('#preloader').delay(350).fadeOut('slow');
 });  /* There I used JQuery to create a preloader. 
 When the page will be fully loaded the preloader disappears slowly with the delay of 350ms*/


 /* Script of the Quiz */
/* Constants */
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


/* Starting the Quiz */
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5) /* The questions will be chosen randomly  */
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

/* Next Question */

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn-a')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
/* Restart the quiz */

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


/* Questions */
const questions = [
  {
    question: 'Who wrote the 1983 song "Pipes of Peace"?',
    answers: [
      { text: 'Paul McCartney', correct: true },
      { text: 'The Beatles', correct: false },
      { text: 'Whitney Houston', correct: false },
      { text: 'Michael Jackson', correct: false }
    ]
  },
  {
    question: 'Does buttermilk contains butter?',
    answers: [
      { text: 'Yes, of course. 80% of buttermilk is butter', correct: false },
      { text: 'Yes, it contains. But only 5% of buttermilk is butter', correct: false },
      { text: 'No, buttermilk does not contain any butter at all', correct: true },
      { text: 'Google know the answer', correct: true } /* We can create even 2 multiple true answers */
    ]
  },
  {
    question: 'Many tourists travel to which country to climb Mount Kilimanjaro?',
    answers: [
      { text: 'South Africa', correct: false },
      { text: 'Tanzania', correct: true },
      { text: 'Nepal', correct: false },
      { text: 'India', correct: false }
    ]
  },
  {
    question: 'Some month have have 31 days, and other months have 30 days. Then, how many months have 28 days?',
    answers: [
      { text: '1', correct: false },
      { text: '5', correct: false },
      { text: '7', correct: false },
      { text: '12', correct: true }
    ]
  }
]