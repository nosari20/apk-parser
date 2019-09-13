import { MANIFEST } from "./MANIFEST";

const StreamZip = require("node-stream-zip");

export class APK {

    private zip: any;
    private entries: any[] = [];

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
            const manifest = new MANIFEST(this.zip.entryDataSync(MANIFEST.getPath()));
            resolve(manifest);
        });   
        
        return promise;
    }

}
