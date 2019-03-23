var config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  /*
  Tenemos que conectar las etapas del juego con nuestras funciones!
  */
  scene: {
    preload: cargarAntesDeEmpezar,
    create: inicializarJuego,
    update: refrescarJuego
  },
  pixelArt: true,
};

/********** VARIABLES *************/

var plataformas;
var trofeo;
var enemigos;
var premios;
var personaje;
var teclas;
var juegoTerminado = false;
var puntos = 0;
var puntaje = [];

/********** FIN DE VARIABLES *************/


/*
La función cargarAntesDeEmpezar() nos permite precargar imágenes / sonidos / textos para que el juego comience sin fallas. La conectamos al juego en la sección de config (arriba)
*/ 
function cargarAntesDeEmpezar() {
  // la primer palabra es el nombre clave de la imagen, la segunda la ubicación del archivo real, no tienen por qué coincidir
  this.load.image('plataforma', 'assets/pisos/plataforma1.png');
  this.load.image('plataforma2', 'assets/pisos/plataforma2.png');
  this.load.image('plataforma4', 'assets/pisos/plataforma4.png');
  this.load.image('piso', 'assets/pisos/piso.png');
  this.load.image('premio', 'assets/estrella.png');
  this.load.image('trofeo', 'assets/trofeo.png');
  this.load.image('enemigo', 'assets/malo.png');
  this.load.spritesheet('personajeAnimado', 'assets/personaje.spritesheet.png', {
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.image('comenzar', 'assets/comienzo.png');
}

/*
La función inicializarJuego() nos permite inicializar los elementos del juego
*/
function inicializarJuego() {
  
  /********** CREACION DE FONDO *************/
  
  var fondo = this.add.graphics();
  fondo.fillGradientStyle(0x8787FF, 0x8787FF, 0xFFFFFF, 0xFFFFFF, 1, 1);
  fondo.fillRect(0, 0, config.width, config.height);
  
  /********** FIN CREACION DE FONDO *************/

  /********** CREACION DE PLATAFORMAS *************/
  
  /*
  Un staticGroup() contiene elementos que no van a seguir las leyes de la física como la gravedad.
  */
  plataformas = this.physics.add.staticGroup(); // probá poniendo group() en vez de staticGroup()!
  /*
  Parecido a this.add.image() o this.add.rectangle()
  Todo staticGroup permite usar su función create() que necesita 3 ingredientes:
    - x, y, 'nombre clave de la imagen' (como la definimos en preload)
  */
  plataformas.create(290, 355, 'plataforma'); 
  plataformas.create(293, 131, 'plataforma2');
  plataformas.create(73, 207,  'plataforma2');
  plataformas.create(180, 425, 'plataforma4');
  plataformas.create(68, 512, 'plataforma2');
  var piso = plataformas.create(182, 630, 'piso');
  
  /********** FIN DE CREACION DE PLATAFORMAS *************/
  
  /********** CREACION DE TROFEO *************/
  
  trofeo = this.physics.add.image(300, 80, 'trofeo');
  trofeo.setScale(0.5);
  this.physics.add.collider(trofeo, plataformas);
  
  /********** FIN DE CREACION DE TROFEO *************/

  /********** CREACION DE PREMIOS *************/
  
  premios = this.physics.add.group();  
  premios.create(40, 150, 'premio').setBounce(1);
  premios.create(240, 300, 'premio').setBounce(1);
  premios.create(50, 450, 'premio').setBounce(1);
  this.physics.add.collider(premios, plataformas);
  
  /********** FIN DE CREACION DE PREMIOS *************/
  
  /********** CREACION DE ENEMIGOS *************/
  
  enemigos = this.physics.add.group(); 
  
  var enemigo1 = enemigos.create(271, 327, 'enemigo').setScale(2.2);
  
  var enemigo2 = enemigos.create(90, 170, 'enemigo').setScale(2.2);
  
  var enemigo3 = enemigos.create(180, 600, 'enemigo').setScale(2.2);
  
  var enemigo4 = enemigos.create(90, 170, 'enemigo').setScale(2.2);
  
  this.physics.add.collider(enemigos, plataformas);
  
  this.tweens.add({
    targets: enemigo1,
    props: {
      x: { value: enemigo1.x - 80, duration: 3000 }
    },
    yoyo: true,
    repeat: -1
  });
  
  this.tweens.add({
    targets: enemigo2,
    props: {
      x: { value: enemigo2.x + 100, duration: 2000 }
    },
    yoyo: true,
    repeat: -1
  });
  
  this.tweens.add({
    targets: enemigo3,
    props: {
      x: { value: enemigo3.x - 100, duration: 2000 }
    },
    yoyo: true,
    repeat: -1
  });
  
  this.tweens.add({
    targets: enemigo4,
    props: {
      x: { value: enemigo4.x - 40, duration: 1500 }
    },
    yoyo: true,
    repeat: -1
  });
  
  /********** FIN DE CREACION DE ENEMIGOS *************/
  
  this.anims.create({
      key: 'izquierda',
      frames: this.anims.generateFrameNumbers('personajeAnimado', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'quieto',
      frames: [ { key: 'personajeAnimado', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'derecha',
      frames: this.anims.generateFrameNumbers('personajeAnimado', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
  
  /********** CREACION DE PERSONAJE *************/
  
  personaje = this.physics.add.sprite(255, 500, 'personajeAnimado').setScale(3).setBounce(0.2);
  this.physics.add.collider(personaje, plataformas);
  
  /********** FIN DE CREACION DE PERSONAJE *************/
  
  teclas = this.input.keyboard.createCursorKeys();
  
  /***** COLISIONES *****/
  this.physics.add.overlap(personaje, premios, agarrarPremio, null, this);
  this.physics.add.overlap(personaje, trofeo, ganarJuego, null, this);
  this.physics.add.overlap(personaje, enemigos, tocarEnemigo, null, this);
  
  /***** PUNTAJE *****/
  puntaje[1] = this.add.image(20, 20, 'premio').setScale(0.5);
  puntaje[2] = this.add.image(50, 20, 'premio').setScale(0.5);
  puntaje[3] = this.add.image(80, 20, 'premio').setScale(0.5);
  reiniciarJuego();
  
  /***** PANTALLA COMIENZO *****/
  var boton = this.add.image(180, 320, 'comenzar').setInteractive();
  boton.on('pointerdown', () => boton.destroy());
}

function agarrarPremio(personaje, premioQueToco) {
  premioQueToco.disableBody(true, true);
  puntos++;
  puntaje[puntos].setAlpha(1);
}

function tocarEnemigo(personaje, enemigoQueToco) {
  //this.physics.pause();
  personaje.setTint(0xff0000);
  terminarJuego();
  setTimeout(() => {
    this.scene.restart()
  }, 3000);
}

function ganarJuego(personaje, trofeo) {
  trofeo.disableBody(true, true);
  personaje.setBounce(1);
  personaje.setVelocityY(-100);
  terminarJuego();
  setTimeout(() => {
    this.scene.restart()
  }, 3000);
}

function reiniciarJuego() {
  puntos = 0;
  puntaje[1].setAlpha(0.5);
  puntaje[2].setAlpha(0.5);
  puntaje[3].setAlpha(0.5);
  juegoTerminado = false;
}

function terminarJuego() {
  personaje.setVelocityX(0);
  personaje.anims.play('quieto');
  juegoTerminado = true;
}

function refrescarJuego() {
  
  if(juegoTerminado) return;
  
  if (teclas.left.isDown) {
      personaje.setVelocityX(-160);
      personaje.anims.play('izquierda', true);
  } else if (teclas.right.isDown) {
      personaje.setVelocityX(+160);
      personaje.anims.play('derecha', true);
  } else if (teclas.space.isDown && personaje.body.touching.down) {
      personaje.setVelocityY(-330);
  } else {
      personaje.setVelocityX(0);
      personaje.anims.play('quieto');
  }
  
}

new Phaser.Game(config);