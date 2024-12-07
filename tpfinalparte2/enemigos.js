class Enemigos {
  constructor(cantBills) {
    this.cantBills = cantBills;
    
    this.muchosBills = []; 
    this.muchosBills2 = [];
    this.muchosBills3 = [];
    
    this.posa = 100;
    this.posb = 50;
    this.posc = 200;
    
    
    this.crearBill();  // Crear los Bill al inicio
  }

  dibujar() {
    for (let i = 0; i < this.muchosBills.length; i++) {// Dibuja cada Bill
      this.muchosBills[i].dibujar();
      this.muchosBills2[i].dibujar();
      this.muchosBills3[i].dibujar();
    }
  }

  actualizar() {
    for (let i = 0; i < this.muchosBills.length; i++) {// Llama a actualizar para cada Bill
      this.muchosBills[i].actualizar();
      this.muchosBills2[i].actualizar();
      this.muchosBills3[i].actualizar();
    }
  }

  crearBill(posx, posy) {
    // Creamos los Bill y los agregamos al arreglo
    for (let i = 0; i < this.cantBills; i++) {
      this.muchosBills[i] = new Bill(this.posa+posx * i, this.posb+posy *i);
      this.muchosBills2[i] = new Bill(this.posb+posx * i, this.posa+posy *i);
      this.muchosBills3[i] = new Bill(this.posc+posx * i, this.posb+posy *i);
  }
  }
  todosEliminados() {// Busca si todos están eliminados
        const eliminados1 = this.muchosBills.every(bill => bill.eliminado);
        const eliminados2 = this.muchosBills2.every(bill => bill.eliminado);
        const eliminados3 = this.muchosBills3.every(bill => bill.eliminado);
        return eliminados1 && eliminados2 && eliminados3;
    }
}//fin del código
