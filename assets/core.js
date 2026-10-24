import {PHASES,PHRASES,WORDS,TECH} from "./data.js";
export const STORAGE_KEY="devspeak-global-v2";
export function freshState(){
  return {version:2,day:1,completedDays:[],tasks:{},words:{},grammar:{},techDone:[],interviewDone:[],history:[],activityDates:[],country:"global",role:"senior",accent:"en-US",drafts:{}};
}
export function safeState(input){
  const initial=freshState();
  if(!input||typeof input!=="object"||Array.isArray(input))return initial;
  const day=Number(input.day);
  if(Number.isInteger(day)&&day>=1&&day<=180)initial.day=day;
  for(const field of ["completedDays","activityDates","history","techDone","interviewDone"]){
    if(Array.isArray(input[field]))initial[field]=input[field].slice(-300);
  }
  initial.completedDays=[...new Set(initial.completedDays.filter(n=>Number.isInteger(n)&&n>=1&&n<=180))];
  initial.activityDates=[...new Set(initial.activityDates.filter(x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)))].slice(-200);
  initial.history=initial.history.filter(x=>x&&typeof x==="object"&&Number.isFinite(x.coverage)&&typeof x.date==="string").slice(-50);
  initial.techDone=[...new Set(initial.techDone.filter(x=>typeof x==="string"&&/^t\d{1,2}$/.test(x)&&TECH.some(t=>t.id===x)))];
  initial.interviewDone=[...new Set(initial.interviewDone.filter(x=>Number.isInteger(x)&&x>=0&&x<=50))];
  for(const field of ["tasks","words","grammar","drafts"]){
    if(input[field]&&typeof input[field]==="object"&&!Array.isArray(input[field])){
      initial[field]=Object.fromEntries(Object.entries(input[field]).slice(0,field==="words"?5500:500).filter(([k])=>/^[a-zA-Z0-9_-]{1,50}$/.test(k)));
    }
  }
  const wordIds=new Set(WORDS.map(w=>w.id));
  for(const [key,val] of Object.entries(initial.words)){
    if(!wordIds.has(key)||!val||typeof val!=="object"){delete initial.words[key];continue;}
    initial.words[key]={due:Math.max(0,Math.min(Number(val.due)||0,9e12)),interval:Math.max(0,Math.min(Number(val.interval)||0,365)),ease:Math.max(1.3,Math.min(Number(val.ease)||2.5,3)),reps:Math.max(0,Math.min(Number(val.reps)||0,1000))};
  }
  initial.tasks=Object.fromEntries(Object.entries(initial.tasks).filter(([k,v])=>/^d(1[0-7]\d|180|[1-9]\d?)_(words|listen|speak|tech)$/.test(k)&&v===true));
  initial.grammar=Object.fromEntries(Object.entries(initial.grammar).filter(([k,v])=>/^g\d{1,2}$/.test(k)&&v===true));
  initial.drafts=Object.fromEntries(Object.entries(initial.drafts).filter(([k,v])=>/^draft\d{1,2}$/.test(k)&&typeof v==="string").map(([k,v])=>[k,v.slice(0,5000)]));
  if(["global","kuwait","uae","europe","australia"].includes(input.country))initial.country=input.country;
  if(["backend","senior","erp"].includes(input.role))initial.role=input.role;
  if(["en-US","en-GB","en-AU"].includes(input.accent))initial.accent=input.accent;
  return initial;
}
export function dateKey(date=new Date()){
  const year=date.getFullYear(),month=String(date.getMonth()+1).padStart(2,"0"),day=String(date.getDate()).padStart(2,"0");
  return `${year}-${month}-${day}`;
}
export function getStreak(dates,now=new Date()){
  const days=new Set(dates);
  const cursor=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
  if(!days.has(dateKey(cursor)))cursor.setDate(cursor.getDate()-1);
  let count=0;
  while(days.has(dateKey(cursor))){count++;cursor.setDate(cursor.getDate()-1);}
  return count;
}
export function getPhase(day){return PHASES[Math.min(5,Math.floor((Math.max(1,Math.min(180,day))-1)/30))];}
export function phaseIndex(day){return Math.min(5,Math.floor((Math.max(1,Math.min(180,day))-1)/30));}
export function getDayContent(day){
  const d=Math.max(1,Math.min(180,Number(day)||1)),phase=phaseIndex(d),phaseDay=(d-1)%30,topic=PHASES[phase].topics[phaseDay%10];
  const style=["Learn","Use","Speak"][Math.floor(phaseDay/10)];
  const available=PHRASES.filter(p=>p.level<=phase);
  const offset=phase===0?((phaseDay*3)%available.length):((d*3)%available.length);
  return {day:d,phase,phaseDay,topic,style,phrases:Array.from({length:4},(_,i)=>available[(offset+i)%available.length]),technical:TECH[(d-1)%TECH.length]};
}
export function getDueWords(state,now=Date.now(),limit=9){
  const due=WORDS.filter(w=>state.words[w.id]&&state.words[w.id].due<=now);
  const newWords=WORDS.filter(w=>!state.words[w.id]);
  return [...due,...newWords].slice(0,limit);
}
export function reviewWord(previous,quality,now=Date.now()){
  const old=previous||{due:0,interval:0,ease:2.5,reps:0};
  const ease=Math.max(1.3,(Number(old.ease)||2.5)+(quality==="easy"?.15:quality==="again"?-.2:0));
  if(quality==="again")return {due:now+10*60*1000,interval:0,ease,reps:0};
  const reps=(Number(old.reps)||0)+1;
  const interval=quality==="easy"?Math.max(3,Math.round((old.interval||1)*ease)):reps===1?1:reps===2?3:Math.max(3,Math.round((old.interval||1)*ease));
  return {due:now+interval*86400000,interval,ease,reps};
}
export function wordsLearned(state){return Object.keys(state.words).filter(k=>state.words[k]?.reps>0).length;}
export const TASK_IDS=["words","listen","speak","tech"];
export function tasksDone(state,day){return TASK_IDS.filter(t=>state.tasks[`d${day}_${t}`]).length;}
export function dayReady(state,day){return tasksDone(state,day)===TASK_IDS.length;}
export function normalize(s){return String(s||"").toLowerCase().normalize("NFKC").replace(/[^a-z0-9\s+#.]/g," ").replace(/\s+/g," ").trim();}
export function answerCoverage(text,reference,keywords=[]){
  const a=normalize(text).split(" ").filter(Boolean),b=normalize(reference).split(" ").filter(Boolean);
  if(!a.length)return {wordMatch:0,coverage:0,matched:[],missing:keywords};
  const as=new Set(a),bs=new Set(b);
  const matched=keywords.filter(w=>as.has(normalize(w))||normalize(text).includes(normalize(w)));
  return {wordMatch:Math.round(100*[...bs].filter(w=>as.has(w)).length/Math.max(1,bs.size)),coverage:keywords.length?Math.round(100*matched.length/keywords.length):0,matched,missing:keywords.filter(w=>!matched.includes(w))};
}
export function escapeHtml(input){
  return String(input??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
export function safeJsonFile(raw){
  if(typeof raw!=="string"||raw.length>500000)throw new Error("Backup file is too large.");
  const parsed=JSON.parse(raw);
  if(!parsed||parsed.version!==2)throw new Error("This is not a DevSpeak v2 backup.");
  return safeState(parsed);
}
