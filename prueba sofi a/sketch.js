let engine;
let world;
let boxes = [];
let ground;
let boxImages = [];
const SCALE = 0.5; // Cambia este valor para ajustar la escala

let amp_min = 0.000;
let amp_max = 0.555;
let mic, fft, amp;


// Función para desordenar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function preload() {


    // Crea un array con los nombres de las imágenes
    let imageNames = [];
    for (let i = 0; i <= 12; i++) {
        imageNames.push(`img/box${i}.png`);
        // console.log(`Cargando imagen: img/box${i}.png`);
    }

    // Desordena el array de nombres
    shuffleArray(imageNames);
    //console.log(imageNames); // Verifica el orden aleatorio

    // Carga las imágenes en el orden aleatorio
    for (let i = 0; i < imageNames.length; i++) {
        boxImages[i] = loadImage(imageNames[i]);
        //console.log(`Imagen cargada: ${imageNames[i]}`);
    }
}

function Box(x, y, w, h, imgIndex, angle = 0 ){//}, coloresPaleta, colorIndex) {
    

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
         //console.log("Dibujando caja en:", this.body.position.x, this.body.position.y);//ver si se ve en pantalla//
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


function setup() {
    createCanvas(windowWidth, windowHeight);

   // PaletaO = new PaletaOriginal(); 
  //  PaletaO.generarColores();  

    engine = Matter.Engine.create();
    world = engine.world;
   // Matter.Engine.run(engine); en futuras versiones puede dejar de funcionar
   const runner = Matter.Runner.create();
   Matter.Runner.run(runner, engine);


    mic = new p5.AudioIn();
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);
    //fft.smooth(0.9); // Puedes ajustar el suavizado si es necesario (consejo de copilot)

   // acá hice cambios
   // ground = Matter.Bodies.rectangle(400, height - 50, 810, 60, { isStatic: true });
    ground = Matter.Bodies.rectangle(width/2, height - 50, width, 200, { isStatic: true });
    Matter.World.add(world, ground);

//acá tambien hice cambios rectangulo en el centro de la pantalla
    // Pared izquierda
    // let wallLeft = Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
    let wallLeft = Matter.Bodies.rectangle(0, height / 2, width - width/3, height + height/2, { isStatic: true });
    // Pared derecha
    //let wallRight = Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });
    let wallRight = Matter.Bodies.rectangle(width, height / 2, width - width/3, height + height/4, { isStatic: true });
    // Techo
    //let ceiling = Matter.Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle(width / 2,height-height, width, 200, { isStatic: true });

    Matter.World.add(world, [wallLeft, wallRight, ceiling]);
}

function draw() {
background(220);
    let bass = fft.getEnergy("bass");
    let middle = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let analizaLasFrecuencias = fft.analyze(); // activa los valores de frecuencia de bass, middle y treble.

    userStartAudio();
    amp = mic.getLevel();

 if (amp >= 0.005 && amp < 0.01) { 
   background(0, random(255), 0);
 }else if (amp >= 0.2 ) {
   background(random(255), 0, 0);
 }

    let retornoAudio = "Amplitud:" + nfc(amp, 1);
    text(retornoAudio, width / 2, width / 2);


    let imgIndex = floor(random(0, 13));
    let img = boxImages[imgIndex];
    let angle = random(-PI / 8, PI / 8);

    let chusmear = map(bass,middle, treble, 0, 50);//acá mete todas las frecuencias 
    let scaleFactor = map(chusmear, 0, 255, 1, 5); // Graves controlan el tamaño de la caja 
    scaleFactor = constrain(scaleFactor, 3, 5);
    //devuelve los valores redondeados de bass, middle y treble.
    // console.log("bass:", Math.round(bass),"middle:", Math.round(middle),"treble:", Math.round(treble));

    let w = img.width * SCALE * scaleFactor;
    let h = img.height * SCALE * scaleFactor;

    if (amp > 0.005) {
        if (isSpaceFree(mouseX, mouseY, w, h)) {
           // let box = new Box(mouseX, mouseY, img.width, img.height, imgIndex, angle);
         //  let colorIndex = floor(random(0, PaletaO.colores.length));
            let box = new Box(mouseX, mouseY, w / SCALE, h / SCALE, imgIndex, angle);// , colorIndex);//cambia el tamaño de la caja con el bass
            boxes.push(box);
        } else {
            //no aparecen cajas fuera de el rectángulo
            !isSpaceFree(mouseX, mouseY, w, h);
            print("¡No hay espacio suficiente!");
        }
    }

    //Matter.Engine.update(engine);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        // Detecta si la caja toca el suelo
        let pos = box.body.position;
        let bottom = pos.y + box.h / 2;
        // Si toca el suelo y aún no es estática, la vuelve estática
        if (bottom >= ground.position.y + height/2 && !box.body.isStatic) {
            Matter.Body.setStatic(box.body, true);
             !isSpaceFree(mouseX, mouseY, w, h);
        }
        box.show();
    }
}
