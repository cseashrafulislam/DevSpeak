import {PHASES,NAV,PHRASES,WORDS,TECH,SCENARIOS,GRAMMAR,INTERVIEW,WRITING} from "./data.js";
import {STORAGE_KEY,freshState,safeState,dateKey,getStreak,getPhase,phaseIndex,getDayContent,getDueWords,reviewWord,wordsLearned,TASK_IDS,tasksDone,dayReady,answerCoverage,escapeHtml as h,safeJsonFile} from "./core.js";
import {renderAiEngineering,handleAiAction,handleAiSubmit,aiSelectedDay} from "./ai-engineering.js";

let state;
try{state=safeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));}catch{state=freshState();}
const ui={view:(location.hash.replace("#","")||"dashboard"),phase:0,wordFilter:"",wordCategory:"all",techFilter:"",techCategory:"all",scenario:"standup",speechId:"p0",listeningIndex:0,writingId:0,wordCatalogPage:0};
if(!NAV.some(x=>x.id===ui.view))ui.view="dashboard";
let toastTimer;
const $=id=>document.getElementById(id);
const wordCount=()=>wordsLearned(state);
const completed=()=>state.completedDays.length;
const percentage=n=>Math.min(100,Math.max(0,Math.round(n)));
function save(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{toast("Storage blocked. Export your progress for safety.");}
}
function activity(){const k=dateKey();if(!state.activityDates.includes(k))state.activityDates.push(k);}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3200);}
function setView(view){if(!NAV.some(x=>x.id===view))return;ui.view=view;history.replaceState(null,"","#"+view);render();window.scrollTo({top:0,behavior:"instant"});closeMenu();}
function closeMenu(){$("sidebar").classList.remove("open");$("mobileOverlay").hidden=true;$("menuToggle").setAttribute("aria-expanded","false");}
function openMenu(){$("sidebar").classList.add("open");$("mobileOverlay").hidden=false;$("menuToggle").setAttribute("aria-expanded","true");}
function stat(icon,n,label,tone=""){return `<div class="stat-card"><span class="stat-icon ${tone}">${icon}</span><div><div class="stat-number">${n}</div><span class="stat-label">${label}</span></div></div>`;}
function intro(title,bn,action=""){return `<div class="page-intro"><div><h1 class="page-title">${title}</h1><p>${bn}</p></div>${action}</div>`;}
function section(title,desc,right=""){return `<div class="section-head"><div><h2>${title}</h2>${desc?`<p>${desc}</p>`:""}</div>${right}</div>`;}
function btn(label,action,extra="",kind="button-line"){return `<button class="${kind}" type="button" data-action="${action}" ${extra}>${label}</button>`;}
function chip(text,kind=""){return `<span class="chip ${kind}">${h(text)}</span>`;}
function bar(p){return `<div class="progress-track"><div class="progress-fill" style="width:${percentage(p)}%"></div></div>`;}
function targetName(){return ({global:"Global Remote",kuwait:"Kuwait Remote",uae:"UAE Remote",europe:"Europe Remote",australia:"Australia Remote"})[state.country];}
function roleName(){return ({backend:".NET Backend Developer",senior:"Senior .NET Developer",erp:"ERP / Solution Architect"})[state.role];}
function taskCard(id,icon,title,desc,view){
  const done=!!state.tasks[`d${state.day}_${id}`];
  return `<div class="task ${done?"done":""}"><span class="task-num">${done?"✓":icon}</span><div class="task-content"><strong>${title}</strong><small>${desc}</small></div>${btn(done?"Review":"Practice","go",`data-view="${view}"`,"button-small")}</div>`;
}
function moduleCard(icon,title,description,view){
  return `<div class="card module-card"><div class="module-icon">${icon}</div><h3>${title}</h3><p>${description}</p>${btn("Open module →","go",`data-view="${view}"`,"text-link")}</div>`;
}
function renderDashboard(){
  const d=getDayContent(state.day),p=percentage(completed()/180*100);
  return `<section class="hero"><div><span class="eyebrow">YOUR ENGLISH CAREER STARTS HERE</span><h1>Zero English today.<br><span>Confident .NET engineer tomorrow.</span></h1><p>ইংরেজি একদম না জানলেও সমস্যা নেই। বাংলা দিয়ে শুরু করো, প্রতিদিন অল্প করে বলো, তারপর নিজের বাস্তব .NET ও ERP কাজ ইংরেজিতে বুঝিয়ে বলো। <strong style="color:#effff9">Target: ${h(targetName())} · ${h(roleName())}</strong></p><div class="hero-buttons">${btn("✦ Start today's lesson","go",'data-view="lesson"',"button-primary")}${btn("🎙 Practice speaking","go",'data-view="speaking"',"button-secondary")}</div></div><div class="hero-visual"><div class="orbit"><div class="orbit-main">🎙</div><div class="orbit-pill one">Hello, I am...</div><div class="orbit-pill two">I built this API ✓</div></div></div></section>
  <div class="stat-grid">${stat("▦",`${completed()} <small style="font-size:12px;color:#93a2b1">/180</small>`,"Days completed")}${stat("Aa",wordCount(),"Words practiced","blue")}${stat("✦",state.techDone.length,"Technical answers","purple")}${stat("🔥",getStreak(state.activityDates),"Day streak","amber")}</div>
  ${section("Your daily mission",`Day ${state.day}: ${d.topic} · ${PHASES[d.phase].bn}`,`<button class="link" data-action="go" data-view="roadmap">View full roadmap →</button>`)}
  <div class="content-grid"><div class="card"><div class="card-label">FOUR SMALL WINS A DAY</div><h3>Just 25–30 minutes.</h3><p class="muted">দীর্ঘ vocabulary মুখস্থ নয়—শুনবে, বলবে, কাজে লাগাবে। প্রতিটি অনুশীলনের পরে নিজে Completed দেবে।</p><div class="task-list">
  ${taskCard("words","Aa","Learn 4–8 useful words","বাংলা অর্থ ও উদাহরণসহ; spaced repetition","words")}
  ${taskCard("listen","♫","Listen and understand","ধীর গতিতে শুনে সঠিক বাক্য বেছে নাও","listening")}
  ${taskCard("speak","🎙","Speak a short sentence","মাইক্রোফোন বা টাইপ করে অনুশীলন","speaking")}
  ${taskCard("tech","{ }","Explain one .NET concept","নিজের জানা technology সহজ ইংরেজিতে বোঝাও","technical")}
  </div><div class="daily-result"><span class="muted">${tasksDone(state,state.day)} of 4 missions finished</span>${btn("Open daily lesson →","go",'data-view="lesson"',"button-primary")}</div><div style="margin-top:12px">${bar(tasksDone(state,state.day)*25)}</div></div>
  <div class="card accent"><div class="card-label">YOUR CURRENT LEVEL</div><h3>${h(getPhase(state.day).name)}</h3><p class="muted">${h(getPhase(state.day).desc)}</p><div class="progress-label"><span>180-day journey</span><strong>${p}%</strong></div>${bar(p)}<div style="height:21px"></div><div class="notice">💡 <strong>Technical skill ≠ English skill.</strong> তুমি .NET ভালো জানো—তাই প্রতিদিন আলাদা Technical Fast Lane থাকবে। English শুধু তোমার জ্ঞান বোঝানোর মাধ্যম।</div><div style="height:21px"></div><h3 style="font-size:15px">Ready for global remote work?</h3><p class="muted">Stand-ups, meetings, PR reviews, bug reports, client demos—সব English + বাংলা।</p>${btn("Try a remote meeting →","go",'data-view="simulator"',"button-primary")}</div></div>
  ${section("Choose your practice", "নিজের সুবিধামতো যে কোনো module শুরু করো।")}
  <div class="grid-3">${moduleCard("Aa","English from Zero","Hello → sentence → question. বাংলা ব্যাখ্যা ও pronunciation hints.","basics")}${moduleCard("♫","Listen & Repeat","Clear, slow English, with native browser voice.","listening")}${moduleCard("{ }",".NET Interview","Technical answers in simple and stronger English.","technical")}${moduleCard("✳","AI Engineering","180 separate AI lessons, C#/SQL/Python code labs and practical ERP projects.","ai-engineering")}</div>`;
}
function renderRoadmap(){
  const p=ui.phase,phase=PHASES[p];
  return `${intro("180-Day Learning Roadmap","৬টি ধাপে শুরু থেকে আন্তর্জাতিক রিমোট চাকরির ইন্টারভিউ পর্যন্ত। একদিনে সব নয়; ছোট, ব্যবহারযোগ্য অনুশীলন।")}
  <div class="grid-3">${PHASES.map((x,i)=>`<div class="phase-card ${i===p?"current":""}"><span class="phase-n">PHASE 0${i+1}</span><h3>${h(x.name)}</h3><p>${h(x.bn)} · ${h(x.desc)}</p><div class="phase-steps">DAYS ${i*30+1}–${i*30+30}</div><div style="margin-top:14px">${btn("Explore phase →","phase",`data-phase="${i}"`,"button-small")}</div></div>`).join("")}</div>
  ${section(`Phase ${p+1}: ${h(phase.name)}`,`দিন ${p*30+1}–${p*30+30} · ${h(phase.bn)}`)}
  <div class="card"><div class="muted">Day 1–10: Learn → Day 11–20: Use → Day 21–30: Speak. সবদিনেই একটি .NET Technical Fast Lane exercise আছে।</div><div class="day-grid">${Array.from({length:30},(_,i)=>i+1+p*30).map(n=>`<button type="button" data-action="selectDay" data-day="${n}" class="day-button ${n===state.day?"current":""} ${state.completedDays.includes(n)?"finished":""}" title="${h(getDayContent(n).topic)}">Day ${String(n).padStart(2,"0")}</button>`).join("")}</div></div>`;
}
function phraseRow(x,i=0){
  return `<div class="learning-item"><span class="word-bubble">${i+1}</span><div><div class="phrase-en">${h(x.en)}</div><div class="phrase-bn">${h(x.bn)}</div>${x.pron?`<div class="phrase-pron">উচ্চারণ সহায়তা: ${h(x.pron)}</div>`:""}</div><button class="audio-button" data-action="speakText" data-text="${h(x.en)}" aria-label="Listen to ${h(x.en)}">🔊</button></div>`;
}
function renderLesson(){
  const d=getDayContent(state.day),taskCount=tasksDone(state,state.day);
  const ready=dayReady(state,state.day),done=state.completedDays.includes(state.day);
  return `${intro(`Day ${String(state.day).padStart(2,"0")}: ${h(d.topic)}`,`${h(PHASES[d.phase].bn)} · ${h(d.style)} mode · 25–30 minutes`,btn("All 180 days","go",'data-view="roadmap"',"button-line"))}
  <div class="lesson-banner"><div><span class="card-label">TODAY'S GOAL</span><h3>Listen → Repeat → Explain</h3><p>ছোট বাক্য আগে। পারফেক্ট হওয়ার অপেক্ষা নয়—প্রতিদিন বলার অভ্যাস তৈরি করো।</p></div>${chip(`${taskCount}/4 complete`,"green")}</div>
  <div class="content-grid" style="margin-top:18px"><div class="lesson-stack" style="margin-top:0"><div class="card"><div class="card-label">01 · LEARN & REPEAT</div><h3>Today's English phrases</h3><p class="muted">প্রথমে শোনো, তারপর প্রতিটি বাক্য ৩ বার বলো।</p>${d.phrases.map(phraseRow).join("")}<div class="action-row">${btn("✓ Practiced these phrases","markTask",'data-task="words"',"button-primary")}${btn("Review vocabulary","go",'data-view="words"')}</div></div>
  <div class="card"><div class="card-label">02 · LISTENING</div><h3>Hear the sentence</h3><p class="muted">বাংলা না দেখে ইংরেজি শুনে বোঝার চেষ্টা করো।</p>${btn("♫ Open listening exercise","go",'data-view="listening"',"button-primary")}<div class="action-row">${btn("✓ Listening done","markTask",'data-task="listen"',"button-line")}</div></div>
  <div class="card"><div class="card-label">03 · SPEAKING</div><h3>Speak out loud</h3><p class="prompt-quote">${h(d.phrases[0].en)}</p><div class="action-row">${btn("🎙 Open speaking exercise","speechPhrase",`data-id="${d.phrases[0].id}"`,"button-primary")}${btn("✓ Speaking done","markTask",'data-task="speak"')}</div></div></div>
  <div class="lesson-stack" style="margin-top:0"><div class="card accent"><div class="card-label">04 · TECHNICAL FAST LANE</div><h3>${h(d.technical.question)}</h3><p class="muted">${h(d.technical.bn)}</p><div class="flash-reveal"><strong>Start with one simple sentence:</strong><p class="muted">${h(d.technical.simple)}</p>${btn("🔊 Listen","speakText",`data-text="${h(d.technical.simple)}"`,"button-small")}</div><p class="muted">নিজের পরিচিত .NET concept ইংরেজিতে ব্যাখ্যা করো।</p>${btn("Explore answer","techQuestion",`data-id="${d.technical.id}"`,"button-primary")}<div class="action-row">${btn("✓ I explained it","markTask",'data-task="tech"')}</div></div>
  <div class="card"><div class="card-label">DAY COMPLETION</div><h3>${done?"🎉 Great job, this day is complete.":"Keep your daily promise."}</h3><p class="muted">৪টি অনুশীলন শেষ হলে দিনটি Complete হবে। Marking is self-reported; no false proficiency certificates.</p><div class="progress-label"><span>Today's practice</span><strong>${taskCount}/4</strong></div>${bar(taskCount*25)}<div class="action-row">${btn(done?"✓ Completed":ready?"Complete this day":"Complete all 4 first","completeDay",ready&&!done?"":"disabled","button-primary")}${done&&state.day<180?btn("Next day →","nextDay","","button-line"):""}</div></div></div></div>`;
}
function renderBasics(){
  const beginner=PHRASES.filter(x=>x.level<=1);
  return `${intro("English from Absolute Zero","বাংলা দিয়ে ইংরেজি শুরু করো। Grammar বইয়ের মতো নয়—কাজে লাগে এমন বাক্য আগে শিখো।")}
  <div class="card accent"><span class="card-label">STEP 1 · SAY IT SLOWLY</span><h3>You already know .NET. Now learn to say it.</h3><p class="muted">শব্দ → ছোট বাক্য → নিজের পরিচয়। English letter-এর নাম আর উচ্চারণ এক জিনিস নয়; নিচের বাংলা pronunciation শুধু সহায়তা, আসল উচ্চারণ শুনবে 🔊 দিয়ে।</p><div class="grid-3" style="margin-top:16px">${["A B C D E F G","H I J K L M N","O P Q R S T U V W X Y Z"].map(x=>`<div class="card" style="padding:16px"><strong>${x}</strong><div style="margin-top:12px">${btn("🔊 Hear letters","speakLetters",`data-text="${x}"`,"button-small")}</div></div>`).join("")}</div></div>
  ${section("Your first English sentences","প্রথমে ৫টি বাক্য মনে রাখো: পরিচয়, ধন্যবাদ, সাহায্য চাওয়া, প্রশ্ন করা, কাজ বোঝানো।")}
  <div class="content-grid"><div class="card">${beginner.slice(0,12).map(phraseRow).join("")}</div><div><div class="card"><div class="card-label">YOUR FIRST SELF-INTRODUCTION</div><div class="prompt-quote">Hello. My name is Ashraful. I am from Bangladesh. I am a software engineer. I work with C# and .NET.</div><p class="muted">নিজের নাম দিয়ে বাক্যটি বলবে। ধীরে বলো; প্রতিদিন ৫ বার অনুশীলন করো।</p>${btn("🔊 Hear full introduction","speakText",'data-text="Hello. My name is Ashraful. I am from Bangladesh. I am a software engineer. I work with C sharp and dot net."',"button-primary")}${btn("🎙 Speak it","speechCustom",'data-custom="intro"',"button-line")}</div><div class="card" style="margin-top:15px"><div class="card-label">NEXT STEP</div><h3>Basic sentence formula</h3><p class="grammar-code">I + am + a software engineer.</p><p class="muted">I = আমি, am = আছি/হই, a software engineer = একজন সফটওয়্যার ইঞ্জিনিয়ার।</p>${btn("Learn simple grammar →","go",'data-view="grammar"',"button-line")}</div></div></div>`;
}
function renderWords(){
  const due=getDueWords(state),filter=ui.wordFilter.toLowerCase();
  const catalog=WORDS.filter(w=>(ui.wordCategory==="all"||w.category===ui.wordCategory)&&(`${w.en} ${w.bn} ${w.example}`.toLowerCase().includes(filter)));
  const pageCatalog=catalog.slice(0,(ui.wordCatalogPage+1)*24);
  return `${intro("5,000 Real English Words",`${WORDS.length.toLocaleString("en-US")} genuine words: a beginner/workplace set followed by documented English frequency-list words matched to Bengali dictionary entries. No AI-invented vocabulary.`)}
  <div class="stat-grid">${stat("Aa",wordCount(),"Words already practiced")}${stat("↻",due.filter(w=>!!state.words[w.id]).length,"Words due for review","amber")}${stat("✦",due.filter(w=>!state.words[w.id]).length,"New words waiting","blue")}${stat("▤",WORDS.length,"Total real words","purple")}</div>
  ${section("Your review queue","Again = revisit in 10 min · Good = tomorrow/next interval · Easy = longer interval")}
  ${due.length?`<div class="word-grid">${due.map(w=>`<div class="word-card"><div class="word-top"><div><strong>${h(w.en)}</strong><div class="meaning">${h(w.bn)}</div></div><button class="audio-button" data-action="speakText" data-text="${h(w.en)}">🔊</button></div><div class="example">${h(w.example)}</div><div class="review-actions">${btn("Again","reviewWord",`data-id="${w.id}" data-quality="again"`)}${btn("Good","reviewWord",`data-id="${w.id}" data-quality="good"`)}${btn("Easy","reviewWord",`data-id="${w.id}" data-quality="easy"`)}</div></div>`).join("")}</div>`:`<div class="empty">All words reviewed for now. Come back tomorrow! 🎉</div>`}
  ${section("Browse word bank","Use search to find the words you need for work.")}
  <div class="notice" style="margin:12px 0">Source-backed word list, not AI-generated. For words with several meanings, the Bengali dictionary shows one meaning that may not match every sentence. Curated workplace words include example sentences; other entries show verified dictionary translations. <a href="https://github.com/cseashrafulislam/DevSpeak/blob/main/DATA_SOURCES.md" target="_blank" rel="noopener noreferrer">Data sources and credits ↗</a></div>
  <form id="wordSearchForm" class="tool-row"><input id="wordSearch" class="search-bar" placeholder="Search English or বাংলা..." value="${h(ui.wordFilter)}" aria-label="Search vocabulary"><select class="select-field" id="wordCategory" aria-label="Word category"><option value="all">All categories</option>${["basic","work","tech","interview","essential","common","advanced"].map(x=>`<option value="${x}" ${ui.wordCategory===x?"selected":""}>${x}</option>`).join("")}</select><button class="button-primary" type="submit">Search</button></form>
  <div class="word-grid">${pageCatalog.map(w=>`<div class="word-card"><div class="word-top"><strong>${h(w.en)}</strong><button class="audio-button" data-action="speakText" data-text="${h(w.en)}">🔊</button></div><div class="meaning">${h(w.bn)}</div>${w.example?`<div class="example">${h(w.example)}</div>`:""}${chip(state.words[w.id]?"In review":"Not practiced",state.words[w.id]?"green":"")}</div>`).join("")}</div>
  ${!catalog.length?`<div class="empty">No matching words.</div>`:""}${catalog.length>pageCatalog.length?`<div style="margin-top:15px">${btn("Load more words","moreWords","","button-line")}</div>`:""}`;
}
function renderGrammar(){
  const learned=Object.keys(state.grammar).length;
  return `${intro("Simple English Grammar","Zero-level Grammar: প্রতিটি নিয়মের সাথে ছোট example এবং একটি প্রশ্ন। ভুল হলেও ব্যাখ্যা দেখতে পাবে।")}
  <div class="card accent" style="margin-bottom:20px"><strong>${learned} / ${GRAMMAR.length} concepts practiced</strong><div style="margin-top:13px">${bar(learned/GRAMMAR.length*100)}</div></div>
  ${GRAMMAR.map((g,i)=>`<details class="accordion" id="grammar-${i}"><summary>${i+1}. ${h(g.name)} <span style="font-size:11px;color:#8292a3">— ${h(g.bn)}</span> ${state.grammar[`g${i}`]?"✓":""}</summary><div class="accordion-body"><div class="grammar-code">${h(g.rule)}</div>${g.examples.map(x=>`<p>• ${h(x)} ${btn("🔊","speakText",`data-text="${h(x)}"`,"button-small")}</p>`).join("")}<div class="test-box" id="grammar-box-${i}"><strong>${h(g.question)}</strong><div class="option-list">${g.options.map((o,n)=>`<button class="option-button" data-action="grammarAnswer" data-id="${i}" data-answer="${n}">${h(o)}</button>`).join("")}</div><p class="hint">উত্তর বেছে নাও; ভুল হলে চিন্তা নেই।</p></div></div></details>`).join("")}`;
}
function listeningQuestion(){
  const pool=PHRASES.filter(p=>p.level<=Math.max(1,phaseIndex(state.day))),index=(state.day*3+ui.listeningIndex)%pool.length,correct=pool[index];
  const alternatives=[pool[(index+5)%pool.length],pool[(index+11)%pool.length]].filter(p=>p.id!==correct.id&&p.bn!==correct.bn);
  const opts=[correct,...alternatives];
  const order=[1,0,2].map(i=>opts[i]).filter(Boolean);
  return {correct,order};
}
function renderListening(){
  const q=listeningQuestion();
  return `${intro("Listening Lab","প্রথমে 🔊 শুনো, তারপর বাংলা অর্থ বেছে নাও। দরকার হলে ধীর গতিতে আবার শুনো।")}
  <div class="content-grid"><div class="card"><div class="card-label">LISTENING EXERCISE ${ui.listeningIndex+1}</div><h3>What did you hear?</h3><p class="muted">বাক্যটি প্রথমে লিখে দেখানো হচ্ছে না। কান দিয়ে বোঝার চেষ্টা করো।</p><div style="margin:27px 0;display:flex;gap:10px;flex-wrap:wrap">${btn("♫ Play sentence","listenPlay","","button-primary")}${btn("🐢 Play slowly","listenSlow","","button-line")}</div><div id="listenAnswer"><strong style="font-size:12px">Select the Bangla meaning:</strong><div class="option-list" style="display:grid">${q.order.map(p=>`<button class="option-button" style="text-align:left" data-action="listenAnswer" data-id="${p.id}">${h(p.bn)}</button>`).join("")}</div></div><div id="listenFeedback" aria-live="polite"></div><div class="action-row">${btn("Next sentence →","listenNext","","button-line")}</div></div><div><div class="card accent"><div class="card-label">LISTENING TIP</div><h3>Start slow. Repeat three times.</h3><p class="muted">১. শুধু শোনো।<br>২. বাংলা অর্থ বোঝো।<br>৩. সঙ্গে সঙ্গে English-টা মুখে বলার চেষ্টা করো।</p><div class="notice">Browser voice uses your device's speech engine. Accent and voice quality depend on installed voices and browser support.</div></div><div class="card" style="margin-top:15px"><div class="card-label">YOUR DAILY PROGRESS</div><h3>${state.tasks[`d${state.day}_listen`]?"✓ Listening practiced":"Listening not completed yet"}</h3><p class="muted">একটি সঠিক উত্তর দিলেই আজকের listening mission complete হবে।</p></div></div></div>`;
}
function speechPrompt(){
  if(ui.speechId==="custom-intro")return {id:"custom-intro",label:"Introduce yourself",bn:"নিজের পরিচয় ৪টি ছোট বাক্যে বলো।",reference:"Hello. My name is Ashraful. I am from Bangladesh. I am a software engineer. I work with C sharp and dot net.",keywords:["name","bangladesh","engineer","work"]};
  if(ui.speechId.startsWith("p")){
    const x=PHRASES.find(p=>p.id===ui.speechId)||PHRASES[0];
    return {id:x.id,label:"Repeat a useful English sentence",bn:x.bn,reference:x.en,keywords:x.en.toLowerCase().replace(/[^a-z\s]/g,"").split(" ").filter(x=>x.length>3).slice(0,5)};
  }
  if(ui.speechId.startsWith("t")){
    const t=TECH.find(x=>x.id===ui.speechId)||TECH[0];
    return {id:t.id,label:t.question,bn:t.bn,reference:t.simple,keywords:t.keywords};
  }
  const s=SCENARIOS.find(x=>x.id===ui.speechId)||SCENARIOS[0];
  return {id:s.id,label:s.name,bn:s.bn,reference:s.starter,keywords:s.keywords};
}
function renderSpeech(){
  const q=speechPrompt();
  const options=[...PHRASES.filter(x=>x.level<=1).slice(0,10),...TECH.slice(0,10),...SCENARIOS].map(x=>({id:x.id,label:x.en||x.question||x.name}));
  return `${intro("Speaking Studio","মাইক্রোফোন দিয়ে বলো, অথবা লিখে উত্তর যাচাই করো। কোনো paid service লাগে না।")}
  <div class="notice warning" style="margin-bottom:16px">⚠️ এটি real pronunciation বা CEFR/IELTS score নয়। Browser speech-to-text transcript-এর সাথে <strong>word match এবং keyword coverage</strong> দেখায়। কিছু browser microphone audio তাদের speech service-এ process করতে পারে। Microphone কেবল click করলে চালু হবে।</div>
  <div class="tool-row"><label for="speechSelect" class="field-label" style="margin:0">Choose practice:</label><select id="speechSelect" class="select-field" style="max-width:100%;flex:1"><option value="custom-intro" ${ui.speechId==="custom-intro"?"selected":""}>Introduce yourself — absolute beginner</option>${options.map(o=>`<option value="${h(o.id)}" ${ui.speechId===o.id?"selected":""}>${h(o.label)}</option>`).join("")}</select></div>
  <div class="content-grid"><div class="card speech-card"><div class="speech-top"><div><div class="card-label">SPEAK CLEARLY · START SMALL</div><h3>${h(q.label)}</h3><p class="bn-instruction">${h(q.bn)}</p></div>${chip("Beginner friendly","green")}</div><div class="prompt-quote">${h(q.reference)}</div><div class="action-row">${btn("🔊 Listen","speakText",`data-text="${h(q.reference)}"`,"button-line")}${btn("🐢 Slower","speakSlow",`data-text="${h(q.reference)}"`,"button-line")}</div><label class="field-label" for="speechText">Your spoken words / typed answer</label><textarea id="speechText" class="text-area" placeholder="Click microphone and speak, or type your answer..."></textarea><div class="action-row">${btn("🎙 Start microphone","microphone","","button-primary")}${btn("Check word match","checkSpeech","","button-line")}</div><p class="hint" id="micStatus">Speech recognition works best in supported browsers over HTTPS. If unavailable, type your answer.</p><div id="speechFeedback" aria-live="polite"></div></div>
  <div><div class="card accent"><div class="card-label">HOW TO PRACTICE</div><h3>Follow the 3-repeat rule.</h3><p class="muted">1. English শুনে বাংলা বুঝবে।<br>2. স্ক্রিন দেখে ধীরে বলবে।<br>3. স্ক্রিন না দেখে আবার বলবে।</p><p class="muted"><strong>Tip:</strong> Perfect accent নয়, understandable sentences আর clear thinking জরুরি।</p>${btn("Try a real remote conversation","go",'data-view="simulator"',"button-primary")}</div><div class="card" style="margin-top:16px"><div class="card-label">SPEAKING PRACTICE HISTORY</div><h3>${state.history.length} attempts</h3><p class="muted">Only practice percentages and dates are saved locally; recordings and transcripts are not stored in your progress history.</p></div></div></div>`;
}
function renderTechnical(){
  const filtered=TECH.filter(t=>(ui.techCategory==="all"||t.category===ui.techCategory)&&(`${t.question} ${t.bn} ${t.category}`.toLowerCase().includes(ui.techFilter.toLowerCase())));
  const cats=[...new Set(TECH.map(t=>t.category))];
  return `${intro(".NET Technical English",`${TECH.length} practical concepts. তোমার টেকনিক্যাল দক্ষতা আছে—এখন সহজ English দিয়ে সেটা বোঝানোর অনুশীলন করো।`)}
  <div class="card accent"><span class="card-label">TWO-STEP ANSWERING</span><h3>Start simple. Then add evidence.</h3><p class="muted">প্রথমে ১ লাইনে উত্তর → তারপর নিজের project-এর বাস্তব উদাহরণ। মুখস্থ করা textbook paragraph বলার দরকার নেই।</p><strong>${state.techDone.length} / ${TECH.length} topics practiced</strong><div style="margin-top:12px">${bar(state.techDone.length/TECH.length*100)}</div></div>
  <form id="techSearchForm" class="tool-row"><input id="techSearch" class="search-bar" placeholder="Search C#, SQL, tenant, transaction..." value="${h(ui.techFilter)}"><select class="select-field" id="techCategory"><option value="all">All topics</option>${cats.map(c=>`<option ${ui.techCategory===c?"selected":""} value="${h(c)}">${h(c)}</option>`).join("")}</select><button type="submit" class="button-primary">Filter</button></form>
  ${filtered.length?filtered.map(t=>`<details class="accordion"><summary>${state.techDone.includes(t.id)?"✓ ":""}${h(t.question)} <span style="color:#93a1b0;font-size:10px">${h(t.category)}</span></summary><div class="accordion-body"><p><strong>বাংলা:</strong> ${h(t.bn)}</p><div class="answer"><span class="card-label">SAY THIS FIRST</span><p>${h(t.simple)}</p>${btn("🔊 Listen","speakText",`data-text="${h(t.simple)}"`,"button-small")}</div><div class="answer" style="background:#f5f7fb;color:#3e5367"><span class="card-label">STRONGER INTERVIEW ANSWER</span><p>${h(t.strong)}</p></div><p><strong>Useful words:</strong> ${t.keywords.map(w=>chip(w)).join(" ")}</p><div class="action-row">${btn("🎙 Practice speaking","speechTechnical",`data-id="${t.id}"`,"button-primary")}${btn(state.techDone.includes(t.id)?"✓ Practiced":"✓ I can explain this","techDone",`data-id="${t.id}"`,"button-line")}</div></div></details>`).join(""):`<div class="empty">No technical questions match your filter.</div>`}`;
}
function renderSimulator(){
  const s=SCENARIOS.find(x=>x.id===ui.scenario)||SCENARIOS[0];
  return `${intro("Remote Work Simulator","বাস্তব রিমোট টিমের কথোপকথন। English শুনবে, বুঝবে, তারপর নিজের ভাষায় উত্তর দেবে। কোনো fake AI interviewer নয়—guided roleplay।")}
  <div class="sim-grid"><div><div class="card-label" style="margin:4px 0 14px">CHOOSE A CONVERSATION</div>${SCENARIOS.map(x=>`<button class="scenario-item ${x.id===s.id?"active":""}" data-action="scenario" data-id="${x.id}"><strong>${x.icon} ${h(x.name)}</strong><small>${h(x.bn)} · ${h(x.level)}</small></button>`).join("")}</div><div class="card"><div class="card-label">ROLEPLAY · ${h(s.level.toUpperCase())}</div><h3>${h(s.name)}</h3><p class="muted">${h(s.bn)}</p><div class="dialogue manager"><small>TEAM LEAD / CLIENT</small>${h(s.other)}<div style="margin-top:8px">${btn("🔊 Listen","speakText",`data-text="${h(s.other)}"`,"button-small")}</div></div><p class="muted">বাংলা অর্থ: ${h(s.translation)}</p><div class="dialogue you"><small>YOU — REPLY IN ENGLISH</small>Try to respond in 2–4 short sentences.</div><label class="field-label" for="scenarioText">Your reply</label><textarea class="text-area" id="scenarioText" placeholder="Example: Thanks for asking. Yesterday I ..."></textarea><div class="action-row">${btn("Check useful keywords","checkScenario","","button-primary")}${btn("🎙 Practice speaking","speechScenario",`data-id="${s.id}"`,"button-line")}${btn("🔊 Hear model reply","speakText",`data-text="${h(s.starter)}"`,"button-line")}</div><div id="scenarioFeedback" aria-live="polite"></div><details class="accordion" style="margin-top:18px"><summary>Show a natural model reply (read after trying)</summary><div class="accordion-body"><div class="answer">${h(s.starter)}</div><p>Useful words: ${s.keywords.map(x=>chip(x)).join(" ")}</p></div></details></div></div>`;
}
function renderInterview(){
  return `${intro("Global .NET Interview Q&A","Technical skill ভালো হলে ৩০–৯০ সেকেন্ডে clear answer + একটি real example দেওয়া সবচেয়ে কার্যকর। নিজের বাস্তব অর্জন ছাড়া সংখ্যা বানাবে না।")}
  <div class="card accent" style="margin-bottom:18px"><div class="card-label">YOUR TARGET</div><h3>${h(roleName())} · ${h(targetName())}</h3><p class="muted">Answer method: <strong>short answer → specific example → result.</strong> HR, remote-work, architecture, SQL Server and multi-tenant ERP questions included.</p><div class="progress-label"><span>Practiced interview questions</span><strong>${state.interviewDone.length}/${INTERVIEW.length}</strong></div>${bar(state.interviewDone.length/INTERVIEW.length*100)}</div>
  ${INTERVIEW.map((q,i)=>`<details class="accordion"><summary>${state.interviewDone.includes(i)?"✓ ":""}${i+1}. ${h(q.q)} ${chip(q.category)}</summary><div class="accordion-body"><p><strong>বাংলা:</strong> ${h(q.bn)}</p><p><strong>Answer strategy:</strong> ${h(q.tip)}</p><div class="answer">${h(q.starter)}<div style="margin-top:10px">${btn("🔊 Listen","speakText",`data-text="${h(q.starter)}"`,"button-small")}</div></div><div class="action-row">${btn("✓ I practiced answering","interviewDone",`data-id="${i}"`,"button-primary")}</div></div></details>`).join("")}`;
}
function renderWriting(){
  const x=WRITING[ui.writingId],draft=state.drafts[`draft${ui.writingId}`]||"";
  return `${intro("Writing Lab","Remote job-এর সবচেয়ে দরকারি English: short updates, clarification, email, code review এবং meeting notes।")}
  <div class="content-grid"><div class="card"><div class="card-label">CHOOSE A WRITING TASK</div><div class="filter-row">${WRITING.map((w,i)=>`<button type="button" data-action="writingSelect" data-id="${i}" class="tab-button ${ui.writingId===i?"active":""}">${h(w.name)}</button>`).join("")}</div><h3>${h(x.bn)}</h3><p class="muted">${h(x.prompt)}</p><label class="field-label" for="writingText">Write your message in English</label><textarea id="writingText" class="text-area" style="min-height:180px" placeholder="Start with one simple sentence...">${h(draft)}</textarea><div class="action-row">${btn("Save my draft","writingSave","","button-primary")}${btn("Check useful words","writingCheck","","button-line")}</div><div id="writingFeedback" aria-live="polite"></div></div><div><div class="card accent"><div class="card-label">MODEL MESSAGE</div><h3>Compare only after writing.</h3><details class="accordion" style="margin:17px 0 0"><summary>Reveal professional example</summary><div class="accordion-body"><div class="writing-preview">${h(x.example)}</div>${btn("🔊 Listen","speakText",`data-text="${h(x.example)}"`,"button-small")}</div></details><p class="muted">Model answer একটি উদাহরণ; নিজের বাস্তব পরিস্থিতি অনুযায়ী বদলাবে।</p></div><div class="card" style="margin-top:15px"><div class="card-label">WRITING RULE</div><h3>Clear beats complicated.</h3><p class="muted">Short sentences. One purpose per paragraph. If you need action, say who does what and by when. Avoid promising a deadline without checking.</p></div></div></div>`;
}
function renderProgress(){
  const count=completed(),streak=getStreak(state.activityDates);
  return `${intro("Progress & Settings","Progress শুধু এই browser-এ জমা থাকে। Device বদলালে Export → Import ব্যবহার করো।")}
  <div class="stat-grid">${stat("▦",count,"Completed days")}${stat("Aa",wordCount(),"Words practiced","blue")}${stat("🎙",state.history.length,"Speaking attempts","purple")}${stat("🔥",streak,"Activity streak","amber")}</div>
  ${section("Learning overview","Self-reported practice progress, not an English certificate.")}
  <div class="card"><div class="progress-label"><span>180-day journey</span><strong>${percentage(count/180*100)}%</strong></div>${bar(count/180*100)}<div class="progress-label"><span>Grammar concepts</span><strong>${Object.keys(state.grammar).length}/${GRAMMAR.length}</strong></div>${bar(Object.keys(state.grammar).length/GRAMMAR.length*100)}<div class="progress-label"><span>Technical English concepts</span><strong>${state.techDone.length}/${TECH.length}</strong></div>${bar(state.techDone.length/TECH.length*100)}<div class="progress-label"><span>Interview answers practiced</span><strong>${state.interviewDone.length}/${INTERVIEW.length}</strong></div>${bar(state.interviewDone.length/INTERVIEW.length*100)}</div>
  ${section("Your job target","Your chosen role and country personalize the dashboard and interview preparation.")}
  <div class="card"><div class="setting-row"><div><strong>Target market</strong><small>Remote work from Bangladesh — location eligibility depends on the employer.</small></div><select class="select-field" id="countrySelect" aria-label="Target market">${[["global","Global remote"],["kuwait","Kuwait"],["uae","UAE"],["europe","Europe"],["australia","Australia"]].map(([v,n])=>`<option value="${v}" ${state.country===v?"selected":""}>${n}</option>`).join("")}</select></div>
  <div class="setting-row"><div><strong>Your target role</strong><small>Choose your intended next job.</small></div><select class="select-field" id="roleSelect" aria-label="Target job">${[["backend",".NET Backend Developer"],["senior","Senior .NET Developer"],["erp","ERP / Solution Architect"]].map(([v,n])=>`<option value="${v}" ${state.role===v?"selected":""}>${n}</option>`).join("")}</select></div>
  <div class="setting-row"><div><strong>Speech playback accent</strong><small>Depends on your browser's available voices.</small></div><select class="select-field" id="accentSelect" aria-label="Speech accent">${[["en-US","US English"],["en-GB","UK English"],["en-AU","AU English"]].map(([v,n])=>`<option value="${v}" ${state.accent===v?"selected":""}>${n}</option>`).join("")}</select></div></div>
  ${section("Backup & privacy","No account, backend or paid API. Data is stored locally.")}
  <div class="card"><div class="notice">Your learning progress and writing drafts are stored in this browser's localStorage. Clearing site data may delete them. Browser speech recognition may use the browser provider's online service. This app does not upload your drafts or recordings to a DevSpeak server.</div><div class="action-row">${btn("⬇ Export progress JSON","export","","button-primary")}<label class="button-line" for="importFile" style="cursor:pointer">⬆ Import backup</label><input type="file" id="importFile" accept=".json,application/json" style="display:none">${btn("Reset my progress","reset","","button-line")}</div></div>`;
}
function render(){
  const views={dashboard:renderDashboard,roadmap:renderRoadmap,lesson:renderLesson,basics:renderBasics,words:renderWords,grammar:renderGrammar,listening:renderListening,speaking:renderSpeech,technical:renderTechnical,simulator:renderSimulator,interview:renderInterview,writing:renderWriting,progress:renderProgress,"ai-engineering":renderAiEngineering};
  $("nav").innerHTML=NAV.map(n=>`<button class="nav-item ${ui.view===n.id?"active":""}" type="button" data-action="go" data-view="${n.id}" ${ui.view===n.id?'aria-current="page"':""}><span class="nav-icon">${n.icon}</span>${h(n.label)}${n.new?'<span class="nav-new">NEW</span>':""}</button>`).join("");
  $("app").innerHTML=views[ui.view]();
  $("pageHeading").textContent=NAV.find(n=>n.id===ui.view)?.label||"Dashboard";
  $("dayBadge").textContent=ui.view==="ai-engineering"?`AI DAY ${String(aiSelectedDay()).padStart(3,"0")} / 180`:`DAY ${String(state.day).padStart(2,"0")} / 180`;
  $("streakBadge").textContent=`🔥 ${getStreak(state.activityDates)}`;
  $("accentToggle").textContent="🔊 "+({"en-US":"US","en-GB":"UK","en-AU":"AU"})[state.accent];
}
function playSpeech(value,slow=false){
  if(!("speechSynthesis" in window)){toast("Audio playback is not available in this browser.");return;}
  const content=String(value||"").slice(0,1400);
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(content);
  utterance.lang=state.accent;utterance.rate=slow?.72:.93;utterance.pitch=1;
  const voices=window.speechSynthesis.getVoices();
  utterance.voice=voices.find(v=>v.lang===state.accent)||voices.find(v=>v.lang?.startsWith("en"))||null;
  window.speechSynthesis.speak(utterance);
}
function startMic(){
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!Recognition){toast("Microphone speech recognition is unavailable. Please type the answer.");return;}
  const rec=new Recognition();rec.lang=state.accent;rec.interimResults=false;rec.maxAlternatives=1;
  $("micStatus").textContent="🎙 Listening... speak clearly. Audio recognition is controlled by your browser.";
  rec.onresult=e=>{const transcript=e.results?.[0]?.[0]?.transcript||"";$("speechText").value=transcript;$("micStatus").textContent="Transcript received. Review it, then check word match.";checkSpeech();};
  rec.onerror=e=>{$("micStatus").textContent=`Microphone error: ${e.error}. You can type instead.`;};
  rec.onend=()=>{if($("micStatus")?.textContent.includes("Listening"))$("micStatus").textContent="Microphone stopped. Try again or type your response.";};
  try{rec.start();}catch{toast("Could not start speech recognition.");}
}
function assessmentFeedback(result){
  return `<div class="feedback"><strong>Keyword coverage: ${result.coverage}% · Reference word overlap: ${result.wordMatch}%</strong><div class="meter"><div style="width:${result.coverage}%"></div></div><p style="margin-bottom:3px">Matched: ${result.matched.map(x=>chip(x,"green")).join(" ")||"none yet"}</p><p style="margin-top:6px">Try mentioning: ${result.missing.map(x=>chip(x,"gold")).join(" ")||"all target words covered"}</p><small>This is a text-based practice check, not an AI English fluency or pronunciation grade.</small></div>`;
}
function checkSpeech(){
  const q=speechPrompt(),text=$("speechText")?.value.trim()||"";
  if(!text){toast("Speak or type a short answer first.");return;}
  const result=answerCoverage(text,q.reference,q.keywords);
  $("speechFeedback").innerHTML=assessmentFeedback(result);
  state.history.push({date:dateKey(),coverage:result.coverage,wordMatch:result.wordMatch,id:q.id});state.history=state.history.slice(-50);
  if(text.split(/\s+/).length>=2)state.tasks[`d${state.day}_speak`]=true;
  activity();save();$("streakBadge").textContent=`🔥 ${getStreak(state.activityDates)}`;
}
function checkScenario(){
  const s=SCENARIOS.find(x=>x.id===ui.scenario),text=$("scenarioText")?.value.trim()||"";
  if(!text){toast("Write a short English reply first.");return;}
  const r=answerCoverage(text,s.starter,s.keywords);
  $("scenarioFeedback").innerHTML=assessmentFeedback(r)+`<details style="margin-top:12px"><summary>Compare with a model reply</summary><div class="answer">${h(s.starter)}</div></details>`;
  activity();save();
}
function downloadBackup(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`devspeak-backup-${dateKey()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  toast("Backup downloaded. Keep it safe.");
}
function markTask(task){
  if(!TASK_IDS.includes(task))return;
  state.tasks[`d${state.day}_${task}`]=true;activity();save();toast("Practice marked for today.");render();
}
function finishDay(){
  if(!dayReady(state,state.day)){toast("Complete all four practice activities first.");return;}
  if(!state.completedDays.includes(state.day))state.completedDays.push(state.day);
  activity();save();render();toast("Day completed! Great consistency. 🎉");
}
function nextDay(){
  if(state.day>=180)return;
  if(!state.completedDays.includes(state.day)){toast("Complete the current day first.");return;}
  state.day++;save();setView("lesson");
}
function selectDay(n){if(!Number.isInteger(n)||n<1||n>180)return;state.day=n;save();setView("lesson");}
async function importBackup(file){
  if(!file)return;
  try{
    if(file.size>500000)throw new Error("Backup is too large.");
    const restored=safeJsonFile(await file.text());
    if(!confirm("Replace your current learning progress with this backup?"))return;
    state=restored;save();render();toast("Backup imported successfully.");
  }catch(error){toast(error.message||"Could not import backup.");}
}
function eventClick(event){
  const el=event.target.closest("[data-action]");if(!el)return;
  if(handleAiAction(el,render,toast))return;
  const {action,id,view,phase,day,task,text,quality,answer,custom}=el.dataset;
  if(action==="go")return setView(view);
  if(action==="phase"){ui.phase=Number(phase);return render();}
  if(action==="selectDay")return selectDay(Number(day));
  if(action==="markTask")return markTask(task);
  if(action==="completeDay")return finishDay();
  if(action==="nextDay")return nextDay();
  if(action==="speakText")return playSpeech(text);
  if(action==="speakSlow")return playSpeech(text,true);
  if(action==="speakLetters")return playSpeech(text.split(" ").join(". "),true);
  if(action==="speechPhrase"||action==="speechTechnical"||action==="speechScenario"||action==="speechCustom"){
    ui.speechId=action==="speechCustom"?`custom-${custom}`:id;return setView("speaking");
  }
  if(action==="reviewWord"){
    if(!WORDS.some(w=>w.id===id))return;
    state.words[id]=reviewWord(state.words[id],quality);activity();save();render();return toast("Review scheduled.");
  }
  if(action==="moreWords"){ui.wordCatalogPage++;return render();}
  if(action==="grammarAnswer"){
    const i=Number(id),n=Number(answer),g=GRAMMAR[i],box=$(`grammar-box-${i}`);
    if(!g||!box)return;
    box.querySelectorAll(".option-button").forEach(b=>{b.disabled=true;b.classList.toggle("right",Number(b.dataset.answer)===g.correct);b.classList.toggle("wrong",Number(b.dataset.answer)===n&&n!==g.correct);});
    box.insertAdjacentHTML("beforeend",`<div class="feedback ${n===g.correct?"":"warn"}"><strong>${n===g.correct?"✓ Correct!":"Not quite. Try again tomorrow."}</strong> ${h(g.why)}</div>`);
    if(n===g.correct){state.grammar[`g${i}`]=true;activity();save();}
    return;
  }
  if(action==="listenPlay"||action==="listenSlow")return playSpeech(listeningQuestion().correct.en,action==="listenSlow");
  if(action==="listenAnswer"){
    const q=listeningQuestion(),ok=id===q.correct.id,area=$("listenAnswer");
    area.querySelectorAll(".option-button").forEach(b=>{b.disabled=true;b.classList.toggle("right",b.dataset.id===q.correct.id);b.classList.toggle("wrong",b.dataset.id===id&&!ok);});
    $("listenFeedback").innerHTML=`<div class="feedback ${ok?"":"warn"}"><strong>${ok?"✓ Correct!":"Listen once more."}</strong> ${h(q.correct.en)} — ${h(q.correct.bn)}</div>`;
    if(ok){state.tasks[`d${state.day}_listen`]=true;activity();save();}
    return;
  }
  if(action==="listenNext"){ui.listeningIndex++;return render();}
  if(action==="microphone")return startMic();
  if(action==="checkSpeech")return checkSpeech();
  if(action==="techQuestion"){ui.techCategory="all";ui.techFilter=TECH.find(t=>t.id===id)?.question||"";return setView("technical");}
  if(action==="techDone"){if(!state.techDone.includes(id))state.techDone.push(id);state.tasks[`d${state.day}_tech`]=true;activity();save();toast("Technical concept practiced.");return render();}
  if(action==="scenario"){ui.scenario=id;return render();}
  if(action==="checkScenario")return checkScenario();
  if(action==="interviewDone"){const i=Number(id);if(i>=0&&i<INTERVIEW.length&&!state.interviewDone.includes(i))state.interviewDone.push(i);activity();save();render();return;}
  if(action==="writingSelect"){ui.writingId=Number(id);return render();}
  if(action==="writingSave"||action==="writingCheck"){
    const draft=$("writingText").value.trim();
    if(!draft){toast("Write a message first.");return;}
    state.drafts[`draft${ui.writingId}`]=draft.slice(0,5000);activity();save();
    if(action==="writingSave")return toast("Draft saved in this browser.");
    const r=answerCoverage(draft,WRITING[ui.writingId].example,WRITING[ui.writingId].check);
    $("writingFeedback").innerHTML=assessmentFeedback(r);
    return;
  }
  if(action==="export")return downloadBackup();
  if(action==="reset"){
    if(!confirm("Delete ALL your DevSpeak learning progress and saved drafts on this device? Export a backup first if needed."))return;
    state=freshState();save();setView("dashboard");toast("Local progress reset.");
  }
}
function eventChange(e){
  if(e.target.id==="speechSelect"){ui.speechId=e.target.value;render();}
  if(e.target.id==="countrySelect"){state.country=e.target.value;save();render();}
  if(e.target.id==="roleSelect"){state.role=e.target.value;save();render();}
  if(e.target.id==="accentSelect"){state.accent=e.target.value;save();render();}
  if(e.target.id==="importFile")importBackup(e.target.files?.[0]);
}
function eventSubmit(e){
  if(handleAiSubmit(e,render))return;
  if(e.target.id==="wordSearchForm"){
    e.preventDefault();ui.wordFilter=$("wordSearch").value.trim().slice(0,100);ui.wordCategory=$("wordCategory").value;ui.wordCatalogPage=0;render();
  }
  if(e.target.id==="techSearchForm"){
    e.preventDefault();ui.techFilter=$("techSearch").value.trim().slice(0,100);ui.techCategory=$("techCategory").value;render();
  }
}
$("app").addEventListener("click",eventClick);
$("app").addEventListener("change",eventChange);
$("app").addEventListener("submit",eventSubmit);
$("nav").addEventListener("click",eventClick);
$("menuToggle").addEventListener("click",()=> $("sidebar").classList.contains("open")?closeMenu():openMenu());
$("mobileOverlay").addEventListener("click",closeMenu);
$("accentToggle").addEventListener("click",()=>{const accents=["en-US","en-GB","en-AU"];state.accent=accents[(accents.indexOf(state.accent)+1)%3];save();render();toast("Voice accent updated.");});
window.addEventListener("hashchange",()=>{const candidate=location.hash.slice(1);if(NAV.some(n=>n.id===candidate))setView(candidate);});
render();
if("serviceWorker" in navigator&&location.protocol==="https:")window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));

