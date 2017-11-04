import {Observable} from 'rxjs/Rx';
import '../css/style.css';

//Handles the buttons and timer
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");
const splitList = document.getElementById("splits-list");

var counter = {state: 'INACTIVE', m: 0, s: 0, ms: 0};

function counterStr() {
  let min = counter.m.toString();
  let sec = counter.s.toString();
  let mils = counter.ms.toString();

  if (min.length === 1)
    min = "0" + min;
  if (sec.length === 1)
    sec = "0" + sec
  if (mils.length === 1)
    mils = "0" + mils

  return (min + ':' + sec + ':' + mils);
}

const startBtn$ = Observable.fromEvent(startBtn, 'click');
startBtn$.map(start).subscribe();
const stopBtn$ = Observable.fromEvent(stopBtn, 'click');
stopBtn$.map(stop).subscribe();
const splitBtn$ = Observable.fromEvent(splitBtn, 'click');
splitBtn$.map(split).subscribe();
const resetBtn$ = Observable.fromEvent(resetBtn, 'click');
resetBtn$.map(reset).subscribe();

function start() {
  counter.state = 'ACTIVE';
}

function stop() {
  counter.state = 'INACTIVE';
}

function split() {
	let newRepoItem = document.createElement("li");
	splitList.appendChild(newRepoItem);
	
	let pos = newRepoItem.parentNode.childElementCount;
	newRepoItem.innerHTML = pos + ': ' + counterStr();
}

function reset() {
	counter.state = 'INACTIVE';
	counter. m = 0;
	counter.s = 0;
	counter.ms = 0;

	var firstChild = splitList.firstChild;

	while (firstChild) {
		splitList.removeChild(firstChild);
		firstChild = splitList.firstChild;
	}
}

const timer$ = Observable.interval(10)
  .map(function incr() {
	switch(counter.state) {
		case 'ACTIVE':
		splitBtn.disabled = false;

		counter.ms++;

		if(counter.ms >= 100) {
			counter.ms = 0;
			counter.s++;
		}

		if(counter.s >= 60) {
			counter.s = 0;
            counter.m++;
		}
		break;
			
        case 'INACTIVE':
			splitBtn.disabled = true;
			break;
		}
	}
);

timer$.subscribe(function(){
	display.value = counterStr();
	showClock();
});

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function showClock() {
	let radius = (canvas.height / 2)-20;
	let angle;
	let handLength = 250;
	let centerPointX = canvas.width / 2;
	let centerPointY = canvas.height / 2;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawClockFace();
	drawSeconds();
	drawMinutes();
	
	function drawClockFace() {
		ctx.beginPath();
		ctx.arc(centerPointX, centerPointY, radius, 0, Math.PI * 2);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
		for(var i = 0; i < 12; i++){
			angle = (i-3) * (Math.PI * 2) / 12;
			ctx.beginPath();
			
			var x1 = centerPointX + Math.cos(angle) * (handLength);
			var y1 = centerPointY + Math.sin(angle) * (handLength);
			var x2 = centerPointX + Math.cos(angle) * (handLength - (handLength / 9));
			var y2 = centerPointY + Math.sin(angle) * (handLength - (handLength / 9));
			
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);

			ctx.strokeStyle = 'black';
			ctx.stroke();
		}
		
		for(var i = 0; i < 60; i++){
			angle = (i) * (Math.PI * 2) / 60;
			ctx.beginPath();
			ctx.lineWidth = .5;
			
			
			var x1 = centerPointX + Math.cos(angle) * (handLength);
			var y1 = centerPointY + Math.sin(angle) * (handLength);
			var x2 = centerPointX + Math.cos(angle) * (handLength - (handLength / 30));
			var y2 = centerPointY + Math.sin(angle) * (handLength - (handLength / 30));
			
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			
			ctx.strokeStyle = 'red';
			ctx.stroke();
		}
	}
	
	function drawSeconds() {
		angle = ((Math.PI * 2) * (counter.s / 60)) - ((Math.PI * 2) / 4);
		ctx.lineWidth = 0.5;

		ctx.beginPath();
		ctx.moveTo(centerPointX, centerPointY);
		ctx.lineTo((centerPointX + Math.cos(angle) * handLength / 1.2),
			centerPointY + Math.sin(angle) * handLength / 1.2);

		ctx.strokeStyle = 'blue';
		ctx.stroke();
	}

	function drawMinutes() {
		angle = ((Math.PI * 2) * (counter.m / 60)) - ((Math.PI * 2) / 4);
		ctx.lineWidth = 1.5;

		ctx.beginPath();
		ctx.moveTo(centerPointX, centerPointY);
		ctx.lineTo((centerPointX + Math.cos(angle) * handLength / 1.5),
			centerPointY + Math.sin(angle) * handLength / 1.5);

		ctx.strokeStyle = 'grey';
		ctx.stroke();
	}
}