const fs=require('node:fs'),path=require('node:path');
const source=path.join(__dirname,'equation-grove');
new Function('require','__dirname',fs.readFileSync(path.join(source,'preview.cjs'),'utf8').replaceAll('5173','5174'))(require,source);
