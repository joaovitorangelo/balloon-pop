import Phaser from "phaser";

export default class GameStartScene extends Phaser.Scene {
  constructor() {
    super("GameStartScene");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Título do jogo
    this.add.text(width / 2, height / 2 - 60, "Estoura Balões!", {
      fontSize: `${Math.floor(width / 12)}px`, // tamanho relativo à largura
      fill: "#ff69b4",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Instruções
    this.add.text(width / 2, height / 2 + 10, "Clique para começar", {
      fontSize: `${Math.floor(width / 24)}px`,
      fill: "#ffffff"
    }).setOrigin(0.5);

    // Interatividade: iniciar o jogo ao clicar
    this.input.once("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
