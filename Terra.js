class Planeta {
  constructor({ position, raio, color, imageSrc, massa }) {
    this.position = position;
    this.raio = raio;
    this.color = color || "blue";
    this.image = new Image();
    this.image.src = imageSrc;
    this.massa = massa;
  }
  draw() {
    ctx.beginPath();
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.position.x - this.raio,
        this.position.y - this.raio,
        this.raio * 2,
        this.raio * 2
      );
    } else {
      ctx.fillStyle = this.color;
      ctx.arc(this.position.x, this.position.y, this.raio, 0, 2 * Math.PI);
    }

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
    const dist = distancia(this, planeta);

    let f = (planeta.massa * this.massa) / dist ** 2;

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
      // Diminui a velocidade gradualmente
      this.velocidade.x *= 0.9;
      this.velocidade.y *= 0.9;

      // Se a velocidade for muito pequena, zera para evitar valores muito pequenos
      if (Math.abs(this.velocidade.x) < 0.1) {
        this.velocidade.x = 0;
      }
      if (Math.abs(this.velocidade.y) < 0.1) {
        this.velocidade.y = 0;
      }

      // Corrige sobreposição da bola com o planeta
      const dx = this.position.x - planeta.position.x;
      const dy = this.position.y - planeta.position.y;

      const overlap = this.raio + planeta.raio - dist;
      const normal = { x: dx / dist, y: dy / dist }; // Vetor normalizado

      this.position.x += normal.x * overlap;
      this.position.y += normal.y * overlap;
    }

    if (this.velocidade.x !== 0) this.position.x += this.velocidade.x;
    if (this.velocidade.y !== 0) this.position.y += this.velocidade.y;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "rgba(0,150,0,.4)";
    ctx.lineWidth = 5;
    ctx.arc(this.position.x, this.position.y, this.raio, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    document.querySelector("#posX").innerHTML = this.position.x.toFixed(2);
    document.querySelector("#posY").innerHTML = this.position.y.toFixed(2);

    document.querySelector("#velX").innerHTML = this.velocidade.x.toFixed(2);
    document.querySelector("#velY").innerHTML = this.velocidade.y.toFixed(2);

    document.querySelector("#acX").innerHTML = this.aceleracao.x.toFixed(2);
    document.querySelector("#acY").innerHTML = this.aceleracao.y.toFixed(2);
  }
}
