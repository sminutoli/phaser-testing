const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: {
    create
  }
};

function create() {
  var fondoArriba = 0x8787FF;
  var fondoAbajo = 0xFFFFFF;
  var verde = 0x00FF00;
  var azul = 0x0000FF;
  
  var fondo = this.add.graphics();
  fondo.fillGradientStyle(fondoArriba, fondoArriba, fondoAbajo, fondoAbajo, 1, 1);
  fondo.fillRect(0, 0, config.width, config.height);

  var personaje = this.add.rectangle(255, 595, 64, 64, verde);

  var plataforma = this.add.rectangle(290, 355, 140, 30, azul);

  var plataforma2 = this.add.rectangle(293, 131, 134, 25, azul);

  var plataforma3 = this.add.rectangle(73, 207, 146, 26, azul);

  var plataforma4 = this.add.rectangle(180, 425, 96, 26, azul);

  var plataforma5 = this.add.rectangle(68, 512, 135, 25, azul);

  var piso = this.add.rectangle(182, 640, config.width, 25, azul);
}

new Phaser.Game(config);