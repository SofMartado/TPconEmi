class Mira {

  constructor() {  
    this.x = 100;
    this.y = 100;
    this.diam = 50;
    this.mouseWasPressed = false;
  }

  actualizar( mx, my ) {
    this.x = mx;
    this.y = my;
  }
  
  dibujar(){
    image(personajes ['Mira'],this.x-89,this.y-75,190,150);
  }
  
  colision(bill) {
    // Verifica si la mira colisiona con Bill
    if (mouseX > bill.x - bill.diam / 2 && mouseX < bill.x + bill.diam / 2 &&
      mouseY > bill.y - bill.diam / 2 && mouseY < bill.y + bill.diam / 2) {
      // Si el mouse está sobre Bill y se hace clic
      if (mouseIsPressed) {
        musica['1'].play();
        bill.perderVida();  // Restar una vida a Bill
        console.log("¡Disparo a Bill!");
         this.mouseWasPressed = true;
      }
    }
  }
  
  resetMousePress() {
    if (!mouseIsPressed) {
      this.mouseWasPressed = false;  // Reseteamos cuando el mouse no está presionado
    }
  }
}//fin del codigo
