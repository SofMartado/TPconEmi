class Créditos{
  constructor(objMenu){
    this.objMenu = objMenu;
    
    this.botonVolver = new Boton(20, height-200, 170, 150 );
    
    this.creditos = [  
  "Creado por: Martinez Bogado Sofia",
  "y Giuliano Emiliano.",
  "Serie ambientada en Gravitty Falls.",
  "Música: *insertarrr*",
  "Fotos: Google y originales",
  "Agradecimientos a:",
  "  - mi Mamá y Papá",
  "  - Churri",
  "Fin y gracias por jugar"];
  
  this.j = 550; // Posición inicial de los créditos
  this.speed = 1; // Velocidad de desplazamiento
  this.temp = int( millis() / 1000 );
  
  
  }
  
  dibujar(){
   image(fondos['FondoDeCréditos'],0,0,width,height);
    this.creditosFinales();
    this.bot();
  }
  
  bot(){
  push();
  this.botonVolver.dibujarBotonB();
  pop(); 
  
  this.dentro();}
  
  dentro(){
    if (mouseX > 50 && mouseY > height-165 && mouseX < 125 && mouseY < height-110) {
      if(mouseIsPressed){  
        push();
        
        pantallaActual = this.objMenu;
         this.j = 550;
          this.speed = 1;
          frameCount = 10;
        pop();
      }
    }
  }

  creditosFinales(){
     if (this.temp / 60 < 10) {
    push();
    fill(255);
    //Dibuja los créditos
    for (let i = 0; i < this.creditos.length; i++) {
      textAlign(CENTER);
      textSize(24);
      text(this.creditos[i], width / 2, this.j + i * 40);
      this.j -= this.speed/5;
    }
    pop();
    
    // Desplazar los créditos hacia arriba
    
  }  if (frameCount/ 60 >= 10 && frameCount / 60 < 1000) {
    this.bot();
  }
  }

}//fin del codigo
