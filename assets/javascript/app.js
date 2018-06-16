$(document).ready(function() {
    var firstTime= true;
    var questionNumber = 0;
    var timeToAnswer = 20;
    var nextQuestionSec = 5;
    var timer = timeToAnswer;
    var interval;
    var intervalRunning = false;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    var questionData =
    [
        {
        question: "Which football team moved from San Diego to Los Angeles?",
        choices: ["Bears", "Chargers", "Falcons", "49ers"],
        answer: 1,
        image: "assets/images/chargers.png"
        },

        {
        question: "Which of these beaches is closest to the golf course which hosted the 2008 US Open?",
        choices: ["Torrey Pines State Beach", "La Jolla Shores", "Ocean Beach", "Pacific Beach"],
        answer: 0,
        image: "assets/images/torreypines.jpg"
        },

        {
        question: "San Diego was named for the Catholic Saint Didacus.",
        choices: ["True", "False"],
        answer: 0,
        image: "assets/images/prayerstd.jpg"
        },

        {
        question: "Which iconic structure connects the North Island Naval Base to downtown San Diego?",
        choices: ["California Bridge", "San Diego Bridge", "Coronado Roadway", "Coronado Bridge"],
        answer: 3,
        image: "assets/images/coronado.jpg"
        },

        {
        question: "Which of these places was the site of the famous movie 'Some Like It Hot' starring Marilyn Monroe?",
        choices: ["San Diego Zoo", "Balboa Park", "Hotel Del Coronado", "Sea World"],
        answer: 2,
        image: "assets/images/hoteldel.jpg"
        },

        {
        question: "Which of these San Diego parks hosts both a professional sports team and large scale concerts?",
        choices: ["Chicano Park", "Petco Park", "Balboa Park"],
        answer: 1,
        image: "assets/images/petcopark.jpg"
        },

        {
        question: "Which late night show was San Diego Zoo's emissary, Joan Embery, was known to frequent?",
        choices: ["The Tonight Show", "The Late Show With David Letterman", "Late Night with Conan O'Brien", "Jimmy Kimmel Live"],
        answer: 0,
        image: "assets/images/joanembery.jpg"
        }
    ]   

    function quizMe()
    {
        // Start a timer
        console.log("In QuizMe");
        interval = setInterval(updateTimer, 1000);
        intervalRunning = true;

        // Render the timer 
        $("#time").html("<h1>Time Remaining: " + timer-- + "</h1>");

        // Render a question
        console.log("Question", questionData[questionNumber].question);
        $("#question").html("<h2>" + questionData[questionNumber].question + "</h2>");

        // Render some answers
        renderButtons();
    }

    function updateTimer()
    {
        $("#time").html("<h1>Time Remaining: " + timer-- + "</h1>");

        // Times up!
        if (timer < 0)
        {
            clearInterval(interval);
            intervalRunning = false;
            timesUp();
        }

    }

    function renderButtons()
    {
        if (firstTime)
        {
            var x = $("<button>");
            x.addClass("start-button")
            x.text("START GAME!!");
            $("#buttons-view").append(x);

            return;
        }

        // Render our happy questions
        console.log("Number of choices", questionData[questionNumber].choices.length);

        // Kill out any leftover messages/pictures
        $("#buttons-view").empty();
        $("#buttons-view").addClass("ans-container");  // Need to put the formatting class back in
        $("#pic").empty();

        for (var i=0; i < questionData[questionNumber].choices.length; i++)
        {
            var x = $("<button>");
            x.addClass("button")
            console.log("Stuff data attribute: ", i);
            x.attr("value", i);  // Button attribute for choice so we know what they clicked
            console.log("question: ", questionData[questionNumber].choices[i]);
            x.text(questionData[questionNumber].choices[i]);
            $("#buttons-view").append(x);
        }


    }

    $(document).on("click", ".start-button", function()
    {

        if (firstTime)
        {
            // Starting the game
            console.log("start the game");
            firstTime = false;

            // Kill out the current button
            $("#buttons-view").empty();
            $("#restart").empty();

            quizMe();
            return;
        }


    });
 
    function timesUp()
    {
        // Time is up
        console.log("Ran out of time");

        // Update unanswered counter
        unanswered++;


        // Reset everything - Kill out the current questions
        $("#buttons-view").empty();
        $("#question").empty();        

        // Display Out of Time
        $("#question").text("Times Up!")

        // Display the answer
        displayAnswer();

        // Stop and reset the timers
        timer = timeToAnswer;
        clearInterval(interval);
        intervalRunning = false;

        // Give them time to read the message
        setTimeout(nextQuestion, nextQuestionSec*1000);
    }

    function displayAnswer()
    {
        // Give the correct answer
        let answer = questionData[questionNumber].answer
        $("#buttons-view").html("<br>" + "<h3>The correct answer is: " + questionData[questionNumber].choices[answer] + "</h3>");
        console.log("Image", questionData[questionNumber].image);
        $("#pic").append("<img src='" + questionData[questionNumber].image + "'/>");
    }

    $(document).on("click", ".button",function()
    {   

        // Must be giving me an answer, so get what they clicked
        var answer = $(this).attr("data-name");

        answer = $(this).val();

        console.log("They answered: ", this);
        console.log("Correct answer: ", questionData[questionNumber].answer);

        // Check their answer
        if (questionData[questionNumber].answer == answer)
        {
            // Got it right
            console.log("Got it right");
            $("#question").text("Correct!");
            correct++;
        }
        else{
            console.log("Got it wrong");
            $("#question").text("Nope!!");
            incorrect++;
        }

        // Display the answer
        displayAnswer();

        // Stop the timer
        clearInterval(interval);
        intervalRunning = false;
        timer = timeToAnswer;

        // Give them time to read the message
        setTimeout(nextQuestion, nextQuestionSec*1000);

    });

    function nextQuestion()
    {
            // Go to the next question
            questionNumber++;
            console.log("question number ", questionNumber);
            console.log("Total questions ", questionData.length);
    
            // If we have more questions, 
            // Clear current interval.  Start again
            if (questionNumber < questionData.length)
            {
                quizMe();
            }
            else  // Game over
            {
                // Throw in game stats here
                console.log("game over");
                gameOver();
            }

    }

    function gameOver()
    {
        // Clear out last picture
        $("#pic").empty();

        // Display game statistics
        $("#question").html("Game Over!!");
        $("#buttons-view").html("<div> Correct answers: " + correct + "</div>");
        $("#buttons-view").append("<div> Incorrect answers: " + incorrect + "</div>");
        $("#buttons-view").append("<div> Unanswered: " + unanswered + "</div><br><br>");

        // Render new start button
        var x = $("<button>");
        x.addClass("start-button")
        x.text("Start Over??");
        $("#restart").append(x);

        // Reset game stats
        firstTime = true;
        questionNumber = 0;
        intervalRunning = false;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        timer = timeToAnswer;
    }
    
    // Starting the game - render start button
    renderButtons();

});