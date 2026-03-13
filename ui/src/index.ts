export * from './lib/ui.js';
import { utils } from '@nx-poc/utils';

export function someUiHelper() {
  console.log('This is a helper function from the UI library.');
  utils();
}

