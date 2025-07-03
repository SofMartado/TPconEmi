let engine;
let world;
let boxes = [];
let ground;
let boxImages = [];
const SCALE = 0.5; // Cambia este valor para ajustar la escala
let lastBoxTime = 0; // Agrega esto al inicio del archivo
const BOX_INTERVAL = 200; // milisegundos entre cajas   
let estadoSonido = "silencio";

let amp_min = 0.000;
let amp_max = 0.555;
let mic, fft, amp;

let gestor;
let altoGestor = 100;
let anchoGestor = 400;
let cooldown = 0;


function preload() {
    // Crea un array con los nombres de las imágenes
    let imageNames = [];
    for (let i = 0; i <= 7; i++) {
        imageNames.push(`img/box${i}.png`);
    }

    // Carga las imágenes en el orden aleatorio
    for (let i = 0; i <= 7; i++) {
        boxImages[i] = loadImage(`img/box${i}.png`);
    }
}

// Función para desordenar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setup() {
    createCanvas(600, 700);
    engine = Matter.Engine.create();
    world = engine.world;
    Matter.Engine.run(engine);



    mic = new p5.AudioIn();
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);

    gestor = new GestorSenial(amp_min, amp_max);
    gestor.dibujarDerivada = true; // opcional, para mostrar también la derivada

    ground = Matter.Bodies.rectangle(400, height - 50, 810, 60, { isStatic: true });
    Matter.World.add(world, ground);

    // Pared izquierda
    let wallLeft = Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
    // Pared derecha
    let wallRight = Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
    // Techo
    let ceiling = Matter.Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });

    Matter.World.add(world, [wallLeft, wallRight, ceiling]);
}

function Box(x, y, w, h, imgIndex, angle = 0) {
    this.body = Matter.Bodies.rectangle(x, y, w * SCALE, h * SCALE);
    Matter.Body.setAngle(this.body, angle); // Aplica la rotación inicial
    this.w = w * SCALE;
    this.h = h * SCALE;
    this.imgIndex = imgIndex;
    Matter.World.add(world, this.body);

    this.show = function () {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(boxImages[this.imgIndex], 0, 0, this.w, this.h);
        pop();
    }
}

function isSpaceFree(x, y, w, h) {
    for (let i = 0; i < boxes.length; i++) {
        let b = boxes[i];
        // Calcula los bordes de la nueva caja
        let leftA = x - w / 2;
        let rightA = x + w / 2;
        let topA = y - h / 2;
        let bottomA = y + h / 2;
        // Calcula los bordes de la caja existente
        let pos = b.body.position;
        let leftB = pos.x - b.w / 2;
        let rightB = pos.x + b.w / 2;
        let topB = pos.y - b.h / 2;
        let bottomB = pos.y + b.h / 2;
        // Si se superponen, retorna false
        if (!(leftA > rightB || rightA < leftB || topA > bottomB || bottomA < topB)) {
            return false;
        }
    }
    // También verifica que esté dentro del canvas
    if (x - w / 2 < 0 || x + w / 2 > width || y - h / 2 < 0 || y + h / 2 > height) {
        return false;
    }
    return true;
}

function draw() {
    userStartAudio();
    amp = mic.getLevel();
    gestor.actualizar(amp);

    let retornoAudio = "Amplitud:" + nfc(amp, 3);
    text(retornoAudio, width / 2, width / 2);

    let umbralAplauso = 0.8; // ajusta según tu micro

    if (cooldown > 0) {
        cooldown--;
    }

    // Detectar aplauso con la derivada
    if (gestor.derivada > umbralAplauso && cooldown === 0) {
        for (let i = 0; i < boxes.length; i++) {
            Matter.World.remove(world, boxes[i].body);
        }
        boxes = [];
        cooldown = 30; // espera 30 frames (~0.5 seg)
        print("¡Aplauso detectado! Cajas eliminadas.");
    }

    // Determina el nuevo estado del sonido
    let nuevoEstado;
    if (amp > 0.03) {
        nuevoEstado = "fuerte";
    } else if (amp > 0.01) {
        nuevoEstado = "medio";
    } else {
        nuevoEstado = "silencio";
    }

    // Si el estado cambia entre "medio" y "fuerte", borra los cuadros anteriores
    if (
    (estadoSonido === "medio" && nuevoEstado === "fuerte") ||
    (estadoSonido === "fuerte" && nuevoEstado === "medio")
) {
    for (let i = 0; i < boxes.length; i++) {
        Matter.World.remove(world, boxes[i].body);
    }
    boxes = [];
}
    estadoSonido = nuevoEstado;

    // Selección de imágenes y creación de cajas según el estado
    let imgIndex, img, w, h, angle;
    if (estadoSonido === "fuerte") {
        imgIndex = floor(random(4, 8)); // verdes
    } else if (estadoSonido === "medio") {
        imgIndex = floor(random(0, 4)); // colores
    }

    // Solo crear cajas si el estado es "fuerte" o "medio"
    if ((estadoSonido === "fuerte" || estadoSonido === "medio") && imgIndex !== undefined && millis() - lastBoxTime > BOX_INTERVAL) {
        img = boxImages[imgIndex];
        if (img && img.width && img.height) {
            angle = random(-PI / 8, PI / 8);
            w = img.width * SCALE;
            h = img.height * SCALE;

            let x = random(w / 2, width - w / 2);
        let y = random(h / 2, height / 2);

            if (isSpaceFree(x, y, w, h)) {
    let box = new Box(x, y, img.width, img.height, imgIndex, angle);
    boxes.push(box);
    lastBoxTime = millis();
}
        }
    }

    background(255);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let pos = box.body.position;
        let bottom = pos.y + box.h / 2;
        if (bottom >= ground.position.y - 55 && !box.body.isStatic) {
            Matter.Body.setStatic(box.body, true);
        }
        box.show();
    }
    fill(255);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, 810, 60);

    gestor.dibujar(100, height - altoGestor - 20);
}

function mousePressed() {


}