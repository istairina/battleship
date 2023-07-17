import { ONLINE } from '..';

export const checkIsOnline = (name: string) => {
  for (let i = 0; i < ONLINE.length; i++) {
    if (ONLINE[i]) {
      if (ONLINE[i].name === name) return true;
    }
  }
  return false;
};
