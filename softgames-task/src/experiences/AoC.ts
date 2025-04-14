import {Application, Assets, Sprite} from 'pixi.js';
import {gsap} from 'gsap';

export class AceOfShadows
{
	private app:Application;
	private images : {alias:string,src:string}[]=
	[
		{alias:'card1',src:`../assets/AoC/card1.png`},
		{alias:'card2',src:`../assets/AoC/card2.png`},
		{alias:'card3',src:`../assets/AoC/card3.png`},
		{alias:'card4',src:`../assets/AoC/card4.png`},
		{alias:'card5',src:`../assets/AoC/card5.png`},
		{alias:'card6',src:`../assets/AoC/card6.png`},
	];

	private cardCount = 144;
	private cards : Sprite[] = [];
	private endPositions: [number,number][] = [];
	private cardPositionPadding = 50;
	private cardHeight:number=0;

	private animLength = 2000;

	constructor(mainApp:Application)
	{
		this.app = mainApp;
	};

	public async init()
	{
		console.log('start AOC');
		this.app.renderer.background.color = '#402d5a';
		Assets.load(this.images).then(()=>{this.setupScene()});
	};

	private setupScene()
	{
		// console.log(this.images.length)
		this.createCards();
		this.createEndpoints();
		console.log(this.endPositions);
		this.moveCard(0)
	};

	private createCards()
	{
		this.cardHeight = this.app.screen.width/8;
		for(let i = 0; i<this.cardCount;i++)
		{
			let cardAlias = `card${1+i%this.images.length}`;
			const card = new Sprite(Assets.get(cardAlias));
			this.cards.push(card);
			this.app.stage.addChild(card);
			card.zIndex = this.cardCount - i;
			card.height = this.cardHeight;
			card.width = this.cardHeight /2;
			card.y = this.app.screen.height /2 - card.height/2;
			card.x = this.app.screen.width - this.cardPositionPadding - this.cardHeight/2 - this.cardHeight/20 * i;
		}
	}

	private createEndpoints()
	{ 
		for(let index = 0; index < 6; index++)
			{
			const pos:[number,number] = [0,0]
			
			pos[0] = index%3 == 0 ? this.cardPositionPadding : index%3 == 1 ? this.app.screen.width/2 - this.cardHeight/2 : this.app.screen.width - this.cardPositionPadding - this.cardHeight/2;
			pos[1] = index%2 == 0 ? this.app.screen.height - this.cardPositionPadding - this.cardHeight : this.cardPositionPadding;
			console.log(index%3);
			this.endPositions.push(pos)
		}	
	};
	private counter = 0;
	private moveCard(index:number)
	{
		this.cards[index].zIndex = this.cards.length + index;
		//card Motion
		gsap.to(this.cards[index],
		{
			x: this.endPositions[index%6][0],
			y: this.endPositions[index%6][1],
			duration: this.animLength/1000,
			ease: "ease.inOut"
		});

		setTimeout(() =>{this.updateCount()}, this.animLength);
	}

	private updateCount()
	{
		this.counter +=1;
		this.counter > this.cards.length -1 ? '' : this.moveCard(this.counter);
	}
	public reset()
    {
        
    };
}