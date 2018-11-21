var quizSpot = $('#quiz-area');
var counterStart = 15;

// Three seperate click events. To start, to reset at the end of the quiz, and on choosing an answer

//restart quiz on click
$(document).on('click', '#start-over', function(run) {
  game.restart();
});

//Answer on click
$(document).on('click', '.answer-button', function(run) {
  game.choice(run);
});

//Start button on click
$("#start").on('click', function(run) {
  $('#sub-container').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//Array of objects containing question + answers

var questions = [{
    question: "What was the name of the child Geralt and Yennefer adopted?",
    answers: ["Triss", "Priscilla", "Cirilla", "Cerys"],
    correctAnswer: "Cirilla",
    image:"assets/images/ciri.jpg"
}, {
    question: "Which school of witchers did Geralt belong to?",
    answers: ["Viper", "Wolf", "Bear", "Cat"],
    correctAnswer: "Wolf",
    image:"assets/images/wolf.jpg"
}, {
    question: "Which of the following is not a nickname of Geralt's?",
    answers: ["White Wolf", "Butcher of Blaviken", "Gwynbleidd", "Ashen one"],
    correctAnswer: "Ashen one",
    image:"assets/images/Geralt.jpg"
}, {
    question: "The trial that witcher apprentices were forced to complete to obtain witcher powers was called?",
    answers: ["Trial of the Grasses", "The Witcher's Trials", "Baptism of Fire", "The Last Wish"],
    correctAnswer: "Trial of the Grasses",
    image:"assets/images/grass.jpg"
}, {
    question: "The school of witchers that was complicit in the assassination of King Foltest and Demavend was? ",
    answers: ["School of the Wolf", "School of the Cat", "School of the Griffin", "School of the Viper"],
    correctAnswer: "School of the Viper",
    image:"assets/images/viper.jpg"
}, {
    question: "The witcher that single handedly assassinated Foltest and Demavend was?",
    answers: ["Geralt", "Vessimir", "Letho", "Auckes"],
    correctAnswer: "Letho",
    image:"assets/images/letho.jpg"
}, {
    question: "Geralt's closest friend is a?",
    answers: ["Bard", "Dwarf", "Witcher", "Vampire"],
    correctAnswer: "Bard",
    image:"assets/images/bard.png"
}, {
    question: "What event introduced humans into the world of Elves and Dwarves?",
    answers: ["The Wild Hunt", "Multiverse connection", "Conjunction of the Spheres", "Baptism of Fire"],
    correctAnswer: "Conjunction of the Spheres",
    image:"assets/images/sphere.jpg"
}];



    //game object
var game = {
  questions:questions,
  currentQuestion:0,
  counter:counterStart,
  correct:0,
  incorrect:0,

  // countdown function to run for each question asked
countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

        if (game.counter === 0){
            game.timeUp();
        }
},

 // function to load question to page start the countdown and append answers to generated buttons
loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    quizSpot.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        
        for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
            quizSpot.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
        }
},

    // load the next object question and reload the counter 
nextQuestion: function(){
    game.counter = counterStart;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
},

    // Function to run when timer runs out
timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);
    //Out of time text with correct answer and image posted
    quizSpot.html('<h2>Out of Time! Here comes the next question!</h2>');
    quizSpot.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    quizSpot.append('<img src="' + questions[this.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 2000);
        }
},

    //Function to run when all 8 questions have been answered or timed out
results: function() {
    clearInterval(timer);
    //Game over text with # of answers correct and incorrect. Restart quiz button applied to results screen
    quizSpot.html('<h2>The quiz is finished, here are the results!</h2>');
    $('#counter-number').html(game.counter);
    quizSpot.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    quizSpot.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>')
    quizSpot.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    quizSpot.append('<br><button id="start-over">Reset Quiz?</button>');
  },

    // function determining if the question's answer is = to the chosen answer.
choice : function(run) {
    clearInterval(timer);

        if ($(run.target).data("name") === questions[this.currentQuestion].correctAnswer){
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
},
  
answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    quizSpot.html('<h2>Not Quite Correct!</h2>');
    quizSpot.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    quizSpot.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 2000);
        }
},
  
answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    quizSpot.html('<h2>Correct!</h2>');
    quizSpot.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
},
  
restart : function(){
    this.currentQuestion = 0;
    this.counter = counterStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};