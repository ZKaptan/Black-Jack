let blackJackGame = {
	player1: {
		scoreSpan: ".player1-result ",
		div: ".player1-box",
		score: 0,
		wins: 0,
		draws: 0,
		losses: 0,
	},
	player2: {
		scoreSpan: ".player2-result ",
		div: ".player2-box",
		score: 0,
		wins: 0,
		draws: 0,
		losses: 0,
	},
	cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
	cardValue: {
		A: 11,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		10: 10,
		J: 10,
		Q: 10,
		K: 10,
	},
};

// Represent the two players
const player1 = blackJackGame.player1;
const player2 = blackJackGame.player2;

// Check if game is over
let gameOver = false;

let textTitle = document.querySelector(".result");

let activePlayer = player1;

//  Audio variables
const hitSound = new Audio("sounds/swish.m4a");
const drawSound = new Audio("sounds/aww.mp3");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/boo.mp3");

document.querySelector(".btn-hit").addEventListener("click", blackJackHit);

document.querySelector(".btn-deal").addEventListener("click", deal);

document.querySelector(".btn-stand").addEventListener("click", switchTurn);
function blackJackHit() {
	showCard(activePlayer);
}

function showCard(activePlayer) {
	if (!gameOver) {
		let activeText = document.querySelector(`${activePlayer.scoreSpan}`);
		if (activePlayer.score > 10) {
			blackJackGame.cardValue["A"] = 1;
		} else {
			blackJackGame.cardValue["A"] = 11;
		}

		let random = Math.floor(Math.random() * 13);
		let randomCard = blackJackGame.cards[random];

		activePlayer.score += blackJackGame.cardValue[randomCard];

		activeText.textContent = activePlayer.score;

		let cardImage = document.createElement("img");

		cardImage.src = `images/${randomCard}.png`;
		document.querySelector(activePlayer.div).appendChild(cardImage);
		hitSound.play();

		if (activePlayer.score > 21) {
			activeText.textContent = "Bust";
			activeText.style.color = "red";
			switchTurn();
		}
	}
}

// ! Function to deal blackjack cards
function deal() {
	if (gameOver) {
		cardOpacity();
		let player1Images = document
			.querySelector(player1.div)
			.querySelectorAll("img");

		let player2Images = document
			.querySelector(player2.div)
			.querySelectorAll("img");

		for (let i = 0; i < player1Images.length; i++) {
			player1Images[i].remove();
		}
		for (let i = 0; i < player2Images.length; i++) {
			player2Images[i].remove();
		}

		player1.score = 0;
		player2.score = 0;
		document.querySelector(player1.scoreSpan).textContent = 0;
		document.querySelector(player2.scoreSpan).textContent = 0;

		document.querySelector(player1.scoreSpan).style.color = "white";
		document.querySelector(player2.scoreSpan).style.color = "white";

		activePlayer = player1;
		textTitle.textContent = "Lets play";
		gameOver = false;
	}
}

// ! Function to switch turns
function switchTurn() {
	if (!gameOver) {
		if (activePlayer == player1) {
			activePlayer = player2;
		} else {
			decideWinner();
		}
	}
}

// ! Function for determining winner
function decideWinner() {
	gameOver = true;
	cardOpacity();
	if (player1.score > 21 && player2.score > 21) {
		textTitle.textContent = "No one won!";
		drawSound.play();
		player1.draws++;
		player2.draws++;
		document.querySelector(".player1-draws").textContent = player1.draws;
		document.querySelector(".player2-draws").textContent = player2.draws;
	} else if (player1.score > 21) {
		textTitle.textContent = "Player 2 won!";
		lossSound.play();
		player2.wins++;
		player1.losses++;
		document.querySelector(".player1-losses").textContent = player1.losses;
		document.querySelector(".player2-wins").textContent = player2.wins;
	} else if (player2.score > 21) {
		textTitle.textContent = "Player 1 won!";
		winSound.play();
		player1.wins++;
		player2.losses++;
		document.querySelector(".player1-wins").textContent = player1.wins;
		document.querySelector(".player2-losses").textContent = player2.losses;
	} else {
		const player1Complement = 21 - player1.score;
		const player2Complement = 21 - player2.score;
		if (player1Complement < player2Complement) {
			textTitle.textContent = "Player 1 won!";
			winSound.play();
			player1.wins++;
			player2.losses++;
			document.querySelector(".player1-wins").textContent = player1.wins;
			document.querySelector(".player2-losses").textContent = player2.losses;
		} else if (player2Complement < player1Complement) {
			textTitle.textContent = "Player 2 won!";
			lossSound.play();
			player2.wins++;
			player1.losses++;
			document.querySelector(".player1-losses").textContent = player1.losses;
			document.querySelector(".player2-wins").textContent = player2.wins;
		} else {
			textTitle.textContent = "Draw";
			drawSound.play();
			player1.draws++;
			player2.draws++;
			document.querySelector(".player1-draws").textContent = player1.draws;
			document.querySelector(".player2-draws").textContent = player2.draws;
		}
	}
}

function cardOpacity() {
	document.querySelector(".btn-hit").classList.toggle("dark");
	document.querySelector(".btn-stand").classList.toggle("dark");
	document.querySelector(".btn-deal").classList.toggle("dark");
}

// localStorage.setItem("p1Wins", player1.wins);
// localStorage.setItem("p1Draws", player1.draws);
// localStorage.setItem("p1Losses", player1.losses);

// localStorage.setItem("p2Wins", player2.wins);
// localStorage.setItem("p2Draws", player2.draws);
// localStorage.setItem("p2Losses", player2.losses);
