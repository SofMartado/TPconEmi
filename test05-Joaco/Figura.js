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
        switch (this.categoria) {
            case 1:
                this.scaleX = this.scaleY = map(bass, 0, 255, 1, 2);
                this.rotation = 0;
                break;
            case 2:
                this.scaleX = this.scaleY = 1;
                this.rotation = map(bass, 0, 255, 0, PI);
                break;
            case 3:
                this.scaleX = map(treble, 0, 255, 1, 0.5);
                this.scaleY = 1;
                this.rotation = 0;
                break;
            case 4:
                this.scaleX = this.scaleY = 1;
                this.rotation = -map(treble, 0, 255, 0, PI);
                break;
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
