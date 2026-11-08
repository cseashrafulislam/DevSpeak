import {AI_PHASES,AI_DAYS,AI_EXAMPLES,AI_RESOURCES} from "./ai-curriculum.js";
import {escapeHtml as h} from "./core.js";

const AI_KEY="devspeak-ai-engineering-v1";
const total=AI_DAYS.length;
const validDay=n=>Number.isInteger(n)&&n>=1&&n<=total;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const cleanDays=xs=>[...new Set((Array.isArray(xs)?xs:[]).map(Number).filter(validDay))].sort((a,b)=>a-b);
function loadAiState(){
  try{
    const raw=JSON.parse(localStorage.getItem(AI_KEY));
    if(!raw||typeof raw!=="object")throw Error("Invalid");
    const notes={};
    if(raw.notes&&typeof raw.notes==="object"){
      for(const [key,value] of Object.entries(raw.notes)){
        if(validDay(Number(key))&&typeof value==="string")notes[key]=value.slice(0,3000);
      }
    }
    return {day:validDay(raw.day)?raw.day:1,completed:cleanDays(raw.completed),notes};
  }catch{return {day:1,completed:[],notes:{}};}
}
let ai=loadAiState();
let filter="";
let search="";
let showAll=false;
const pcount=p=>ai.completed.filter(day=>Math.floor((day-1)/30)===p).length;
const pct=n=>Math.round(n/total*100);
function persist(){try{localStorage.setItem(AI_KEY,JSON.stringify(ai));}catch{}}
export function aiSelectedDay(){return ai.day;}
export function getAiCourseSummary(){return {total,completed:ai.completed.length,day:ai.day,phases:AI_PHASES.length};}
const action=(label,name,attrs="",kind="button-line")=>
  '<button type="button" class="'+kind+'" data-action="'+name+'" '+attrs+'>'+label+'</button>';
const badge=(text,cls="")=>'<span class="chip '+cls+'">'+h(text)+'</span>';
const codeExample=day=>{
  const exact=AI_EXAMPLES.find(x=>x.day===day);
  if(exact)return {example:exact,exact:true};
  const phase=Math.floor((day-1)/30);
  const pool=AI_EXAMPLES.filter(x=>Math.floor((x.day-1)/30)===phase);
  if(!pool.length)return null;
  return {example:pool.filter(x=>x.day<=day).at(-1)||pool[0],exact:false};
};
function phaseList(){
  return '<div class="ai-phase-grid">'+AI_PHASES.map((p,i)=>
    '<button type="button" class="ai-phase '+(filter===String(i)?"chosen":"")+
    '" data-action="ai-phase" data-phase="'+i+'">'+
    '<span class="ai-phase-icon">'+p.icon+'</span><span class="ai-phase-title">'+h(p.name)+'</span>'+
    '<small>'+h(p.bn)+'</small><span class="ai-phase-meta">'+h(p.range)+' · '+pcount(i)+'/30</span>'+
    '<span class="progress-track"><span class="progress-fill" style="width:'+(pcount(i)/30*100)+'%"></span></span>'+
    '</button>').join("")+'</div>';
}
function dayGrid(){
  const lower=search.trim().toLowerCase();
  const found=AI_DAYS.filter(d=>(filter===""||String(d.phase)===filter) &&
    (!lower||(d.title+" "+d.concept+" "+d.lab+" "+d.day).toLowerCase().includes(lower)));
  const visible=showAll?found:found.slice(0,60);
  return '<form id="aiSearchForm" class="ai-filter-row">'+
    '<label class="ai-search-label" for="aiSearch">Find a lesson</label>'+
    '<input id="aiSearch" class="search-bar" placeholder="Search C#, RAG, ML.NET, voice, SQL..." maxlength="100" value="'+h(search)+'">'+
    '<button class="button-line" type="submit">Search</button>'+
    action("All phases","ai-all")+'</form>'+
    '<div class="ai-day-grid">'+visible.map(d=>
      '<button type="button" class="ai-day '+(ai.day===d.day?"selected ":"")+
      (ai.completed.includes(d.day)?"complete":"")+'" data-action="ai-day" data-day="'+d.day+'">'+
      '<span>DAY '+String(d.day).padStart(3,"0")+'</span><strong>'+h(d.title)+'</strong>'+
      '<small>'+h(AI_PHASES[d.phase].name)+'</small>'+
      (ai.completed.includes(d.day)?'<span class="ai-check">✓</span>':'')+'</button>').join("")+'</div>'+
    (found.length>visible.length?'<div class="ai-more">'+action("Show all "+found.length+" lessons","ai-show-all")+'</div>':"")+
    (!found.length?'<div class="empty">No lesson matches your search. Try another keyword.</div>':"");
}
function lessonDetails(){
  const d=AI_DAYS[ai.day-1],p=AI_PHASES[d.phase],ex=codeExample(d.day);
  return '<section class="ai-lesson" id="aiLesson">'+
    '<div class="ai-lesson-head"><div>'+badge("PHASE "+(d.phase+1)+" · DAY "+d.day)+
    '<h2>'+h(d.title)+'</h2><p>'+h(p.bn)+'</p></div>'+
    badge(ai.completed.includes(d.day)?"✓ Completed":"In progress",ai.completed.includes(d.day)?"green":"")+'</div>'+
    '<div class="ai-lesson-section"><span class="card-label">01 · CONCEPT / কী শিখবে</span>'+
    '<p>'+h(d.concept)+'</p><p class="muted">Understand the input, the expected output, where this skill fits into an ERP, and the limitations before coding.</p></div>'+
    '<div class="ai-lesson-section"><span class="card-label">02 · CODE LAB / হাতে-কলমে কোড</span>'+
    '<p>'+h(d.lab)+'</p><ol class="ai-steps"><li>Create a small isolated C#, SQL or Python lab.</li>'+
    '<li>Implement the requested feature with explicit types and input validation.</li>'+
    '<li>Test normal input, empty/invalid input, and at least one boundary case.</li>'+
    '<li>Save the code and record actual output or metrics.</li></ol></div>'+
    (ex?'<div class="ai-lesson-section ai-code-section"><div class="ai-code-head"><div>'+
      '<span class="card-label">03 · '+(ex.exact?"WORKED CODE EXAMPLE":"RELATED CHAPTER CODE EXAMPLE")+'</span>'+
      '<h3>'+h(ex.example.title)+'</h3><small>'+h(ex.example.language)+'</small></div>'+
      action("Copy code","ai-copy", 'data-example-day="'+ex.example.day+'"',"button-small")+'</div>'+
      (!ex.exact?'<p class="ai-code-note">This example belongs to Day '+ex.example.day+'. Your Day '+d.day+' coding task above is separate.</p>':"")+
      '<p class="ai-code-note">'+h(ex.example.setup)+'</p><pre class="ai-code"><code>'+h(ex.example.code)+'</code></pre>'+
      '<div class="notice">Expected: '+h(ex.example.expected)+'</div></div>':"")+
    '<div class="ai-lesson-section"><span class="card-label">04 · PRACTICAL DELIVERABLE</span>'+
    '<p><strong>'+h(d.evidence)+'</strong></p><p class="muted">Keep a screenshot/log, test result, or Git commit for your portfolio. A model-generated answer alone is not completion.</p></div>'+
    '<div class="ai-lesson-section"><span class="card-label">05 · SELF-CHECK</span>'+
    '<ul class="ai-checklist"><li>Can you explain today’s concept without reading?</li>'+
    '<li>Does your code produce the expected output on valid input?</li>'+
    '<li>Have you tried one invalid or boundary input?</li>'+
    '<li>Did you record a limitation or security concern?</li></ul>'+
    '<label class="ai-notes-label" for="aiNotes">Learning notes (saved only in this browser)</label>'+
    '<textarea class="ai-notes" id="aiNotes" rows="4" maxlength="3000" placeholder="What I learned, bugs, test results...">'+
      h(ai.notes[d.day]||"")+'</textarea>'+
    '<div class="action-row">'+action("Save notes","ai-save-notes")+
    action(ai.completed.includes(d.day)?"✓ Completed — undo":"✓ Mark day complete","ai-complete","","button-primary")+'</div></div>'+
    '<div class="ai-lesson-footer">'+action("← Previous","ai-previous",d.day===1?"disabled":"")+
    action("Next lesson →","ai-next",d.day===total?"disabled":"")+'</div>'+
    '</section>';
}
export function renderAiEngineering(){
  const done=ai.completed.length,phase=Math.floor((ai.day-1)/30);
  return '<section class="ai-hero"><div><span class="eyebrow">NEW LEARNING TRACK · SEPARATE FROM ENGLISH</span>'+
    '<h1>AI Engineering <span>with C# + SQL Server</span></h1>'+
    '<p>বাংলা ব্যাখ্যা, ১৮০ দিনের hands-on curriculum, daily code lab, ২১টি worked example, project milestones, self-check এবং browser-only progress।</p>'+
    '<div class="hero-buttons">'+action("Continue Day "+ai.day,"ai-focus","","button-primary")+
    action("Export AI progress","ai-export","","button-secondary")+'</div></div>'+
    '<div class="ai-hero-stat"><strong>'+pct(done)+'%</strong><span>'+done+' / '+total+' lessons complete</span>'+
    '<div class="progress-track"><div class="progress-fill" style="width:'+pct(done)+'%"></div></div>'+
    '<small>Recommended 2–3 hours/day. Completion is self-reported, not a certification.</small></div></section>'+
    '<div class="ai-summary-grid">'+
      '<div class="stat-card"><span class="stat-icon">▦</span><div><div class="stat-number">'+total+'</div><span class="stat-label">Daily tutorials</span></div></div>'+
      '<div class="stat-card"><span class="stat-icon blue">{ }</span><div><div class="stat-number">'+AI_EXAMPLES.length+'</div><span class="stat-label">Worked code examples</span></div></div>'+
      '<div class="stat-card"><span class="stat-icon purple">◈</span><div><div class="stat-number">6</div><span class="stat-label">Capstone projects</span></div></div>'+
      '<div class="stat-card"><span class="stat-icon amber">✓</span><div><div class="stat-number">'+pcount(phase)+'/30</div><span class="stat-label">Current phase</span></div></div></div>'+
    '<div class="ai-layout"><div class="ai-course-nav">'+
      '<div class="section-head"><div><h2>Learning roadmap</h2><p>ফেজ বেছে নিয়ে যেকোনো দিনের tutorial খুলে পড়ো।</p></div></div>'+
      phaseList()+dayGrid()+
      '<div class="card ai-resources"><h3>Official learning references</h3><ul>'+
        AI_RESOURCES.map(r=>'<li><a href="'+h(r.url)+'" target="_blank" rel="noopener noreferrer">'+h(r.title)+' ↗</a></li>').join("")+
      '</ul></div></div><div class="ai-course-detail">'+lessonDetails()+'</div></div>'+
      '<div class="ai-bottom-actions">'+action("Reset AI progress","ai-reset")+
      '<small>English lessons, vocabulary, speech and all existing DevSpeak data stay unchanged.</small></div>';
}
function selectDay(day,rerender){if(!validDay(day))return;ai.day=day;filter=String(Math.floor((day-1)/30));persist();rerender();document.getElementById("aiLesson")?.scrollIntoView({behavior:"smooth",block:"start"});}
function exportProgress(){
  const blob=new Blob([JSON.stringify({version:1,exportedAtUtc:new Date().toISOString(),...ai},null,2)],
    {type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="devspeak-ai-progress.json";document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export function handleAiAction(el,rerender,toast){
  const name=el.dataset.action;
  if(!name?.startsWith("ai-"))return false;
  if(name==="ai-day")selectDay(Number(el.dataset.day),rerender);
  else if(name==="ai-previous")selectDay(ai.day-1,rerender);
  else if(name==="ai-next")selectDay(ai.day+1,rerender);
  else if(name==="ai-phase"){filter=el.dataset.phase;showAll=false;rerender();}
  else if(name==="ai-all"){filter="";search="";showAll=false;rerender();}
  else if(name==="ai-show-all"){showAll=true;rerender();}
  else if(name==="ai-focus")document.getElementById("aiLesson")?.scrollIntoView({behavior:"smooth"});
  else if(name==="ai-save-notes"){ai.notes[ai.day]=(document.getElementById("aiNotes")?.value||"").slice(0,3000);persist();toast("AI learning notes saved.");}
  else if(name==="ai-complete"){
    ai.completed=ai.completed.includes(ai.day)?ai.completed.filter(x=>x!==ai.day):cleanDays([...ai.completed,ai.day]);
    ai.notes[ai.day]=(document.getElementById("aiNotes")?.value||"").slice(0,3000);
    persist();rerender();toast("AI learning progress updated.");
  }
  else if(name==="ai-copy"){
    const example=AI_EXAMPLES.find(x=>x.day===Number(el.dataset.exampleDay));
    if(example&&navigator.clipboard?.writeText)navigator.clipboard.writeText(example.code).then(()=>toast("Code copied."),()=>toast("Copy unavailable in this browser."));
    else toast("Copy unavailable; select the code manually.");
  }
  else if(name==="ai-export"){exportProgress();toast("AI progress downloaded.");}
  else if(name==="ai-reset"){
    if(confirm("Reset only AI Engineering progress and notes? Existing English progress will stay.")){
      ai={day:1,completed:[],notes:{}};filter="";search="";showAll=false;persist();rerender();toast("AI progress reset.");
    }
  }
  return true;
}
export function handleAiSubmit(event,rerender){
  if(event.target.id!=="aiSearchForm")return false;
  event.preventDefault();search=(document.getElementById("aiSearch")?.value||"").trim().slice(0,100);
  showAll=false;rerender();return true;
}
