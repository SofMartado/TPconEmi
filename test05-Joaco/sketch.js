// ========================
// CONFIGURACIÓN
// ========================

const AMP_MIN = 0.000;
const AMP_MAX = 0.555;
const AMP_THRESHOLD = 0.025;
const MAX_FIGURAS = 200;

// ========================
// VARIABLES GLOBALES
// ========================

let imgs = [];
const cantidad = 13;

let mic, fft;
let figuras = [];

// ========================
// PRELOAD
// ========================

function preload() {
    for (let i = 0; i < cantidad; i++) {
        const nombre = "img/imagen" + nf(i + 1, 2) + ".png";
        imgs[i] = loadImage(nombre);
    }
}

// ========================
// SETUP
// ========================

function setup() {
    createCanvas(1360, 768);
    imageMode(CENTER);
    background(255);

    mic = new p5.AudioIn();
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);
}

// ========================
// DRAW LOOP
// ========================

function draw() {
    background(255);

    // Obtener amplitud general
    const amp = mic.getLevel();

    // Obtener energía por bandas
    const bass = fft.getEnergy("bass");
    const mid = fft.getEnergy("mid");
    const treble = fft.getEnergy("treble");

    // Mostrar valores en pantalla
    fill(0);
    noStroke();
    text("Amplitud: " + nfc(amp, 3), 200, 200);
    text("Bass: " + nfc(bass, 1), 200, 220);
    text("Treble: " + nfc(treble, 1), 200, 240);

    // Agregar nuevas figuras si hay sonido
    if (amp > AMP_THRESHOLD) {
        const imagenRandom = int(random(cantidad));
        const img = imgs[imagenRandom];
        const x = random(0, width - img.width);
        const y = random(0, height - img.height);
        const categoria = int(random(1, 5));
        const color = [
            random(180, 255),
            random(180, 255),
            random(180, 255),
            120
        ];

        figuras.push(new Figura(imagenRandom, x, y, categoria, color));

        if (figuras.length > MAX_FIGURAS) {
            figuras.shift();
        }
    }

    // Dibujar todas las figuras
    for (let fig of figuras) {
        fig.actualizar(bass, treble);
        fig.dibujar(imgs);
    }
}

// Esta función debe estar fuera de draw()
function mousePressed() {
    userStartAudio();  // Obligatorio por políticas del navegador
}
