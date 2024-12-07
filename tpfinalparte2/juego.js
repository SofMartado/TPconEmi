class Juego {
  constructor(juegoActivo){
    this.objMenu = objMenu;
    
    this.objEnemigos = new Enemigos(5);
    this.objMira = new Mira();
    
    this.botonVolver = new Boton(20, height-200, 170, 150 ); 
    
    this.crearBills();
    
    this.tiempo = new Tiempo();
    
    this.juegoTerminado = false;  // Variable para saber que el juego no ha comenzado
    this.juegoIniciado = false;  // Variable para saber si el juego ha comenzado
  }
  
  actualizar() {
    if (this.juegoIniciado) {  // Solo actualiza el juego si ha comenzado
      this.objEnemigos.actualizar();  // Llama a 'actualizar' de Enemigos

      // Comprobar la colisión entre la mira y cada Bill
      for (let i = 0; i < this.objEnemigos.muchosBills.length; i++) {
        this.objMira.colision(this.objEnemigos.muchosBills[i]);  // Verifica colisión con cada Bill
      }
      for (let i = 0; i < this.objEnemigos.muchosBills2.length; i++) {
        this.objMira.colision(this.objEnemigos.muchosBills2[i]);  // Verifica colisión con cada Bill
      }
      for (let i = 0; i < this.objEnemigos.muchosBills3.length; i++) {
        this.objMira.colision(this.objEnemigos.muchosBills3[i]);  // Verifica colisión con cada Bill
      }

      this.ganaste(); //Aparece en la pantalla 'ganaste'
    }
  }

  dibujar(){
    this.fondoJuego();
    this.jugar();
    this.objEnemigos.dibujar();
    this.objMira.dibujar();
    this.Mabel();

    if (this.juegoIniciado) {
      this.temporizador();  // Solo muestra el temporizador si el juego ha comenzado
    }
  }

  crearBills(){
    this.objEnemigos.crearBill(80,80);
  }

  jugar() {
    this.actualizar();
    this.objMira.actualizar(mouseX, mouseY);
  }

  Mabel(){
    image(personajes['mabel'],10,300,200,180);
  }

  fondoJuego(){
    image(fondos['FondoJuego'],0,0,width,height);
  }

  temporizador(){
    if (this.tiempo.juegoActivo === true) {
      this.tiempo.actualizar();
      this.tiempo.dibujar();
    } else {
      this.botonVolver.dibujarBotonB();
      this.dentro();
      
      push();
      if (!this.objEnemigos.todosEliminados()) {
        this.perdiste();
      }
      pop();
    }
  }

  perdiste(){
    push();
    this.objEnemigos.crearBill(null,null);
    this.objEnemigos.posa = 0;
    this.objEnemigos.posb = 0;
    this.objEnemigos.posc = 0;
    pop();
    
    push();
    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("¡Perdiste!", width / 2, height / 2);
    pop();
  }

  ganaste(){
    if (this.objEnemigos.todosEliminados()) {
      push();
      fill(0, 255, 0);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("¡Ganaste!", width / 2, height / 2);
      pop();

      this.objEnemigos.juegoActivo = false;  // Detiene el juego
      this.botonVolver.dibujarBotonB();
      this.dentro();

      // Detiene el temporizador
      this.tiempo.pausar();
    }
  }
  

  
  dentro(){
    if (mouseX > 50 && mouseY > height-165 && mouseX < 125 && mouseY < height-110) {
      if(mouseIsPressed){  
        push();
        pantallaActual = this.objMenu;
        pop();
      }
    }
  }

  // Función para iniciar el juego
  iniciarJuego() {
    this.juegoIniciado = true;
    this.tiempo.iniciar(); 
  }
  
}//fin del código
