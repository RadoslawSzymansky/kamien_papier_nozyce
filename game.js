// variables
const hands = document.querySelectorAll('img');
let playerChoice = undefined;
let pGames = document.querySelector('.numbers').lastChild
let pWins = document.querySelector('.wins').lastChild
let pLosses = document.querySelector('.losses').lastChild
let pDraws = document.querySelector('.draws').lastChild
let spanPlayerChoice = document.querySelector('[data-summary=your-choice]')
let spanBotChoice = document.querySelector('[data-summary=ai-choice]')
let spanGameResult = document.querySelector('[data-summary=who-win]')
// stats init
const stats = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0
}
// functions

/// player choice
const playerChoose = (e) => {
    // takes player choice;
    hands.forEach(e => {
        e.style.border = ""
    })
    let choose = e.target;
    choose.style.border = "3px solid yellow";
    playerChoice = choose.getAttribute('data-option')

}
// lottery  of bot 

const botChoose = () => {
    return hands[Math.floor(Math.random() * hands.length)].getAttribute('data-option');
};
// changing statistic

const updateStats = () => {
    const {
        games,
        wins,
        losses,
        draws
    } = stats;
    pGames.textContent = games;
    pWins.textContent = wins;
    pDraws.textContent = draws;
    pLosses.textContent = losses;
};
// play the game
const letStart = (bot) => {

    if (playerChoice !== undefined) {
        const botChoice = bot();
        spanPlayerChoice.textContent = playerChoice
        spanBotChoice.textContent = botChoice;
        stats.games++;
        if (playerChoice == "kamień" && botChoice == "nożyczki" || playerChoice == "papier" && botChoice == "kamień" || playerChoice == "nożyczki" && botChoice == "papier") {
            stats.wins++;
            spanGameResult.textContent = "WYGRAŁEŚ!!!"
        } else if (playerChoice == "kamień" && botChoice == "kamień" || playerChoice == "nożyczki" && botChoice == "nożyczki" || playerChoice == "papier" && botChoice == "papier") {
            stats.draws++;
            spanGameResult.textContent = "REMIS"

        } else {
            stats.losses++;
            spanGameResult.textContent = "PRZEGRAŁEŚ! :("

        }

    } else {
        alert('Wybierz opcję!')

    }
    playerChoice = undefined;
    hands.forEach(e => {
        e.style.border = ""
    });
    updateStats();
}



//  events //
const play = document.querySelector('.start').addEventListener('click', letStart.bind(null, botChoose));
hands.forEach(e => {
    e.addEventListener('click', playerChoose)
})