/*Define variables*/
    //Assignment Code to each section
    var welcome = document.querySelector("#introduction");
    var startBtn = document.querySelector("#start_button");
    var introPage =document.querySelector("#intro_page");
    
    var questionPage = document.querySelector("#question_page");
    var askQuestion = document.querySelector("#ask_question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var answerBtn1 = document.querySelector("#answer_btn1");
    var answerBtn2 = document.querySelector("#answer_btn2");
    var answerBtn3 = document.querySelector("#answer_btn3");
    var answerBtn4 = document.querySelector("#answer_btn4");
    
    var checkLine = document.querySelector("#check_line");
    var scoreBoard = document.querySelector("#submit_page");
    var finalScore = document.querySelector("#final_score");
    var userInitial =document.querySelector("#initial");
    
    var submitBtn =document.querySelector("#submit_btn");
    var highScorePage =document.querySelector("#highscore_page");
    var scoreRecord =document.querySelector("#score_record");
    var scoreCheck =document.querySelector("#score_check");
    var finish =document.querySelector("#finish");
    
    var backBtn =document.querySelector("#back_btn");
    var clearBtn=document.querySelector("#clear_btn");
    
    // Define questions (Object)
    var questionSource = [
        {
            question: "Questions 1 : String values must be enclosed within _____ when being assigned to variables.",
            choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
            answer: "c"
        },
        {
            question: "Questions 2 : Commonly used data types DO NOT include:",
            choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
            answer: "c"
        },
        {
            question: "Questions 3 : How do you create a function in JavaScript",
            choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
            answer: "b"
        },
        {
            question: "Questions 4 : How do you call a function named myFunction?",
            choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
            answer: "c"
        },
        {
            question: "Questions 5 : To see if two variables are equal in an if / else statement you would use ____.",
            choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
            answer: "b"
        },
        {
            question: "Questions 6 : The first index of an array is ____.",
            choices: ["a. 0", "b. 1", "c. 8", "d. any"],
            answer: "a"
        },
        {
            question: "Questions 7 : How to write an IF statement in JavaScript?",
            choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
            answer: "c"
        },
        {
            question: "Questions 8 : Which event occurs when the user clicks on an HTML element?",
            choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
            answer: "a"
        }
    ];

    // Set other variables
    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    /*Functions*/
    // WHEN I click the start button, THEN a timer starts
    // the setInterval() method
    function countdown() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    // if time is up, show on score board content show "Time is up! message"
                    finish.textContent = "Time is up!";
                    gameOver();
    
                } else  if(questionCount >= questionSource.length + 1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    
    // Function starts the quiz
    function startQuiz () {
            introPage.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
          
    }
    // Present the questions and answers
    function showQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            answerBtn1.textContent = questionSource[n].choices[0];
            answerBtn2.textContent = questionSource[n].choices[1];
            answerBtn3.textContent = questionSource[n].choices[2];
            answerBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
    // WHEN I answer a question,Show if answer is correct or incorrect 
    function checkAnswer(event) {
        event.preventDefault();
        // Display if answer is correct or incorrect
        checkLine.style.display = "block";
        setTimeout(function () {
            checkLine.style.display = 'none';
        }, 1000);
    
        // Check answer
        if (questionSource[questionNumber].answer == event.target.value) {
            checkLine.textContent = "Correct!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 10;
            checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
        }
        // THEN I am presented with another question
        if (questionNumber < questionSource.length - 1 ) {
        // Calls showQuestions to go to next question when any answerBtn is clicked
            showQuestion(questionNumber + 1);
        } else {
        gameOver();
    }
    questionCount++;
    }
    // WHEN all questions are answered or the timer reaches 0, end game and show score
    function gameOver() {
    
            questionPage.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
            // show final score
            finalScore.textContent = "Your final score is :" + totalScore ;
            // clearInterval(timerInterval);  
            timeLeft.style.display = "none"; 
    };
    
    // Gets current score and initials from local storage
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            latestList = JSON.parse(currentList);
            return latestList;
        } else {
            latestList = [];
        }
        return latestList;
    };
    
    
    // Displays score to the score board
    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        // Slice high score array to only show the top five scores
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        // Show the score list on score board
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    // Sorts score and ranking the high score list
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
    // Pushes new score and initials to local storage
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }
    
    /* Adds event listeners*/
    // startbtn to start the quiz
    startBtn.addEventListener("click", startQuiz);
    
    // Go to the next question 
    reactButtons.forEach(function(click){
    
        click.addEventListener("click", checkAnswer);
    });
    
    // Save information and go to next page
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        saveScore();
    });
    
    // Check highscore ranking list
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
    });
    
    // Go back to main page when back button is clicked
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
    });
    
    // Clear local storage and clear page
    clearBtn.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });