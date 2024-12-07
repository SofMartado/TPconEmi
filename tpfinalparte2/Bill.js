class Bill {
  constructor(posx, posy) {
    this.x = posx;
    this.y = posy;
    this.diam = 50;  // Diámetro de la imagen
    this.vel = 12;    // Velocidad de movimiento
    this.vidas = 5; 
    this.eliminado = false;  // para saber si el Bill ha sido eliminado
  }

  dibujar() {
    if (!this.eliminado) {  // Solo dibuja si no está eliminado
    image(personajes['bill2'], this.x - this.diam / 2, this.y - this.diam / 2, this.diam + 80, this.diam + 55);
    }
  }

  actualizar() {
    if (this.eliminado) {return;}  // Si está eliminado, no se actualiza su posición

    // Actualiza la posición en función de la velocidad
    this.x += this.vel;  // Sumar la velocidad a la posición

    // Si llega al borde derecho
    if (this.x + this.diam / 2 > width) {
      this.vel = -this.vel;  // Cambia la dirección de la velocidad
    }

    // Si llega al borde izquierdo
    if (this.x - this.diam / 2 < 0) {
      this.vel = -this.vel;  // Cambia la dirección de la velocidad
    }
  }

  perderVida() {
    this.vidas--;
    console.log("Vidas restantes: " + this.vidas);
    if (this.vidas <= 0) {
      console.log("Bill ha muerto");
      this.eliminado = true;  // Bill se elimina
    }
  }

  detectarClick(mouseX, mouseY) {
    // Detecta si el clic está dentro del área de la imagen
    if (mouseX > this.x - this.diam / 2 &&  // A la izquierda 
        mouseX < this.x + this.diam / 2 &&  // A la derecha 
        mouseY > this.y - this.diam / 2 &&  // Arriba
        mouseY < this.y + this.diam / 2 ) {// Abajo
      return true;  // El clic está dentro del área de Bill
    }
    return false;  // El clic no está sobre Bill
  }
}//fin del codigo
