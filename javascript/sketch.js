
var w = window.innerWidth;
var h = window.innerHeight;

var shapeRect = [];

var line1 = document.getElementById("line1");
var style = window.getComputedStyle(line1, null);

var outerDiv = document.getElementById("outerDiv");
var outerDivPos = window.getComputedStyle(outerDiv, null);

var line1Cont = document.getElementById("line1Cont");
var line1ContPos = window.getComputedStyle(line1Cont, null);

// orange, yellow, pink, green
var startCol;
var malCols = ["#FF5D31", "#FFE000", "#F2B6BB", "#8CFF8C",];

var sample1;

var scrollSpeed;

window.onload = addElement;



function setup() {

	var myCanvas = createCanvas(w, h);
	myCanvas.parent('container');
	pixelDensity(1);

	// start colour
	startCol = int( random(0,4) );
	document.body.style.backgroundColor = malCols[startCol];
	document.getElementById("outerDiv").style.backgroundColor = malCols[startCol];

}


function draw(){

	clear();

	if (window.width < 700) {
		scrollSpeed = 6;
	} else {
		scrollSpeed = 17;
	}
	
	for(var i=0; i<shapeRect.length; i++){

		shapeRect[i].display();

		if(shapeRect.length > 250) {
			shapeRect.splice(0, 1);
		}
	}
}


/*
function mousePressed(){
	var b = new ShapeRect(mouseX, mouseY, random(20), random(20));
	shapeRect.push(b);
}*/

/*function touchStarted(){
	var b = new ShapeRect(mouseX, mouseY);
	shapeRect.push(b);
	return false;
}*/


function mousePressed(){
	//touchMoved();

	var rectW;
	var rectH;

	if (window.width < 700) {
		rectW = 50;
		rectH = 35;
	} else {
		rectW = 200;
		rectH = 80;
	}

	var b = new ShapeRect(mouseX, mouseY, rectW, rectH);
	shapeRect.push(b);

	for(var i=0; i<shapeRect.length; i++){
		shapeRect[i].move();
	}

	// Text move

    var tween1 = TweenMax.to(outerDiv, 0, {left:"-=" + scrollSpeed + "px"});

    // When outerDiv scrolls fully (end of logo is off screen left). Just background visible.
    // The div is animated 0 seconds back to original position plus a full screen width. Just background visible.

    if(parseInt(outerDiv.style.left) < -outerDiv.offsetWidth ) {
        TweenMax.to(outerDiv, 0, {left:'0vw'});

        // change colour
        startCol++;
        if(startCol > 3) {
        	startCol = 0;
        }

		document.body.style.backgroundColor = malCols[startCol];
		document.getElementById("outerDiv").style.backgroundColor = malCols[startCol];

		// Clear the shapes
		shapeRect = [];

		// Mal animation. Colour screen and MAL letters
		addElement();
    }
	
	return false;
}



// Mouse/Touch down


function touchMoved(){

	var rectW;
	var rectH;

	if (window.width < 700) {
		rectW = 50;
		rectH = 35;
	} else {
		rectW = 200;
		rectH = 80;
	}


	var b = new ShapeRect(mouseX, mouseY, rectW, rectH);
	shapeRect.push(b);

	for(var i=0; i<shapeRect.length; i++){
		shapeRect[i].move();
	}

	// Text move

    var tween1 = TweenMax.to(outerDiv, 0, {left:"-=" + scrollSpeed + "px"});

    // When outerDiv scrolls fully (end of logo is off screen left). Just background visible.
    // The div is animated 0 seconds back to original position plus a full screen width. Just background visible.

    if(parseInt(outerDiv.style.left) < -outerDiv.offsetWidth ) {
        TweenMax.to(outerDiv, 0, {left:'0vw'});

        // change colour
        startCol++;
        if(startCol > 3) {
        	startCol = 0;
        }

		document.body.style.backgroundColor = malCols[startCol];
		document.getElementById("outerDiv").style.backgroundColor = malCols[startCol];

		// Clear the shapes
		shapeRect = [];

		// Mal animation. Colour screen and MAL letters
		addElement();
    }
	
	return false;

}






// Triggers M A L animation

function addElement () { 

	// Create background div
    var newDiv = document.createElement("div"); 
    newDiv.style.position = 'absolute';
    newDiv.style.height = "100%";
    newDiv.style.width = "100%";
    newDiv.style.backgroundColor = malCols[startCol];

  	var currentDiv = document.getElementById("contact"); 
  	document.body.insertBefore(newDiv, currentDiv); 

	// M A L letter animation
  	var letterM = document.getElementById("letterM"); 
  	letterM.style.left = random(0, 75) + "%";
  	letterM.style.top = random(0, 60) + "%";

  	var letterA = document.getElementById("letterA"); 
  	letterA.style.left = random(0, 75) + "%";
  	letterA.style.top = random(0, 60) + "%";

  	var letterL = document.getElementById("letterL"); 
  	letterL.style.left = random(0, 75) + "%";
  	letterL.style.top = random(0, 60) + "%";


	var tl = new TimelineMax({ onComplete: deleteDiv});

	/*if (window.width < 700) {*/
		
    	tl.fromTo(letterM, 0, {opacity:0.0}, {opacity:1.0})
		tl.fromTo(letterM, 0, {opacity:1.0}, {opacity:0.0}, 0.3)
		tl.fromTo(letterA, 0, {opacity:0.0}, {opacity:1.0}, 0.3)
		tl.fromTo(letterA, 0, {opacity:1.0}, {opacity:0.0}, 0.5)
		tl.fromTo(letterL, 0, {opacity:0.0}, {opacity:1.0}, 0.5)
		tl.fromTo(letterL, 0, {opacity:1.0}, {opacity:0.0}, 0.8);
		
	//Delete background div
	function deleteDiv(){
		setTimeout(function(){ newDiv.remove(); }, 50);
		shapeRect = [];
	  	TweenMax.to(outerDiv, 0, {left:'0vw'});

	}

}


//  Resize window  

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



//  Shape object

function ShapeRect(x, y, _rectW, _rectH){
	this.x = x;
	this.y = y;
	this.w = _rectW
	this.h = _rectH;

	this.display = function(){
		noStroke();
		rectMode(CENTER); 
		fill(0, 0, 0);
		rect(this.x, this.y, this.w, this.h);
	}

	this.move = function(){
		this.x-=scrollSpeed;
	}
}





