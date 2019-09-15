const APK_parser = require('../dist/APK');

let file = __dirname +'/twitter.apk';
let apk = new APK_parser.APK(file);

apk.open()
.then((entries) => {
    Promise.all([apk.getManifest(), apk.getResources()]).then(([manifest, resources]) =>{
        //console.log(manifest.document());
        let iconRef = manifest.document().childNodes.filter(n => n.nodeName == "application")[0].attributes.filter(a => a.nodeName == "icon")[0].typedValue.value;
        console.log("Icon ref = " + iconRef)
        console.log(resources.resolve(iconRef))
    })
})
.finally(()=>{
    apk.close();
})