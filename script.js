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
  imageSrc: "Images/Planet.png",
  massa: 9999,
});

const bola = new Tiro({
  position: {
    x: canvas.width / 2,
    y: planeta.position.y - planeta.raio - 80,
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

const bola2 = new Tiro({
  position: {
    x: canvas.width / 2,
    y: planeta.position.y - planeta.raio - 80,
  },
  raio: 15,
  color: "#eee",
  massa: 1,
  velocidade: {
    x: 8,
    y: 0,
  },
  aceleracao: {
    x: 0,
    y: 0,
  },
});

const satelites = [bola, bola2];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Desenhando o fundo do jogo

  ctx.beginPath();
  planeta.draw();
  satelites.map((satelite) => {
    ctx.beginPath();
    satelite.update();
    satelite.draw();
  });
  updateInfos()

  requestAnimationFrame(draw);
}
planeta.image.onload = draw();

function distancia(a, b) {
  let distanciaX = a.position.x - b.position.x;
  let distanciaY = a.position.y - b.position.y;

  let distacia = Math.sqrt(Math.pow(distanciaX, 2) + Math.pow(distanciaY, 2));

  return distacia;
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Atualiza posições
  planeta.position = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
});

function updateInfos() {
  const infoContainer = document.querySelector("#infosContainer");

  infoContainer.innerHTML = ""

satelites.map((satelite,index) => {
    infoContainer.innerHTML += `
       <div class="infoSatelite">
        <h2>Satelite ${index + 1}</h2>
        <p>Posição : (${satelite.position.x.toFixed(
          2
        )},${satelite.position.y.toFixed(2)})</p>
        <p>Velocidade: (${satelite.velocidade.x.toFixed(
          2
        )},${satelite.velocidade.y.toFixed(2)}) </p>
        <p>Aceleração: (${satelite.aceleracao.x.toFixed(
          2
        )},${satelite.aceleracao.y.toFixed(2)})</p>
       </div>
            
        </details>
    `;
  });
}
