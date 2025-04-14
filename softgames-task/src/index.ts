import {Application, Text} from 'pixi.js';
import { manager } from './utilities/manager';

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
		this.FPS = new Text({text: 'FPS: 0', style:{ fontSize: 18, fill: 0x000000 }});
	    this.FPS.x = 10;
	    this.FPS.y = 10;

	    this.app.stage.addChild(this.FPS);
	    this.app.ticker.add(() => this.updateFPS());

	    this.manager = new manager(this.app,this.FPS)
	}

	private updateFPS():void
	{
		const frame = this.app.ticker.FPS.toFixed(0);
		this.FPS.text = `FPS: ${frame}`
	}


	private setScene(task:string):void
	{
		switch(task)
		{
		case 'AoC':
			this.sceneManager.loadScene(new AoC(this.app))
			break;
		case 'MW':
			this.sceneManager.loadScene(new MW(this.app))
			break;
		case 'PF':
			this.sceneManager.loadScene(new PF(this.app))
			break;
		}
	}
};