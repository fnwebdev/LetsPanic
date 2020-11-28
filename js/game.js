//Game

 class Game {
   constructor () {
     this.background = new Background();
     this.player = new Player (0,0,"purple");
     this.setKeyBindings();
     this.enemies = [ ];
     this.lastEnemyTimeStamp = 0;
   }
  
  setKeyBindings() {
    window.addEventListener ('keydown', event => {
      switch (event.keyCode) {
    case 37:
      this.player.moveLeft();
      break;
    case 38:
      this.player.moveUp();
      break;
    case 39:
      this.player.moveRight();
      break;
    case 40:
      this.player.moveDown();
      break;
      }
    })
  }

  loop () {
    this.runLogic();
    this.draw();

    // Loops repeats itself : recursive function
    setTimeout(() => {
      this.loop();
    }, 1000 / 30);
  }

  runLogic () {
    // Changes value of coordinate when player is on that tile
    this.background.coordinatesValues[this.player.col][this.player.row] = false

    // Enemies populated depending time passed
    const currentTimeStamp = Date.now();
    if (currentTimeStamp > this.lastEnemyTimeStamp + 2000){
    this.enemies.push(new Enemy(tileCount, Math.floor(Math.random() * tileCount) , "orange", 2, 2));
    this.lastEnemyTimeStamp = currentTimeStamp;
    }
    for (let enemy of this.enemies) {
      enemy.runLogic();
    }; 

  }

  draw () {
    context.clearRect(0, 0, width,  height)
    
    //Array of tiles with true coordinates get painted
    this.background.paintArray();

    // Array of enemies get painted
    for (let enemy of this.enemies) {
      enemy.draw();
    };

    // Player gets painted
    this.player.draw();

    //Grid gets painted
    this.background.drawGrid()
  }
}