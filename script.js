const canvas = document.querySelector("#tela");
const ctx = canvas.getContext("2d");


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

ctx.translate(canvas.width/2,canvas.height/2)

const planeta = new Planeta({
  position: {
    x: 0,
    y: 0,
  },
  raio: 200,
  color: "#55f",
  imageSrc: "img/Planet.png",
  massa: 9999,
});

const canhao = {
  position:{
    x: planeta.position.x ,
    y: planeta.position.y - planeta.raio
  },
  projetil: {
    velocidade: {
      x: 7,
      y: 0,
    },
    aceleracao: {
      x: 0,
      y: 0,
    }
  }
}

const satelites = [];

function draw() {
  ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
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
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

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

function Atirar(){
  let velocidadeX = parseFloat(document.querySelector("#velocidadeX").value || 0);
  let velocidadeY = parseFloat(document.querySelector("#velocidadeY").value || 0);


  satelites.push(
    new Tiro({
      position: {
        x: canhao.position.x,
        y: canhao.position.y - 50,
      },
      raio: 10,
      color: "#eee",
      massa: .01,
      velocidade: {
        x: velocidadeX,
        y: velocidadeY,
      },
      aceleracao: {
        x: 0,
        y: 0,
      },
    })
  )

}