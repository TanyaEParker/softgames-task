import {Application,Sprite,Assets,Texture,DisplacementFilter,Point,MeshRope} from 'pixi.js';
import {gsap} from 'gsap';

export class PheonixFire
{
	private app:Application;
	private particles:Sprite[]=[];
	private images :{alias:string,src:string}[]=[];


	private displacement :{texture:Texture,sprite:Sprite} = {};
	constructor(mainApp:Application)
	{
		this.app = mainApp;
		this.images = 
		[
			{alias:'displacement',src:'./assets/PF/displacement.png'},
			{alias:'mote2',src:'./assets/PF/mote2.png'}
		]

	};

	public async init()
	{
		this.app.renderer.background.color = '#303030';
		await Assets.load(this.images);
		console.log('start pf');

		this.displacement.texture = Assets.get('displacement');
		this.displacement.sprite = new Sprite(this.displacement.texture);

		this.displacement.sprite.x = (this.app.screen.height/1)+256;
		this.displacement.sprite.y = (this.app.screen.height/2);
		// this.displacement.sprite.alpha = 1;

		this.displacement.sprite.scale.set(4);
		this.app.stage.addChild(this.displacement.sprite);

		const displacementFilter = new DisplacementFilter(this.displacement.sprite)

		const FireTexture = await Assets.load('mote2')
		
		let points : Point[] = [];
		for (let index=0;index<10;index++)
		{
			points.push(new Point(index*37,0));
		};
		const band = new MeshRope({FireTexture,points});
		band.x = (this.app.screen.width /2 ) - 128;
		band.y = (this.app.screen.height)- 128*0.8;
		band.rotation = -Math.PI/2;
		band.scale.set(2);
		this.app.stage.addChild(band)
	};
}