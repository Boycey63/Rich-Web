import {Observable} from 'rxjs/Rx';
import '../css/style.css';

const buttons = document.querySelectorAll(".flex-item");
const screen = document.querySelector("input[type=text]");

const buts$ = Observable.merge (
	Observable.fromEvent(buttons, 'click').subscribe(e => runOperation(e.target.innerHTML)),
	Observable.fromEvent(document, 'keyup').subscribe(e => runOperation(e.key))
)

function runOperation(btnValue) {
  var valueOnScreen = screen.value;
  
  switch(btnValue){
	case "C":
		screen.value = '';
		break;
	  
	case "±":
		screen.value = parseInt(screen.value) * -1;
		break;
	
	case "=":
		var currentEquation = valueOnScreen;
    
		//Check if multiplication symbol is in the equation
		if (currentEquation.includes("x")) {
		  //Change for evaluation purposes
		  currentEquation = currentEquation.replace(/x/g, "*");
		}
		
		//Check if divide symbol is in the equation
		if (currentEquation.includes("÷")) {
		  currentEquation = currentEquation.replace(/÷/g, "/");
		}
		
		//Evaluates what is on the screen
		screen.value = eval(currentEquation);
		break;
	default:
		screen.value += btnValue;
  }
}