class Boton{
  constructor(posx,posy,ancho,largo){
   this.x = posx;
   this.y = posy; 
   this.a = ancho;
   this.l = largo;
   this.w = 20;
   
   this.botonplay();
  }
   jugar(){
    image(botones['jugar'],this.x,this.y,this.a,this.l);
  }
   reiniciar(){
    image(botones['reiniciar'],this.x,this.y,this.a,this.l);
  }
   guia(){
    image(botones['guia'],this.x,this.y,this.a,this.l);
  }
   creditos(){
    image(botones['creditos'],this.x,this.y,this.a,this.l);
  }
  
  dibujarBotonA(){
    this.jugar();
  }
  dibujarBotonB(){
    this.reiniciar();
  }
  dibujarBotonC(){
    this.guia();
  }
  dibujarBotonD(){
    this.creditos();
  }
  
  dentro() {
    //verifica si el mouse está dentro del botón
    return (mouseX > this.x+this.w && mouseX < this.x-this.w + this.a && mouseY > this.y+this.w && mouseY < this.y-this.w + this.l-this.w);
   }
   
   botonplay(){
     image(botones['sonido'],425, height - 100, 180, 130);}
}//fin del codigo
