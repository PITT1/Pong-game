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
    direction: direction,
    draw() {
        if (this.direction == 'right') {
            this.X = this.X + 2;
        } else {
            this.X = this.X - 2;
        }
        ctx.fillStyle = 'green';
        ctx.fillRect(this.X, this.Y, this.W, this.H);
    }
})

const colition = () => {
    if(ballInstance.X == player2.X - player2.W) {
        ballInstance.direction = 'left'
    }

    if(ballInstance.X == player1.X + player1.W) {
        ballInstance.direction = 'right'
    }
}

const player1 = palet(20, 100 ,'red');
const player2 = palet(370, 100, 'blue');
const ballInstance = ball(200, 120, 'right');

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballInstance.draw();
    player1.draw();
    player2.draw();
    colition();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
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