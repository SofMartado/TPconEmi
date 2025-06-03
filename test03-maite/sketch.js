let AMP_MIN = 0.000;
let AMP_MAX = 0.055;

let imgs = [];
const totalImgs = 13;
let mic, fft;
let figures = [];

function preload() {
    for (let i = 1; i <= totalImgs; i++) {
        imgs.push(loadImage(`img/imagen${i}.png`));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    imageMode(CENTER);
    generarFiguras();
}

function draw() {
    background(255);
    userStartAudio();
    amp = mic.getLevel();

    let bass = fft.getEnergy("bass");
    let treble = fft.getEnergy("treble");

    for (let cuadrado of cuadrados) {
        let img = imgs[cuadrado.imgIndex];
        if (img) {
            let r = map(bass, 0, 255, cuadrado.baseTint[0], 255);
            let g = map(treble, 0, 255, cuadrado.baseTint[1], 255);
            let b = map(treble, 0, 255, cuadrado.baseTint[2], 255);
            let a = map(amp, AMP_MIN, AMP_MAX, cuadrado.baseTint[3], 255);

            tint(r, g, b, a);
            push();
            translate(cuadrado.x, cuadrado.y);
            rotate(radians(cuadrado.angle));
            scale(cuadrado.scale);
            image(img, 0, 0);
            pop();
        }
    }

    text("Amplitud:" + nfc(amp, 3), 100, 100);
}

function generarFiguras() {
    cuadrados = [];
    const cantidadFiguras = 500;
    const intentosMaximos = 100000;
    let intentos = 0;
    const separacion = -5;
    const margenBorde = 70; 

    for (let escalaBase of [0.9, 0.7, 0.5, 0.4, 0.2]) {
        while (cuadrados.length < cantidadFiguras && intentos < intentosMaximos) {
            let imgIndex = int(random(imgs.length));
            let img = imgs[imgIndex];
            let escala = random(max(escalaBase - 0.1, 0.3), escalaBase);
            let w = img.width * escala;
            let h = img.height * escala;
            let x = random(margenBorde + w / 2, width - margenBorde - w / 2);
            let y = random(margenBorde + h / 2, height - margenBorde - h / 2);
            let angulo = random(-10, 10);

            let nuevaFigura = {
                imgIndex,
                x,
                y,
                angle: angulo,
                scale: escala,
                width: w,
                height: h,
                baseTint: [
                    int(random(100, 180)),
                    int(random(150, 200)),
                    int(random(160, 210)),
                    200
                ]
            };

            let seSuperpone = cuadrados.some(f => siSeSuperponen(f, nuevaFigura, separacion));
            let esLimitrofeIgual = cuadrados.some(f =>
                siSeSuperponen(f, nuevaFigura, 0) && f.imgIndex === imgIndex
            );

            if (!seSuperpone && !esLimitrofeIgual) {
                cuadrados.push(nuevaFigura);
            }
            intentos++;
        }
    }
}

function siSeSuperponen(a, b, margen) {
    return !(
        a.x + a.width / 2 + margen < b.x - b.width / 2 - margen ||
        a.x - a.width / 2 - margen > b.x + b.width / 2 + margen ||
        a.y + a.height / 2 + margen < b.y - b.height / 2 - margen ||
        a.y - a.height / 2 - margen > b.y + b.height / 2 + margen
    );
}