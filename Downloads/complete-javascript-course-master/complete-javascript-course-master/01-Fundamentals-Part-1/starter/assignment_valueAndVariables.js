/* let country = "USA";

let continent = "North America";

let populationInMillions = 334.9

console.log("Country, Continent, Population in millions:", country, continent, populationInMillions);
*/

//DataTypes

/* let firstName = "Sushanth";
let age = 24;
let isMale = true;
let haveVehicle;
let middleName = null;

console.log(firstName, age, isMale, haveVehicle, middleName); //Sushanth 24 true undefined null
console.log(typeof firstName); //  string
console.log(typeof age); // number
console.log(typeof isMale); //boolean
console.log(typeof haveVehicle); // undefined
console.log(typeof middleName); // though we get object for null it is a small bug in JS but they're not changing it because of legacy issues so just take it as null

//We can define datatypes in 3 types but mainly 2 types
*/

/*
let firstName = "Krishna"; // we can reassign
const god = "Krishna & Shiva"; // we can't change

firstName = "Jake"; // no error
god = "Rama"; //Uncaught TypeError: Assignment to constant variable.
*/

//Arthmetic operators

/*
const a = 10;
const b = 20;

let c;

console.log(c = a + b);
console.log(c = a - b);
console.log(c = a * b);
console.log(c = a / b);

console.log(2 ** 3); // 2 to the power of 3 which is 2*2*2 = 8

// Assignment operators

const fruitName = "Apple";

let howManyApples = 10;

console.log(howManyApples *= 20);
console.log(howManyApples += 100);
console.log(howManyApples++);
console.log(howManyApples--);



*/

//Comparison Operator
/*
let a = 10;
let b = 9;

console.log(a > b); // boolean output
*/

//operator precedence - Means which operator is executed first -- we can use this link : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence

// let a = 10;
// let b = 20;
// let c = a + b / 2; // here b/2 will be operated first like 20/2 because / is high compared to + or  - so to get avarage of a and b we use "( )" parenthesis which is has higher precedence than /


// Strings and Template Literals
/*
let firstName = "John";
let birthYear = 1996;
let currentYear = 2024;

let JohnId = "I'm " + firstName + ", and my age is " + (currentYear - birthYear) + " years old"; // somewhat hard to take care of  quotations like we have ot use double and also manually need to assign space etc.,
console.log(JohnId);

// multiline string

console.log("This is \n\
Multi-line \n\
String"); // we get these in multiple lines but this is hard because we need to give \n\ each and every time we need sentence on a new line... so for that we can use template literals

//Template literals

let johnNewId = `I'm ${firstName}, and my age is ${currentYear - birthYear} years old `;
console.log(johnNewId);

console.log(`This
    will be in
    a new line`); // look how easy is this 😊


*/
//If- else statements ---- BTW we can create a variable inside and if statement if we did the value will be struck inside one statement which doesn't pass to others s please create it outside of if-else statement
/*
const age = 12;

const minimumAge = age >= 18;
if (minimumAge) {
    console.log("Congrats you're a major..Do what you want 🤘");
}
else {
    console.log(`Ahem...You're not a major, I think you need ${18 - age} more years to be a major😊`);
}

*/
//Type conversion - which we do manually to convert one datatype to the other but doesnt work for undefined and null
/*
let a = "10";
let b = 15;

console.log(typeof (a + b)); // output: 1015  // with typeof it is a string

//To convert manually we can do

console.log(typeof (Number(a) + b)); // output 25 // with typeof it is a number

console.log(typeof (String(b) + a)); // output:1510 // with typeof it is a string
*/
//Type coercion - Javascript automatically converts dataypes , it makes things easy but sometimes it craetes bugs

/*
let a = 10;
let b = "20";

console.log(a + b); //1020

console.log(a - b); // outputs -10 ..as in JS + can concatenate strings and using "-" it makes them a number..lets try another example

console.log(10 + 10 - "5");// Outputs 15..reason is 10 is number so added two 10's and then we subtract with 5
console.log("10" + "10" - "1000"); // outputs 10 as 10+10 is 1010 as they are strings and that too added with "+" then we subtarct 1000 which gives us 10
*/

//Truthy and Falsy Values

//These are the 5 Falsy vales according to boolean ..... 0,"",undefined,null and NaN ...btw "false" itself is false so didn't added that
/*
const purchasedItems = 0;

if (purchasedItems) {
    console.log(`Yesss you purchased ${purchasedItems} items!!!`);
}
else {
    console.log(`seems like you didn't purchased any item`);  //output: seems like you didn't purchased any item as we kept 0 which is a falsy value
}

//another example

let purchasedTicket;
if (purchasedTicket) {
    console.log(`You purchased ${purchasedTicket} tickets!!`);
}
else {
    console.log("I think you didn't purchased any!!!"); //output: I think you didn't purchased any!!! as it is a falsy balue
}
*/

//Equality operator and different operator

//equality operator
/*
const a = 10;
//Strict euqlity operato which uses "===" means it doesnt convert String "10" to number 10 to check whether they are equal ex: if i give a="10" then we get else block printed which says "it is not 10";
if (a === 10) {
    console.log("I love 10");
}
else {
    console.log("It is not 10");
}


//Loose equality operator (TRY TO NOT USE THIS AS IT BRINGS A LOT OF BUGS SOMETIMES AS IT IS CONFUSING 🚫) It converts string to number which makes both are equal

const b = "20";

if (b == 20) {
    console.log("It is 20...woaahhhh"); //we get this as output
}
else {
    console.log("It isn't 20");
}
*/

//Prompt function
/*
prompt(`What is your favorite color???`); // which we get a popup asking what is your favorite color and ask us to enter answer and to store this we can store in variable
*/

//storing prompt
/*
const colorValue = prompt(`What is your favorite color???`);
console.log(colorValue); // shows output as green which i entered in prompt box
*/
//BTW prompt converts number to a string which is bad sometimes

//example
/*
const favoriteNumbervalue = prompt(`What is your favorite number?`);
console.log(favoriteNumbervalue); //enetred 23 in prompt

console.log(typeof favoriteNumbervalue); // string
*/
//so to converst the prompt value to number we can use manual "Number" conversion example:
/*
const favoriteNumber = Number(prompt(`What is your favorite number?`));
console.log(typeof favoriteNumber); // outpust number as it is converted using "Number"
*/

//Differentiate operator - which simply like it must not be equal
/*
let a = 10;

if (a !== 10) {
    console.log("It is not 10");
}
else {
    console.log("it is 10"); // printed this output
}
*/

//Logical operaotrs - Boolean operators as it is mostly based on true and false
/*
const hasId = true;
const above18 = true;
const heIsMajor = true;
//In AND operator if all are true then it is true if not it is false

if (hasId && above18 && heIsMajor) {
    console.log("please take the car sir!!!");
}
else if (!hasId && above18 && heIsMajor) {
    console.log("I think you can't taker car sir");
}
else {
    console.log("Bring your parents");
}


if (hasId || above18 || heIsMajor) {
    console.log(`do whatever you want to do`); // this prints een if i put two of them false as anyone statement is true then  it is true
}
    */


//Switch statement  - Not using much but better to learn if in future may be if you want to use you can
/*
const fruit = 'Apple';

switch (fruit) {
    case 'Apple':
        console.log("An Apple a day keeps the doctor away!!!");
        break;
    case 'Banana':
        console.log("NANANANA baNANA");
        break;
    case 'cherry':
        console.log("berry ... strawberry...no...cherry!!!!!");
        break;
    default:
        console.log("Please select fruits dude!!!");

}
        --------------------------------------------------------------------------------------------------------------------------------------------------
        */

//Statements and Expressions  --- Theory

//Statements are like a complete sentence but they dont present a value but they perform operations or actions like if-else and switch whereas expressions are like words that form senetence for example varaibles are expressions....he didn't gone depth to the concept but it is good to know about them and he mentioned he will go in depth on tthese topics in future
//Also statements can't be used in template literals example:

/*
const fruit = "Apple";

if (fruit === "Banana") {
    console.log("Yesss eat protein");

} else {
    console.log("dont go to gym!");

}

console.log(`I eat a ${if (fruit === "Banana") {
    console.log("Yesss eat protein");

} else {
    console.log("dont go to gym!");

}}`)   😲😲😲😲😲🤯 ... By adding "if-else" statement in template literal will give us an error

*/

//AS you can see in the above IF-ELSE is unable to use in template literal so we have ternary operator ..it is short and makes code looks clean

//Ternary Operator - This is like an expression not a statement

const age = 15;


// This is called ternary as we have 3 here one is "?" like condition and then do something and then ":" which is like else

//So the above one is like an expression so it can be in template literal

//Example

console.log(` ${age >= 18 ? "You can get your ID!!!" : "Sorry you need to wait " + (18 - age) + " more years!!!"} `); //Here i removed console.log as i got output with undefined and the reason is "console.log" does not return a meaningful value. It always returns undefined. so i removed console.log which got the output .. for refercne here is my previous code:    "${age >= 18 ? console.log("You can get your ID!!!") : console.log("Sorry you need to wait " + (18 - age) + " more years!!!")}""

//Ternary operator is good for quick decisions like if and else
