let AMP_MIN = 0.000;
let AMP_MAX = 0.055;

let objRotacion;

let rotadores = [];

let amp;
let imgs = [];
const totalImgs = 13;
let mic, fft;
let figures = [];
const numFigures = 7; // Número de figuras simultáneas

function preload() {
    for (let i = 1; i <= totalImgs; i++) {
        imgs.push(loadImage(`img/imagen${i}.png`)); // Asegúrate de que las imágenes estén en la carpeta img
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    imageMode(CENTER);

    let objRotacion = new Rotacion();


    // Define el margen (por ejemplo, 60 píxeles)
    const margin = 130;

    // Inicializa las figuras con imágenes, posiciones y tintes originales aleatorios
    for (let i = 0; i < numFigures; i++) {
        figures.push({
            imgIndex: int(random(imgs.length)),
            x: random(margin, width - margin),
            y: random(margin, height - margin),
            baseTint: [
                int(random(100, 255)), // R
                int(random(100, 255)), // G
                int(random(100, 255)), // B
                120                    // Alpha
            ]
        });
    }

    for (let i = 0; i < 5; i++) {
        let img = imgs[int(random(imgs.length))];
        let x = random(150, width - 150);
        let y = random(150, height - 150);
        rotadores.push(new Rotacion(img, x, y));
    }


}

function draw() {
    background(255); // Fondo blanco

    userStartAudio();

    amp = mic.getLevel();
    let texto = "Amplitud:" + nfc(amp, 3);
    text(texto, 100, 100);



    // Análisis de sonido
    let bass = fft.getEnergy("bass");      // Graves
    let treble = fft.getEnergy("treble");  // Agudos

    for (let fig of figures) {
        let img = imgs[fig.imgIndex];
        if (img) {
            // Calcula el tint modificado por el sonido
            let r = map(bass, 0, 255, fig.baseTint[0], 255);
            let g = map(treble, 0, 255, fig.baseTint[1], 255);
            let b = map(treble, 0, 255, fig.baseTint[2], 255);
            let a = map(amp, AMP_MIN, AMP_MAX, fig.baseTint[3], 255);

            tint(r, g, b, a);
            image(img, fig.x, fig.y); // Tamaño original
        }
    }


    for (let r of rotadores) {
        r.rotarYdibujar();
    }
}