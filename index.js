const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: {
    preload,
    create,
    update
  },
  pixelArt: true,
};

function preload() {
  this.load.image('plataforma', 'assets/pisos/plataforma1.png');
  this.load.image('plataforma2', 'assets/pisos/plataforma2.png');
  this.load.image('plataforma4', 'assets/pisos/plataforma4.png');
  this.load.image('piso', 'assets/pisos/piso.png');
  this.load.image('estrella', 'assets/estrella.png');
  this.load.image('trofeo', 'assets/trofeo.png');
  this.load.image('malo', 'assets/malo.png');
  this.load.image('personaje', 'assets/personaje.png');
}

var teclas;
var personaje;

function create() {
  var fondoArriba = 0x8787FF;
  var fondoAbajo = 0xFFFFFF;
  var verde = 0x00FF00;
  var azul = 0x0000FF;
  
  var fondo = this.add.graphics();
  fondo.fillGradientStyle(fondoArriba, fondoArriba, fondoAbajo, fondoAbajo, 1, 1);
  fondo.fillRect(0, 0, config.width, config.height);

  personaje = this.add.image(255, 605, 'personaje');

  this.add.image(290, 355, 'plataforma');
  this.add.image(293, 131, 'plataforma2');
  this.add.image(73, 207,  'plataforma2');
  this.add.image(180, 425, 'plataforma4');
  this.add.image(68, 512, 'plataforma2');

  this.add.image(182, 640, 'piso');

  this.add.image(300, 80, 'trofeo').setScale(0.5);

  this.add.image(40, 170, 'estrella');
  this.add.image(260, 320, 'estrella');
  this.add.image(310, 320, 'estrella');
  this.add.image(30, 475, 'estrella');
  this.add.image(80, 475, 'estrella');
  this.add.image(80, 605, 'estrella');
  this.add.image(130, 605, 'estrella');

  this.add.image(271, 327, 'malo').setScale(2.2);
  this.add.image(80, 482, 'malo').setScale(2.2);
  this.add.image(112, 603, 'malo').setScale(2.2);
  
  teclas = this.input.keyboard.createCursorKeys();
}

function update() {
  const velocidad = 2;
  
  if (teclas.left.isDown) {
    personaje.x -= velocidad;
    personaje.scaleX = 1;

  } else if (teclas.right.isDown) {
    personaje.x += velocidad;
    personaje.scaleX = -1;
  };
}

new Phaser.Game(config);