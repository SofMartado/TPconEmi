//Link del video a Youtube :
//TP#Final — Aventura Gráfica Interactiva Web [1]
// Alumnos :  Emiliano Esteban Giuliano, Sofía Martínez Bogado.
// Legajos :  119084/3 | 119083/3

/*
Serie Animada: Gravity Falls
 Sinapsis : Mabel se despierta y no encuentra a Pato,su mascota a su lado
 así que en este juego tendras que ir visitando habitaciones para encontrarlo
 y obtener el final esperado.
 */

let creditos = [
  "Creado por: Martinez Bogado Sofia",
  "y Giuliano Emiliano.",
  "Serie ambientada en Gravitty Falls.",
  "Música: Terror abundante",
  "Fotos: Google",
  "Agradecimientos a:",
  "  - Carlos Acuña",
  "  - Churri",
  "Fin y gracias por jugar"
];

let j = 550; // Posición inicial de los créditos
let speed = 1; // Velocidad de desplazamiento


let musica; // Musica

let temp;
let temppantalla;

let n, m;

let x, y; // Posición de la imagen
let size = 70; // Tamaño de la imagen
let fotos = []; // Variable para la imagen


let pantalla, pant;

//------------------------------------------------------

function preload() {

  // MUSICA
  soundFormats('mp3', 'ogg');
  musica = loadSound('/data/GB1.mp3');

  //IMAGENES

  //for (let i=0; i<i; i++) {
  //  fotos[i]=loadImage("data/Designer"+i+".jpg");
  //  fotos[i]=loadImage("data/Designer"+i+".png");
  //}
  fotos ['teclas'] = loadImage('data/teclado.jpg');
  fotos ['mouse'] = loadImage('data/mouse.png');
  fotos ['click'] = loadImage('data/click.png');

  fotos ['Mabel'] = loadImage('data/Mabel.png');
  fotos ['Mabel2'] = loadImage('data/mabel2.png');

  fotos ['imag0'] = loadImage('data/fotodemenu.jpg');
  fotos ['imag1'] = loadImage('data/habM&D.jpg');
  fotos ['imag2'] = loadImage('data/habX1.jpg');
  fotos ['imag3'] = loadImage('data/habX2.jpg');
  fotos ['imag4'] = loadImage('data/atico.jpg');
  fotos ['heladera'] = loadImage('data/heladera.png');
  fotos ['afuera'] = loadImage('data/afuera.jpg');
  fotos ['shop'] = loadImage('data/shop.png');
  fotos ['pasillo'] = loadImage('data/pasillo.jpg');
  fotos ['imag13'] = loadImage('data/Adentroo.png');
  fotos ['imag14'] = loadImage('data/cuarto.jpg');

  fotos ['comic1'] = loadImage('data/comicMabel.jpg');

  fotos ['flecha1'] = loadImage('data/flecha1.png');
  fotos ['flecha2'] = loadImage('data/flecha2.png');
  fotos ['plano'] = loadImage('data/planos.png');
  
  fotos ['final bueno'] = loadImage('data/finalbueno.jpg');
  
  fotos ['final malo1'] = loadImage('data/mabeltriste.jpg');
  fotos ['final malo1.2'] = loadImage('data/mabelfinalmalo.jpg');
  fotos ['final de Bill'] = loadImage('data/estatuadebill.png');
  fotos ['final malo2'] = loadImage('data/bill.jpg');
}
//------------------------------------------------------

function setup() {
  createCanvas(640, 480);

  x = width; // Inicia la posición de el jugador
  y = height / 2;

  n = width / 3;//valor que se repite
  m = height-180;

  pantalla = 0;
  pant = 0;
}

//------------------------------------------------------

function draw() {

  print(temp);
  print(mouseX + "/" + mouseY);

  temp = int( millis() / 1000 );
  tempPantalla = temp ;

  //Menu

  if ( pantalla === 0 ) {
    menu();
    //condición si ¨Mabel¨ está en el cuadrado
    push();
    dentro(1);
    pop();

    push();
    dentru(10);
    pop();
  }

  //Hab de Mabel y Dipper
  if ( pantalla === 1 && pant === 0) {
    pantalla0();
    bot();
    if (frameCount/ 60 >= 10 && frameCount / 60 < 1000) {
      pantalla1();
    }
  }

  if (pantalla === 2) {
    //pasillo donde puedes entrar a x habitacones o bajar por la escalera
    pantalla2();

    if (x + 50 > 500 && x < 600 && y + 50 > 334 && y < 479) {
      pantalla = 6;
    }
  } 

  if (pantalla === 6) {
    //piso de abajo, apartir de acá se mueve de izquierda a derecha
  
  push();
    PantsEstaticasABAJO('shop', "Tendre que decidir si buscar afuera de\n la casa, o seguir buscando por aqui adentro",335);
    push();
    text("Adentro", 30, 430);
    text("Afuera", 470, 430);
    pop();
    //dentroFlechaI(12);
    pasarpantalla(10,335,90,415,12);
    //dentroFlechaD(13);
    pasarpantalla(460,335,540,415,13);
    
  pop();
  }

  //SI MI PANTALLA ES IGUAL A X voy a la IZQUIERDA
      if (pantalla === 12) {
        desicion2(); 
        
      }//ELECCIÓN DE HELADERA O CUARTO
      
            if(pantalla === 20){//pantalla izquierda//HELADERA
              
              PantsEstaticasARRIBA('heladera', "Oh! la heladera se ve extraña,\n ¿debería investigar?",'flecha2',460);
              pasarpantalla(460,335,540,415,12);
              si();
                pasarpantalla(180,250,270,290,51);
              no();
                pasarpantalla(320,250,410,290,52);
            }
            
            if(pantalla === 21){//pantalla derecha//CUARTO
              
              PantsEstaticasARRIBA('imag14', "No lo encuentro,\n¿Debería seguir buscando?",'flecha1',10);
              pasarpantalla(10,335,90,415,12);
              no();
              pasarpantalla(320,250,410,290,53);
            }
 
  //SI MI PANTALLA ES IGUAL A X voy a la DERECHA
        if (pantalla === 13) {
          desicion1();
          
        }//ELECCION DE SALIR O NO
        
                    if(pantalla === 50){
                      finalAfuera('final de Bill',"No encontraste\n Pato afuera",250);
                    }//final malo1
                    if(pantalla === 51){
                      finalAfuera('final malo2',"Buscaste donde\n no debías",200);
                    }//final malo2
                    if(pantalla === 52){
                      finalAfuera('final bueno',"Felicidades!\n Pato te encontró",0);
                    }//final bueno :D
                    if(pantalla === 53){
                      finalAfuera('final malo1',"Rendirse no era\n la mejor opción",250);
                    }  //final malo3
        
  //INTRUCCIONES
    if(pant === 10){
      pantallax('plano');
      posimag('mouse',100);
      posimag('teclas',300);
       image(fotos ['flecha1'],210,100,80,80);
       image(fotos ['flecha2'],290,100,80,80);
       image(fotos ['click'],200,120,100,80);
       push();
       boton(50,200,355,160,0, 150, 120, 50, 1000);
       stroke(0);
       fill(0);
       txt("Para poder avanzar en ésta novela gráfica,\n necesitás moverte con las flechas indicadas\n en la imágen derecha y pasar por las puertas\n(rectángulos) que te llevarán a otra pantalla. Luego\n verás necesario pasar de pantalla con el click del\n mouse, es escencial que toques esas flechas\n o cliquees en algún botón necesario para\n el avance de la trama.  ",60,220,15);
       pop();
     bot();}
      
      
  tiempo();
}//[fin del codigo]

function mousePressed() {
  // MUSICA
  if (musica.isPlaying()) {
    musica.loop();
  } else {
    musica.play();
  }
}
