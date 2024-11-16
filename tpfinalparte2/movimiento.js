function movimiento() {

  if (keyIsDown(LEFT_ARROW)) {
    m -= 5; // Mueve a la izquierda
  }
  if (keyIsDown(RIGHT_ARROW)) {
    m += 5; // Mueve a la derecha
  }
  if (keyIsDown(UP_ARROW)) {
    b -= 5; // Mueve hacia arriba
  }
  if (keyIsDown(DOWN_ARROW)) {
    b += 5; // Mueve hacia abajo
  }
}
function limites() {
  // Limita el movimiento dentro de la pantalla
  m = constrain(m, 0, width - size);
  b = constrain(b, 0, height - size);
}


function mabele () {

  movimiento();
  limites();
  image(mabel, m, b, 40, 40);
}
