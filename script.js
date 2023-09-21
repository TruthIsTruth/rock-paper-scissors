const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const LOSE = 0;
const WIN = 1;
const DRAW = 2;

let getRandomIntFromRange = range => Math.floor(Math.random() * range);

function getComputerChoice() {
    let choice = getRandomIntFromRange(3); //Range=[0,3)
    return choice;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    switch (playerSelection) {
        case 'rock':
            playerSelection = ROCK;
            break;
        case 'paper':
            playerSelection = PAPER;
            break;
        case 'scissors':
            playerSelection = SCISSORS;
            break;
        default:
            return undefined;
    }

    let res;
    let message;
    if (playerSelection == ROCK) {
        switch (computerSelection) {
            case ROCK:
                res = DRAW;
                message = "It's a Draw! Both chose Rock";
                break;
            case PAPER:
                res = LOSE;
                message = "You Lose! Paper beats Rock";
                break;
            case SCISSORS:
                res = WIN;
                message = "You Win! Rock beats Scissors";
                break;
        }
    } else if (playerSelection == PAPER) {
        switch (computerSelection) {
            case ROCK:
                res = WIN;
                message = "You Win! Paper beats Rock";
                break;
            case PAPER:
                res = DRAW;
                message = "It's a Draw! Both chose Paper";
                break;
            case SCISSORS:
                res = LOSE;
                message = "You Lose! Scissors beats Paper";
                break;
        }
    } else { //playerSelection == SCISSORS
        switch (computerSelection) {
            case ROCK:
                res = LOSE;
                message = "You Lose! Rock beats Scissors";
                break;
            case PAPER:
                res = WIN;
                message = "You Win! Scissors beats Paper";
                break;
            case SCISSORS:
                res = DRAW;
                message = "It's a Draw! Both chose Scissors";
                break;
        }
    }
    return { res, message };
}

function game() {
    //Play 5 rounds
    //Keep score of the user and computer
    //For each round,
    //  get input from user
    //  playRound() and update score
    //  display winner of this round
    //Display overall winner

    let winsUser = 0;
    let winsComputer = 0;

    for (let i = 0; i < 5; i++) {
        let computerChoice = getComputerChoice();
        let userChoice = window.prompt("Enter your choice (Rock, Paper or Scissors):");
        if (userChoice === null) break;

        let result = playRound(userChoice, computerChoice);
        while (result === undefined) {
            userChoice = window.prompt("Invalid input! (Rock, Paper or Scissors), Try again:");
            result = playRound(userChoice, computerChoice);
        }

        if (result.res === LOSE)
            winsComputer++;
        else if (result.res === WIN)
            winsUser++;

        console.log(result.message);
    }

    let finalMessage = `Final result:
            Player wins: ${winsUser}
            Computer wins: ${winsComputer}`;
    if (winsUser < winsComputer) {
        finalMessage += '\nThe winner is the computer!'
    } else if (winsUser > winsComputer) {
        finalMessage += '\nThe winner is the player!'
    } else { //Draw
        finalMessage += '\nNo one wins!'
    }

    console.log(finalMessage);
}

//game();

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const result = playRound(button.id, getComputerChoice());
        console.log(result.message);
    });
})