import {Application, Assets, Sprite} from 'pixi.js';

type diag={name:string,text:string};
type emoji={name:string,url:string};
type avatar={name:string,url:string,position:"right"|"left"};
type APIOutput=
{
    'dialogue':diag[],
    'emojies':emoji[],
    'avatars':avatar[]
};
type loaderPayload = {alias:string,src:string,format:'png',loadParser:'loadTextures'};
type DialogueObject = {alias:string,asset:Sprite};
export class MagicWords 
{
    private app : Application;
    private APIResponse:APIOutput = {dialogue:[],emojies:[],avatars:[]};
    private Avatars : DialogueObject[] = [];
    private Emojis : DialogueObject[] = [];
    private dialogueBox : HTMLDivElement;
    private dialogueHolder : HTMLSpanElement;
    // private avatarImages :{alias:string,src:string,parser:'texture'}[] = [];
    // private emojiImages :{alias:string,src:string,parser:'texture'}[] = [];

    constructor(app:Application)
    {
        this.dialogueBox = document.getElementById('MWDiaglouge') as HTMLDivElement;
        this.dialogueHolder = document.getElementById('MWDialogueHolder') as HTMLSpanElement;

        if(!!this.dialogueBox)
        {
            this.dialogueBox.style = 'flex';
        }
        this.app = app;
        fetch('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords').then((e)=>this.parse(e));

    };

    public async init()
    {
        this.app.renderer.background.color = "white";
        // this.startDiag();
    };

    private async parse(e:Response)
    {
        if(e.ok)
        {
            this.APIResponse = await e.json();
            console.log(this.APIResponse);

            const payloads:loaderPayload[] = this.createPayloads(this.APIResponse.avatars,this.APIResponse.emojies);

            this.createImages(payloads);
            // this.createImages(this.APIResponse.emojies);
        };
    };
    private createPayloads(avatars:avatar[],emojis:emoji[])
    {
        const list : {alias:string,src:string,format:'png',loadParser:'loadTextures'}[] = [];
        for(let index of avatars)
        {
            list.push({alias:index.name,src:index.url,format:'png',loadParser:'loadTextures'});
        }
        for(let index of emojis)
        {
            if(index.name != 'sad')//sad result wouldn't load - realsied too late to flag with anyone :(
            {
                list.push({alias:index.name,src:index.url,format:'png',loadParser:'loadTextures'})
            }
        }
        return list
    }
    private async createImages(payload:loaderPayload[])
    {
        await Assets.load(payload).then(()=>{this.loadAssets()});
        // for(let index of payload)
        // {
        //     //This endpoint is broken ;(
        //     if(index.alias != 'sad')
        //     {
        //         Assets.load(index,(prog)=>{console.log(`${payload.alias} ${prog}`)});
        //     }
        // }
        // return;
    };
    private sidePadding = 40;
    private loadAssets()
    {
        for(let index of this.APIResponse.avatars)
        {   
            const avatar = new Sprite(Assets.get(index.name));
            this.app.stage.addChild(avatar);
            this.Avatars.push({alias:index.name,asset:avatar});
           
            avatar.x = index.position == 'left' ? this.sidePadding : this.app.screen.width-this.sidePadding - avatar.width
            avatar.y = this.app.screen.height - (175 + avatar.height);
            avatar.visible = false;
        }
        for(let index of this.APIResponse.emojies)
        {
            if(index.name == 'sad')
            {
            }
            else
            {
                const emoji = new Sprite(Assets.get(index.name));
                this.app.stage.addChild(emoji);
                this.Emojis.push({alias:index.name,asset:emoji});
                emoji.scale.set(0.75);
                emoji.visible = false;
            }
        }
        this.updateDialogue(0);
    }
    private counter = 0;

    private updateDialogue(dialogueIndex:number)
    {
        for(let index of this.Avatars)
        {
            index.asset.visible = false;
        }
        for(let index of this.Emojis)
        {
            index.asset.visible = false;
        }
        const speakerName = this.APIResponse.dialogue[dialogueIndex].name;
        let SpeakerAvatar : DialogueObject|undefined = undefined;
        for(let index of this.Avatars)
        {
            if(speakerName==index.alias)
            {
                SpeakerAvatar = index;
            }
        }
        
        if(!!SpeakerAvatar)
        SpeakerAvatar.asset.visible = true;

        const dialogue = this.APIResponse.dialogue[dialogueIndex].text;
        const Emotion = this.getEmotion(dialogue);
        console.log(dialogueIndex,Emotion);
        if(Emotion != undefined)
        {
            for(let index of this.Emojis)
            {
                if(index.alias == Emotion && !!SpeakerAvatar)
                {
                    index.asset.visible = true;
                    index.asset.x = SpeakerAvatar.asset.x;
                    index.asset.y = this.app.screen.height - 150 - SpeakerAvatar.asset.height - 10 - index.asset.height;
                }

            }
        }

        setTimeout(() =>
        {
            this.counter += 1;
            this.counter > this.APIResponse.dialogue.length-1 ? '' : this.updateDialogue(this.counter);
        }, 2500);
        this.dialogueHolder.innerText = this.trimDialogue(dialogue);
    }

    private getEmotion(diag:string)
    {
        const [tagstart,tagend] = [diag.indexOf(`{`),diag.indexOf(`}`)];
        if(tagstart == -1 || tagend == -1)return undefined;

        const emotion = diag.substring(tagstart+1,tagend);
        return emotion;
    }

    private trimDialogue(diag:string):string
    {
        let dialogueString = diag
        const [tagstart,tagend] = [dialogueString.indexOf(`{`),dialogueString.indexOf(`}`)];
        if(tagend==-1 || tagstart == -1) return dialogueString;
        // console.log(tagstart,tagend);

        const [diag1,diag2] = [diag.substring(0,tagstart-1),diag.substring(tagend+1)];
        console.log(diag2);

        return `${diag1}${diag2}`;
    }

    public reset()
    {
        this.counter = 0;
    };

}