// select canvas element
let mainCanvas = document.querySelector("#main-canvas");
let ctx = mainCanvas.getContext("2d");
// set canvas width and height
mainCanvas.width = window.innerWidth;
let ch;
let cw;

//checking for phones in landscape
if (window.innerHeight <= 500) {
    mainCanvas.height = window.innerHeight + window.innerHeight;
} else{
    mainCanvas.height = window.innerHeight;
}

console.log(window.innerHeight);

// width of the main canvas
cw = mainCanvas.width;
// height of the main canvas
ch = mainCanvas.height;

// array to store all the snow ball object
let snowArray;

// scroll height of window
let scrollHeight = window.scrollY;
let resetAnimation = false;

// funcroll that initializes the snow object 
function init() {
    // variable to control number of snowballs
    snowArray = [];
    
    //checking for phones in landscape
    // responsive condition for phones in landscape mode
    // double the height of canvas if the height is less than 500px
    // mainCanvas.width = window.innerWidth;
    // if (window.innerHeight <= 500) {
    //     mainCanvas.height = window.innerHeight + window.innerHeight;
    // } else{
    //     mainCanvas.height = window.innerHeight;
    // }
    // // width of the main canvas
    // cw = mainCanvas.width;
    // // height of the main canvas
    // ch = mainCanvas.height;


    let numberOfSnowBalls = 175;
    if (cw >= 820) {
        numberOfSnowBalls = 450;
    }
    for (let i = 0; i < numberOfSnowBalls; i++) {
        // generating random values for each of the propertirs of the snow ball
        let radius = randomInteger(1, 3);
        let x = randomInteger(radius, cw - radius);
        let y = randomInteger(radius, ch - radius);
        let dx = randomFloat(-0.5, 0.5);
        let dy = randomFloat(-0.5, 0.5);
        
        // for larger devices like tablets and laptops, the balls should move faster
        if (cw >= 820) {
            dx = randomFloat(-0.8, 0.8);
            dy = randomFloat(-0.8, 0.8);
        }

        let color = themeColors[randomInteger(1, 3)]; 
        //themecolors variable can be used here because it was declared in the index file
        snowArray.push(new Snow(x, y, dx, dy, radius, color));
    }

}

// varaible top store mouse position //
let mouse = {
    x: 0,
    y: 0
};

// mousemove event listenner
document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // console.log(mouse.y);
    // console.log(mousePosition);
});

let doAnim = true;
let animationInView = true;
// scroll event listenner
// this event listener would be used stop and start animations 
// depending on if they're in the view port 
document.addEventListener('scroll', function (e) {
    // scroll height
    // console.log(scrollHeight)
    // console.log(snowArray)
    scrollHeight = window.scrollY;
    if (scrollHeight > ch + 300) {
        doAnim = false;
        animationInView = false;
    } else {
        if (!animationInView) {
            ctx = mainCanvas.getContext("2d");
            doAnim=true;
            // frameRate= 60;
            animate();
            animationInView = true;
        }
    }
    
    // return scrollHeight;
});

// onscreen resize restart canvas animation and resize the canvas
document.addEventListener("resize", function () {
    mainCanvas.width = document.addEventListener;
    mainCanvas.height = window.innerHeight;
    //checking for phones in landscape
    if (window.innerHeight < 500) {
        mainCanvas.height = 2 * window.innerHeight;
    }
    // width of the main canvas
    cw = mainCanvas.width;
    // height of the main canvas
    ch = mainCanvas.height;
    init();
    animate();
});

// console.log(snowArray)

// snow object
function Snow(x, y, dx, dy, radius, color) {
    this.x = x; // x coordinate of the snow ball
    this.y = y; // y coordinate of the snow ball
    this.dx = dx; // velocity in x direction of the snow ball
    this.dy = dy; // velocity in y direction of the snow ball
    this.radius = radius; // radius of the snow ball
    this.color = color; // color of the snow ball
    this.opacity = 0; // opacity of the snow balls initially set to 0
    // so it doesnt show immediately the pages loads
    // this increase gradually to give it a fade in effect 
    this.increment = 0.005; //variable to control the rate of increase of opacity and snoow balls
    
    this.initialRadius = radius; // initial radius of the snow ball
    this.maximumRadius = 50; // maximum value of radius the balls can increase to
    this.radiusIncrement = 5; //value to increase radius of balls close to the mouse

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

        // coditions to increase radius of balls close to mouse
        let cursorCanvasY = mouse.y + window.scrollY; //this is the actuall Y position on canvas after adjusting for scroll
        let cursorCanvasX = mouse.x; // this equal to the mouse x position because theres no horizontal scroll on the canvas
        let distanceFromMouse =  distanceBetween(cursorCanvasX, this.x, cursorCanvasY, this.y);

        if (distanceFromMouse < 150 ) {
            // this.radius = 30;
            // checking if the radius of the ball has increased to the maximum value
            if (this.radius < this.maximumRadius) {
                // increase ball radius inversely proportional to distance from mouse
                this.radius += (this.radiusIncrement / distanceFromMouse);
            }

            this.opacity = 0.5;
            
        } else {
            
            // checking iif the radius of the ball has increased to the maximum value
            if (this.radius > this.initialRadius) {
                // decrease ball radius at a steady rate
                this.radius -= this.radiusIncrement * 0.1;
            } else {
                
                this.radius = this.initialRadius;
                
            }
            this.opacity = 1;
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

// function to generate random float
function randomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

// function to generate random integer
function randomInteger(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

// function to get distance between two points
function distanceBetween(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// check for mouse move eben
window.addEventListener('mousemove', 
    function(){
        // console.log("mouse moving");
})

let frameRate = 60;

// animate canvas function
function animate(time) {
    //block of code top stop animation
    if(!doAnim){
        ctx.clearRect(0, 0, cw, ch);
        ctx=null; 
        // console.log(doAnim);
        return console.log(doAnim);
    }
    // console.log(doAnim);
    // let setFrame = setFrameRate(frameRate);
    // if (time - setFrame.lastTime < setFrame.minTime) { // skip the frame if the call is too early
    //     requestAnimationFrame(animate);
    //     ctx.clearRect(0, 0, cw, ch);
    //     return; // return as there is nothing to do 
    // }
    // setFrame.lastTime = time; // remember the time of the rendered frame
    // render the frame 
    requestAnimationFrame(animate); //get next frame
    ctx.clearRect(0, 0, cw, ch);
    
    snowArray.forEach(snow => {
        snow.update();
    });
}

// delay the time the animation starts by 1.5 seconds
window.onload = setTimeout(() => {
    init();
    animate();
}, 1500);

// function to set frame rate
function setFrameRate(framesPerSecond) {
    // Valid values framesPerSecond are 60,30,20,15,10...
    // set the mim time to render the next frame
    let frameMinTime = (1000/60) * (60 / framesPerSecond) - (1000/60) * 0.5;
    var lastFrameTime = 0;  // the last frame time

    return {
        minTime: frameMinTime,
        lastTime: lastFrameTime
    };
}

// console.log({mainCanvas})
