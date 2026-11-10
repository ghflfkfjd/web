import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMaskStage,
  getPretenseStatus,
  getNotebookProgress,
  getPerspectiveDialogue,
  PERSPECTIVES,
  ACADEMIC_SCHEDULE,
  BELONGINGS,
  NPCS
} from './characterLogic';

test('getMaskStage returns accurate stages for slider thresholds', () => {
  const stage8 = getMaskStage(8);
  assert.equal(stage8.stage, 'iron_wall');
  assert.equal(stage8.label, '철벽');

  const stage30 = getMaskStage(30);
  assert.equal(stage30.stage, 'testing');
  assert.equal(stage30.label, '간보기');

  const stage50 = getMaskStage(50);
  assert.equal(stage50.stage, 'crack');
  assert.equal(stage50.label, '균열');

  const stage70 = getMaskStage(70);
  assert.equal(stage70.stage, 'loose');
  assert.equal(stage70.label, '느슨');

  const stage90 = getMaskStage(90);
  assert.equal(stage90.stage, 'unarmed');
  assert.equal(stage90.label, '무장해제');
});

test('getPretenseStatus maps accurately to JawConditions', () => {
  const calm = getPretenseStatus(5);
  assert.equal(calm.jawCondition, '평온');

  const stiff = getPretenseStatus(15);
  assert.equal(stiff.jawCondition, '뻐근');

  const spasm = getPretenseStatus(28);
  assert.equal(spasm.jawCondition, '경련');

  const danger = getPretenseStatus(45);
  assert.equal(danger.jawCondition, '탈골 위기');
});

test('getNotebookProgress maps accurately', () => {
  assert.equal(getNotebookProgress(10), 0);
  assert.equal(getNotebookProgress(40), 1);
  assert.equal(getNotebookProgress(65), 2);
  assert.equal(getNotebookProgress(85), 3);
});

test('getPerspectiveDialogue returns dialogue by mode', () => {
  const angel = getPerspectiveDialogue('accomplice', 'angel');
  const realist = getPerspectiveDialogue('accomplice', 'realist');
  const flustered = getPerspectiveDialogue('accomplice', 'flustered');

  assert.ok(angel.includes('어머'));
  assert.ok(realist.includes('각서'));
  assert.ok(flustered.includes('협박이 아니라'));
});

test('constants are complete and valid', () => {
  assert.equal(PERSPECTIVES.length, 5);
  assert.equal(ACADEMIC_SCHEDULE.length, 2);
  assert.equal(BELONGINGS.length, 5);
  assert.equal(NPCS.length, 5);
});
