// Elementos del DOM
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const drawBtn = document.getElementById('draw-btn');
const gameOverText = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

// Variables de juego
let humanParts = 0;
let gameOver = false;

// Función para iniciar el juego
function startGame() {
  startBtn.style.display = 'none';
  drawBtn.style.display = 'inline-block'; // Mostrar el botón "DIBUJAR"
  canvas.style.display = 'block';
  drawHangman();
}


// Función para dibujar una parte del humano
function draw() {
  if (!gameOver) {
    humanParts++;
    drawHangman();
    if (humanParts === 6) {
      endGame();
    }
  }
}

// Función para dibujar la estructura del ahorcado
function drawHangman() {
  // Limpiar el canvas antes de volver a dibujar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el poste vertical
  ctx.beginPath();
  ctx.moveTo(50, 350);
  ctx.lineTo(50, 50);
  ctx.stroke();

  // Dibujar el poste horizontal
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(250, 50);
  ctx.stroke();

  // Dibujar la soga
  ctx.beginPath();
  ctx.moveTo(250, 50);
  ctx.lineTo(250, 100);
  ctx.stroke();

  // Dibujar la cabeza
  if (humanParts >= 1) {
    ctx.beginPath();
    ctx.arc(250, 125, 25, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Dibujar el cuerpo
  if (humanParts >= 2) {
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 250);
    ctx.stroke();
  }

  // Dibujar el brazo izquierdo
  if (humanParts >= 3) {
    ctx.beginPath();
    ctx.moveTo(250, 175);
    ctx.lineTo(200, 200);
    ctx.stroke();
  }

  // Dibujar el brazo derecho
  if (humanParts >= 4) {
    ctx.beginPath();
    ctx.moveTo(250, 175);
    ctx.lineTo(300, 200);
    ctx.stroke();
  }

  // Dibujar la pierna izquierda
  if (humanParts >= 5) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(200, 300);
    ctx.stroke();
  }

  // Dibujar la pierna derecha
  if (humanParts >= 6) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(300, 300);
    ctx.stroke();
  }
}

// Función para terminar el juego
function endGame() {
  gameOver = true;
  drawBtn.style.display = 'none';
  gameOverText.style.display = 'block'; // Mostrar el texto de Game Over
  restartBtn.style.display = 'inline-block';

  // Crear una animación épica de Game Over con anime.js
  anime.timeline({
    easing: 'easeOutExpo',
  })
  .add({
    targets: gameOverText,
    opacity: 1,
    duration: 1000,
  })
  .add({
    targets: gameOverText,
    scale: [1, 1.5],
    duration: 1000,
  })
  .add({
    targets: gameOverText,
    rotate: 360,
    duration: 1000,
  });
}


// Función para reiniciar el juego
function restartGame() {
  humanParts = 0;
  gameOver = false;
  gameOverText.style.display = 'none';
  restartBtn.style.display = 'none';
  startBtn.style.display = 'inline-block';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
