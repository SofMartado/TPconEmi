let engine;
let world;
let boxes = [];
let ground;
let boxImages = [];
const SCALE = 0.5; // Cambia este valor para ajustar la escala

function preload() {
    // Crea un array con los nombres de las imágenes
    let imageNames = [];
    for (let i = 0; i <= 12; i++) {
        imageNames.push(`img/box${i}.png`);
    }
    // Desordena el array de nombres
    shuffleArray(imageNames);

    // Carga las imágenes en el orden aleatorio
    for (let i = 0; i < imageNames.length; i++) {
        boxImages[i] = loadImage(imageNames[i]);
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

    this.show = function() {
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
    background(255);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        // Detecta si la caja toca el suelo
        let pos = box.body.position;
        let bottom = pos.y + box.h / 2;
        // Si toca el suelo y aún no es estática, la vuelve estática
        if (bottom >= ground.position.y - 55 && !box.body.isStatic) {
            Matter.Body.setStatic(box.body, true);
        }
        box.show();
    }

    fill(255);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, 810, 60);
}

function mousePressed() {
    let imgIndex = floor(random(0, 13));
    let img = boxImages[imgIndex];
    let angle = random(-PI / 8, PI / 8);
    let w = img.width * SCALE;
    let h = img.height * SCALE;
    if (isSpaceFree(mouseX, mouseY, w, h)) {
        let box = new Box(mouseX, mouseY, img.width, img.height, imgIndex, angle);
        boxes.push(box);
    } else {
        // Opcional: puedes mostrar un mensaje o feedback visual
        print("¡No hay espacio suficiente!");
    }
}