const fs=require('node:fs'),base=__dirname+'/equation-grove/dist/';
let code=fs.readFileSync(base+'garden.js','utf8');
function replace(old,next){if(!code.includes(old))throw new Error('Missing '+old);code=code.replace(old,next)}
replace('y:325+Math.floor(i/4)*125','y:300+Math.floor(i/4)*165');
replace('<g class="plant-sway">${plantSVG(plant.species,plant.stage)}</g>','<g class="plant-sway"><g transform="scale(${species(plant.species).kind===\'tree\'?.52:.74})">${plantSVG(plant.species,plant.stage)}</g></g>');
replace('<g transform="translate(90 139)">${plantSVG(id,stage)}</g>','<g transform="translate(90 ${id===\'cherry\'?147:139}) scale(${id===\'cherry\'?.8:1})">${plantSVG(id,stage)}</g>');
replace('viewBox="0 0 1100 690"','viewBox="0 0 1100 780"');
code=code.replaceAll('height="690"','height="780"');
replace('v491H0Z','v581H0Z');
replace('M75 258h950v382H75Z','M75 243h950v487H75Z');
replace('M68 262q240-22 483 0t484 0M70 417h960M70 542h960M310 250v383M550 250v383M790 250v383','M68 237q240-22 483 0t484 0M70 405h960M70 570h960M310 237v493M550 237v493M790 237v493');
replace('translate(53 596)','translate(53 686)');replace('translate(1045 556)','translate(1045 646)');replace('y="669"','y="759"');replace('canvas.height=1035','canvas.height=1170');
fs.writeFileSync(base+'garden.js',code,'utf8');
let app=fs.readFileSync(base+'app.js','utf8');app=app.replaceAll('/690*100','/780*100').replace("toast(n+' plants watered. A little more growth!')","toast(n+' '+(n===1?'plant':'plants')+' watered. A little more growth!');if($('#water-all')&&!$('#water-all').disabled)$('#water-all').focus();else if($('#collect-bonus'))$('#collect-bonus').focus()");fs.writeFileSync(base+'app.js',app,'utf8');
let reports=fs.readFileSync(base+'reports.js','utf8');reports=reports.replace('const picture=await doc.embedPng(image),pictureHeight=width*picture.height/picture.width;','const picture=await doc.embedPng(image),pictureScale=Math.min(width/picture.width,340/picture.height),pictureWidth=picture.width*pictureScale,pictureHeight=picture.height*pictureScale;').replace('page.drawImage(picture,{x:margin,y:y-pictureHeight,width,height:pictureHeight});','page.drawImage(picture,{x:margin+(width-pictureWidth)/2,y:y-pictureHeight,width:pictureWidth,height:pictureHeight});');fs.writeFileSync(base+'reports.js',reports,'utf8');
console.log('Garden spacing, tree previews, and PDF picture proportions updated.');
