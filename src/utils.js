const fs=require("fs"),mime=require("mime"),fetch=require("node-fetch"),{URL:URL}=require("url"),{MessageMedia:MessageMedia}=require("whatsapp-web.js"),vcardToJSON=e=>{const a={},r=e.split("\n");for(const e of r){const[r,t]=e.split(":");"BEGIN"!==r&&"END"!==r&&"PHOTO;BASE64"!==r&&("VERSION"===r&&(a.version=t),"N"===r&&(a.n=t),"FN"===r&&(a.fn=t),"ORG"===r&&(a.org=t),"TITLE"===r&&(a.title=t),r.toLowerCase().indexOf("waid")>=0&&(a.waid=t),"TEL;type=Work"===r&&(a.telWork=t),"TEL;type=Home"===r&&(a.telHome=t),"EMAIL;TYPE=Work"===r&&(a.emailWork=t),"EMAIL;TYPE=Home"===r&&(a.emailHome=t),r.indexOf("ADR;type=Work")>=0&&(a.adrWork=t),r.indexOf("ADR;type=Home")>=0&&(a.adrHome=t))}return a},waitFor=e=>new Promise(a=>setTimeout(a,e)),asyncForEach=async(e,a)=>{for(let r=0;r<e.length;r++)await a(e[r],r,e)},saveMedia=(e,a,r)=>{fs.writeFile(`${e}\\${a}`,r,e=>{e&&console.log(e),console.log(`The file '${a}' was saved!`)})},fromUrl=async(e,a={})=>{let r;if(!a.unsafeMime){const a=new URL(e);if(!(r=mime.getType(a.pathname)))throw new Error("Unable to determine MIME type")}async function t(e,a){const r=Object.assign({headers:{accept:"image/* video/* text/* audio/*"}},a),t=await fetch(e,r),o=t.headers.get("Content-Type");let i="";if(t.buffer)i=(await t.buffer()).toString("base64");else{new Uint8Array(await t.arrayBuffer()).forEach(e=>{i+=String.fromCharCode(e)}),i=btoa(i)}return{data:i,mime:o}}const o=a.client?await a.client.pupPage.evaluate(t,e,a.reqOptions):await t(e,a.reqOptions);return r||(r=o.mime),new MessageMedia(r,o.data,null)};module.exports={vcardToJSON:vcardToJSON,waitFor:waitFor,asyncForEach:asyncForEach,saveMedia:saveMedia,fromUrl:fromUrl};