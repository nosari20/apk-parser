const BinaryXML = require('binary-xml');

export class MANIFEST {

    private static readonly _path = "AndroidManifest.xml";
    private _rawXML: any = null;
    private _document: any;


    constructor(content : any) {
        const reader = new BinaryXML(content);
        this._document = reader.parse();
    }


    static getPath(): string {
        return this._path;
    }

    public document(): any {
        return this._document;
    }

    public rawXML(): string {
        if(this._rawXML == null){
            let loop: Function = function(node: any, tab: string = "") : string{
                return ""+
                        tab + "<"+node.nodeName+
                        (node.attributes.length > 0 ? "\n"+node.attributes.map((attr: any) => tab + "\t"+ (attr.namespaceURI ? attr.namespaceURI.split("/").slice(-1).pop()+":" : "")+attr.nodeName+"= \""+(attr.value != null ? attr.value : attr.typedValue.value) + "\"").join("\n") : "")+">\n"+
                        (node.childNodes != null ? node.childNodes.map((n: any) => loop(n, tab+"\t")).join("") : "")+
                        tab+ "</"+node.nodeName+">\n"
            }
            this._rawXML = loop(this._document);
        }
        return this._rawXML;
    }

}
