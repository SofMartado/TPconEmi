//Link del video a Youtube : No grabado
//TP#Final — Videojuego Web [Etapa 2]
// Alumnos :  Emiliano Esteban Giuliano, Sofía Martínez Bogado.
// Legajos :  119084/3 | 119083/3


/*
Serie Animada: Gravity Falls
 premisa : Mabel se despierta y no encuentra a Pato,su mascota, a su lado
 así que en este juego tendras que ir visitando habitaciones para encontrarlo
 y obtener el final esperado.
*/


let e = new Particula(5);

let a = new Particula(4);

let i = new Particula(3);

let fotos = [];
let n, m,pantalla,pant;

let gif;
let img, mabel;
let mm, b;
let size = 40;

function preload(){
 fotos ['imag0'] = loadImage('data/fotodemenu.jpg'); 
 fotos ['teclas'] = loadImage('data/teclado.jpg');
  fotos ['mouse'] = loadImage('data/mouse.png');
  fotos ['click'] = loadImage('data/click.png');
  fotos ['plano'] = loadImage('data/planos.png');
  fotos ['flecha1'] = loadImage('data/flecha1.png');
  fotos ['flecha2'] = loadImage('data/flecha2.png');
  
  img = loadImage('data/images.png');
  mabel = loadImage('data/Mabel.png');
  
  gif = loadImage('data/pelea.gif');
}

function setup() {

  createCanvas(640, 480);
  
  x = width; // Inicia la posición de el jugador
  y = height / 2;
  
  n = width / 3;//valor que se repite
  m = height-180;
  
  mm = width;
  
  b = height / 2;
  
    pantalla = 0;
    pant = 0;
}


function draw() {

  background(100);
  
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
  
if(pantalla === 1){
  image(gif, 0, 0, 640, 480);
  
  e.actualizar();

  e.reciclar();

  e.dibujar();



  a.actualizar();

  a.reciclar();

  a.dibujar();



  i.actualizar();

  i.reciclar();

  i.dibujar();
  
   mabele ();
  
  bot();
}

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
       txt("Para poder avanzar en éste juego,\n necesitás moverte con las flechas indicadas\n en la imágen derecha y pasar por las puertas\n(rectángulos) que te llevarán a otra pantalla. Luego\n verás necesario el click del\n mouse, para poder descubrir objetos!.",60,220,15);
       pop();
     bot();}
}

function menu(){
    
   image(fotos ['imag0'],0,0);
   push();
   boton(width / 3, height-180, 200 , 50 ,5,120,80,5,1,"jugar");
   pop();

   push();
   boton1(width / 3, height-120, 200, 50, 5, 120, 80, 5, 1, "instrucciones");
   pop();
  
}

function boton(cX,cY,cW,cH,r,xr,xg,xb,v,texto){
  relleno(xr,xg,xb,v);
  rect(cX,cY,cW,cH,r);
  txt(texto,280,332,25);
}

function boton1(cX,cY,cW,cH,r,xr,xg,xb,v,texto){
  stroke(v);
  fill(xr,xg,xb)
  rect(cX,cY,cW,cH,r);
  txt(texto,245,390,25);
}

function relleno(xr,xg,xb,v){
  stroke(v);
  fill(xr,xg,xb)
}

function txt(t,x,y,s){
   textSize(s);
   text(t, x ,y);
}

function dentro(u){
  if (mouseX > n && mouseY > m && mouseX < 415 && mouseY < 350) {
     boton(width / 3, height-180, 200, 50, 5, 150, 120, 50, 1000, "jugar");//cambia color
       if (mouseIsPressed ) { 
         if (mouseX > n && mouseY > m && mouseX < 415 && mouseY < 350) {
            pantalla = u;            
            }}}
}

function dentru(u){
  if (mouseX > n && mouseY > 360 && mouseX < 415 && mouseY < 410) {
     boton1(width / 3, height-120, 200, 50, 5, 150, 120, 50, 1000, "instrucciones");//cambia color
     if (mouseIsPressed) { 
         if (mouseX > n && mouseY > 360 && mouseX < 415 && mouseY < 410) {
            pant = u;         
            }}}
}
     
  function posimag(pos,Y){
  image(fotos[pos],415,Y,180,150);
}
  function pantallax(x){
  image(fotos [x], 0, 0, 640, 480); 
}
function bot(){
  
   push();
   fill(255);
  rect(50, height-100, 100, 50  ); 
  textAlign(CENTER);
  textSize(25);
  fill(0);
  text("Menú",100,415);
  pop(); 
  
  dentroFin();
}
function dentroFin(){
  if (mouseX > 50 && mouseY > height-100 && mouseX < 50+100 && mouseY < height-100+50) {
    if(mouseIsPressed){  
      pantalla = 0;
      pant = 0;
       j = 550;
          speed = 1;
          frameCount = 10;
  }}
}
