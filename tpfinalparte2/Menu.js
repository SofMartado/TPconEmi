class Menu {
  constructor(objJuego, objInstrucciones, objCreditos) {
    this.objJuego = objJuego; 
    this.objInstrucciones = objInstrucciones;
    this.objCreditos = objCreditos;
    
    
  }
  
  dibujar() {
    this.fondoMenu();
    
    this.crearBotonJugar();
    this.crearBotonInstrucciones();
    this.crearBotonCreditos();
  }

  fondoMenu() {
    image(fondos['FondoDeMenu'], 20, 20, width - 30, height - 60);
    image(fondos['Feria'], 40, 60, width - 240, height - 200);
    image(fondos['FondoDeFeria'], 0, 0, width, height);
  }

  crearBotonJugar() {
    push();
    this.botonJugar = new Boton(width / 3, height - 180, 200, 150);
    this.botonJugar.dibujarBotonA();
    pop();
  }

  crearBotonInstrucciones() {
    push();
    this.botonInstrucciones = new Boton(width / 3, height - 125, 200, 150);  
    this.botonInstrucciones.dibujarBotonC();
    pop();
  }

  crearBotonCreditos() {
    this.botonCreditos = new Boton(20, height - 100, 150, 145); 
    this.botonCreditos.dibujarBotonD();
  }

  mousePressed() {
    push();
    if (this.botonJugar.dentro()) {
      pantallaActual = this.objJuego;  
      this.objJuego.iniciarJuego();  // Inicia el juego y el temporizador
      pop();
    } else if (this.botonInstrucciones.dentro()) {
      pantallaActual = this.objInstrucciones;  // Cambia a la pantalla de instrucciones
      pop();
    } else if (this.botonCreditos.dentro()) {
      pantallaActual = this.objCreditos;  // Cambia a la pantalla de Creditos
      pop();
    }
    if(pantallaActual){ // Empieza la música
    if(mouseX > 425 && mouseY > height - 100 && mouseX < 515 && mouseY < height - 20){
             musica['2'].loop();
    }else if(mouseX > 527 && mouseY > height - 100 && mouseX < 588 && mouseY < height - 20){
             musica['2'].pause();
    }}
  }
}//fin del codigo
