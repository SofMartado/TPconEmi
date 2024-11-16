

class Particula {
  constructor(velocidad) {
    this.x = Math.floor(Math.random() * 640); // x aleatorio
    this.y = -100; // y inicial fuera de la pantalla
    this.diam = Math.floor(20); // diámetro aleatorio
    this.vel = velocidad; // velocidad constante
  }

  dibujar() {
    image(img, this.x, this.y, this.diam + 50, this.diam + 50); // dibujar el círculo
  }

  actualizar() {
    this.y = this.y + this.vel; // mover la partícula hacia abajo
  }

  reciclar() {
    if (this.y >= height) { // si la partícula sale de la pantalla
      this.x = Math.floor(Math.random() * width); // posición aleatoria en x
      this.y = -100; // reiniciar en la parte superior de la pantalla
      this.vel = 5; // restablecer la velocidad (aunque ya es 5, por si acaso)
    }
  }
}
