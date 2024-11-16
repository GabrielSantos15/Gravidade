class Planeta {
  constructor({ position, raio, color, massa }) {
    this.position = position;
    this.raio = raio;
    this.color = color || "blue";
    this.massa = massa;
  }
  update() {
    // implementar aqui as atualizações da posição do planeta
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.raio, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Tiro {
  constructor({ position, raio, color, massa, velocidade, aceleracao }) {
    ctx.beginPath();
    this.position = position;
    this.raio = raio;
    this.color = color || "red";
    this.massa = massa;
    this.velocidade = velocidade;
    this.aceleracao = aceleracao;
  }
  update() {
    let f = (planeta.massa * this.massa) / distancia(this, planeta) ** 2;

    let fX =
      f *
      Math.cos(
        Math.atan(
          (this.position.y - planeta.position.y) /
            (this.position.x - planeta.position.x)
        )
      );
    let fY =
      f *
      Math.sin(
        Math.atan(
          (this.position.y - planeta.position.y) /
            (this.position.x - planeta.position.x)
        )
      );

    this.aceleracao.x = Math.abs(fX / this.massa);
    this.aceleracao.y = Math.abs(fY / this.massa);

    if (this.position.x < planeta.position.x) {
      this.velocidade.x += this.aceleracao.x;
    } else {
      this.velocidade.x -= this.aceleracao.x;
    }

    if (this.position.y < planeta.position.y) {
      this.velocidade.y += this.aceleracao.y;
    } else {
      this.velocidade.y -= this.aceleracao.y;
    }

    // colisao

    if (distancia(this, planeta) <= this.raio + planeta.raio) {
      this.velocidade.x *= -1;
      this.velocidade.y *= -1;

      if (Math.abs(this.velocidade.x) < 0.5) {
        this.velocidade.x = 0;
      } else {
        this.velocidade.x = this.velocidade.x / 1.5;
      }
      if (Math.abs(this.velocidade.y) < 0.5) {
        this.velocidade.y = 0;
      } else {
        this.velocidade.y = this.velocidade.y / 1.5;
      }
    }

    if(!this.velocidade.x == 0)this.position.x += this.velocidade.x;
    if(!this.velocidade.y ==0)this.position.y += this.velocidade.y;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'rgba(0,150,0,.4)';
    ctx.lineWidth = 5;
    ctx.arc(this.position.x, this.position.y, this.raio, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill();

    document.querySelector('#posX').innerHTML = this.position.x.toFixed(2)
    document.querySelector('#posY').innerHTML = this.position.y.toFixed(2)

    document.querySelector('#velX').innerHTML = this.velocidade.x.toFixed(2)
    document.querySelector('#velY').innerHTML = this.velocidade.y.toFixed(2)

    document.querySelector('#acX').innerHTML = this.aceleracao.x.toFixed(2)
    document.querySelector('#acY').innerHTML = this.aceleracao.y.toFixed(2)
  }
}
