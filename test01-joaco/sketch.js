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
}

function draw() {
    background(255); // Fondo blanco

    // Análisis de sonido
    let bass = fft.getEnergy("bass");      // Graves
    let treble = fft.getEnergy("treble");  // Agudos

    for (let fig of figures) {
        let img = imgs[fig.imgIndex];
        if (img) {
            // Calcula el tint modificado por el sonido
            let r = map(treble, 0, 255, fig.baseTint[0], 255);
            let g = map(treble, 0, 255, fig.baseTint[1], 255);
            let b = map(treble, 0, 255, fig.baseTint[2], 255);
            let a = fig.baseTint[3];

            tint(r, g, b, a);
            image(img, fig.x, fig.y); // Tamaño original
        }
    }
}