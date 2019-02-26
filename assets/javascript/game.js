
    var wordList = ['check', 'king', 'queen', 'rook', 'bishop', 'knight', 'pawn', 'castle'];
    var wins = 0;
    const guesses = 7;
    var guessedLetters = [];
    var hasFinished = false; 
    var gameStarted = false; 
    var guessingWord = [];   
    var guessesRemaining = 0;
    var currentWordIndex;   
// reset the game and run update the display function 
    function resetGame() {
        guessesRemaining = guesses;
        gameStarted = false;
        currentWordIndex = Math.floor(Math.random() * (wordList.length));
        guessedLetters = [];
        guessingWord = [];
        for (var i = 0; i < wordList[currentWordIndex].length; i++) {
            guessingWord.push(" _ ");
        }
        document.getElementById("gameover").style.visibility = "hidden";
        document.getElementById("you-win").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "hidden";
        updateDisplay();
    };
//   update the HTML
    function updateDisplay() {

        document.getElementById("win-count").innerText = wins;
        document.getElementById("current-word").innerText = "";
        for (var i = 0; i < guessingWord.length; i++) {
            document.getElementById("current-word").innerText += guessingWord[i];
        }
        document.getElementById("guesses-remaining").innerText = guessesRemaining;
        document.getElementById("guessed-letters").innerText = guessedLetters;
        if(guessesRemaining <= 0) {
            document.getElementById("gameover").style.visibility = "visible";
            document.getElementById("start").style.visibility = "visible";
            hasFinished = true;
        }
    };
//  hook into the key pressing event
    document.onkeyup = function(event) {
        if(hasFinished) {
            resetGame();
            hasFinished = false;
        } else {
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
        }
    };
// start game
    function makeGuess(letter) {
        if (guessesRemaining > 0) {
            if (!gameStarted) {
                gameStarted = true;
            }
    
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        }
        
        updateDisplay();
        checkWin();
    };
//  loop through the word to evaluate if the letter is in the array
    function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < wordList[currentWordIndex].length; i++) {
            if(wordList[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }
    
    //    i don't really get this line, copied from online
        if (positions.length <= 0) {
            guessesRemaining--;
 
        } else {
            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };
// check to see if you won
    function checkWin() {
        if(guessingWord.indexOf(" _ ") === -1) {
            document.getElementById("you-win").style.visibility = "visible";
            document.getElementById("start").style.visibility = "visible";
            wins++;
            hasFinished = true;
        }
    };
resetGame();
   



    
