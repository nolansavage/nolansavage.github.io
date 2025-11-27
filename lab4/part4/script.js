const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Generate a random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// Evil circle
class Shape {
constructor(x, y, velX, exists = true) {
this.x = x;
this.y = y;
this.velX = velX
this.velY;
this.exists = exists;
}
}

// Ball class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) this.velX = -this.velX;
    if (this.x - this.size <= 0) this.velX = -this.velX;

    if (this.y + this.size >= height) this.velY = -this.velY;
    if (this.y - this.size <= 0) this.velY = -this.velY;

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.color = ball.color = randomRGB();
        }
      }
    }
  }
}


class EvilCircle extends Shape {
constructor(x, y) {
super(x, y, 20, 20);
this.color = "white";
this.size = 20;
}

draw() {
ctx.beginPath();
ctx.strokeStyle = this.color;
ctx.lineWidth = 3;
ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
ctx.stroke();
}

//keeping the evil circle inside the screen
checkBounds() {
if (this.x + this.size >= width) this.x = width - this.size;
if (this.x + this.size <= 0) this.x = this.size;
if (this.y + this.size >= height) this.y = height - this.size;
if (this.y - this.size <= 0) this.y = this.size;
}

//controls for evil circle
setControls() {
window.addEventListener('keydown', (e) => {
switch(e.key) {
case 'a': //move left
this.x -= this.velX;
break;
case 'd': //move right
this.x += this.velX;
break;
case 'w': //move up
this.y -= this.velY;
break;
case 's': //move down
this.y += this.velY
break;
}
}};
}

//eating the balls function
collisionDetect() {
 for (const ball of balls) {
  if (ball.exists) {
   const dx = this.x - ball.x;
   const dy = this.y - ball.y;
   const distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < this.size +ball.size) {
     ball.exists = false; //gets rid of the ball
     ballCount--;
    }
   }
  }
 }
}

// Create an array of balls
const balls = [];

while (balls.length < 30) {
  const size = random(10, 30);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

//ball counter
let ballCount = balls.length;
const counter = document.createElement('p');
counter.style.color = 'white';
counter.style.fontSize = '20px';
document.body.appendChild(counter);

function updateCounter {
 counter.text.Content = `Ball count' ${ballCount}`;

// Animation loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

// Start the animation
loop();


