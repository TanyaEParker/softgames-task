import {Application,Sprite,Assets,Texture,DisplacementFilter,Point,MeshRope} from 'pixi.js';
import { gsap } from 'gsap';


export class PheonixFire
{
	private app:Application;
	private particles:Sprite[]=[];
	private images :{alias:string,src:string}[]=[];


	private displacement :{texture:Texture|undefined,sprite:Sprite|undefined} = {texture:undefined,sprite:undefined};
	private textureSize = 400;
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

		this.displacement.texture = Assets.get('displacement');

		this.displacement.sprite = new Sprite(this.displacement.texture);

		this.displacement.sprite.x = (this.app.screen.height/2)+this.textureSize*2;
		this.displacement.sprite.y = (this.app.screen.height/1.5);
		this.displacement.sprite.alpha = 1;
		this.displacement.sprite.scale.set(4);

		this.app.stage.addChild(this.displacement.sprite);
		const displacementFilter = new DisplacementFilter(this.displacement.sprite)

		const texture: Texture =Assets.get(`mote2`);
		const length = 912/20
		
		const points : Point[] = [];
		for (let index=0;index<10;index++)
		{
			points.push(new Point(index*length,0));
		};

		const band = new MeshRope({texture,points});
		band.x = (this.app.screen.width /2 ) - this.textureSize;
		band.y = (this.app.screen.height)- (this.textureSize*1.25);
		band.blendMode = "hard-light";
		band.rotation = -Math.PI/2;
		band.alpha = 0.5;
		band.scale.set(2);
		this.app.stage.addChild(band);


		const fireParticle = new Sprite(texture);
		
		fireParticle.blendMode = 'add' ;
		fireParticle.x = (this.app.screen.width/2)-this.textureSize;
		fireParticle.y = (this.app.screen.height)-(this.textureSize*1.8);
		fireParticle.blendMode = "hard-light"
		// fireParticle.rotation = Math.PI * 0.5;
		fireParticle.alpha = 0.75;
		fireParticle.scale.set(2);
		this.app.stage.addChild(fireParticle);
		this.particles.push(fireParticle);
		fireParticle.filters = [displacementFilter];

		gsap.to(this.displacement.sprite,
		{
			x: (this.app.screen.width /2)-this.textureSize*2,
			y: (this.app.screen.height)-(this.textureSize*3),
			duration: 6,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
		});
		let counter = 0;
		this.app.ticker.add(()=>
		{
			counter += 0.1;
			for(let index =0;index<points.length;index++)
			{
				points[index].x = Math.sin(index*0.5 + counter)*2;
				points[index].y = index * 37 + Math.cos(index * 0.3 + counter)*2
			}
		})
	};

    public reset()
    {
        
    };
}