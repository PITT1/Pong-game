const canvas = document.querySelector("canvas"); 
canvas.width = 400;
canvas.height = 250;

const ctx = canvas.getContext('2d');

const palet = (X, Y, color) => ({
    X: X,
    Y: Y,
    H: 40,
    W: 10,
    color: color,
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
            this.Y = this.Y + 0;
        } 
        if (this.direction == 'left' && this.reboundBot == false && this.reboundTop == false) {
            this.X = this.X - 2;
            this.Y = this.Y - 0;
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
        }
    }

    if(ballInstance.X == player1.X + player1.W) {
        if (ballInstance.Y >= player1.Y && ballInstance.Y <= player1.Y + player1.H -1) {
            ballInstance.direction = 'right';
            ballInstance.reboundBot = false;
            ballInstance.reboundTop = false;
        }
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
    requestAnimationFrame(initGame);
}

requestAnimationFrame(initGame);
const pressButton = (e) => {
    if (e.key == 'ArrowUp') {
        player2.Y = player2.Y - 10;
    }
    if (e.key == 'ArrowDown') {
        player2.Y = player2.Y + 10;
    }

    if (e.key == 's' || e.key == 'S') {
        player1.Y = player1.Y - 10;
    }
    if (e.key == 'x' || e.key == 'X') {
        player1.Y = player1.Y + 10;
    }
}
document.addEventListener('keydown', pressButton);