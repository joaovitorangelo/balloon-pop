import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    // Recebe dados da cena anterior
    this.finalScore = data.score || 0;
  }

  create() {
    const { width, height } = this.sys.game.config;

    // Texto de Game Over
    this.add.text(width / 2, height / 2 - 50, "GAME OVER", {
      fontSize: "48px",
      fill: "#ff0000"
    }).setOrigin(0.5);

    // Pontuação final
    this.add.text(width / 2, height / 2 + 10, `Score: ${this.finalScore}`, {
      fontSize: "32px",
      fill: "#ffffff"
    }).setOrigin(0.5);

    // Botão de reiniciar
    const restartText = this.add.text(width / 2, height / 2 + 80, "RESTART", {
      fontSize: "28px",
      fill: "#00ff00",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    restartText.on("pointerdown", () => {
      this.scene.start("GameScene"); // reinicia o jogo
    });
  }
}
