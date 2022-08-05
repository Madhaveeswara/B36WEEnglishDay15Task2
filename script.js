// Array of calculator elements which are used to render the calculator on the page
const calculatorControlsNumbers = [
    [7,8,9,'+'],
    [6,5,4,'-'],
    [1,2,3,'*'],
    [0,'=','/','%'],
    ['C']
    ];
let bufferVariable = '';


//A class to convert the infix to postfix string in order to evaluate the user input
//string to accurately calculate the final result.
class InfixToPostfix {

    //Private variables 
    #stackArray = [];
    #top = -1;
    #infixExpression = "";

    constructor(infixVal){
        this.#infixExpression = infixVal;
        console.log("this.#infixExpression",this.#infixExpression);
    }

    push(data) {
        this.#top++;
        this.#stackArray.push(data);
    }

    // Pop function for returning top element
   pop() {
    if (this.#top == -1)
        return 0;
    else {
        let popElement = this.#stackArray.pop();
        this.#top = this.#top - 1;
        return popElement;
    }

   }

   isOperator(op) {
        
    if (op === '+' || op === '-' ||
        op === '*' || op ==='/' || 
        op === '%') {
        return true;
    }
    else return false;

   }

   getPrecedency(pre) {
    if (pre === '@') {
        return 1;
    }
    else if (pre === '+' || pre === '-') {
        return 2;
    }
    else if (pre === '/' || pre === '*' || pre === '%') {
        return 3;
    }
    else
        return 0;
    }


    // Function to convert Infix to Postfix
   InfixtoPostfix() {

    console.log(" ***********   InfixToPostfix   *********** ");
 
    // Postfix array created
    var postfix = [];
    var temp = 0;
    this.push('@');

    let infixval = this.#infixExpression.split(" ");
 
    // Iterate on infix string
    for (var i = 0; i < infixval.length; i++) {
        console.log("i",i);
        console.log("infixval[i]", infixval[i]);
        var el = infixval[i];
 
        console.log("Operator Stack ",this.#stackArray);
        console.log("PostFix",postfix);

        // Checking whether operator or not
        if (this.isOperator(el)) {
            
                       
            if (this.getPrecedency(el) > this.getPrecedency(this.#stackArray[this.#top])) {
                this.push(el);
            }
            else {
                while (this.getPrecedency(el) <=
                this.getPrecedency(this.#stackArray[this.#top]) && this.#top > -1) {
                    postfix[temp++] = this.pop();
                }
                this.push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }
    }
 
    // Adding character until stackarr[topp] is @
    while (this.#stackArray[this.#top] != '@') {
        postfix[temp++] = this.pop();
    }
 
    // String to store postfix expression
    let finalStr = "";

    for (let i = 0; i < postfix.length; i++){
       

        if(i+1 === postfix.length) {
            finalStr += postfix[i];
        } else {
            finalStr += postfix[i]+" ";
        }
    }
     
    return finalStr;
   
   }



}

// Evaluate the POSTfix string to do the final calculation.
function evaluatePostfixExpression(expression) {
const stackVar = [];
let res = 0;
let top = -1;
const expressionArr = expression.split(' ');
console.log(" ***********   evaluatePostfixExpression   *********** ",expressionArr);
expressionArr.forEach((ele) => {
    console.log(" stackVar ", stackVar);
    switch(ele) {
         case "+":
             res = (stackVar[top-1] + stackVar[top]); top -= 1; stackVar.pop(); stackVar.pop(); stackVar.push(res);
            break;
        case "-":
             res = (stackVar[top-1] - stackVar[top]); top -= 1; stackVar.pop(); stackVar.pop(); stackVar.push(res);
            break;   
        case "*":
            res = (stackVar[top-1] * stackVar[top]); top -= 1; stackVar.pop(); stackVar.pop(); stackVar.push(res);
            break;
        case "/":
            res = (stackVar[top-1] / stackVar[top]); top -= 1; stackVar.pop(); stackVar.pop(); stackVar.push(res);
            break; 
        case "%":
                res = (stackVar[top-1] % stackVar[top]); top -= 1; stackVar.pop(); stackVar.pop(); stackVar.push(res);
                break;             
        default:
            stackVar.push(parseInt(ele));  top++;                 
     }
 })

 //console.log(" stackVar ", stackVar);
 return stackVar.pop();

}


//Check the value is operator or not
function isOperator(op){
    return (op === '+' || op === '-' || op === '*' || op === '/' || op === '%');
}  


// Button click handler
function buttonHandler(event){


    let outputElement = document.getElementById("output-para");
    let inputElement = document.getElementById("result");
    outputElement.innerText = event.target.innerText;
  
    
    if(event.target.innerText === 'C'){
        bufferVariable = "";
        outputElement.innerText = 0;
        inputElement.setAttribute("value","0");

    } else if (event.target.innerText === '='){

        let infixToPostfixObj = new InfixToPostfix(bufferVariable);
        let postfixVal = infixToPostfixObj.InfixtoPostfix();

        let result = evaluatePostfixExpression(postfixVal);
        console.log("Result ",result);
        if(isNaN(result)) result = 0;
        outputElement.innerText = bufferVariable + " "+event.target.innerText+" ";
        bufferVariable = "";
        inputElement.setAttribute("value",result);
        
    } else {


            if(!isOperator(event.target.innerText)){
                bufferVariable += event.target.innerText;
            } else {
                bufferVariable += " "+event.target.innerText+" ";
            } 
            outputElement.innerText = bufferVariable;
    }

    
}


//Keyboard Press Handler
function keyPressHandler(event){

console.log(" *********** keyPressHandler() ************* ")
    console.log(event);
    //console.log(event.target);


    if(isNaN(event.key) && !isOperator(event.key) && event.key !== "="){
        alert("Only numbers are allowed");
        return 0;
    }

    let outputElement = document.getElementById("output-para");
    let inputElement = document.getElementById("result");
    outputElement.innerText = event.key;
  
    
    if(event.key === 'C'){
        bufferVariable = "";
        outputElement.innerText = 0;
        inputElement.setAttribute("value","0");

    } else if (event.key === '='){

        let infixToPostfixObj = new InfixToPostfix(bufferVariable);
        let postfixVal = infixToPostfixObj.InfixtoPostfix();

        let result = evaluatePostfixExpression(postfixVal);
        console.log("Result ",result);
        if(isNaN(result)) result = 0;
        outputElement.innerText = bufferVariable + " "+event.key+" ";
        bufferVariable = "";
        inputElement.setAttribute("value",result);
        
    } else {


            if(!isOperator(event.key)){
                bufferVariable += event.key;
            } else {
                bufferVariable += " "+event.key+" ";
            } 
            outputElement.innerText = bufferVariable;
    }

    
}


//A function to initialize the layout of the page.
function initialize(){

    // Title
    let h1Element = document.createElement("h1");
    h1Element.setAttribute("id","title");
    h1Element.innerText = "Amazing Calculator";
 
    //Description
    let pElement = document.createElement("p");
    pElement.setAttribute("id","description");
    pElement.innerText = "This is an amazing calculator to do simple scientific arithmetic operations";

    document.body.append(h1Element,pElement);


    // <div id="main-container" class="container bg-info">
    // <br/>
    // <br/>
    // <span class="right-to-left-text">
    //     <p id="output-para"></p>
    // </span>
    //  <input class="right-to-left-text" type="text" id="result"/>
    //  <div id="button-layout"></div>
    // </div>

     //Creating the main div which contains everything.
     let mainDiv = document.createElement("div");
     mainDiv.setAttribute("id","main-container");
     mainDiv.setAttribute("class","container bg-info");

     document.body.append(mainDiv);

     let breakElement1 = document.createElement("br");

     let breakElement2 = document.createElement("br");
     
     let spanElement = document.createElement("span");
     spanElement.setAttribute("class","right-to-left-text");
     let paraElement = document.createElement("p");
     paraElement.setAttribute("id","output-para");
     
     spanElement.appendChild(paraElement);

     let inputEle = document.createElement("input");
     inputEle.setAttribute("id","result");
     inputEle.setAttribute("class","right-to-left-text");
     inputEle.setAttribute("type","text");

     let divButtonLayout = document.createElement("div");
     divButtonLayout.setAttribute("id","button-layout");

     mainDiv.append(breakElement1,breakElement2,spanElement,inputEle,divButtonLayout);

    let buttonLayoutDiv = document.getElementById("button-layout");
    console.log("buttonLayoutDiv",buttonLayoutDiv);

    //Rendering the calculator number and controls.
    calculatorControlsNumbers.forEach((arrayObj) => {

           //console.log(" arrayObj ",arrayObj);
        
        for(let j = 0; j < arrayObj.length; j++) {

        let buttonElement = document.createElement("button");
        buttonElement.setAttribute("value",""+arrayObj[j]);
        
        if(arrayObj[j] === 'C') {
            buttonElement.setAttribute("id","clear");   
        } else if(arrayObj[j] === '='){
            buttonElement.setAttribute("id","equal"); 
        } else if(arrayObj[j] === '+'){
            buttonElement.setAttribute("id","add"); 
        } else if(arrayObj[j] === '-'){
            buttonElement.setAttribute("id","subtract"); 
        } else {
            buttonElement.setAttribute("id",""+arrayObj[j]);
        }

        buttonLayoutDiv.appendChild(buttonElement);

        if(isOperator(arrayObj[j])){
            buttonElement.setAttribute("class","button-class btn btn-success btn-outline-info operator-class");
        }
        else if(arrayObj[j] === '='){
            buttonElement.setAttribute("class","button-class btn btn-success btn-outline-info equal-operator");
        }
        else if(arrayObj[j] === 'C'){
            buttonElement.setAttribute("class","button-class btn btn-success btn-outline-info clear-operator");
        } else {
            buttonElement.setAttribute("class","button-class btn btn-dark btn-outline-info"); 
        }
        buttonElement.setAttribute("type","button");
        buttonElement.innerText = ""+arrayObj[j];

        //Adding button click listener
        buttonElement.addEventListener('click',buttonHandler);
        
        buttonLayoutDiv.appendChild(buttonElement);

        }

        let breakElement = document.createElement("br");
        buttonLayoutDiv.appendChild(breakElement);

        //Adding keyboard listener
        document.addEventListener('keypress',keyPressHandler);
  
    });
}


//IIFE for initializing the calculator on the page.
(function() {
     initialize();
})();