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
  this.load.spritesheet('personajeAnimado', 'assets/personajeAnimado.png', { frameWidth: 16, frameHeight: 16 });
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

  personaje = this.add.sprite(255, 605, 'personajeAnimado').setScale(3);
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('personajeAnimado', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'personajeAnimado', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('personajeAnimado', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  this.add.image(290, 355, 'plataforma');
  this.add.image(293, 131, 'plataforma2');
  this.add.image(73, 207,  'plataforma2');
  this.add.image(180, 425, 'plataforma4');
  this.add.image(68, 512, 'plataforma2');

  this.add.image(182, 640, 'piso');

  var emitter = this.add.particles('trofeo').createEmitter({
      x: 300,
      y: 80,
      blendMode: 'OVERLAY',
      scale: { start: 0.5, end: 0 },
      speed: { min: -50, max: 50 },
      quantity: 20
  });

  this.crearEstrella = crearEstrella;
  this.crearEstrella(40, 170);
  this.crearEstrella(260, 320);
  this.crearEstrella(310, 320);
  this.crearEstrella(30, 475);
  this.crearEstrella(80, 475);
  this.crearEstrella(80, 605);
  this.crearEstrella(130, 605);

  this.add.image(271, 327, 'malo').setScale(2.2);
  this.add.image(80, 482, 'malo').setScale(2.2);
  this.add.image(112, 603, 'malo').setScale(2.2);
  
  teclas = this.input.keyboard.createCursorKeys();
}

function crearEstrella(x, y){
  var estrella = this.add.image(x, y, 'estrella');
  this.tweens.add({
      targets: estrella,
      props: {
          scaleX: { value: 0.90, duration: 300 },
          scaleY: { value: 0.90, duration: 300 },
      },
      ease: 'Sine.easeOut',
      yoyo: true,
      repeat: -1
  });
}

function update() {
  const velocidad = 2;
  
  if (teclas.left.isDown) {
    personaje.x -= velocidad;
    personaje.anims.play('left', true);

  } else if (teclas.right.isDown) {
    personaje.x += velocidad;
    personaje.anims.play('right', true);
  } else {
    personaje.anims.play('turn');
  };
  
  if(personaje.x < -50){
    personaje.x = 390;
  } else if(personaje.x > 400){
    personaje.x = -40;
  }
}

new Phaser.Game(config);