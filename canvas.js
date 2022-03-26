// select canvas element
let mainCanvas = document.querySelector("#main-canvas");
let stackCanvas = document.querySelector("#stack-canvas");
// get 2d context
let ctx = mainCanvas.getContext("2d");
// set canvas width and height
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;


// get 2d context
let ctx2 = stackCanvas.getContext("2d");
// set canvas width and height
stackCanvas.width = window.innerWidth > 450 ? 400 : window.innerWidth; 
// stackCanvas.height = window.innerHeight/2;

// width of the main canvas
let cw = mainCanvas.width;
// height of the main canvas
let ch = mainCanvas.height;


// width of the stack canvas
let scw = mainCanvas.width;
// height of the stack canvas
let sch = mainCanvas.height;

console.log(scw);
console.log(sch);

// array to store all the snow ball object
let snowArray = [];

// array to store all the stack ball object
let stackArray = [];
// function that initializes the snow object 

function init() {
    // variable to control number of snowballs
    let numberOfSnowBalls = 125;
    for (let i = 0; i < numberOfSnowBalls; i++) {
        // generating random values for each of the propertirs of the snow ball
        let radius = randomInteger(1, 3);
        let x = randomInteger(radius, cw - radius);
        let y = randomInteger(radius, ch - radius);
        let dx = randomFloat(-0.5, 0.5);
        let dy = randomFloat(-0.5, 0.5);
        let color = themeColors[randomInteger(1, 3)]; 
        //themecolors variable can be used here because it was declared in the index file
        snowArray.push(new Snow(x, y, dx, dy, radius, color));
    }

    // variable to control number of snowballs
    let numberOfStackBalls = 10;
    for (let i = 0; i < numberOfStackBalls; i++) {
        // generating random values for each of the propertirs of the snow ball
        let radius = randomInteger(30, 35);
        let x = randomInteger(radius, scw - radius);
        let y = randomInteger(radius, sch - radius);
        let dx = randomFloat(-0.5, 0.5);
        let dy = randomFloat(-0.5, 0.5);
        let color = themeColors[randomInteger(1, 3)];
        stackArray.push(new Stack(x, y, dx, dy, radius, color));
    }
}

// console.log(snowArray)

// snow object
function Snow(x, y, dx, dy, radius, color) {
    this.x = x; // x coordinate of the snow ball
    this.y = y; // y coordinate of the snow ball
    this.dx = dx; // velocity in x dorection of the snow ball
    this.dy = dy; // velocity in x dorection of the snow ball
    this.radius = radius; // radius of the snow ball
    this.color = color; // color of the snow ball
    this.opacity = 0; // opacity of the snow balls initially set to 0
    // so it doesnt show immediately the pages loads
    // this increase gradually to give it a fade in effect 
    this.increment = 0.005; //variable to control the rate of increase of opacity

    // function to draw ths snow ball
    this.draw = function(){
        // begin path
        ctx.beginPath();
        // draw snowball
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.globalAlpha = this.opacity;
        // set fill color
        ctx.fillStyle = this.color;
        // fill the snow ball
        ctx.fill();
    }

    // function to update the new position of the snow ball in according to the velocities
    this.update = function() {
        // checking if the snowball is still within the screen width
        if (this.x + this.radius > (cw - this.radius)|| this.x < radius) {
            this.dx *= -1;
        }
        
        // checking if the snowball is still within the screen height
        if (this.y + this.radius > ch || this.y < radius) {
            this.dy *= -1;
        }
        
        // incresing x coordinate by the speed in the x direction, dx
        this.x += this.dx; 
        // incresing y coordinate by the speed in the y direction, dy
        this.y += this.dy;
        // increase opacity by the increment value;
        if (this.opacity < 1) {
            this.opacity += this.increment;
        }
        // redraw the snow in new position 
        // after velocity have altered the position of the snow ball
        this.draw();
    }
}

// begin path
ctx2.beginPath();
// draw snowball
ctx2.arc(scw/2, sch/2, 30, 0, 2*Math.PI, false);
ctx2.fillStyle = "tomato";
ctx2.fill();

// snow object
function Stack(x, y, dx, dy, radius, color) {
    this.x = x; // x coordinate of the snow ball
    this.y = y; // y coordinate of the snow ball
    this.dx = dx; // velocity in x dorection of the snow ball
    this.dy = dy; // velocity in x dorection of the snow ball
    this.radius = radius; // radius of the snow ball
    this.color = color; // color of the snow ball
    this.opacity = 0; // opacity of the snow balls initially set to 0
    // so it doesnt show immediately the pages loads
    // this increase gradually to give it a fade in effect 
    this.increment = 0.005; //variable to control the rate of increase of opacity

    // function to draw ths snow ball
    this.draw = function(){
        // begin path
        ctx2.beginPath();
        // draw snowball
        ctx2.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx2.globalAlpha = this.opacity;
        // set fill color
        ctx2.fillStyle = this.color;
        // fill the snow ball
        ctx2.fill();
    }

    // function to update the new position of the snow ball in according to the velocities
    // this.update = function() {
    //     // checking if the snowball is still within the screen width
    //     if (this.x + this.radius > (cw - this.radius)|| this.x < radius) {
    //         this.dx *= -1;
    //     }
        
    //     // checking if the snowball is still within the screen height
    //     if (this.y + this.radius > ch || this.y < radius) {
    //         this.dy *= -1;
    //     }
        
    //     // incresing x coordinate by the speed in the x direction, dx
    //     this.x += this.dx; 
    //     // incresing y coordinate by the speed in the y direction, dy
    //     this.y += this.dy;
    //     // increase opacity by the increment value;
    //     if (this.opacity < 1) {
    //         this.opacity += this.increment;
    //     }
    //     // redraw the snow in new position 
    //     // after velocity have altered the position of the snow ball
    //     this.draw();
    // }
}

// function to generate random float
function randomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

// function to generate random integer
function randomInteger(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

// check for mouse move eben
window.addEventListener('mousemove', 
    function(){
        // console.log("mouse moving");
})

// animate canvas function
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, cw, ch);
    
    snowArray.forEach(snow => {
        snow.update();
    });

    // stackArray.forEach(stack => {
        // stack.draw();
    // });

    // console.log(document.body);
}

// delay the time the animation starts by 1 seconds
window.onload = setTimeout(() => {
    init();
    animate();
}, 1500);
