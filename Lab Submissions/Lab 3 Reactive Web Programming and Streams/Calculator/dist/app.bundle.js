/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var buttons = document.querySelectorAll(".flex-item");
var screen = document.querySelector("input[type=text]");

const button_values = [];

//Initalises the button values
for (let i = 0; i < buttons.length; i++) {
  button_values[i] = buttons[i].innerHTML;
}

//Adds on click events
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(val) {
    runOperation(this.innerHTML);
  }
}

//Adds on button press events
document.onkeypress = function(val) {
  var userInput = String.fromCharCode(val.keyCode);

  if (button_values.indexOf(userInput) > -1) {
    runOperation(userInput);
  }
}

function runOperation(btnValue) {
  var valueOnScreen = screen.value;
  
  if(btnValue == "C") {
      screen.value = '';
    }
  else if (btnValue == "±"){
      screen.value = parseInt(screen.value) * -1;
  }
  else if(btnValue == "=") {
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
  }
  else {
    screen.value += btnValue;
  }
}

/***/ })
/******/ ]);