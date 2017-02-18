// require inquirer 
var inquirer = require('inquirer');

// require fs
var fs = require('fs');

// require basic flashcard 
var basicCard = require('./basicFlash.js');

// require cloze flashcard 
var clozeCard = require('./clozeFlash.js');



inquirer.prompt([{
    name: "playGame",
    message: "Shall we play a game?",
    type: "list",
    choices: [{
        name: "No-Thanks"
    }, {
        name: "Yes-Please"
    }]
}]).then(function(answer) {
    if (answer.playGame === "No-Thanks") {
        console.log("OK, let me know when you are ready.");
    } else if (answer.playGame === "Yes-Please") {
        showCards();
    }
});

var score = 0;


var showCards = function() {
    // read the log.txt file
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        questionDisplay(questions, count);
    });
};


var questionDisplay = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            score ++;
            if (parsedQuestion.type === 'basic') {
                console.log('Correct!');
                console.log("\n");
                console.log("The answer is: " + parsedQuestion.back + ".");
                console.log("---------------Next Question---------------");
                console.log("\n");
            }else if (parsedQuestion.type === 'cloze') {
                console.log("\nCorrect!\n");
                console.log(parsedQuestion.text);
                console.log("\n---------------Next Question---------------");
             };   

            if (index < array.length - 1) {
              questionDisplay(array, index + 1);
            }
        } else {
                if (parsedQuestion.type === 'basic') {
                console.log('Incorrect!');
                console.log("\n");
                console.log("The answer is: " + parsedQuestion.back + ".");
                console.log("---------------Next Question---------------");
                console.log("\n");
            }else if (parsedQuestion.type === 'cloze') {
                console.log("\nIncorrect!\n");
                console.log(parsedQuestion.text);
                console.log("\n---------------Next Question---------------");
             };


            if (index < array.length - 1) {
              questionDisplay(array, index + 1);

            } else {
                        console.log("Game Over");
                        console.log("Your score is " + score);
                        repeatGame();
                    }
        }
    });
};

var repeatGame = function() {

        inquirer.prompt([{
        name:"repeat",
        message: "Play again?",
        type: "list",
        choices: [{
            name: "No"
        },  {
            name: "Yes"
            }]
        }]).then(function(answer) {

        if (answer.repeat === "No") {
            console.log ("OK, Let me know when you are ready.");
        } else if (answer.repeat === "Yes") {
            score = 0;
            showCards();
          }

        });
}
