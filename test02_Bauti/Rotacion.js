class Rotacion {

    constructor() {

        this.posX = 10;
        this.posY = 10;
        this.vel = 1;
        this.dir = radians(25);

    }

    

    rotar(){
        this.dir += radians(5);

        this.posX += this.dir;
    }

}