let engine;
let world;
let boxes = [];
let ground;
let boxImages = [];
const SCALE = 0.5; 
let lastBoxTime = 0; 
const BOX_INTERVAL = 200;  
let estadoSonido = "silencio";
let estadoSonidoSimulado = "silencio";
let crearCaja = false;
let reiniciarJuego = false;

let amp_min = 0.000;
let amp_max = 0.555;
let mic, fft, amp;

let gestor;
let altoGestor = 100;
let anchoGestor = 400;
let cooldown = 0;

let audioContext;
let gestorPitch;
const minNota = 40;
const maxNota = 74;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;


let gameState = "pantalla_inicial"; // "pantalla_inicial", "juego"
let paletas = [
    {
        nombre: "Calida",
        color: "#FF7043", // naranja/cálido
        imagenes: []
    },
    {
        nombre: "Fria",
        color: "#42A5F5", // azul/frío
        imagenes: []
    },
    {
        nombre: "Verde",
        color: "#66BB6A", // verde
        imagenes: []
    }
];
let paletaSeleccionada = 0; // índice de la paleta seleccionada

// Variables para la bola de selección
let bola = {
    x: 0,
    y: 60,
    r: 35,
    vx: 4,
    vy: 0,
    cayendo: false,
    seleccionada: false
};

// Variables físicas para la bola y las paletas en la pantalla inicial
let bolaBody = null;
let paletaBodies = [];
let bolaEnMovimientoHorizontal = true; // controla el movimiento horizontal
let flecha;

function preload() {
    // Carga imágenes para cada paleta
    for (let p = 0; p < paletas.length; p++) {
        for (let i = 0; i <= 7; i++) {
            // Cambia el path según las nuevas carpetas: img/calida/box0.png, etc.
            let path = `img/${paletas[p].nombre.toLowerCase()}/box${i}.png`;
            paletas[p].imagenes[i] = loadImage(path);
        }
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
    createCanvas(600, 1000);
    engine = Matter.Engine.create();
    world = engine.world;
    Matter.Engine.run(engine);


    mic = new p5.AudioIn();
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);

    gestor = new GestorSenial(amp_min, amp_max);
    gestor.dibujarDerivada = true; 
    audioContext = getAudioContext();
    gestorPitch = new GestorSenial(minNota, maxNota);
    mic.start(startPitch);  // ¡muy importante!

    userStartAudio(); // asegúrate de que está acá también


    ground = Matter.Bodies.rectangle(400, height - 50, 810, 60, { isStatic: true });
    Matter.World.add(world, ground);

    // Pared izquierda
    let wallLeft = Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
    // Pared derecha
    let wallRight = Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
    // Techo
    let ceiling = Matter.Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });

    Matter.World.add(world, [wallLeft, wallRight, ceiling]);

    bola.x = bola.r + 10; // Inicia a la izquierda
    bola.y = 60;
    bola.vx = 4;
    bola.vy = 0;
    bola.cayendo = false;
    bola.seleccionada = false;

    // Inicializa la física de la bola y paletas para la pantalla inicial
    crearFisicaPantallaInicial();
}

function crearFisicaPantallaInicial() {
    // Elimina cuerpos previos si existen
    if (bolaBody) Matter.World.remove(world, bolaBody);
    for (let b of paletaBodies) Matter.World.remove(world, b);
    paletaBodies = [];

    // Bola física
    bolaBody = Matter.Bodies.circle(80, 60, 35, {
        restitution: 0.7,
        friction: 0.05,
        frictionAir: 0.002,
        isStatic: true 
    });
    Matter.World.add(world, bolaBody);

    // Paletas físicas (rectángulos completos, no solo plataformas)
    let btnW = 150, btnH = 150;
    let spacing = 50;
    let totalW = paletas.length * btnW + (paletas.length - 1) * spacing;
    let startX = (width - totalW) / 2 + btnW / 2;
    let yPaletas = height / 2;
    for (let i = 0; i < paletas.length; i++) {
        let x = startX + i * (btnW + spacing);
        // Crea un rectángulo completo para cada paleta
        let body = Matter.Bodies.rectangle(x, yPaletas, btnW, btnH, {
            isStatic: true,
            label: "paleta" + i
        });
        paletaBodies.push(body);
    }
    Matter.World.add(world, paletaBodies);

    bolaEnMovimientoHorizontal = true; // Reinicia el estado
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
    if (gameState === "pantalla_inicial") {
        background(150);
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(255,0,0);
        text("Aplaudi para elegir una paleta de colores", width / 2, 200);

        // Dibuja botones para cada paleta
        let btnW = 150, btnH = 150;
        let spacing = 50;
        let totalW = paletas.length * btnW + (paletas.length - 1) * spacing;
        let startX = (width - totalW) / 2 + btnW / 2;
        let yPaletas = height / 2;

        for (let i = 0; i < paletas.length; i++) {
            let x = startX + i * (btnW + spacing);
            fill(paletas[i].color);
            stroke(255);
            strokeWeight(2);
            rectMode(CENTER);
            rect(x, yPaletas, btnW, btnH, 20);
            fill(255);
            noStroke();
            textSize(24);
            text(paletas[i].nombre, x, yPaletas + btnH / 2 + 30);
        }

        // --- Bola física con movimiento horizontal manual ---
        let bx = bolaBody.position.x;
        let by = bolaBody.position.y;

        if (bolaEnMovimientoHorizontal) {
            // Movimiento horizontal manual
            bolaBody.isStatic = true;
            let nextX = bx + bola.vx;
            if (nextX - 35 < 0 || nextX + 35 > width) {
                bola.vx *= -1;
            }
            Matter.Body.setPosition(bolaBody, { x: bx + bola.vx, y: 60 });
        }

        // Dibuja la bola física SIEMPRE, aunque esté cayendo
        fill(255, 220, 80);
        stroke(255);
        strokeWeight(3);
        ellipse(bolaBody.position.x, bolaBody.position.y, 70);

        // Rebote lateral solo si la bola está cayendo
        if (!bolaEnMovimientoHorizontal) {
            if (bx - 35 < 0 && bolaBody.velocity.x < 0) {
                Matter.Body.setVelocity(bolaBody, { x: Math.abs(bolaBody.velocity.x), y: bolaBody.velocity.y });
            }
            if (bx + 35 > width && bolaBody.velocity.x > 0) {
                Matter.Body.setVelocity(bolaBody, { x: -Math.abs(bolaBody.velocity.x), y: bolaBody.velocity.y });
            }
        }

        // Detectar aplauso en pantalla inicial para hacer caer la bola
        userStartAudio();
        amp = mic.getLevel();
        gestor.actualizar(amp);

        let umbralAplauso = 1; // ajusta según tu micro

        if (cooldown > 0) {
            cooldown--;
        }

        if (
            (gestor.derivada > umbralAplauso && cooldown === 0 && bolaEnMovimientoHorizontal) ||
            ((mouseIsPressed || keyIsPressed) && bolaEnMovimientoHorizontal && cooldown === 0)
        ) {
            bolaEnMovimientoHorizontal = false;
            Matter.Body.setPosition(bolaBody, { x: bolaBody.position.x, y: 60 });
            Matter.Body.setVelocity(bolaBody, { x: 0, y: 5 });
            Matter.Body.setStatic(bolaBody, false);
            cooldown = 30;
        }

        // Selección de paleta: la PRIMERA que toque la bola (parte inferior de la bola toca parte superior de la paleta)
        if (!bolaEnMovimientoHorizontal) {
            for (let i = 0; i < paletaBodies.length; i++) {
                let b = paletaBodies[i];
                let btnW = 150, btnH = 150;
                let left = b.position.x - btnW / 2;
                let right = b.position.x + btnW / 2;
                let top = b.position.y - btnH / 2;
                let bottom = b.position.y + btnH / 2;
                // Detecta si la parte inferior de la bola toca la parte superior de la paleta
                let bolaBottom = by + 35; // radio de la bola
                if (
                    bx > left && bx < right &&
                    bolaBottom >= top && bolaBottom <= top + 20 // margen de 20px para el contacto
                ) {
                    paletaSeleccionada = i;
                    gameState = "juego";
                    Matter.World.remove(world, bolaBody);
                    for (let b of paletaBodies) Matter.World.remove(world, b);
                    paletaBodies = [];
                    bolaBody = null;

                    // --- flecha en movimiento ---
                    flecha = {
                        x: width / 2,
                        y: 60, //  cambia de 100 a 60
                        vx: 4,
                        moving: true
                    };
                    break;
                }
            }
        }

        return;
    }

    // --- JUEGO NORMAL ---
    // Cambia boxImages por la paleta seleccionada
    boxImages = paletas[paletaSeleccionada].imagenes;

    userStartAudio();
    amp = mic.getLevel();
    gestor.actualizar(amp);

    let retornoAudio = "Amplitud:" + nfc(amp, 3);
    text(retornoAudio, width / 2, width / 2);

    let umbralAplauso = 1; // ajusta según tu micro

    if (cooldown > 0) {
        cooldown--;
    }

    // Determina el nuevo estado del sonido
let nota = gestorPitch.filtrada;
let nuevoEstado;

if (nota > 66 || estadoSonidoSimulado === "fuerte") {
    nuevoEstado = "agudo"; // alto
} else if (nota > 53 || estadoSonidoSimulado === "medio") {
    nuevoEstado = "medio"; // medio
} else if (nota > 0) {
    nuevoEstado = "grave"; // bajo
} else {
    nuevoEstado = "silencio";
}
estadoSonido = nuevoEstado;
if (estadoSonido === "grave") {
    imgIndex = floor(random([0, 1, 4, 7]));
} else if (estadoSonido === "medio") {
    imgIndex = floor(random([5, 6, 3]));
} else if (estadoSonido === "agudo") {
    imgIndex = 2;
}


    // Solo crear cajas si el estado es "grave", "medio" o "agudo"
   if ((estadoSonido === "grave" || estadoSonido === "medio" || estadoSonido === "agudo") &&
    imgIndex !== undefined &&
    millis() - lastBoxTime > BOX_INTERVAL &&
    (crearCaja || amp > 0.03)) {

        img = boxImages[imgIndex];
        if (img && img.width && img.height) {
            angle = random(-PI / 8, PI / 8);
            w = img.width * SCALE;
            h = img.height * SCALE;

            // imgs debajo de la flecha
            let x = flecha.x;
            let y = flecha.y + 60;

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

    // felecha aparece solo si esta activa
    if (flecha.moving) {
        flecha.x += flecha.vx;
        if (flecha.x < 35 || flecha.x > width - 35) {
            flecha.vx *= -1;
        }
    }
    // dibuja la flecha
    push();
    fill(50, 100, 200);
    noStroke();
    triangle(flecha.x, flecha.y + 40, flecha.x - 20, flecha.y, flecha.x + 20, flecha.y);
    pop();
}

//inicia el modelo de Machine Learning para deteccion de pitch (altura tonal)
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
//select('#status').html('Model Loaded');
getPitch();
//console.log( "entro aca !" );
}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    //aca ingresa la frecuencia 'cruda'
  if (frequency) {    	
    //transforma la frevcuencia en nota musical
    let numeroDeNota = freqToMidi(frequency);
    // console.log( numeroDeNota );

    gestorPitch.actualizar( numeroDeNota );

  }

  getPitch();
})
}