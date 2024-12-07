//Link del video a Youtube : https://youtu.be/CvAmiyxRCLQ
//TP#Final — Recuperatorio Videojuego Web [Etapa 2]
// Alumnos :  Emiliano Esteban Giuliano, Sofía Martínez Bogado.
// Legajos :  119084/3 | 119083/3

/*
Serie Animada: Gravity Falls
 Objetivo del juego : Derribar a todos los Bills en 1 min.
 */


let fondos = [];
let personajes = [];
let botones = [];
let musica = [];

let objMenu;
let objJuego;
let objInstrucciones;
let pantallaActual;

let objCreditos;
    


function preload(){
  
  soundFormats('mp3');
  
  musica ['1']= loadSound('/data/disparo.mp3');
  musica ['2']= loadSound('/data/music.mp3');

  
  fondos['FondoDeMenu'] = loadImage('data/Feria.gif');
  fondos['FondoDeFeria'] = loadImage('data/Menu.gif');
  fondos['Feria'] = loadImage('data/feria.png');
  fondos['FondoDeInstrucciones'] = loadImage('data/instrucciones.gif');
  fondos['Instrucciones'] = loadImage('data/instrucciones.png');
  fondos['FondoDeCréditos'] = loadImage('data/batalla.gif');
  fondos['GuiaDelJuego'] = loadImage('data/guiadeljuego.gif');
  fondos['FondoJuego'] = loadImage('data/fondoJuego.png');
  
  personajes ['bill2'] = loadImage('data/BillPoder.gif');
  personajes ['bill'] = loadImage('data/BillSin.gif');
  personajes ['mabel'] = loadImage('data/mabelrifle.gif');
  personajes['Mira'] = loadImage('data/Mira.png');
  
  botones['jugar'] = loadImage('data/jugar.gif');
  botones['guia'] = loadImage('data/guia.gif');
  botones['creditos'] = loadImage('data/creditos.gif');
  botones['reiniciar'] = loadImage('data/reiniciar.gif');
  
  botones['tiempo'] = loadImage('data/tiempo.gif');
  botones['sonido'] = loadImage('data/sonido.gif');
}//fin del codigo

function setup() {
  
  createCanvas(640,480);
  console.log("Inicializando pantallas...");
  
  objMenu = new Menu(objJuego,objInstrucciones,objCreditos);
  console.log("Menú inicializado:", objMenu);
  
  objJuego = new Juego(objJuego,objMenu);
  console.log("Juego inicializado:", objJuego);
  
  objInstrucciones = new Instrucciones(objMenu);
  console.log("Instrucciones inicializadas:", objInstrucciones);
  
  objCreditos = new Créditos(objMenu);
  console.log("Creditos inicializado:", objCreditos);
  
  objMenu = new Menu(objJuego,objInstrucciones,objCreditos);
  console.log("Menú inicializado:", objMenu);
  
  objJuego = new Juego(objJuego,objMenu);
  console.log("Juego inicializado:", objJuego);
  
  objInstrucciones = new Instrucciones(objMenu);
  console.log("Instrucciones inicializadas:", objInstrucciones);
  
  objCreditos = new Créditos(objMenu);
  console.log("Creditos inicializado:", objCreditos);
  
  objMenu = new Menu(objJuego,objInstrucciones,objCreditos);
  console.log("Menú inicializado:", objMenu);
  
  objJuego = new Juego(objJuego,objMenu);
  console.log("Juego inicializado:", objJuego);
  
  objInstrucciones = new Instrucciones(objMenu);
  console.log("Instrucciones inicializadas:", objInstrucciones);
  
  objCreditos = new Créditos(objMenu);
  console.log("Creditos inicializado:", objCreditos);
  
  objMenu = new Menu(objJuego,objInstrucciones,objCreditos);
  console.log("Menú inicializado:", objMenu);
  
  pantallaActual = objMenu;
  console.log("Pantalla actual:", pantallaActual);
  
  
}//fin del codigo


function draw() {
  background(100); 
  
  if (pantallaActual) {
    pantallaActual.dibujar();
  } else {
    console.error("pantallaActual está undefined , no se puede dibujar.");
  }
}//fin del codigo

function mousePressed() {
  if (pantallaActual && pantallaActual.mousePressed) {
    pantallaActual.mousePressed();
  } 
  
}//fin del codigo
