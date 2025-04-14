
import {AceOfShadows} from "../experiences/AoC.ts"
import { MagicWords } from '../experiences/MW.ts';
import { PheonixFire } from '../experiences/PF.ts';

export class manager
{
  private currentScene: AceOfShadows|MagicWords|PheonixFire|undefined = undefined;

  constructor()
  {
  }

  public changeScene(newScene: AceOfShadows|MagicWords|PheonixFire): void
  {
    if(this.currentScene == undefined)
    {
      this.currentScene = newScene;
    }
    else
    {
      this.currentScene.reset();
      this.currentScene = newScene;
    }
    this.currentScene.init();
  }
}