const fs=require('node:fs'),file=__dirname+'/equation-grove/dist/app.js';let code=fs.readFileSync(file,'utf8');
function replace(old,next){if(!code.includes(old))throw new Error('Missing edit: '+old.slice(0,70));code=code.replace(old,next)}
replace('</select></label><p class="report-status"','</select></label><label class="garden-keepsake-option"><input id="include-garden" type="checkbox" checked>Include a picture of my garden in the PDF</label><p class="report-status"');
replace('let ready=null,version=0;',"const pictureInput=$('#include-garden');let ready=null,version=0;");
replace('try{const bundle=await reports.bundle(selected.records,selected.label);','try{const gardenSnapshot=pictureInput.checked?structuredClone(state.garden):null;const gardenPicture=gardenSnapshot?await G.capture(gardenSnapshot):null;const bundle=await reports.bundle(selected.records,selected.label,{garden:gardenPicture?{snapshot:gardenSnapshot,image:gardenPicture}:null});');
replace('The draft contains one CSV and one PDF report.`','The draft contains one CSV and one PDF report.${gardenSnapshot?\' Your garden picture is included.\':\'\'}`');
replace('The files could not be prepared. Choose the results again to retry. Your saved answers are unchanged.','The files could not be prepared. Try turning off the garden picture, or choose the results again to retry. Your saved answers are unchanged.');
replace('scope.onchange=prepare;', 'scope.onchange=prepare;pictureInput.onchange=prepare;');
fs.writeFileSync(file,code,'utf8');console.log('Garden keepsake added to the email report flow.');
