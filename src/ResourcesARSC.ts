export class ResourcesARSC {

    private static readonly _path = "resources.arsc";
    private _content: any

    constructor(content : any) {
       this._content = content;
    }

    static getPath(): string {
        return this._path;
    }

    private parse(){

    }

    public resolve(id: string): any{
        return this._content;
    }

}
