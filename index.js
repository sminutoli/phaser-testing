const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: {
    preload,
    create
  }
};

const objetos = {
} 

var colores = {
  fondoArriba: 0x8787FF,
  fondoAbajo: 0xFFFFFF
};

function preload() {
  this.load.image('todo', 'assets/todo-en-uno.png');
}

function create() {
  
  // fondo = this.add.rectangle(config.width /2, config.height /2, config.width, config.height, 0xFF0000);
  objetos.fondo = this.add.graphics();
  objetos.fondo.fillGradientStyle(colores.fondoArriba, colores.fondoArriba, colores.fondoAbajo, colores.fondoAbajo, 1, 1);
  objetos.fondo.fillRect(0, 0, config.width, config.height);

  objetos.fondo2 = this.add.image(config.width /2, config.height /2, 'todo');
  objetos.fondo2.alpha = 0;

  objetos.personaje = this.add.rectangle(255, 595, 64, 64, 0x00FF00);

  objetos.plataformas = [];

  var plataforma = this.add.rectangle(290, 355, 140, 30, 0x0000FF);
  objetos.plataformas.push(plataforma);

  var plataforma2 = this.add.rectangle(226 + 134 /2, 119 + 25 /2, 134, 25, 0x0000FF);
  objetos.plataformas.push(plataforma2);

  var plataforma3 = this.add.rectangle(0 + 146/2, 194 + 26 /2, 146, 26, 0x0000FF);
  objetos.plataformas.push(plataforma3);

  var plataforma4 = this.add.rectangle(132 + 96/2, 412 + 26 /2, 96, 26, 0x0000FF);
  objetos.plataformas.push(plataforma4);

  var plataforma5 = this.add.rectangle(68, 512, 135, 25, 0x0000FF);
  objetos.plataformas.push(plataforma5);

  objetos.piso = this.add.rectangle(182, 640, config.width, 25, 0x0000FF);
}

new Phaser.Game(config);