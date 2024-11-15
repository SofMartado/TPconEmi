//funciones para los créditos

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

function creditosfinales(v){
  
  if (temp / 60 < 10) {
    push();
    fill(v);
    
    //Dibuja los créditos
    for (let i = 0; i < creditos.length; i++) {
      textAlign(CENTER);
      textSize(24);
      text(creditos[i], width / 2, j + i * 40);
      j -= speed/5;
    }
    pop();
    // Desplazar los créditos hacia arriba
    
  }  if (frameCount/ 60 >= 10 && frameCount / 60 < 1000) {
    bot();
  }
}
