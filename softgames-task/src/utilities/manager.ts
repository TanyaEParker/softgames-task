import { Application, Text } from 'pixi.js';
import {MenuManager} from "./MenuManager"
export class manager
{
  private app: Application;
  private currentScene: any;
  private FPS : Text;

  constructor(app: Application, FPS: Text)
  {
    this.app = app;
    this.FPS = FPS;
  }

  public changeScene(newScene: any): void
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

    const MainMenu = new MenuManager()
  }
}