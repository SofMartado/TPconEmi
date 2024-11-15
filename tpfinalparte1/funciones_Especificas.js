function menu(){
    
   image(fotos ['imag0'],0,0);
   push();
   boton(width / 3, height-180, 200 , 50 ,5,120,80,5,1,"jugar");
   pop();

   push();
   boton1(width / 3, height-120, 200, 50, 5, 120, 80, 5, 1, "instrucciones");
   pop();
  
}

function mabel (){
 movimiento();
         limites();
         image(fotos ['Mabel'], x, y, size, size); 
}

function MabelEST(f,v){//Mabel estática | habitaciones del pasillo
 fill(61,39,40);
         rect(0, 330, 640, 165);
         image(fotos ['Mabel2'],530,320,110,160);
         image(fotos [f],v,335,80,80); 
}

function MabelHabla(u){
  fill(61,39,40);
        rect(0, 330, 640, 165);
        
 image(fotos ['Mabel2'],530,320,110,160);
 image(fotos ['flecha1'],10,u,80,80);
 image(fotos ['flecha2'],460,u,80,80); 
}

//FUNCIONES PARA PANTALLAS

function si() {
  fill(150, 100, 50);
  rect (180, 250, 90, 40);
  push();
      fill(0);
      textSize(30);
      stroke(5);
      text('Sí', 205, 280);
  pop();
}
function no() {
  fill(150, 100, 50);
  rect (320, 250, 90, 40);
  push();
      fill(0);
      textSize(30);
      stroke(5);
      text('No', 350, 280);
  pop();
}

function comic(o,f){
 if(pantalla === o){
   pantallax(f);
 }
}
function PantsEstaticasARRIBA(f,t,p,v){   
         pantallax(f);
         MabelEST(p,v);
         TextPant(t);
}

function PantsEstaticasABAJO(f,t,u){   
         pantallax(f);
         MabelHabla(u);
         TextPant(t);
}

function TextPant(t){//texto de Mabel
  fill(255);
         txt(t,150, 400,15);
}

function volver(u){
         boton(220,418,100,50,0,150, 100, 50,200);
         relleno(220, 220,220,5);
         txt("volver", 245, 450,20);
         
         pasarpantalla(220,418,320,468,u); 
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

function clikboro(mm,m,n){//boton de las pantallas de arriba
  if(mouseIsPressed){
    if (mouseX > 10 && mouseY > 335 && mouseX < 90 && mouseY < 415) {
    pantalla = mm; // Cambia a la segunda pantalla
    x = m; // Inicia la posición de el jugador
    y = n;
    }}
}
function posimag(pos,Y){
  image(fotos[pos],415,Y,180,150);
}
