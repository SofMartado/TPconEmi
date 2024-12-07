class Instrucciones{
  constructor(objMenu){ 
    this.objMenu = objMenu;
    
    this.botonVolver = new Boton(20, height-200, 170, 150  );
  }
  
   dibujar(){
    this.fondoInstrucciones();
    this.botonVolver.dibujarBotonB();
    this.dentro();
 }
   fondoInstrucciones(){
    image(fondos['FondoDeInstrucciones'],0,0,width,height);
    image(fondos['Instrucciones'],0,0,width,height);
    image(fondos['GuiaDelJuego'],150,-30,300,200);
    image(personajes ['bill'],230,height-180,160,165);
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
}//fin del codigo
