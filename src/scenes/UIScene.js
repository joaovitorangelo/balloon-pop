import Phaser from "phaser";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.scoreText = this.add.text(10, 10, "Pontos: 0", { fontSize: "24px", fill: "#fff" });

    const gameScene = this.scene.get("GameScene");
    gameScene.events.on("updateScore", (score) => {
      this.scoreText.setText("Pontos: " + score);
    });
  }
}
