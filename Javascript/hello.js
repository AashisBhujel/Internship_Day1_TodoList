//Function declaration
function showOutput() {
  console.log('1 -> "function declaration"');
}

showOutput();

//Function declaration with parameter
function showoutput1(a, b) {
  return a + b;
}

let output1 = showoutput1(2, 3);
console.log(`output1: ${output1}`);

//Function expression

let output = function (a, b) {
  return a + b;
};

let result = output(3, 4);
console.log(result);

// Arrow Function

const subtract = (a, b) => {
  return a - b;
};

var result2 = subtract(5, 2);
console.log(result2);
