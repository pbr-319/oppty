// 1. Default Parameters (simple function)
function add1(a, b, c) {
    return a + b + c;
}
let result = add1(5, 10, 15);
document.getElementById("Default").innerHTML = result;


// 2. Named Function
function devil() {
    return "I am BhargavaReddy from Kadapa";
}
document.getElementById("Named-function").innerHTML = devil();


// 3. Anonymous Function
const evil1 = function () {
    return "Welcome to Anonymous Function in JavaScript";
};
document.getElementById("Anonomous-function").innerHTML = evil1();


// 4. Function Expression
const sub = function (a, b, c) {
    return a - b - c;
};
document.getElementById("Function-Expression").innerHTML = sub(20, 10, 5);


// 5. Arrow Function
const square = r => r * r;
document.getElementById("Arrow-Function").innerHTML = square(10);


// 6. IIFE (Immediately Invoked Function Expression)
let red = (function () {
    return function (name) {
        return "Welcome, " + name;
    };
})();
document.getElementById("IIFE").innerHTML = red("JavaScript");


// 7. Callback Function
function blue(name, callback) {
    const message = "Welcome, " + name;
    callback(message);
}
blue("BhargavaReddy", function (message) {
    document.getElementById("Callback-Function").innerHTML = message;
});


// 8. Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getInfo = function () {
    return "Name: " + this.name + ", Age: " + this.age;
};
const person = new Person("Hercules", 120);
document.getElementById("Constructor-Function").innerHTML = person.getInfo();


// 9. Async Function
function getMessage() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("HTML & CSS Training Completed, JavaScript in Progress");
        }, 2000);
    });
}
async function showMessage() {
    const msg = await getMessage();
    document.getElementById("Async-Function").innerHTML = msg;
}
showMessage();


// 10. Generator Function
function* counter(n) {
    let j = 1;
    while (j <= n) {
        yield j++;
    }
}
const values = [...counter(10)];
document.getElementById("Generator-Function").innerHTML =
    "Generated: " + values.join(", ");


// 11. Recursive Function
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
document.getElementById("Recursive-Function").innerHTML =
    "factorial(10) = " + factorial(10);


// 12. Higher-Order Function
function operate(a, b, fn) {
    return fn(a, b);
}
function makeMultiplier(n) {
    return function (x) {
        return n * x;
    };
}
const sum = operate(10, 15, (a, b) => a + b);
const triple = makeMultiplier(3);
document.getElementById("High-Order-Function").innerHTML =
    "Sum: " + sum + " | Tripled: " + triple(4);


// 13. Nested Function
function outerFun(a) {
    function innerFun(b) {
        return a + b;
    }
    return innerFun;
}
const addTen = outerFun(10);
document.getElementById("Nested-Function").innerHTML =
    "Addition = " + addTen(5);


// 14. Pure Function
function pureAdd(a, b) {
    return a + b;
}
document.getElementById("Pure-Function").innerHTML =
    "Pure add(10, 5) = " + pureAdd(10, 5);


// 15. Default Parameter Function
function greet(name = "Reddy", greeting = "Welcome") {
    return `${greeting}, ${name}!`;
}
document.getElementById("Default-Parameter").innerHTML =
    `${greet()} // ${greet("Walton")} // ${greet("Roman Reigns")}`;


// 16. Rest Parameter Function
function sumAll(...nums) {
    return nums.reduce((t, n) => t + n, 0);
}
document.getElementById("Rest-Prameter-Function").innerHTML =
    `sumAll(100,200,300,400,500) = ${sumAll(100, 200, 300, 400, 500)}`;

