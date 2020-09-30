
/*
   Section 1: Setup for the App
*/

//Import node modules
const mysql = require("mysql");
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "pets_db"
});

// Connect to the MySQL Db
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //runApp() runs the inquirer function
  runApp()
});

/*
    Section 2: Defining our promises
*/

/*
A promise is a way to deal with the async problem (code finishing their action after the next line of code is run). 
Promises deal with 2 main concepts resolving and rejecting. Resolving a promise lets the computer know that the data being given is the data that they want
Rejecting a promise will let the computer know that something went wrong.

General structure of a promise:

const promise = () => {
    return new Promise (function(resolve, reject){
        asyncfunction(function(data, error){ //async action
            if(error) reject(error) //will reject if error
            resolve(data)           //will resolve otherwise
        })
    })
}

*/

// Defining the readDogs promise. In this case connection.query is the async function.
// The data that is being resolved is the data from the MySQL query
// The error catches anything from "table does not exist" to other SQL based errors
const readDogs = () => {
    return new Promise (function(resolve, reject){
        connection.query("SELECT * FROM dogs", function(err, res) {
            if (err) reject(err);
            resolve(res)
          });
    })
}

//readCats is the same as readDogs but querys the dogs table instead
const readCats = () => {
    return new Promise (function(resolve, reject){
        connection.query("SELECT * FROM cats", function(err, res) { //if you want to simulate an error remove the c in cats
            if (err) reject(err);
            resolve(res)
          });
    })
}

/*
    Section 3: Chaining Promises
*/


//There are two main methods of using promises; .then()/.catch() or try/catch with async/await

//This first function readBoth uses the .then()/catch() method.

const readBoth = () => {
    readDogs().then((dogs)=>{
        //This .then has access to the dogs variable
        readCats().then((cats)=>{
            //This .then has access to the dogs and cats variables
            console.log(dogs);
            console.log(cats);
        })
        .catch((err)=>{
            //This catch is for the readCats() promise
            console.log("Oh no something went wrong in cats!!")
        });
    })
    .catch((err)=>{
        //This catch is for the readDogs() promise
        console.log("Oh no something went wrong in dogs!")
    });
    
}

//This function uses the try/catch with async/await
//Comment out the readBoth above and uncomment the readBoth below to see that they work essentially the same

// const readBoth = async () => { //Note the async here, await will not work unless you declare your function to be async

//     //All code in this try block will be tried in order. If there is an error (ie a reject happens), the code will jump to the catch block
//     try {
//         const dogs = await readDogs() //await will wait for the readDogs function to resolve or reject before continuing
//         const cats = await readCats() //cats will not be run before dogs
//         console.log(cats);
//         console.log(dogs)
//     }
//     catch (error){
//         console.log(error)
//         console.log("Oh no something went wrong in read both!")
//     }
// }

/*
    Section 4: App Logic
*/

//Now that we've defined all our promises and functions to use promises we can define our app logic

const runApp = () => {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What type of animal do you want to look at?",
        choices: ["Dogs", "Cats", "Both"]
    }]).then((answer) => {  //Note that inquirer is also a promise! We use .then to wait until the user 
                            //has input data ~~then~~ we do some more logic in this case, our switch statement
        switch(answer.menu) {
            case "Dogs":
                readDogs();
                break;
            case "Cats":
                readCats();
                break;
            case "Both":
                readBoth();
                break;
        }
    })
}


/*
    Section 6: Extra Async Examples
*/

// // Here we have two functions that each randomly will put out a console log within 5s

// const run1 = () => {
//     setTimeout(function(){
//         console.log("I am run 1!")
//     }, Math.floor( Math.random()* 5000));
// }

// const run2 = () => {
//     setTimeout(() => {
//         console.log("I am run 2!")
//     }, Math.floor( Math.random()* 5000));
// }


// // We won't be able to know if run1's console log will happen before run2
// // Hence why we need promises.
// run1();
// run2();


//Defining run1 and run 2 as promises. See Section 2 to see how this structure is defined

// const run1 = ()=> { return new Promise ((resolve, reject) => {
//     setTimeout(function(){
//         resolve("function 1 ran") //in this case there is no reject, 
//     }, Math.floor( Math.random()* 3000));
// })}

// const run2 = ()=> { return new Promise ((resolve, reject) => {
//     setTimeout(function(){
//         resolve("function 2 ran")
//     }, Math.floor( Math.random()* 3000));
// })}


// Using the then/catch method of handling promises

// run1().then((result)=>{
//     console.log(result)
//     run2().then((result2)=>{
//         console.log(result2)
//     });
// });


//Using async await

// async function runAll(){
//     try {
//         const ran1 = await run1()
//         console.log(ran1)
//         const ran2 = await run2()
//         console.log(ran2)
//         }
//     catch {
//         console.log("if an error occured this is what would catch it")  
//     }
// }

// Uncomment to test these async functions
// runAll();