const canvas = document.querySelector("#tela");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const planeta = new Planeta({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  raio: 150,
  color: "#55f", 
  massa: 9999,
});

const bola = new Tiro({
  position: {
    x: canvas.width/2,
    y: planeta.position.y - planeta.raio - 100,
  },
  raio: 15,
  color: "#eee",
  massa: 1,
  velocidade: {
    x: 7,
    y: 0,
  },
  aceleracao: {
    x: 0,
    y: 0,
  },
});

 function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Desenhando o fundo do jogo

 bola.update();

  ctx.beginPath();
  planeta.draw();
  ctx.beginPath();
  bola.draw();

  requestAnimationFrame(draw);
}
draw();

function distancia(a,b){
    let distanciaX = a.position.x - b.position.x
    let distanciaY = a.position.y - b.position.y
  
    let distacia = Math.sqrt(Math.pow(distanciaX, 2)+Math.pow(distanciaY ,2 ))
    
   return (distacia)
  }
  