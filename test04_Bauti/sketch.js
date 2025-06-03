//VARIABLES DE CALIBRACIÓN

let AMP_MIN = 0.000;
let AMP_MAX = 0.555;

//ARREGLO DE IMAGENES

let imgs = [];
let cantidad = 13;

//VARIABLES DE SONIDO

let mic, fft;



function preload() {
    for (let i = 0; i < cantidad; i++) {
        let nombre = "img/imagen" + nf(i + 1, 2) + ".png";
        imgs[i] = loadImage(nombre);
    }
}

function setup() {
    createCanvas(1000, 1000);
    imageMode(CENTER);
    background(255);


    //CREAR INSTANCIA DE AUDIO E INICIAR AUDIO

    mic = new p5.AudioIn();
    mic.start();

    //LO DE FFT Y SETEAR EL MIC


    fft = new p5.FFT();
    fft.setInput(mic);

}

function draw() {

    //ARRANCAR TOMA DE AUDIO Y VARIABLE PARA OBTENER FRECUENCIA

    userStartAudio();
    amp = mic.getLevel();

    //RETORNO 

    let retornoDeAudio = "Amplitud:" + nfc(amp, 3);
    text(retornoDeAudio, 200, 200);

    //ANALISIS DE SONIDO

    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");

    //VARIABLES PARA POSICIONAMIENTO RANDOM


    if (amp > 0.025) {
        let imagenRandom = int(random(cantidad));
        let x = random(0, width - 262);
        let y = random(0, height - 345);

        let angulo = map(treble, 0, 255, -45, 45);
        let rotacion = radians(angulo);
        push();
        translate(x, y);
        rotate(rotacion);
        image(imgs[imagenRandom], x, y);
        pop();
    }
}