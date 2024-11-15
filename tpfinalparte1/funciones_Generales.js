function pantallax(x){
  image(fotos [x], 0, 0, 640, 480); 
}


function movimiento(){
  
   if (keyIsDown(LEFT_ARROW)) {
    x -= 5; // Mueve a la izquierda
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5; // Mueve a la derecha
  }
  if (keyIsDown(UP_ARROW)) {
    y -= 5; // Mueve hacia arriba
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5; // Mueve hacia abajo
  }
}
function limites(){
  // Limita el movimiento dentro de la pantalla
  x = constrain(x, 0, width - size);
  y = constrain(y, 0, height - size);
}

function tiempo(){
 textSize(20);
    fill(0);
    rect(0, 5, 120, 35);
    fill(255, 0, 0);
    text(temp, 80, 30 );
    text("Tiempo:", 5, 30);
}

//__________________________________________________

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
function pasarpantalla(N,M,NN,MM,u,uu){
  if(mouseX > N && mouseY > M && mouseX < NN && mouseY < MM){
 if(mouseIsPressed){
   pantalla = u ;
   pant = uu;
 }}
}

function relleno(xr,xg,xb,v){
  stroke(v);
  fill(xr,xg,xb)
}

function txt(t,x,y,s){
   textSize(s);
   text(t, x ,y);
}
