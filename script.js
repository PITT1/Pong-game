const canvas = document.querySelector("canvas"); 
const player1Dom = document.querySelector(".player1Score");
const player2Dom = document.querySelector(".player2Score");
canvas.width = 400;
canvas.height = 250;

const ctx = canvas.getContext('2d');

var player1Direction = 0;
var player2Direction = 0;

const palet = (X, Y, color) => ({
    X: X,
    Y: Y,
    H: 40,
    W: 10, 
    color: color,
    score: 0,
    winSet: false,
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.X, this.Y, this.W, this.H);
    }
})

const ball = (X, Y, direction) => ({
    X: X,
    Y: Y,
    W: 10,
    H: 10,
    launchDirec: 0,
    reboundTop: false,
    reboundBot: false, 
    direction: direction,
    draw() {
        // choca con la parte de arriba
        if (this.Y == 0) {
            this.reboundTop = true;
        }
        //choca con la parte de abajo
        if (this.Y == 240) {
            this.reboundBot = true;
        }
        //choca con la parte de arriba y va hacia la drecha
        if (this.reboundTop == true && this.direction == 'right') {
            this.X = this.X + 2;
            this.Y = this.Y + 1;
        }
        //choca con la parte de abajo y va hacia la derecha
        if (this.reboundBot == true && this.direction == 'right') {
            this.X = this.X + 2;
            this.Y = this.Y - 1;
        }
        //choca con la parte de arriba y va hacia la izquierda
        if (this.reboundTop == true && this.direction == 'left') {
            this.X = this.X - 2;
            this.Y = this.Y + 1;
        }
        //choca con la parte de abajo y va hacia la izquierda
        if (this.reboundBot == true && this.direction == 'left') {
            this.X = this.X - 2;
            this.Y = this.Y - 1;
        }

        if (this.direction == 'right' && this.reboundBot == false && this.reboundTop == false) {
            this.X = this.X + 2;
            this.Y = this.Y - this.launchDirec;
        } 
        if (this.direction == 'left' && this.reboundBot == false && this.reboundTop == false) {
            this.X = this.X - 2;
            this.Y = this.Y + this.launchDirec;
        }
        ctx.fillStyle = 'green';
        ctx.fillRect(this.X, this.Y, this.W, this.H);
    }
})

const collision = () => {
    if(ballInstance.X == player2.X - player2.W) {
        if (ballInstance.Y >= player2.Y && ballInstance.Y <= player2.Y + player2.H -1) {
            ballInstance.direction = 'left';
            ballInstance.reboundBot = false;
            ballInstance.reboundTop = false;
            ballInstance.launchDirec = player2Direction;
        }
    }

    if(ballInstance.X == player1.X + player1.W) {
        if (ballInstance.Y >= player1.Y && ballInstance.Y <= player1.Y + player1.H -1) {
            ballInstance.direction = 'right';
            ballInstance.reboundBot = false;
            ballInstance.reboundTop = false;
            ballInstance.launchDirec = player1Direction;
        }
    }
}

const restartGame = () => {
    ballInstance.X = 200;
    ballInstance.Y = 120;
    ballInstance.launchDirec = 0;
    player1Direction = 0;
    player2Direction = 0;
    ballInstance.reboundBot = false;
    ballInstance.reboundTop = false;
    if (player1.winSet == true) {
        player1.winSet = false;
        ballInstance.direction = 'right';
    }
    if (player2.winSet == true) {
        player2.winSet = false;
        ballInstance.direction = 'left';
    }
}

const player1 = palet(20, 100 ,'red');
const player2 = palet(370, 100, 'blue');
const ballInstance = ball(200, 120, 'right');

const initGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballInstance.draw();
    player1.draw();
    player2.draw();
    collision();

    if (ballInstance.X == 0) {
        player2Dom.innerText = "";
        player2.score += 1;
        player2Dom.innerText = player2.score;
        player2.winSet = true;
        setTimeout(restartGame, 4000);
    }
    if (ballInstance.X == 400) {
        player1Dom.innerText = "";
        player1.score += 1; 
        player1Dom.innerText = player1.score;
        player1.winSet = true;
        setTimeout(restartGame, 4000);
    }
    requestAnimationFrame(initGame);
}

requestAnimationFrame(initGame);
const pressButton = (e) => {
    if (e.key == 'ArrowUp') {
        player2.Y = player2.Y - 10;
        player2Direction = -1;
    }
    if (e.key == 'ArrowDown') {
        player2.Y = player2.Y + 10;
        player2Direction = 1;
    }

    if (e.key == 's' || e.key == 'S') {
        player1.Y = player1.Y - 10;
        player1Direction = 1;
    }
    if (e.key == 'x' || e.key == 'X') {
        player1.Y = player1.Y + 10;
        player1Direction = -1;
    }
}
document.addEventListener('keydown', pressButton);