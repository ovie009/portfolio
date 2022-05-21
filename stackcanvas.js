let stackCanvas = document.querySelector("#stack-canvas");
// get 2d context
let ctx2 = stackCanvas.getContext("2d");
// set canvas width and height

let sizeGuide = document.querySelector("#canvas-size-guide");

// set width and height of the canvas
stackCanvas.width = window.innerWidth - 10; 
stackCanvas.height = window.innerHeight - 220;

if (window.innerWidth >= 1000) {
    stackCanvas.width = sizeGuide.clientWidth + 20; 
    stackCanvas.height = sizeGuide.clientHeight + 25;
}

if (window.innerHeight < 500) {
    stackCanvas.height = 2 * sizeGuide.clientHeight + 25;
}

// get cookie
let lastCookie = getCookie("themeColor");

// width of the stack canvas
let scw = stackCanvas.width;
// height of the stack canvas
let sch = stackCanvas.height;

// console.log(scw);
// console.log(sch);

// array storing all the stack text
let  myStack = [
    "HTML",
    "JavaScript",
    "CSS",
    "PHP",
    "SCSS",
    "BootStrap",
    "SQL",
    "Figma",
    "Arduino",
    "Fritzing",
    "Graphic_Design",
    "UI/UX_Design",
    "HTML_Canvas",
    "AJAX",
    "JQuery",
    "MySQL",
    "PhpMyAdmin"
]

// adding 50 blank balls to stack array
for (let i = 0; i < 40; i++) {
    myStack.push("blank");
}

// color array storing the theme colors for the balls
let colorArray = [
    "#2C2C2C",
    "#262626",
    "#595959",
    "#737373",
    "#A6A6A6",
    "#F2F2F2",
    "#F8F8F8"
]

// utility functions for the collision fo the balls
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
*/

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
*/

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }

}

// function to get distance between two balls
function distanceBetween(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// array to store all the stack ball object
let stackArray = [];

// function that initializes the stack object 
function initStack() {
    // stackArray = [];

    let fontSize = 10; // set font size
    let minBall = 32;
    let maxBall = 42;
    let minBlank = 2;
    let maxBlank = 8;
    let responsiveFactor = 1; // variable to increase font size for bigger screens
    if (scw >= 820) {
        responsiveFactor = 1.5;
        // adding 20 blank balls to stack array
        for (let i = 0; i < 20; i++) {
            myStack.push("blank");
        }
    } else if (scw >= 1000) {
        responsiveFactor = 1.5;
        for (let i = 0; i < 40; i++) {
            myStack.push("blank");
        }
    }

    fontSize = fontSize * responsiveFactor; // set font size
    maxBlank = maxBlank * responsiveFactor;
    minBall = minBall * responsiveFactor;
    maxBall = maxBall * responsiveFactor;

    minBlank = minBlank * responsiveFactor;

    // variable to select number of stackballs = number of elements in myStack array
    let numberOfStackBalls = myStack.length;
    for (let i = 0; i < numberOfStackBalls; i++) {
        let text = myStack[i]; //select stack text
        let fontFace='poppins'; // set font family
        // let lineHeight=parseInt(fontSize*1.286); // get line height
        let words = text.split('_'); // split two words text where '_' appears and store the resulting array in words variable
        let numberOfWords = words.length; // get the number of words in words array
        let wordWidths=[]; // array to store the width of each word in the words array
        for(let i=0;i<words.length;i++){ wordWidths.push(ctx2.measureText(words[i]).width * responsiveFactor); } // store word width in wordWidths array
        let radius; // declare radius variable, which determines the radius of the balls
        // setting the radius of the ball around "PhpMyAdmin" manually 
        //because the code to auto generate the radius wasnt making the ball big enough
        if (text == "PhpMyAdmin") {
            // large cirlce 
            radius = 42;
            if (scw >= 820) {
                radius = 84;
            }
        } else if (text == "blank"){ // if text is "blank" generate radius of smaller sizes
            // small circle
            radius = randomInteger(minBlank, maxBlank);
        }else{ // else auto generate the radius for everything else
            radius = randomFloat(minBall, maxBall); // first of all, auto generate a non integer radius between 3minBlank maxBlank 42
            wordWidths.forEach(width => {
                // if wordWidths is creater than diameter of the ball, increase the radius by 15px more than the wordWidth
                if (width > (2*radius - 5)) {
                    radius = width/2 + 15;
                }
            });
            
        }
        // generating random values for each of the properties of the snow ball
        // generating random x position within the canvas width, taking the radius of the ball into account
        let x = randomInteger(radius, scw - radius);
        // generating random y position within the canvas width, taking the radius of the ball into account
        let y = randomInteger(radius, sch - radius);
        // generating random speed in both x and y direction between -0.9 and 0.9
        let dx = randomFloat(-0.9, 0.9);
        let dy = randomFloat(-0.9, 0.9);
        let velocity = {
            x: dx,
            y: dy
        }

        // type of balls to be displayed in the canvas, stroke and fill
        // stroke balls have a stroke around the diameter
        // fill has a solid color fill
        // the type of ball would be selected from this array at random
        //  at a ration of 4:1 in favour of the stroke
        let typeArray = [
            "stroke",
            "stroke",
            "fill",
            "stroke",
            "stroke"
        ];

        // select ball type
        let type = typeArray[randomInteger(0, 4)]

        // select defaul colours
        let fontColor = colorArray[6]; // lightest colour in the array as font colour
        let ballStroke = colorArray[randomInteger(0, 3)]; // select any colour from the 4 darkest colour as stroke color
        let ballFill = ballStroke; // let stroke colour be equall to fill colour

        // set colours for dark theme, if darktheme is set in cookie when the poge loads
        if ( getCookie("themeColor") !== "light" ) {
            fontColor = colorArray[0]; // darkest colors in the array as font colour
            ballStroke = colorArray[randomInteger(3, 6)]; // select any colour from the 4 lightest colour as stroke color
            ballFill = ballStroke; // let stroke colour be equall to fill colour
        }

        let mass = 1;
        // set mass of ball, useful for elastic collision function
        
        // function to check if the new ball is spawned on top of another ball
        // if it is generate new position for x and y
        if (i != 0) {
            for (let j = 0; j < stackArray.length; j++) {
                if ( distanceBetween(x, stackArray[j].x, y, stackArray[j].y) < radius + stackArray[j].radius ) {
                    x = randomInteger(radius, scw - radius);
                    y = randomInteger(radius, sch - radius);
                    j = -1;
                }
            }
        }
        // push into stack array
        stackArray.push(new Stack(x, y, velocity, mass, radius, type, ballFill, ballStroke, fontColor, fontSize, fontFace, numberOfWords, words, wordWidths));
    }
}

let gravity = 0.03;
let friction = 0.9;

// stack object
function Stack(x, y, velocity, mass, radius, type, ballFill, ballStroke, fontColor, fontSize, fontFace, numberOfWords, words, wordWidths) {
    this.x = x; // x coordinate of the snow ball
    this.y = y; // y coordinate of the snow ball
    this.velocity = { // velocity of snow ball
        x: velocity.x,
        y: velocity.y
    }
    // this.velocity.x = velocity.x; // velocity in x dorection of the snow ball
    // this.velocity.y = velocity.y; // velocity in x dorection of the snow ball
    this.radius = radius; // radius of the snow ball
    this.type = type;
    this.ballFill = ballFill; // color of the snow ball
    this.ballStroke = ballStroke; // color of the snow ball
    this.fontColor = fontColor; // font color of the snow ball
    this.fontSize = fontSize; // font size
    this.fontFace = fontFace; // font family
    this.fontFace = fontFace; // font family
    this.numberOfWords = numberOfWords; // font family
    this.words = words; // words in my stack
    this.wordWidths = wordWidths; // word widths
    this.gravity = gravity; // gravity
    this.friction = friction; // friction
    this.mass = mass; // mass

    // function to draw ths snow ball
    this.draw = function(){
        ctx2.font = this.fontSize+'px '+this.fontFace; //set font property
        ctx2.beginPath(); // beginn draw path
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // draw arc
        ctx2.closePath(); // close path
        ctx2.lineWidth = 2; //set linewidth
        // set properties for balls with fill type
        if (this.type === "fill") { 
            ctx2.fillStyle = this.ballFill; // ball fill color
            ctx2.strokeStyle = this.ballStroke; // ball stroke colour
            ctx2.fill(); // fill ball
            ctx2.stroke(); // stroke ball
            ctx2.fillStyle = this.fontColor; // font color to write the text with
        } else if (this.type === "stroke") { // set properties for balls with stroke type
            ctx2.strokeStyle = this.ballStroke; // stroke colour
            ctx2.stroke(); // stroke ball
            ctx2.fillStyle = this.ballStroke; // font color to write the text with
        }
            
        ctx2.textBaseline = "center"; // set text position
        if ( this.numberOfWords === 1 ) { // text placement in the ball if it has only 1 word
            
            for (let i = 0; i < this.words.length; i++) { //looping through the number of words for redundacy, already know its 1
                let textY = this.y + this.fontSize/4; // y position of the text
                let textX = this.x - 2 - this.wordWidths[i]/2; // x position of the text
                
                // if the word isn't "blank", fillText
                if (this.words[i] != "blank") {
                    ctx2.fillText(this.words[i], textX, textY);
                }
                
            }
            
        } else if ( this.numberOfWords === 2 ){ // text placement of the ball if it has 2 words
            let textY = this.y - this.fontSize/4; // y position of the text
            for (let i = 0; i < this.words.length; i++) {
                let textX = this.x - 2 - this.wordWidths[i]/2;
                ctx2.fillText(this.words[i], textX, textY);
                textY = textY + 16;
            }
        }

    }
    
    // function to update the new position of the snow ball in according to the velocities
    this.update =  function(stackArray) {
        
        // console.log(stackArray[2]);
        for (let i = 0; i < stackArray.length; i++) {
            //prevent this ball from checking if it's touching itself
            if (this === stackArray[i]) continue; 
            // check if two balls have touched
            if ( distanceBetween(this.x, stackArray[i].x, this.y, stackArray[i].y) < radius + stackArray[i].radius ) {
                // console.log("has collided");
                
                // generate new velocity direction, due to elastic collison
                resolveCollision(this, stackArray[i]);

                //if two balls collide and they're not of the same type, swap their types
                if (this.type !== stackArray[i].type) {
                    if (this.type == 'fill') {
                        this.type = 'stroke';
                        stackArray[i].type = 'fill';
                    } else {
                        this.type = 'fill';
                        stackArray[i].type = 'stroke';
                    }
                }
            }
        }

        // checking if the snowball is still within the screen width
        if (this.x + this.radius > (scw - this.radius)|| this.x < radius) {
            this.velocity.x = -this.velocity.x;
        }
        
        // checking if the snowball is still within the screen height
        if (this.y + this.radius > sch || this.y < this.radius ) {
            // this.velocity.y = -this.velocity.y * this.friction;
            this.velocity.y = -this.velocity.y;
        } else {
            // this.velocity.y += this.gravity;
        }
        
        // incresing x coordinate by the speed in the x direction, dx
        this.x += this.velocity.x; 
        // incresing y coordinate by the speed in the y direction, dy
        this.y += this.velocity.y;

        // draw the ball in its new position
        this.draw();

    }
}

// animate canvas function
function animateStack() {
    if(!doStackAnim){
        ctx2 = stackCanvas.getContext("2d");
        ctx2.clearRect(0, 0, cw, ch);
        ctx2=null; 
        return console.log(doStackAnim);
    }
    console.log(doStackAnim);
    requestAnimationFrame(animateStack); //run animateStack function till infinity
    // clear canvas to give illusion of movement
    ctx2.clearRect(0, 0, scw, sch);
    
    // console.log(stackArray);
    // update each of the object in the stack array
    stackArray.forEach(stack => {
        stack.update(stackArray);
        // console.log('stack animating');
    });
}


let stackWrapper = document.querySelector(".stack-contact-wrapper");
// console.log({ stackWrapper })

let doStackAnim = false;
let stackAnimationInView = false;
// scroll event listenner
// this event listener would be used stop and start animations 
// depending on if they're in the view port 
document.addEventListener('scroll', function (e) {
    // scroll height
    // console.log(scrollHeight)
    // console.log(snowArray)
    scrollHeight = window.scrollY;
    if (scrollHeight < stackWrapper.offsetTop - 1000) {
        doStackAnim = false;
        stackAnimationInView = false;
    } else {
        if (!stackAnimationInView) {
            ctx2 = stackCanvas.getContext("2d");
            doStackAnim=true;
            animateStack();
            stackAnimationInView = true;
        }
    }
    
    // return scrollHeight;
});

// delay the time the animation starts by 1.5 seconds
window.onload = setTimeout(() => {
    initStack();
    animateStack();
}, 3000);

// onscreen resize restart canvas animation and resize the canvas
// document.addEventListener("resize", function () {
//     // first stop animation if canvas is in view
//     scrollHeight = window.scrollY;
//     if (scrollHeight > stackWrapper.offsetTop - 1000) {
//         doStackAnim = false;
//         stackAnimationInView = false;
//     }


//     sizeGuide = document.querySelector("#canvas-size-guide");

//     // reset width and height of the canvas
//     stackCanvas.width = window.innerWidth - 10; 
//     stackCanvas.height = window.innerHeight - 220;

//     if (window.innerWidth >= 1000) {
//         stackCanvas.width = sizeGuide.clientWidth + 20; 
//         stackCanvas.height = sizeGuide.clientHeight + 25;
//     }

        
//     if (window.innerHeight < 500) {
//         stackCanvas.height = 2 * sizeGuide.clientHeight + 25;
//     }

//     // restart animation of stack canvas after 1 second
//     setTimeout(() => {
//         if (scrollHeight > stackWrapper.offsetTop - 1000) {
//             if (!stackAnimationInView) {
//                 ctx2 = stackCanvas.getContext("2d");
//                 doStackAnim=true;
//                 animateStack();
//                 stackAnimationInView = true;
//             }
//         }
//     }, 1000);
// });
