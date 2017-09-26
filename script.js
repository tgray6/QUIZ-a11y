"use strict";

//**********User Experience**********
// 1--A start button must start the quiz
// 2--Users should be asked at least 5 multiple choice questions
// 3--Users are asked one question at a time
// 4--Users should be able to answer with mouse OR keyboard (using form makes this easier)
// 5--Users cannot skip questions
// 6--Users should be able to see which question they are on and their current score
//							 (Question 7 out of 10) current score (5 right, 2 wrong)
// 7--Upon submit button, user should:
//				receive textual feedback about answer (show correct answer if wrong)
//				be moved to the next question (or interact with an element to move to next question)
// 8--Users should be shown their overall score at the end of the quiz.
// 9--Users should be able to start a new game



//**********Technical Requirements**********
// 1--Render questions in a form
// 2--Use other semantic HTML, along with CSS and jQuery
// 3--Follow accessibility best practice
// 4--Be fully usable by keyboard and mouse


//**********User Stories********** 
/*
User should be able to click start quiz to bring them past the start screen and begin question 1
User should be able to select question and submit answer
User should receive feedback on the answer
User should see the correct answer if wrong
User should see their level go up after each question
User should see their score go up or stay even after each question.
User should see a final score screen after submitting last question.
*/
const answerKeyArray = [
	"Simon",
	"Mother Brain",
	"Megaman",
	"Power Glove",
	"Ninja Gaiden",
	"King K. Rool",
	"Wario",
	"Wario and Waluigi",
	"Super Famicom",
	"Sega"
];

const yourAnswerArray = [];

const startScreen = `<h2> PRESS START QUIZ BUTTON </h2>`

const QUESTIONS = [
  {	//question [0]
    question: `What was the name of this whip wielding main character in the NES classic "Castlevania"?`,
   	answers: [
     	"Luigi",
     	"Simon",
     	"Samus",
     	"Kirby",
    ],
    correctAnswer: 2
  },
  {	//question [1]
    question: `What is the name of the final boss in the original 1987 "Metroid"?`,
    answers: [
     	  "Metroid",
     	  "Ganon",
      	"Mother Brain",
      	"Ridley"
    ],
   	correctAnswer: 3
  },
  { //question [2]				
    question: `What is the name of the hero that goes by "the blue bomber"?`,
    answers: [
      	"Kirby",
      	"Captain Skyhawk",
      	"Megaman",
      	"Mario"
    ],
   	correctAnswer: 3
  },
  {	//question [3]
    question: `What "amazing" piece of technology released for the NES that you wore on your hand?`,
    answers: [
     	  "NES Zapper",
        "Mega Arm",
        "Virtual Boy",
        "Power Glove"
    ],
   	correctAnswer: 4
  },
  {	//question [4]
    question: `This game, released originally on the NES by TECMO, is still known as one of the hardest games in history.`,
    answers: [
      	"Ninja Gaiden",
        "Super Mario Bros.",
        "The Legend of Zelda",
        "Contra"
    ],
   	correctAnswer: 1
 },
  { //question [5]
    question: `What is the final boss in the classic SNES game "Donkey Kong Country"?`,
   	answers: [
      	"King Cruel",
        "King K. Rool",
        "King Koopa",
        "King Kroc"
    ],
    correctAnswer: 2
  },
  { //question[6]
    question: `In Super Mario Kart on the SNES, who is NOT a playable racer?`,
    answers: [
      	"Luigi",
        "Bowser",
        "Koopa Troopa",
        "Wario"
    ],
   	correctAnswer: 4
  },
  { //question[7]
    question: `What are the names of the evil versions of mario and luigi?`,
    answers: [
     	  "Luario and Maruigi",
        "Wario and Waluigi",
        "Gary and Terry",
        "Link and Epona"
    ],
   	correctAnswer: 2
  },
  { //question[8]
    question: `What is the name of the japanese version of the Super Nintendo System(SNES)?`,
    answers: [
     	  "Super Famicom",
        "Power Arigato",
        "Super Hai System",
        "Mega Drive"
    ],
   	correctAnswer: 1
  },
  { //question[9]
    question: `Who was Nintendos biggest videogame console competitor throughout the 90s?`,
    answers: [
      	"Sony",
        "Microsoft",
        "Sega",
        "Atari"
    ],
   	correctAnswer: 3
 },
];




let answerKeys = 0

let SCORE = 0

let questionNumber = 0

let LEVEL = 0

let yourAnswers = 0



//THIS LOADS THE INITIAL START SCREEN AND HIDES THE QUIZ
function renderStartScreen() {
$("#nintendoQuiz").addClass("hidden");
$("#screen").append(startScreen);
};
$(renderStartScreen);






//THIS IS THE BUTTON THAT BEGINS THE QUIZ BY REMOVING CLASS HIDDEN AND DISPLAYING QUESTION 1
function quizStart() {
LEVEL++
let q1 = QUESTIONS[0];
$(`#startQuiz`).click(function(event){
$("#nintendoQuiz").removeClass("hidden");
$("h2").addClass("hidden");
$(".formQuestion").html(q1.question);
$(".radioTextA").html(q1.answers[0])
$(".radioTextB").html(q1.answers[1])
$(".radioTextC").html(q1.answers[2])
$(".radioTextD").html(q1.answers[3])
$('#startQuiz').prop("disabled",true).addClass(`opacity`);
$('#resultsButton').prop("disabled",true);
$('#retryQuiz').prop("disabled",true).addClass(`opacity`);
$('button[type=submit], input[type=submit]').prop('disabled',true).addClass(`opacity`);
radioCheck();
})
};
$(quizStart);





//SUBMIT ANSWER BUTTON
$("#submitButton").click(function(){
	let buttonLock = $('button[type=submit], input[type=submit]').prop('disabled',true).addClass(`opacity`);
	let nextButtonLock = $('#next').prop("disabled",false).removeClass(`opacity`);
	event.preventDefault();


	if($(`form input[name=formAnswer]:checked`).val() == QUESTIONS[questionNumber].correctAnswer){
		SCORE++
    pushYourAnswer();
    renderFinal();  
		questionNumber++
		document.getElementById("score").textContent =`Score= ${SCORE}`;
		renderPositiveFeedback();
		buttonLock
		nextButtonLock
		$("#levelScore").addClass("hidden");
	}


	else{
    pushYourAnswer();
    renderFinal();  
		questionNumber++
		renderNegativeFeedback();
		buttonLock
		nextButtonLock
		$("#levelScore").addClass("hidden");
	}

	 $('form input[type=radio]').prop('checked', false).removeClass(`opacity`);
lockButtons();
});




//NEXT QUESTION BUTTON
$(`#next`).click(function(){
	event.preventDefault();
  lockButtons();
		LEVEL++
    yourAnswers++
		document.getElementById("level").textContent = `Level ${LEVEL} of 10`;
		$('#next').prop("disabled",true).addClass(`opacity`);
		$("#levelScore").removeClass("hidden");

removeFeedback();


$(".formQuestion").html(QUESTIONS[questionNumber].question);
$(".radioTextA").html(QUESTIONS[questionNumber].answers[0]);
$(".radioTextB").html(QUESTIONS[questionNumber].answers[1]);
$(".radioTextC").html(QUESTIONS[questionNumber].answers[2]);
$(".radioTextD").html(QUESTIONS[questionNumber].answers[3]);

radioCheck();
});






//LOCK BUTTONS ON PAGE START AND NEXT AT LEVEL 10
function lockButtons(){
	if (LEVEL===10){
	$('#next').prop("disabled",true).addClass(`opacity`);
	$('#retryQuiz').prop("disabled",false).removeClass(`opacity`);	
  $('#resultsButton').prop("disabled",false);
  $('#resultsButton').removeClass("hidden");
  $('#resultButton').prop("disabled",false).removeClass(`opacity`);
	}
	if (LEVEL===0){
	$('#next').prop("disabled",true).addClass(`opacity`);	
	$('button[type=submit], input[type=submit]').prop('disabled',true).addClass(`opacity`);
	$('#retryQuiz').prop("disabled",true).addClass(`opacity`);

	}	
}
lockButtons();




//FEEDBACK FUNCTIONS
function renderPositiveFeedback() {
	let answers = answerKeyArray[answerKeys];
		$("#chooseAnswer").addClass("hidden");
		$("#feedBack").removeClass("hidden");
		$("#feedBackText").html(`Good Job! ${answers} was correct.`);
		$("#feedBackImage2").removeClass("hidden");

	if (LEVEL===10){
		$(`#finalScore`).html(`Final Score: ${SCORE} of 10 Reset Quiz To Try Again`);
		$(`#finalScore`).removeClass(`hidden`);
		
	}
	answerKeys++
};

function renderNegativeFeedback() {
	let answers = answerKeyArray[answerKeys];
		$("#chooseAnswer").addClass("hidden");
		$("#feedBack").removeClass("hidden");
		$("#feedBackText").html(`Sorry. ${answers} was the correct answer.` );
		$("#feedBackImage1").removeClass("hidden");

		if (LEVEL===10){
		$(`#finalScore`).html(`Final Score: ${SCORE} of 10 Reset Quiz To Try Again`);
		$(`#finalScore`).removeClass(`hidden`);
		
	}
		answerKeys++
};


function removeFeedback(){
	$("#chooseAnswer").removeClass("hidden");
	$("#feedBack").addClass("hidden");
	$("#feedBackImage1").addClass("hidden");
	$("#feedBackImage2").addClass("hidden");

}



//RENDERS OUR FINAL ANSWER FEEDBACK
function renderFinal() {


    $(`#fullFeedBack`).append(

      ` <p id="fullFeedBackQuestions">${LEVEL+"-"+ QUESTIONS[questionNumber].question}</p>
          <ol type="A" class="feedBackList">
            <li class="feedBackAnswer1">${QUESTIONS[questionNumber].answers[0]}</li>
            <li class="feedBackAnswer2">${QUESTIONS[questionNumber].answers[1]}</li>
            <li class="feedBackAnswer3">${QUESTIONS[questionNumber].answers[2]}</li>
            <li class="feedBackAnswer4">${QUESTIONS[questionNumber].answers[3]}</li>
          </ol>
        <p class="feedBackCorrect">${"Correct Answer: " + answerKeyArray[answerKeys] } </p>
        <p class="feedBackYours">${"Your Answer: " + yourAnswerArray[yourAnswers]}</p>
      `
  );
};




//RESET QUIZ BUTTON
function retryQuiz(){
$('#retryQuiz').click(function(){
	location.reload();
});
};

$(retryQuiz);




//RADIO BUTTON: CHECKS IF ITS CLICKED, IF SO, ENABLES SUBMIT BUTTON
function radioCheck(){
	$("input").on("click", function(){
	$('button[type=submit], input[type=submit]').prop('disabled',false).removeClass(`opacity`);
});
};





//PUSHES RADIO BUTTON TEXT VALUE TO yourAnswerArray[]
function pushYourAnswer(){
let youranswerTest = $("input[name='formAnswer']:checked").parent('label').text();
yourAnswerArray.push(youranswerTest);
};



//OVERALL RESULTS BUTTON
$('#resultsButton').click(function(){
  event.preventDefault();
$('#resultsButton').addClass("hidden");
$(`#nintendoQuiz`).addClass("hidden");
$(`#fullFeedBack`).removeClass("hidden");
});

