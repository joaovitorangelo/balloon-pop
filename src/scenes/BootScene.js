export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    for (let i = 1; i <= 4; i++) {
      this.load.image(`balloon${i}`, `assets/balloon-${i}.png`);
    }
    this.load.audio("pop", "assets/pop-1.mp3");
  }

  create() {
    // Verifica se a cena já existe antes de iniciar
    if (!this.scene.isActive("GameStartScene")) {
      this.scene.start("GameStartScene");
    }
  }
}
