const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const borderWidth = 560;
const boardHeight = 300;
let timerId;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
const currentPosition = userStart;

const ballStart = [270, 40];
const ballCurrentPosition = ballStart;
//create Block
class Block {
  //this is our left, bottom of the block, with this x axis and y axis I descipher all 4 points of my block and where they are
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    // this.topLeft = [xAxis, yAxis + blockHeight];
    // this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all my block10
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210)
];

//draw my block
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlock();

//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw the user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

//move user
function moveUser(e) {
  console.log(e);
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0]) {
        currentPosition[0] -= 10;
      }
      drawUser();
      break;
    case 'ArrowRight':
      if (currentPosition[0] < borderWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener('keydown', moveUser);

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  checkForCollisions();
  drawBall();
}

timerId = setInterval(moveBall, 30);

// check for collisions
function checkForCollisions() {
  // check for wall collisions
  if (
    ballCurrentPosition[0] >= borderWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[1] <= 0 ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  // check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'You Lose';
  }
}

function changeDirection() {
  // if xDirection on collision (===). When the ball is hitting the wall changeDirection() gets called and check id xDirection is 2 or -2 (we already know those value because we set it)
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = +2;
    return;
  }
}
