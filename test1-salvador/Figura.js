class Figura {
    constructor(imgIndex, x, y, categoria, color) {
        this.imgIndex = imgIndex;
        this.x = x;
        this.y = y;
        this.categoria = categoria;
        this.color = color;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
    }

   actualizar(bass, treble) {
    if (sonidoActivo) {
        switch (this.categoria) {
            case 2:
                this.rotation += 0.05;  // Rota mientras hay sonido
                break;
        }
    }
}
    dibujar(imgs) {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        scale(this.scaleX, this.scaleY);
        tint(...this.color);
        image(imgs[this.imgIndex], 0, 0);
        noTint();
        pop();
    }
}
