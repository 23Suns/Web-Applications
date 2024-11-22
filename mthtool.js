function runCalc() {
	const result = evaluateExpression();
	console.log(result);
}

function promptExpression() {
	const expression = prompt("Enter a mathematical expression:");
	return expression;
}

function evaluateExpression() {
	const response = promptExpression();
	console.log(response);
	document.getElementById("expression").innerHTML =
		"Expression [" + response + "]";
	const tokens = response.replace(/\s/g, "").split("");
	console.log(tokens);
	const valueStack = [];
	const operatorStack = [];
	const operators = {
	  "+": (a, b) => a + b,
	  "-": (a, b) => a - b,
	  "*": (a, b) => a * b,
	  "/": (a, b) => a / b,
	};
  
	function precedence(operator) {
	  return {
		"+": 1,
		"-": 1,
		"*": 2,
		"/": 2,
	  }[operator] || 0;
	}
  
	function isNumber(token) {
	  if (token === "-" && (i === 0 || tokens[i - 1] === "(")) {
		return true; // Handle unary minus
	  }
	  return !isNaN(parseFloat(token)) && isFinite(token);
	}
  
	for (let i = 0; i < tokens.length; i++) {
	  const token = tokens[i];
  
	  if (isNumber(token)) {
		// Build a multi-digit number
		let number = token;
		while (i + 1 < tokens.length && isNumber(tokens[i + 1])) {
		  number += tokens[++i];
		}
		valueStack.push(parseInt(number));
	  } else if (operators.hasOwnProperty(token)) {
		// Handle unary minus operator
		if (token === "-" && (i === 0 || tokens[i - 1] === "(")) {
		  // Create a new negative number
		  const negativeNumber = -valueStack.pop();
		  valueStack.push(negativeNumber);
		  continue;
		}
  
		// Handle operators based on their precedence and parentheses
		while (
		  operatorStack.length &&
		  precedence(operatorStack[operatorStack.length - 1]) >=
		  precedence(token) &&
		  operatorStack[operatorStack.length - 1] !== "("
		) {
		  const op = operatorStack.pop();
		  const operand2 = valueStack.pop();
		  const operand1 = valueStack.pop();
		  valueStack.push(operators[op](operand1, operand2));
		}
  
		operatorStack.push(token);
	  } else if (token === "(") {
		// Push opening parentheses onto the operator stack
		operatorStack.push(token);
	  } else if (token === ")") {
		// Process closing parentheses
		while (
		  operatorStack.length &&
		  operatorStack[operatorStack.length - 1] !== "("
		) {
		  const op = operatorStack.pop();
		  const operand2 = valueStack.pop();
		  const operand1 = valueStack.pop();
		  valueStack.push(operators[op](operand1, operand2));
		}
		if (
		  operatorStack.length === 0 ||
		  operatorStack[operatorStack.length - 1] !== "("
		) {
		  throw new Error("Mismatched parentheses");
		}
		operatorStack.pop(); // Remove the opening parenthesis
	  } else if (token === "=") {
		// Stop evaluation when an equal sign is encountered
		break;
	  } else {
		throw new Error("Invalid token: " + token);
	  }
	}
  
	// Handle any remaining operators on the stack
	while (operatorStack.length) {
	  const op = operatorStack.pop();
	  if (op === "=") {
		// Skip the equal sign
		continue;
	  }
	  const operand2 = valueStack.pop();
	  const operand1 = valueStack.pop();
	  valueStack.push(operators[op](operand1, operand2));
	}
  
	console.log(operatorStack);
	console.log(valueStack[0]);
  
	if (valueStack.length !== 1) {
	  // Check if the remaining elements on the value stack are operators
	  for (const token of valueStack) {
		if (!operators.hasOwnProperty(token)) {
		  throw new Error(
			"Invalid expression: too many operands or operators"
		  );
		}
	  }
	}
	document.getElementById("solution").innerHTML =
	"Solution [" + valueStack[0] + "]";
	return valueStack[0];
  }


