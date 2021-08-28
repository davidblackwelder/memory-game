/*
 * Set symbols in an array
 */
const symbols = [
	"fas fa-chess",
	"fas fa-chess",
	"fa fa-chess-bishop",
	"fa fa-chess-bishop",
	"fa fa-chess-king",
	"fa fa-chess-king",
	"fa fa-chess-knight",
	"fa fa-chess-knight",
	"fa fa-chess-pawn",
	"fa fa-chess-pawn",
	"fa fa-chess-queen",
	"fa fa-chess-queen",
	"fa fa-chess-rook",
	"fa fa-chess-rook",
	"fa fa-chess-board",
	"fa fa-chess-board",
];

const deck = document.querySelector(".deck");
const timer = document.querySelector(".timer");

let openCards = [];
let matchedCards = [];
let timerOff = true;
let time = 20;
let gameTimer;

/*
 * Start Game
 */
function startGame() {
	const resetBtn = document.querySelector(".restart");
	resetBtn.addEventListener("click", restartGame);
	displayDeck();
}

/*
 * Display game board
 */
function displayDeck() {
	shuffle(symbols);
	// Create html for cards
	for (let i = 0; i < symbols.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${symbols[i]}"></i>`;
		deck.appendChild(card);

		// Add click event to each card
		clickCard(card);
		deck.classList.remove("disable");
	}
}

/*
 * Shuffle Cards
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
 * Click Card Event
 */
function clickCard(card) {
	card.addEventListener("click", function () {
		if (timerOff) {
			startTimer();
			timerOff = false;
		}

		const currentCard = this;
		const previousCard = openCards[0];

		// existing open card
		if (openCards.length === 1) {
			showCard(card);
			addOpenCards(this);
			checkMatch(currentCard, previousCard);
		} else {
			// no open card
			showCard(card);
			addOpenCards(this);
		}
	});
}

/*
 * Show symbol of card
 */
function showCard(card) {
	card.classList.add("open", "show", "disable");
}

/*
 * Add open cards to 'openCards'
 */
function addOpenCards(card) {
	openCards.push(card);
}

/*
 * Check match
 */
function checkMatch(currentCard, previousCard) {
	if (currentCard.innerHTML === previousCard.innerHTML) {
		cardsMatch(currentCard, previousCard);
		openCards = [];
	} else {
		// wait 500ms
		setTimeout(function () {
			noMatch(currentCard, previousCard);
		}, 500);
		openCards = [];
	}

	moveCounter();
	starDisplay();
	gameOver();
}

/*
 * Cards match
 */
function cardsMatch(currentCard, previousCard) {
	currentCard.classList.add("match");
	previousCard.classList.add("match");
	addMatchedCards(currentCard, previousCard);
}

/*
 * Add matching cards to 'matchedCards'
 */
function addMatchedCards(currentCard, previousCard) {
	matchedCards.push(currentCard);
	matchedCards.push(previousCard);
}

/*
 * Cards don't match
 */
function noMatch(currentCard, previousCard) {
	currentCard.classList.remove("open", "show", "disable");
	previousCard.classList.remove("open", "show", "disable");
}

/*
 * Move counter
 */
let displayMoves = document.querySelector(".moves");
let moves = 0;
displayMoves.innerHTML = moves + " moves";
function moveCounter() {
	moves++;

	if (moves === 1) {
		displayMoves.innerHTML = moves + " move";
	} else {
		displayMoves.innerHTML = moves + " moves";
	}
	return displayMoves;
}

/*
 * Star display
 */
let displayStars = document.querySelector(".stars");
let stars = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
function starDisplay() {
	switch (moves) {
		case 15:
			displayStars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
			break;
		case 22:
			displayStars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
	}
}

/*
 * Reset game
 */
function restartGame() {
	// remove cards
	deck.innerHTML = "";

	// call 'startGame' to create new board
	startGame();

	// empty 'openCards'
	openCards = [];

	// reset timer
	stopTimer();
	timerOff = true;
	time = 20;
	displayTime();

	// reset all stats
	matchedCards = [];
	moves = 0;
	displayMoves.innerHTML = moves + " moves";
	displayStars.innerHTML = stars;
}

/*
 * Replay game
 */
function replayGame() {
	restartGame();
}

/*
 * End the game
 */
function gameOver() {
	if (matchedCards.length === symbols.length) {
		stopTimer(gameTimer);
	}
}

/*
 * Start game timer
 */
function startTimer() {
	gameTimer = setInterval(function () {
		time--;
		displayTime();
	}, 1000);
}

/*
 * Display game timer
 */
function displayTime() {
	minutes = Math.floor(time / 60);
	seconds = time % 60;
	if (seconds >= 0) {
		if (seconds < 10) {
			timer.innerHTML = `${minutes}:0${seconds}`;
		} else {
			timer.innerHTML = `${minutes}:${seconds}`;
		}
	} else {
		stopTimer();
	}
}

/*
 * Stop game timer
 */
function stopTimer() {
	clearInterval(gameTimer);
	deck.classList.add("disable");
}

////////// Start game for the first time
startGame();
