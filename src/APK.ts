import { MANIFEST } from "./MANIFEST";
import { ResourcesARSC } from "./ResourcesARSC";

const StreamZip = require("node-stream-zip");

export class APK {

    private zip: any;
    private entries: any[] = [];

    private _manifest: MANIFEST = null;
    private _resources: ResourcesARSC = null;

    constructor(path: string) {
        this.zip = new StreamZip({
            file: path,
            storeEntries: true,
        });
        this.zip.on("error", this.zipError.bind(this));
    }

    public close(){
        this.zip.close();
    }

    public open(): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            this.zip.on("ready", () => {
                this.entries = this.zip.entries();
                resolve(this.getEntries());
            });
        });
        promise.catch(e => this.zipError(e))
        return promise;
    }

    private zipError(err: any): void {
        console.error(err);
    }

    public getEntries(): any{
        return this.entries;
    }

    public getManifest() {
        const promise = new Promise<any>((resolve, reject) => {
            if(this._manifest == null){
                this._manifest = new MANIFEST(this.zip.entryDataSync(MANIFEST.getPath()));            }
            resolve(this._manifest);
        });       
        return promise;
    }

    public getResources(){
        const promise = new Promise<any>((resolve, reject) => {
            if(this._resources == null){
                this._resources = new ResourcesARSC(this.zip.entryDataSync(ResourcesARSC.getPath()));            }
            resolve(this._resources);
        });       
        return promise;
    }

}
