const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'equation-grove');
function edit(file,changes){let t=fs.readFileSync(path.join(root,file),'utf8');for(const [a,b]of changes){if(!t.includes(a))throw Error('Expected text missing: '+a.slice(0,100));t=t.replace(a,b)}fs.writeFileSync(path.join(root,file),t)}
edit('dist/app.js',[
 ["const locked=q.solved||q.revealed||(assessed&&q.firstAnswer!==null);const first=q.firstAnswer!==null;","const first=q.firstAnswer!==null;const locked=q.solved||(assessed&&first&&!q.revealed);const canAdvance=locked||q.revealed;"],
 ['${locked?`<button class="button next-button" id="next">','${canAdvance?`<button class="button next-button" id="next">'],
 ['This one needs another look. You can see the steps, or move to the next puzzle.</p></div>','\'+(q.revealed?\'Your first answer stays saved for your teacher. You can try another answer using the steps below, or move on.\':\'This one needs another look. You can see the steps, or move to the next puzzle.\')+\'</p></div>'],
 ["if($('#next'))$('#next').focus();else $('#answer').focus()","if(q.solved&&$('#next'))$('#next').focus();else if(s.format==='choice')document.querySelector('[data-choice][aria-pressed=\"true\"]')?.focus();else $('#answer').focus()"]
]);
edit('README.md',[
 ['Practice permits hints, retries and worked solutions.','Practice permits hints, retries and worked solutions. Revealing a hint or worked steps leaves unsolved answers editable, in both typed and multiple-choice formats, including after reloading. Learners can also move on after exploring worked steps without having to answer. In assessment, worked steps become available after the first submission; revealing them enables a supported retry. Later attempts and eventual success are recorded without changing the original first answer, first-answer correctness or independent score, and without awarding duplicate puzzle rewards.']
]);
