$(document).ready(function() {
    var firstTime= true;
    var questionNumber = 0;
    var timeToAnswer = 20;
    var nextQuestionSec = 10;
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
        image: "assets/images/chargers.png",
        trivia: "Chargers owner Dean Spanos moved his team back to L.A. because it couldn’t compete with the rest of the league financially at the old stadium in San Diego."
        },

        {
        question: "Which of these beaches is closest to the golf course which hosted the 2008 US Open?",
        choices: ["Torrey Pines State Beach", "La Jolla Shores", "Ocean Beach", "Pacific Beach"],
        answer: 0,
        image: "assets/images/torreypines.jpg",
        trivia: "Torrey Pines has one of the most scenic views with the beach backing up into the giant bluffs.  But be aware - You may see more than you bargained for at the nude Black's Beach."
        },

        {
        question: "San Diego was named for the Catholic Saint Didacus.",
        choices: ["True", "False"],
        answer: 0,
        image: "assets/images/prayerstd.jpg",
        trivia: "Sebastián Vizcaíno surveyed the harbor (currently Mission Bay and Point Loma) and named the area for the Catholic Saint Didacus, a Spaniard more commonly known as San Diego de Alcalá."
        },

        {
        question: "Which iconic structure connects the North Island Naval Base to downtown San Diego?",
        choices: ["California Bridge", "San Diego Bridge", "Coronado Roadway", "Coronado Bridge"],
        answer: 3,
        image: "assets/images/coronado.jpg",
        trivia: "The 11,179-foot-long (3,407 m or 2.1 mi) bridge ascends from Coronado at a 4.67 percent grade before curving 80 degrees toward San Diego. It is supported by 27 concrete girders, the longest ever made at the time of construction."
        },

        {
        question: "Which of these places was the site of the famous movie 'Some Like It Hot' starring Marilyn Monroe?",
        choices: ["San Diego Zoo", "Balboa Park", "Hotel Del Coronado", "Sea World"],
        answer: 2,
        image: "assets/images/hoteldel.jpg",
        trivia: "When it opened in 1888, it was the largest resort hotel in the world. It has hosted presidents, royalty, and celebrities through the years and has been featured in numerous movies and books."
        },

        {
        question: "Which of these San Diego parks hosts both a professional sports team and large scale concerts?",
        choices: ["Chicano Park", "Petco Park", "Balboa Park"],
        answer: 1,
        image: "assets/images/petcopark.jpg",
        trivia: "Petco Park is a baseball park located in the downtown area of San Diego, California that is home to the San Diego Padres. The park opened in 2004, replacing Qualcomm Stadium, which the Padres shared with the San Diego Chargers of the NFL."
        },

        {
        question: "Which late night show was San Diego Zoo's emissary, Joan Embery, was known to frequent?",
        choices: ["The Tonight Show", "The Late Show With David Letterman", "Late Night with Conan O'Brien", "Jimmy Kimmel Live"],
        answer: 0,
        image: "assets/images/joanembery.jpg",
        trivia: "Joan Embery has been the goodwill ambassador to the San Diego Zoo's Zoological Society of San Diego for over 32 years.  She had close to 100 appearances on the Tonight Show."
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
        $("#trivia").empty();

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
        $("#trivia").text(questionData[questionNumber].trivia)
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
        $("#trivia").empty();

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