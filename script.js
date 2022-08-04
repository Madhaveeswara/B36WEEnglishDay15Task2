
const calculatorControlsNumbers = [
    [7,8,9,'+'],
    [6,5,4,'-'],
    [1,2,3,'*'],
    ['C',0,'=','/']
    ];
let bufferVariable = '';


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
        
    if (op == '+' || op == '-' ||
        op == '*' || op == '/' ) {
        return true;
    }
    else return false;

   }

   getPrecedency(pre) {
    if (pre == '@') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*') {
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
        default:
            stackVar.push(parseInt(ele));  top++;                 
     }
 })

 //console.log(" stackVar ", stackVar);
 return stackVar.pop();

}


function isOperator(op){
    return (op === '+' || op === '-' || op === '*' || op === '/');
}  

function buttonHandler(event){


    let outputElement = document.getElementById("output-para");
    let inputElement = document.getElementById("calcInput");
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



function init(){

    let buttonLayoutDiv = document.getElementById("button-layout");
    console.log("buttonLayoutDiv",buttonLayoutDiv);

    
    calculatorControlsNumbers.forEach((arrayObj,index) => {

           //console.log(" arrayObj ",arrayObj);
        
        for(let j = 0; j < arrayObj.length; j++) {

        let buttonElement = document.createElement("button");
        buttonElement.setAttribute("value",""+arrayObj[j]);
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

        buttonElement.addEventListener('click',buttonHandler);
        buttonLayoutDiv.appendChild(buttonElement);

        }

        let breakElement = document.createElement("br");
        buttonLayoutDiv.appendChild(breakElement);
  
    });
}

(function() {
     init();
})();