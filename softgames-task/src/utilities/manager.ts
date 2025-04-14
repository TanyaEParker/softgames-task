import { Application, Text } from 'pixi.js';
import {AceOfShadows} from "./experiences/AoC.ts"
export class manager
{
  private app: Application;
  private currentScene: AceOfShadows;
  private FPS : Text;

  constructor(app: Application, FPS: Text)
  {
    this.app = app;
    this.FPS = FPS;
  }

  public changeScene(newScene: AceOfShadows): void
  {
    if (this.currentScene)
    {
      this.app.stage.children.forEach((child) =>
      {
        if (!(child instanceof Text && child === this.FPS))
        {
          this.app.stage.removeChild(child);
        }
      });

      if(this.currentScene.destroy)
      {
        this.currentScene.destroy();
      }
    }
    this.currentScene = newScene;
    this.currentScene.init();

  }
}