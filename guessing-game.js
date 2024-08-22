//interface setup
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });



function randomInRange(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let secretNumber = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    return secretNumber;
}


function checkGuess(guess, secretNumber) {

    if (guess > secretNumber) {
        console.log('Too high');
        return false;
    } else if (guess < secretNumber) {
        console.log('Too low');
        return false;
    } else {
        console.log('Correct!');
        return true;
    }
}


let askGuess = (secretNumber, numAttempts) => {
    numAttempts--;

    rl.question('Enter a guess, you have ' + (numAttempts + 1) + " attempts left: ", (answer) => {
    
    let guess = Number(answer);

    if (checkGuess(guess, secretNumber)) {
        console.log('You win!');
        rl.close();

    } else if (numAttempts > 0) {
        askGuess(secretNumber, numAttempts);
    } else {
        console.log('Sorry you lose! The answer was ' + secretNumber);
        rl.close();
    }

  });
}

let askRange = () => {
    rl.question('Enter the minimum: ', min => {
        
        rl.question('Enter the maximum: ', max => {
            console.log("I'm thinking of a number between " + min + " and " + max + "...");
            let minimum = Number(min);
            let maximum = Number(max);
            let secretNumber = randomInRange(minimum, maximum);
            let numAttempts = askLimit(secretNumber);
            
        });

    });
}

let askLimit = (secretNumber) => {
    rl.question('How many attempts do you need? ', numAttempts => {
        askGuess(secretNumber, numAttempts);
    });
};


askRange();