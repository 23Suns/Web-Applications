/**
 * Converts a currency amount from one currency to another using provided exchange rates.
 *
 * @param {string[]} symbolsData - An array of currency symbols and their corresponding names.
 * @param {number[][]} exchangeRates - An array of exchange rates for different currency pairs.
 * 
 * @returns {number} - The converted currency amount.
 */
function convertCurrency() {
	const symbolsData = [
		["AUD", "Australian Dollar"],
		["CAD", "Canadian Dollar"],
		["CLP", "Chilean Peso"],
		["CNY", "Chinese Yuan"],
		["EUR", "Euro"],
		["GBP", "British Pound Sterling"],
		["INR", "Indian Rupee"],
		["JPY", "Japanese Yen"],
		["RUB", "Russian Ruble"],
		["USD", "United States Dollar"],
		["ZAR", "South African Rand"],
	];

	const exchangeRates = [
		["USD", 1.0],
		["AUD", 1.531863],
		["CAD", 1.36029],
		["CLP", 950.662057],
		["CNY", 7.128404],
		["EUR", 1.03203],
		["GBP", 0.920938],
		["INR", 81.255504],
		["JPY", 143.376504],
		["RUB", 57.875038],
		["ZAR", 17.92624],
	];

	let convertSources = getCurrencySymbols(symbolsData);
	let exactRate = getFixedRate(convertSources, exchangeRates);
	let newAmount = 0;

	document.getElementById("newAmount").innerHTML =
		"New Currency Amount [" + newAmount + "]";
	document.getElementById("money").innerHTML =
		"Original Currency [" + convertSources[0] + "]";
	document.getElementById("newMoney").innerHTML =
		"Target Currency [" + convertSources[1] + "]";
	document.getElementById("convertRate").innerHTML =
		"Conversion Rate [" + exactRate + "]";
}

/**
 * Gets currency symbols and validates them.
 * 
 * @param {string[][]} symbolsData - An array of currency symbols and their corresponding names.
 * 
 * @returns {string[]}} - An array containing the selected currency symbols 
*/
function getCurrencySymbols(symbolsData) {
	let convertResponse = [];

	let choice = getUserInput(symbolsData, "original");
	console.log("choice", choice);

	let convertChoice = getUserInput(symbolsData, "target");
	console.log("convertChoice", convertChoice);

	if (
		!isValidCode(choice, symbolsData) ||
		!isValidCode(convertChoice, symbolsData)
	) {
		return { error: "Invalid currency code" };
	}

	convertResponse.push(choice);
	convertResponse.push(convertChoice);
	return convertResponse;
}

/**
 * Calculates the exchange rate between two currencies.

 * @param {string[]} indexes - An array containing the origin and target currency codes.
 * @param {number[][]} exchangeRates - An array of exchange rates
 * 
 * @returns {number} - The calculated exchange rate between the origin and target currencies
 */
function getFixedRate(indexes, exchangeRates) {
	console.log("Indexes Array:", indexes);

	const firstCurrency = indexes[0];
	const secondCurrency = indexes[1];

	console.log("Origin currency:", firstCurrency);
	console.log("Target currency:", secondCurrency);

	let originIndex = exchangeRates.findIndex(
		(rate) => rate[0] === firstCurrency
	);
	let targetIndex = exchangeRates.findIndex(
		(rate) => rate[0] === secondCurrency
	);

	console.log("Origin currency exchange index:", originIndex);
	console.log("Target currency exchange index:", targetIndex);

	if (originIndex === -1 || targetIndex === -1) {
		return null;
	}

	const originRate = exchangeRates[originIndex][1];
	const targetRate = exchangeRates[targetIndex][1];
	console.log("USD_to_RUB", originRate);
	console.log("USD_to_CNY", targetRate);
	const convertRate = targetRate / originRate;
	return convertRate;
}


function getUserInput(knownSymbolsData, target) {
	let userInputCode = "";
	let userInputAmount = "";

	do {
		userInputCode = window.prompt("Enter " + target + " Currency Code");
		if (!isValidCode(userInputCode, knownSymbolsData)) {
			userInputCode = window.prompt(
				"Invalid. These are the available currency codes: " +
					knownSymbolsData.map((element) => element[0]).join(", ")
			);
		}
	} while (
		!isValidCode(userInputCode, knownSymbolsData) &&
		userInputCode !== null
	);

	do {
		userInputAmount = window.prompt("Enter " + target + " Currency Amount");
		if (isNaN(userInputAmount)) {
			userInputAmount = window.prompt(
				"Invalid. Please enter a valid amount"
			);
		}
	} while (isNaN(userInputAmount) && userInputAmount !== null);

	return userInputCode;
}

/**
 * Finds partial matches of a given symbol in a list of symbols.

 * @param {string} partialSymbol - The partial symbol to search for.
 * @param {string[][]} knownSymbolsData - An array of arrays of symbols and country code.
 * 
 * @returns {string[][]} - An array of symbols that contain the partial symbol.
 */

function findPartial(partialSymbol, knownSymbolsData) {
	return knownSymbolsData.filter((element) => {
		return element.some((word) => word.includes(partialSymbol));
	});
}

/**
 * Checks if a given currency code is valid within a list of known currency symbols.

 * @param {string} choice - The currency code to validate.
 * @param {string[][]} symbolsData - An array of arrays of symbols and country code.

 * @returns {boolean} - True if the currency code is valid, false otherwise.
 */
function isValidCode(choice, symbolsData) {
	return symbolsData.some((element) => element[0] === choice);
}
