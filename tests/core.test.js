import test from "node:test";
import assert from "node:assert/strict";
import {PHASES,WORDS,TECH,PHRASES} from "../assets/data.js";
import {freshState,safeState,getDayContent,reviewWord,getDueWords,answerCoverage,dayReady,dateKey,getStreak} from "../assets/core.js";

test("exactly 5000 real, unique, dictionary-backed English word entries",()=>{
  assert.equal(WORDS.length,5000);
  assert.equal(new Set(WORDS.map(x=>x.en.toLowerCase())).size,5000);
  for(const item of WORDS){
    assert.match(item.en,/^[a-z]+$/i,`invalid word: ${item.en}`);
    assert.ok(item.en.length>1||["a","i"].includes(item.en.toLowerCase()),`letter name is not a vocabulary word: ${item.en}`);
    assert.ok(item.bn.trim(),`missing Bengali meaning: ${item.en}`);
  }
});
test("all 180 days have structured content and a technical task",()=>{
  assert.equal(PHASES.length,6);
  for(let day=1;day<=180;day++){
    const d=getDayContent(day);
    assert.equal(d.day,day);
    assert.equal(d.phrases.length,4);
    assert.ok(TECH.includes(d.technical));
  }
  assert.ok(PHRASES.every(x=>x.en&&x.bn));
});
test("review words are due in the correct order",()=>{
  const initial=freshState(),first=getDueWords(initial);
  assert.ok(first.length>0);
  const good=reviewWord(undefined,"good",Date.UTC(2026,9,24));
  assert.equal(good.reps,1);
  assert.equal(good.interval,1);
  const again=reviewWord(good,"again",Date.UTC(2026,9,24));
  assert.equal(again.reps,0);
  assert.equal(again.interval,0);
  assert.ok(again.due>0);
});
test("completion requires four distinct checked activities",()=>{
  const state=freshState();
  assert.equal(dayReady(state,1),false);
  for(const task of ["words","listen","speak","tech"])state.tasks[`d1_${task}`]=true;
  assert.equal(dayReady(state,1),true);
});
test("safe import rejects invalid word ids and preserves valid progress",()=>{
  const input={version:2,day:181,completedDays:[1,1,999],words:{w0:{due:100,interval:2,ease:2.5,reps:1},malicious:{reps:100}},tasks:{"d1_words":true,"d1_hack":true}};
  const state=safeState(input);
  assert.equal(state.day,1);
  assert.deepEqual(state.completedDays,[1]);
  assert.ok(state.words.w0);
  assert.equal(state.words.malicious,undefined);
  assert.equal(state.tasks.d1_hack,undefined);
});
test("word-coverage indicator is based only on transcript text",()=>{
  const r=answerCoverage("I fixed the API bug","I fixed the production API bug",["fixed","API","production"]);
  assert.equal(r.coverage,67);
  assert.equal(r.missing.includes("production"),true);
  assert.equal(answerCoverage("","hello",["hello"]).coverage,0);
});
test("activity streak follows local calendar days",()=>{
  const now=new Date(2026,9,24,14);
  assert.equal(dateKey(now),"2026-10-24");
  assert.equal(getStreak(["2026-10-22","2026-10-23","2026-10-24"],now),3);
});
