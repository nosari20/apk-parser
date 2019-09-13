const APK_parser = require('../dist/APK');

let file = __dirname +'/twitter.apk';
let apk = new APK_parser.APK(file);

apk.open()
.then((entries) => {
    apk.getManifest().then((manifest) => {             
        console.log(manifest.document());
        console.log(manifest.rawXML());
    })

})
.finally(()=>{
    apk.close();
})