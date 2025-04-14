import {Application} from 'pixi.js';
import {gsap} from 'gsap';
export class AceOfShadows
{
	private app:Application;

	private cards : {alias:string,src:string}[]=[];

	constructor(mainApp:Application)
	{
		this.app = mainApp;
		for(let index = 1;index<145;index++)
		{
			this.cards.push({alias:`image${index}`,src:`./assets/AoC/${index}.png`});
		}
	};

	public async init()
	{
		console.log('start AOC')
		this.app.renderer.background.color = '#402d5a';
		console.log(this.cards);
	};
}