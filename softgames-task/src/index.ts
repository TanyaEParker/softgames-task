import {Application, Text} from 'pixi.js';
import { manager } from './utilities/manager';
import {MenuManager} from "./utilities/MenuManager"
import {AceOfShadows} from "./experiences/AoC.ts"
import {PheonixFire} from "./experiences/PF.ts"
import { MagicWords } from './experiences/MW.ts';

const app = new Application();

async function setup()
{
    await app.init(
    { 
      background: '#6b078c', 
      resizeTo: window,
    });

    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.canvas);
};

(async () =>
{
	await setup();
	await new MainMenu(app);
})();

class MainMenu
{
	private app : Application;
	private manager : manager;
	private FPS : Text;

	constructor(app:Application)
	{
		this.app = app;
		this.FPS = new Text({text: 'FPS: 0', style:{ fontSize: 18, fill: 'white' }});
	    this.FPS.x = 10;
	    this.FPS.y = 10;

	    this.app.stage.addChild(this.FPS);
	    this.app.ticker.add(() => this.updateFPS());

	    this.manager = new manager();

	    new MenuManager(this.setScene);
	}

	private updateFPS():void
	{
		const frame = this.app.ticker.FPS.toFixed(0);
		this.FPS.text = `FPS: ${frame}`
	}

	private setScene = (task:string)=>
	{
		switch(task)
		{
		case 'AoC':
			console.log('Ace of Shadows');
			// this.manager.setScene('AoC')
			this.manager.changeScene(new AceOfShadows(this.app))
			break;
		case 'MW':
			console.log('Magic Words');
			this.manager.changeScene(new MagicWords(this.app))
			break;
		case 'PF':
			console.log('pheonix Flame')
			this.manager.changeScene(new PheonixFire(this.app))
			break;
		}
	}
};