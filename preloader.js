let canvas = document.getElementById("preloader");
let c = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cw = canvas.width;
let ch = canvas.height;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let balls = [];


let themeColors = [
    // "#F2F2F2",
    // "#BFBFBF",
    // "#8C8C8C",
    // "#595959",
    // "#0D0D0D"
    
    // "#D8B3A8",
    // "#7D5263",
    // "#AC8B82",
    // "#C19F9B",
    // "#DDB3AF"

    "#F7EEEA",
    "#AB2836",
    "#7C2E41",
    "#053C5E",
    "#000031"
]

canvas.style.backgroundColor = themeColors[0];

console.log(window.innerWidth)

// function to get a random integer between a max and min value 
function randomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// function to get a random float between a max and min value
function randomFloat(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// function to get distance between two points on tha canvas
function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) )
}

function rotatingCoordinates( rotatingAngle, radius) {
    // consider a ball rotating about the origin (0, 0)
    // where radius of rotaion is "radius"
    // and the angle of rotation is "roataing angle"
    /* 
        the "y" coordinate of the path drawn by the rotating ball after rotating
        through the angle, "rotatingAngle" is calculated below 
    */
    let y = radius * Math.cos(rotatingAngle);

    // applying the equation of a circle (x - h)^2 + (y - k)^2 = r^2
    // where h = centerX
    // where k = centerY
    // r = radius 
    // y = y
    // making x subject of the formula
    let x = Math.sqrt(Math.pow(radius, 2) - Math.pow(y, 2));
    // let spot = new Balls(4, xOrigin - x, yOrigin + y);
    // balls.push(spot);
    return {x: x, y: y};

}

let rotatingAngle =  Math.PI / 180;
function Balls(radius, x, y, animated, position) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.animated = animated;
    this.position = position;

    this.update = function() {
        this.draw();
    }

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = themeColors[3];
        c.fill();
        
    }

}



function init() {
    let radius = Math.floor(cw/30);
    for (let i = 0; i < 10; i+=2) {
        let y = centerY;
        let x = (centerX - 4 * radius) + i * radius;
        let animated;
        let position;

        if (i == 0 || i == 8) {
            animated = true;
            if (i == 0) {
                position = "left"
            } else {
                position = "right"
            }
        } else {
            animated = false;
            position = "center"
        }


        let ball = new Balls(radius, x, y, animated, position);
        balls.push(ball);
        //code 
    }
}

console.log(balls)
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, cw, ch);
    // balls[].update();
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();        
    }
}

init();
animate();