const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const boxSize = 30;
let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let direction = "RIGHT";
let score = 0;
let food = { x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize };
let gameActive = false;
let gameInterval;

function drawSnake() {
    snake.forEach((part, index) => {
        if (index === 0) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "limegreen";
        }
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = "#222";
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function updateGame() {
    if (!gameActive) return;

    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snakeCollision(head)) {
        gameOver();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    gameActive = false;
    clearInterval(gameInterval);
    document.getElementById("score").textContent = "Game Over! Score: " + score;
}

function startGame() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    direction = "RIGHT";
    score = 0;
    gameActive = true;
    document.getElementById("score").textContent = `Score: ${score}`;
    food = { x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize };
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();

    gameInterval = setInterval(updateGame, 100); 
}

window.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();

    if ((key === "arrowleft" || key === "a") && direction !== "RIGHT") {
        direction = "LEFT";
    } else if ((key === "arrowup" || key === "w") && direction !== "DOWN") {
        direction = "UP";
    } else if ((key === "arrowright" || key === "d") && direction !== "LEFT") {
        direction = "RIGHT";
    } else if ((key === "arrowdown" || key === "s") && direction !== "UP") {
        direction = "DOWN";
    } else if (key === "r") {
        clearInterval(gameInterval);
        startGame();
    }
});

document.getElementById('startButton').addEventListener('click', function () {
    clearInterval(gameInterval);
    startGame();
});
