const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'equation-grove');
const file=path.join(root,'dist/app.js');
let js=fs.readFileSync(file,'utf8');
const oldMain=`'<button class="button '+(m.key===currentKey?'current-trail':'secondary')+'" '+(m.key===currentKey?'aria-current="step" ':'')+'data-start="'+m.key+'">'+(mode==='practice'?'Explore trail':'Start check-in')+' '+icon('arrow')+'</button></div></article>'`;
const newMain=`trailButton(m.key,currentKey,mode==='practice'?'Explore trail':'Start check-in')+'</div></article>'`;
const oldStory=`<button class="button '+(currentKey==='words'?'current-trail':'secondary')+'" '+(currentKey==='words'?'aria-current="step" ':'')+'data-start="words">Try a story · optional '+icon('arrow')+'</button></div></section>'`;
const newStory=`'+trailButton('words',currentKey,'Try a story · optional')+'</div></section>'`;
for(const [before,after] of [[oldMain,newMain],[oldStory,newStory]]){if(!js.includes(before))throw Error('Expected button not found');js=js.replace(before,after)}
fs.writeFileSync(file,js);
const css=path.join(root,'dist/trails.css');
fs.appendFileSync(css,'\n.button.completed-trail{background:var(--gold);border-color:#b28c3f;color:#243e34}.button.completed-trail:hover{background:#d4aa53}\n');
const readme=path.join(root,'README.md');
let docs=fs.readFileSync(readme,'utf8');
const old='Only the current trail has a green start button. An unfinished run takes priority, including an optional story trail the learner has chosen. Otherwise the first unfinished equation trail is highlighted. When all six equation trails are complete, start buttons remain neutral and the main button offers the garden.';
const next='Completed trails have a gold **Explore Trail Again** button in both practice and assessment, including the optional story trail. Gold takes priority even during a replay. Only the current unfinished trail has a green start button. An unfinished run takes priority, including an optional story trail the learner has chosen. Otherwise the first unfinished equation trail is highlighted. When all six equation trails are complete, their buttons stay gold and the main button offers the garden.';
if(!docs.includes(old))throw Error('Expected README paragraph not found');
fs.writeFileSync(readme,docs.replace(old,next));
