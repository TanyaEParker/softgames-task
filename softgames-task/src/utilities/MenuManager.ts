export class MenuManager
{
	private MainMenu;

	private AoCButton;
	private MWButton;
	private PFButton;

	private loadFunction;

	constructor(loadFunc)
	{
		this.init();
		this.loadFunction = loadFunc;
	};

	private init()
	{
		const AoCTemp = document.getElementById("AoC");
		const MWTemp = document.getElementById("MW");
		const PFTemp = document.getElementById("PF");

		const MMTemp = document.getElementById("MainMenu");

		if(MMTemp)
		{
			this.MainMenu = MMTemp;
		}

		if(!!AoCTemp && !!MWTemp && !!PFTemp)
		{
			this.AoCButton = AoCTemp;
			this.MWButton = MWTemp;
			this.PFButton = PFTemp

			this.setupListeners();
		}else{console.warn('cannot find all button elements')}
	}

	private setupListeners()
	{
		this.AoCButton.addEventListener('click',()=>{this.hideMenu('AoC')});

		this.MWButton.addEventListener('click',()=>{this.hideMenu('MW')});

		this.PFButton.addEventListener('click',()=>{this.hideMenu('PF')});
	}

	public hideMenu(payload:string)
	{
		this.MainMenu.style.display = 'none';
		this.loadFunction(payload);
	};
};