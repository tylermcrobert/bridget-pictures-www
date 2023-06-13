import decrement from '$lib/util/decrement';
import increment from '$lib/util/increment';
import { writable } from 'svelte/store';

const thresholds = [
  { threshold: 20, trailLength: 20 },
  { threshold: 40, trailLength: 10 },
  { threshold: 80, trailLength: 5 },
  { threshold: 140, trailLength: 5 },
  { threshold: 200, trailLength: 5 }
];

const defaultState = {
  index: -1,
  length: 0,
  threshold: thresholds[2].threshold,
  trailLength: thresholds[2].trailLength
};

export const state = writable(defaultState);

export function initState(length: number) {
  state.update((state) => ({ ...state, length, index: -1 }));
}

export function setIndex(index: number) {
  state.update((state) => ({ ...state, index: index }));
}

export function incIndex() {
  state.update((state) => ({
    ...state,
    index: increment(state.index, state.length)
  }));
}

export function decIndex() {
  state.update((state) => ({
    ...state,
    index: decrement(state.index, state.length)
  }));
}

export function incThreshold() {
  state.update((state) => updateThreshold(state, 1));
}

export function decThreshold() {
  state.update((state) => updateThreshold(state, -1));
}

/** Helpers */

function updateThreshold(state: typeof defaultState, inc: number) {
  const i = thresholds.findIndex((t) => state.threshold === t.threshold);
  const newItems = thresholds[i + inc];
  if (!newItems) return state;
  return { ...state, ...newItems };
}
