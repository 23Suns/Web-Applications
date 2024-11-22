function playRPS(user) {

	let result = "";
	let options = {
		Rock: {
			weakTo: "Paper",
			strongTo: "Scissors",
			strongMsg: "Rock wins",
			weakMsg: "Paper wins",
		},
		Paper: {
			weakTo: "Scissors",
			strongTo: "Rock",
			strongMsg: "Paper wins",
			weakMsg: "Scissors wins",
		},
		Scissors: {
			weakTo: "Rock",
			strongTo: "Paper",
			strongMsg: "Scissors wins",
			weakMsg: "Rock wins",
		},
	};

	let comp = getCompChoice();

	if (options[user].strongTo === comp) {
		result = "Player wins";
	}

	if (options[user].weakTo === comp) {
		result = "Computer wins";
	}

	if (user === comp) {
		result = "It's a draw";
	}

	// document.getElementById("player").innerHTML = "Player [" + user + "]";
	// document.getElementById("comp").innerHTML = "Computer [" + comp + "]";
	// document.getElementById("result").innerHTML = "Result [" + result + "]";

	const outcome = document.querySelector(".info");
	outcome.innerHTML = result;
}

function startGame() {
	document.getElementById("check").style.visibility = "hidden";
	document.querySelector(".info").style.visibility = "hidden";
	let player = getPlayerChoice();
}

function getPlayerChoice() {
	let playerChoice;

	const outcome = document.getElementById("check");
	const rockChoice = document.getElementById("rock");
	const paperChoice = document.getElementById("paper");
	const scissorChoice = document.getElementById("scissors");

	rockChoice.addEventListener('click', () => {
		paperChoice.style.filter = ""
		scissorChoice.style.filter = ""
		rockChoice.style.filter = "invert(38%) sepia(98%) saturate(7438%) hue-rotate(308deg) brightness(102%) contrast(119%)";
		playerChoice = "Rock";
	});
	paperChoice.addEventListener('click', () => {
		rockChoice.style.filter = ""
		scissorChoice.style.filter = ""
		paperChoice.style.filter = "invert(38%) sepia(98%) saturate(7438%) hue-rotate(308deg) brightness(102%) contrast(119%)";
		playerChoice = "Paper";
	});
	scissorChoice.addEventListener('click', () => {
		rockChoice.style.filter = ""
		paperChoice.style.filter = ""
		scissorChoice.style.filter = "invert(38%) sepia(98%) saturate(7438%) hue-rotate(308deg) brightness(102%) contrast(119%)";
		playerChoice = "Scissors";
	});
	

	
	outcome.style.visibility = "visible";
	outcome.innerHTML = "Deal Hand"

}

function playRound(choice) {
	
}

// function getPlayerChoice() {
// 	let playerChoice;

// 	do {
// 		playerChoice = window.prompt(
// 			"What is your choice? (Rock, Paper, Scissors)"
// 		);
// 		if (!isValidChoice(playerChoice)) {
// 			playerChoice = window.prompt(
// 				"INVALID CHOICE. Type option exactly as written. (Rock, Paper, Scissors)"
// 			);
// 		}
// 	} while (!isValidChoice(playerChoice));

// 	return playerChoice;
// }

function isValidChoice(choice) {
	const validChoices = ["Rock", "Paper", "Scissors"];
	return validChoices.includes(choice);
}

function getCompChoice() {
	let choices = ["Rock", "Paper", "Scissors"];
	let randInt = Math.floor(Math.random() * choices.length);
	let compChoice = choices[randInt];
	return compChoice;
}