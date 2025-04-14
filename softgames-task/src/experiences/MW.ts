import {Application} from 'pixi.js';

export class MagicWords 
{
    private app : Application;
    constructor(app:Application)
    {
        this.app = app;
    };

    public async init()
    {
        console.log('magic words');
    };
}