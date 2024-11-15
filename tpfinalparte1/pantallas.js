
//pantalla estática
function pantalla0() {
  comic(1, 'comic1');
}

//pantalla jugable
function pantalla1() {

  pantallax('imag1');
  push();
  mabel ();
  //rect(265, 455, 100 , 30);
  boton(265, 455, 100, 30, 5, 150, 120, 50, 1000);
  if (x + 50 > 265 && x < 365 && y + 50 > 456 && y < 480) {
    pantalla = 2; // Cambia a la segunda pantalla
    x = 0; // Inicia la posición de el jugador
    y = height / 2;
  }
  pop();
}


//pantalla jugable
function pantalla2() {

  pantallax('pasillo');

  push();
  mabel();

  fill(150, 120, 50);
  rect(100, 147, 100, 30);//habx1
  rect(500, 147, 100, 30);//habx2
  rect(100, 334, 100, 30);//habMisteriosa
  rect(500, 334, 100, 150);//escaleras
  x = constrain(x, 0, width);
  y = constrain(y, 150, 290);
  pop();

  //pantallas estáticas

  if (x + 50 > 100 && x < 200 && y + 50 > 147 && y < 171) {
    push();
    //pantalla 3
    PantsEstaticasARRIBA('imag3', "Esta habitación es la habitación de el tio Stan, \n normalmente guarda sus pertenencias  no veo porque\n tendria aqui a pato :c",'flecha1',10);
    clikboro(2,100,height/2)
    pop();
  }
  if (x + 50 > 500 && x < 600 && y + 50 > 147 && y < 171) {
    push();
    //pantalla 4
    PantsEstaticasARRIBA('imag4', "Este es el atico, \n y no veo por aqui a pato :c",'flecha1',10);
    clikboro(2,500,height/2)
    pop();
  }
  push();
  if (x + 50 > 100 && x < 200 && y + 50 > 334 && y < 479) {
    //pantalla 5
    PantsEstaticasARRIBA('imag2', "Que miedo lo que hay aqui, \n mejor me voy rapido, no veo a pato :C",'flecha1',10);
    clikboro(2,100,height/2);
      pop();}
}

function finalAfuera(imag,txt1,v) {
  pantallax(imag);//
  fill(0);
  if (frameCount/ 60 >= 10 && frameCount / 60 < 1000) {

    rect(20, 170, 180, 70);
    fill(255, 0, 0);
    textSize(25);
    text(txt1, 25, 200);}
      push();
      creditosfinales(v);
      pop();
}

function desicion1() {
  pantallax('afuera');
  
  fill(61,39,40);
  rect(0, 330, 640, 165);
  image(fotos ['Mabel2'], 530, 320, 110, 160);
  
  fill(255);
  txt("¿Estoy segura que quiero ir a buscarlo afuera? \n Podria haberse escapado...", 100, 400,20)
  si();
  no();
  
  push();
  pasarpantalla(180,250,270,290,50);
  pop();
  push();
  pasarpantalla(320,250,410,290,6);
  pop();
}

function desicion2() {
  push();
  PantsEstaticasABAJO('imag13', " ");
  txt("En que parte de la casa podria buscar?",100,400,20)
  pop();
  fill(255);
  fill(150, 100, 50);
        rect (50, 250, 90, 40);
        fill(0);
        txt("Cocina", 65, 280,20);
        pasarpantalla(50, 250, 140, 290,20);
        
        fill(150, 100, 50);
        rect (420, 250, 90, 40);
        fill(0);
        txt("Cuarto", 435, 280,20);
        pasarpantalla(420, 250, 510, 290,21);
         volver(6);
}
