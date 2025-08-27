import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.score = 0;
    this.lostBalloons = 0;
    this.maxLost = 5;
    this.isGameOver = false;

    this.balloons = this.physics.add.group();
    this.spawnInterval = 1500;
    this.spawnTimer = this.time.addEvent({
      delay: this.spawnInterval,
      callback: this.spawnBalloon,
      callbackScope: this,
      loop: true
    });

    this.elapsedTime = 0;

    // Exemplo: pontuação no console
    this.events.on("updateScore", (score) => {
      console.log("Score:", score);
    });
    this.events.on("updateLost", (lost) => {
      console.log("Baloes perdidos:", lost);
    });
  }

  update(time, delta) {
    if (this.isGameOver) return;

    this.elapsedTime += delta;
    if (this.elapsedTime > 10000) {
      this.increaseDifficulty();
      this.elapsedTime = 0;
    }

    // Checa balões que passaram do topo
    this.balloons.getChildren().forEach(b => {
      if (b.y < -50) {
        b.destroy();
        this.lostBalloons++;
        this.events.emit("updateLost", this.lostBalloons);

        if (this.lostBalloons >= this.maxLost) {
          this.gameOver();
        }
      }
    });
  }

  spawnBalloon() {
    if (this.isGameOver) return;

    const x = Phaser.Math.Between(50, this.scale.width - 50); // largura responsiva
    const randomId = Phaser.Math.Between(1, 4);
    const balloonKey = `balloon${randomId}`;

    const yStart = this.scale.height + 50;
    const balloon = this.balloons.create(x, yStart, balloonKey);
    balloon.setInteractive();
    balloon.setVelocityY(-120); // sobe para cima da tela

    const scale = Phaser.Math.FloatBetween(0.8, 1.5); // de 80% a 150%
    balloon.setScale(scale);

    balloon.on("pointerdown", () => {
      this.sound.play("pop");

      // Animação de estouro
      this.tweens.add({
        targets: balloon,
        scale: balloon.scale * 1.5,
        alpha: 0,
        angle: Phaser.Math.Between(-30, 30),
        duration: 200,
        ease: "Power1",
        onComplete: () => balloon.destroy()
      });

      this.score++;
      this.events.emit("updateScore", this.score);
    });
  }
  
  increaseDifficulty() {
    this.spawnInterval = Math.max(300, this.spawnInterval - 100);
    this.spawnTimer.remove(false);
    this.spawnTimer = this.time.addEvent({
      delay: this.spawnInterval,
      callback: this.spawnBalloon,
      callbackScope: this,
      loop: true
    });

    this.balloons.getChildren().forEach(b => {
      b.setVelocityY(b.body.velocity.y - 10);
    });
  }

  gameOver() {
    this.isGameOver = true;
    this.spawnTimer.remove(false);

    // Troca para a cena de Game Over, passando dados
    this.scene.start("GameOverScene", { score: this.score });
  }
}
