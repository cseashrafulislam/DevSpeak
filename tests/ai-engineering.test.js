import test from "node:test";
import assert from "node:assert/strict";
import {AI_DAYS,AI_PHASES,AI_EXAMPLES,AI_RESOURCES} from "../assets/ai-curriculum.js";
import {AI_EASY_EXPLAIN,AI_PHASE_GUIDES,AI_CAPSTONE_CHECKLIST} from "../assets/ai-easy-guides.js";
import {NAV} from "../assets/data.js";

test("AI Engineering is an additional navigation entry, not a replacement",()=>{
  assert.equal(NAV.filter(x=>x.id==="ai-engineering").length,1);
  for(const id of ["dashboard","roadmap","lesson","words","technical","progress"])
    assert.ok(NAV.some(x=>x.id===id),`missing existing navigation: ${id}`);
});

test("AI curriculum has 180 distinct, complete, correctly ordered daily lessons",()=>{
  assert.equal(AI_PHASES.length,6);
  assert.equal(AI_DAYS.length,180);
  assert.equal(new Set(AI_DAYS.map(d=>d.day)).size,180);
  for(let day=1;day<=180;day++){
    const lesson=AI_DAYS[day-1];
    assert.equal(lesson.day,day);
    assert.equal(lesson.phase,Math.floor((day-1)/30));
    for(const field of ["title","concept","lab","evidence"])
      assert.ok(typeof lesson[field]==="string"&&lesson[field].trim().length>=(field==="title"?3:8),`Day ${day} lacks ${field}`);
  }
  for(const [i,phase] of AI_PHASES.entries()){
    assert.ok(phase.name&&phase.goal&&phase.project&&phase.range,`Phase ${i+1} incomplete`);
    assert.equal(AI_DAYS.filter(x=>x.phase===i).length,30);
  }
});

test("worked code examples map to valid lesson days and supply runnable context",()=>{
  assert.ok(AI_EXAMPLES.length>=20);
  assert.equal(new Set(AI_EXAMPLES.map(x=>x.day)).size,AI_EXAMPLES.length);
  for(const example of AI_EXAMPLES){
    assert.ok(AI_DAYS.some(x=>x.day===example.day),`Unknown example day ${example.day}`);
    for(const field of ["language","title","setup","code","expected"])
      assert.ok(typeof example[field]==="string"&&example[field].trim(),`Example ${example.day} lacks ${field}`);
  }
  assert.ok(AI_RESOURCES.length>=4);
  assert.ok(AI_RESOURCES.every(x=>x.url.startsWith("https://")&&x.title));
});

test("every AI lesson includes a distinct easy Bangla explanation and phase setup",()=>{
  assert.equal(AI_EASY_EXPLAIN.length,180);
  assert.equal(new Set(AI_EASY_EXPLAIN).size,180);
  for(let i=0;i<180;i++){
    assert.ok(AI_EASY_EXPLAIN[i].trim().length>=20,`Day ${i+1} lacks simple explanation`);
    assert.ok(/[\u0980-\u09FF]/.test(AI_EASY_EXPLAIN[i]),`Day ${i+1} is not explained in Bangla`);
  }
  assert.equal(AI_PHASE_GUIDES.length,6);
  assert.equal(AI_CAPSTONE_CHECKLIST.length,6);
  for(let i=0;i<6;i++){
    for(const field of ["environment","start","input","common","tryNext"])
      assert.ok(AI_PHASE_GUIDES[i][field].trim().length>10,`Phase ${i+1} lacks ${field}`);
    assert.equal(AI_CAPSTONE_CHECKLIST[i].length,4);
  }
});
