class Rotacion {

    constructor(img, x, y) {
        this.img = img;      // Imagen a mostrar
        this.x = x;          // Posición X
        this.y = y;          // Posición Y
        this.angulo = 0;     // Ángulo de rotación
        this.velocidad = radians(2); // Velocidad de rotación
        this.tamano = 150;   // Tamaño de la imagen
    }

    // imagenes(){
        
    //     for (let fig of figures){
    //         figures.push({
    //             imgIndex: int(random(imgs.length)),
    //             x: random(margin, width - margin),
    //             y: random(margin, height - margin),
    //             baseTint: [
    //                 int(random(100, 255)), // R
    //                 int(random(100, 255)), // G
    //                 int(random(100, 255)), // B
    //                 120                    // Alpha
    //             ]
    //         })
    //     }

    // }

    rotarYdibujar() {
        push(); // Guarda el estado actual del lienzo
        translate(this.x, this.y);  // Mueve el origen al centro de rotación
        rotate(this.angulo);       // Rota el lienzo
        image(this.img, 0, 0, this.tamano, this.tamano); // Dibuja imagen centrada
        pop(); // Restaura el estado original del lienzo

        this.angulo += this.velocidad; // Aumenta el ángulo en cada frame
    }

}

