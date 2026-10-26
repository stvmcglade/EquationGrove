const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'equation-grove');
function edit(file,changes){let text=fs.readFileSync(path.join(root,file),'utf8');for(const [a,b]of changes){if(!text.includes(a))throw Error('Expected text missing: '+a.slice(0,100));text=text.replace(a,b)}fs.writeFileSync(path.join(root,file),text)}
edit('dist/app.js',[
 ["const locked=q.solved||(assessed&&first&&!q.revealed);","const locked=q.solved||(assessed&&first&&!q.revealed&&!q.hinted);"],
 ['${!assessed&&!locked?`<button class="text-button" id="hint">${icon(\'sun\')} A little hint</button><button class="text-button" id="reveal">${icon(\'book\')} Worked example</button>`:\'\'}${assessed&&first&&!q.revealed?`<button class="text-button" id="reveal">${icon(\'book\')} Worked example</button>`:\'\'}','<button class="button secondary small" id="hint" aria-controls="feedback">${icon(\'sun\')} A little hint</button><button class="button secondary small" id="reveal" aria-controls="feedback">${icon(\'book\')} Worked example</button>'],
 ["()=>{q.hinted=true;save();play();","()=>{q.hinted=true;q.supportView='hint';save();play();"],
 ["()=>{q.revealed=true;save();play();","()=>{q.revealed=true;q.supportView='worked';save();play();"],
 ["if(q.hinted&&!q.revealed)html+=exampleSupport(q,false);","if(q.hinted&&(!q.revealed||q.supportView==='hint'))html+=exampleSupport(q,false);"],
 ["if(q.revealed)html+=exampleSupport(q,true);","else if(q.revealed)html+=exampleSupport(q,true);"],
 ["Your first answer is saved. Then you can explore a similar example.","Hints and similar examples are available anytime. Your first answer and support used are saved."],
 ["Your first answer is recorded; explanations are available afterwards.","Your first answer is recorded, along with any hints or examples you use."],
 ["In assessment, your first answer is recorded before worked steps are available.","Hints and worked examples are available in both modes. Assessment records your first answer and whether you used support."],
 ["In assessment, the first valid submitted answer is final for marking; worked steps are available afterwards.","In assessment, the first valid submitted answer is final for marking. Hints and similar worked examples are available before and after answering; support used is recorded separately."],
 ["You can still enter your own answer.</p></div>'}","'+(q.solved?'Your puzzle is complete. Move on when you feel ready.':'You can still enter your own answer.')+'</p></div>'}"]
]);
edit('README.md',[
 ['Assessment records the first valid submitted answer before revealing any worked solution.','Assessment records the first valid submitted answer and the support used. Both the hint and worked-example buttons stay visible on every question in both learning modes, before and after answering.'],
 ['In assessment, worked steps become available after the first submission; revealing them enables a supported retry.','In assessment, hints and examples can be used before the first submission. First-answer correctness is still recorded, and an answer given after help is not counted as independent. After an incorrect first submission, either support button enables a retry; the original first-answer record remains unchanged. The learner can switch from a worked example back to its hint, including after reloading.'],
 ['In assessment, a similar worked example becomes available after the first submission.','Hints and similar worked examples are available at any time in both modes.'],
 ['Run `node verify.cjs`','Run `node stamp-assets.cjs` after changing assets and before packaging; asset URLs include content hashes to prevent incompatible cached scripts. Run `node verify-examples.cjs` for separate-example correctness. Run `node verify.cjs`']
]);
