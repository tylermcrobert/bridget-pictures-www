import { writable } from 'svelte/store';

export const scroll = writable(true);

export function disableScroll() {
  scroll.set(false);
}

export function enableScroll() {
  scroll.set(true);
}
