import Phaser from "phaser";
import BootScene from "./scenes/BootScene.js";
import GameStartScene from "./scenes/GameStartScene.js";
import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import UIScene from "./scenes/UIScene.js";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#87CEEB",
  physics: { default: "arcade" },
  scale: {
    mode: Phaser.Scale.RESIZE,   // canvas se adapta ao tamanho da tela
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,    // largura da tela
    height: window.innerHeight   // altura da tela
  },
  scene: [BootScene, GameStartScene, GameScene, GameOverScene, UIScene]
};

new Phaser.Game(config);
