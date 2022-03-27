let stackCanvas = document.querySelector("#stack-canvas");
// get 2d context
let ctx2 = stackCanvas.getContext("2d");
// set canvas width and height

let card = document.querySelector(".card");
stackCanvas.width = window.innerWidth; 
stackCanvas.height = window.innerHeight - 200;

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
    "Graphic Design",
    "UI/UX Design",
    "HTML Canvas",
    "AJAX",
    "JQuery",
    "MySQL",
    "PhpMyAdmin"
]

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
    // variable to control number of stackballs
    let numberOfStackBalls = myStack.length;
    for (let i = 0; i < numberOfStackBalls; i++) {
        let text = myStack[i];
        let fontSize=20;
        let fontFace='poppins';
        // let lineHeight=parseInt(fontSize*1.286);
        let words = text.split(' ');
        let numberOfWords = words.length;
        let wordWidths=[];
        for(let i=0;i<words.length;i++){ wordWidths.push(ctx2.measureText(words[i]).width); }

        let radius = randomFloat(30, 40);
        // if word width is creater than diameter of the ball, let radiusbe equall to 10px plus word width
        wordWidths.forEach(width => {
            if (width > 2*radius - 5) {
                radius = width/2 + 12.5;
            }
        });
        // generating random values for each of the properties of the snow ball
        let x = randomInteger(radius, scw - radius);
        let y = randomInteger(radius, sch - radius);
        let dx = randomFloat(-0.9, 0.9);
        let dy = randomFloat(-0.9, 0.9);
        let velocity = {
            x: dx,
            y: dy
        }
        let fontColor = themeColors[4];
        let ballStroke = themeColors[2];
        let ballFill = themeColors[1];
        let mass = 1;
        
        if (i != 0) {
            for (let j = 0; j < stackArray.length; j++) {
                if ( distanceBetween(x, stackArray[j].x, y, stackArray[j].y) < radius + stackArray[j].radius ) {
                    x = randomInteger(radius, scw - radius);
                    y = randomInteger(radius, sch - radius);
                    j = -1;
                }
            }
        }
        stackArray.push(new Stack(x, y, velocity, mass, radius, ballFill, ballStroke, fontColor, fontSize, fontFace, numberOfWords, words, wordWidths));
    }
}

let gravity = 0.03;
let friction = 0.9;

// stack object
function Stack(x, y, velocity, mass, radius, ballFill, ballStroke, fontColor, fontSize, fontFace, numberOfWords, words, wordWidths) {
    this.x = x; // x coordinate of the snow ball
    this.y = y; // y coordinate of the snow ball
    this.velocity = {
        x: velocity.x,
        y: velocity.y
    }
    // this.velocity.x = velocity.x; // velocity in x dorection of the snow ball
    // this.velocity.y = velocity.y; // velocity in x dorection of the snow ball
    this.radius = radius; // radius of the snow ball
    this.ballFill = ballFill; // color of the snow ball
    this.ballStroke = ballStroke; // color of the snow ball
    this.fontColor = fontColor; // font color of the snow ball
    this.fontSize = fontSize; // font size
    this.fontFace = fontFace; // font family
    this.fontFace = fontFace; // font family
    this.numberOfWords = numberOfWords; // font family
    this.words = words; // words in my stack
    this.wordWidths = wordWidths; // word widths
    this.gravity = gravity;
    this.friction = friction;
    this.mass = mass;

    // function to draw ths snow ball
    this.draw = function(){
        ctx2.font = this.fontsize+'px '+this.fontface;
        ctx2.fillStyle = this.ballFill;
        ctx2.strokeStyle = this.ballStroke;
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx2.closePath();
        ctx2.stroke();
        ctx2.fill();
        ctx2.fillStyle = this.fontColor; // font color to write the text with
        ctx2.textBaseline = "center";
        if ( this.numberOfWords === 1 ) {
            
            for (let i = 0; i < this.words.length; i++) {
                let textY = this.y + this.fontSize/4;
                let textX = this.x - this.wordWidths[i]/2;

                // console.log(textX)
                // console.log(textY)
                ctx2.fillText(this.words[i], textX, textY);
                
            }
            
        } else if ( this.numberOfWords === 2 ){
            
            let textY = this.y;
            for (let i = 0; i < this.words.length; i++) {
                let textX = this.x - this.wordWidths[i]/2;
                ctx2.fillText(this.words[i], textX, textY);
                textY = textY + 16;
            }
        }

    }
    
    // function to update the new position of the snow ball in according to the velocities
    this.update =  function(stackArray) {
        
        this.draw();
        // console.log(stackArray[2]);
        for (let i = 0; i < stackArray.length; i++) {
            if (this === stackArray[i]) continue;
            if ( distanceBetween(this.x, stackArray[i].x, this.y, stackArray[i].y) < radius + stackArray[i].radius ) {
                // console.log("has collided");
                
                resolveCollision(this, stackArray[i]);
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
        this.y += this.velocity.y ;
        // this.draw();
    }
}


// animate canvas function
function animateStack() {
    requestAnimationFrame(animateStack);
    ctx2.clearRect(0, 0, scw, sch);
    
    // console.log(stackArray);
    stackArray.forEach(stack => {
        stack.update(stackArray);
    });
}


window.onload = setTimeout(() => {
    initStack();
    animateStack();
}, 2000);


