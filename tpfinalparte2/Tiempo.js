class Tiempo {
  constructor() {
    this.tiempoRestante = 30; 
    this.tiempoInicio = millis();
    this.juegoActivo = false; // El juego no está activo al principio
  }

  iniciar() {
    this.juegoActivo = true;  // Inicia el temporizador
    this.tiempoInicio = millis();  // Reinicia el tiempo
  }

  actualizar() {
    if (this.juegoActivo) {
      this.tiempoTranscurrido = (millis() - this.tiempoInicio) / 1000;
      this.tiempoRestante = Math.max(0, 30 - Math.floor(this.tiempoTranscurrido));
    }
  }
  botonTiempo(){
   image(botones['tiempo'], width / 3,-45,width/3,height/3); 
  }

  dibujar() {
    fill(0);
    textSize(30);
    textAlign(CENTER, TOP);
    strokeWeight(5);
    stroke(255);
    fill(250,200,100);
    this.botonTiempo();
    text( this.tiempoRestante , width / 3+155, 8);

    if (this.tiempoRestante === 0) {
      this.juegoActivo = false; // Detiene el temporizador si el tiempo se agota
    }
  }
  
  pausar() {
    this.juegoActivo = false;  // Detiene el temporizador
  }
}//fin del codigo
