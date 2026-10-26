const fs=require('node:fs'),root=__dirname+'/equation-grove/';
let code=fs.readFileSync(root+'dist/reports.js','utf8');
function replace(old,next){if(!code.includes(old))throw new Error('Missing report edit: '+old.slice(0,90));code=code.replace(old,next)}
replace("mixed:'Mixed equations'", "mixed:'Mixed equations','add-stretch':'The riverbend trail','multiply-stretch':'The orchard path','two-stretch':'The treetop trail',words:'The garden story trail (optional)'");
replace("'Written working']", "'Written working','Trail difficulty','Question format','Worded question','Answer unit']");
replace('q.skipped,q.solved,q.work]',"q.skipped,q.solved,q.work,r.type==='words'?'Optional worded questions':r.type.endsWith('-stretch')?'Slightly harder':'Core',q.kind==='word'?'Worded':'Symbolic',q.prompt||'',q.answerUnit||'']");
replace("r.mode==='assessment'&&r.finished", "r.mode==='assessment'&&r.finished&&r.type!=='words'");
replace('Skill evidence above uses completed assessments only.', 'Skill evidence above uses completed equation assessments only. Optional worded questions are reported separately.');
const at=code.indexOf('    for(const [recordIndex,r]of records.entries())');
if(at<0)throw new Error('Report record section missing');
code=code.slice(0,at)+`    const wordRecords=records.filter(r=>r.type==='words');
    if(wordRecords.length){section('Optional worded trail - separate evidence');const c=stats(wordRecords);text(wordRecords.length+' optional trail(s); '+c.total+' puzzles; first answer correct '+c.first+'/'+c.total+'; independent '+c.independent+'/'+c.total+'; skipped '+c.skipped+'.',{size:10});text('This optional trail is separate from equation-trail skill summaries. It is not required for access, progress or garden activities.',{size:9,color:muted})}
`+code.slice(at);
replace("${r.mode==='assessment'?'Assessment':'Practice'} | ${r.format", "${r.type==='words'?'Optional worded trail':r.type.endsWith('-stretch')?'Slightly harder equation trail':'Equation trail'} | ${r.mode==='assessment'?'Assessment':'Practice'} | ${r.format");
replace('        const rows=[','        const rows=[\n          ...(q.prompt?[{value:\'Story: \'+q.prompt,size:10,color:ink}]:[]),');
replace("| Correct value: x = ${q.answer}","| Correct ${q.kind==='word'?'answer: '+q.answer+' '+q.answerUnit:'value: x = '+q.answer}");
fs.writeFileSync(root+'dist/reports.js',code,'utf8');
let app=fs.readFileSync(root+'dist/app.js','utf8');
app=app.replace('options:M.options(q.answer),','options:M.options(q.answer,q.kind===\'word\'),').replace('${r.questions.length} equations explored.','${r.questions.length} ${r.type===\'words\'?\'story puzzles\':\'equations\'} explored.').replace('<br>x = ${M.fmt(q.answer)}</span>','<br>${q.kind===\'word\'?\'Answer: \'+M.fmt(q.answer)+\' \'+esc(q.answerUnit):\'x = \'+M.fmt(q.answer)}</span>').replaceAll('The equation is shown above.','The question is shown above.').replaceAll('You can read the equation on screen.','You can read the question on screen.');
fs.writeFileSync(root+'dist/app.js',app,'utf8');
let math=fs.readFileSync(root+'dist/math.js','utf8');math=math.replace('function options(answer){return shuffled([answer,...shuffled([1,-1,2,-2,3,-3,4,-4]).slice(0,3).map(n=>answer+n)])}','function options(answer,positive=false){return shuffled([answer,...shuffled([1,-1,2,-2,3,-3,4,-4].filter(n=>!positive||answer+n>0)).slice(0,3).map(n=>answer+n)])}');fs.writeFileSync(root+'dist/math.js',math,'utf8');
console.log('Worded questions and difficulty recorded in PDF/CSV; optional evidence separated.');
