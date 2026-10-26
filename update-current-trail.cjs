const fs=require('node:fs'),root=__dirname+'/equation-grove/',file=root+'dist/app.js';let code=fs.readFileSync(file,'utf8');
function replace(old,next){if(!code.includes(old))throw new Error('Missing current-trail edit: '+old.slice(0,100));code=code.replace(old,next)}
replace('  function explore(){const active=state.session;',`  function currentTrailKey(){if(state.session)return [...missions.map(m=>m.key),'words'].includes(state.session.type)?state.session.type:null;return missions.find(m=>!state.history.some(r=>r.type===m.key&&r.finished))?.key||null}
  function explore(){const active=state.session,currentKey=currentTrailKey();`);
replace("'<button class=\"button '+(i?'secondary':'')+'\" data-start=\"'+m.key+'\">'", "'<button class=\"button '+(m.key===currentKey?'current-trail':'secondary')+'\" '+(m.key===currentKey?'aria-current=\"step\" ':'')+'data-start=\"'+m.key+'\">'");
replace('<button class="button secondary" data-start="words">Try a story · optional ', '<button class="button \'+(currentKey===\'words\'?\'current-trail\':\'secondary\')+\'" \'+(currentKey===\'words\'?\'aria-current="step" \':\'\')+\'data-start="words">Try a story · optional ');
replace("(active?'Continue my trail':'Let’s explore')", "(active?'Continue my trail':currentKey?'Let’s explore':'Visit my garden')");
replace("$('#hero-start').onclick=()=>active?navigate('play'):startPreview('add');", "$('#hero-start').onclick=()=>active?navigate('play'):currentKey?startPreview(currentKey):navigate('garden');");
fs.writeFileSync(file,code,'utf8');
console.log('Green button follows the active trail or next unfinished standard trail.');
