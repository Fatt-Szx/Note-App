// src/state/globalState.js
import { atom } from 'recoil';

// Atom untuk status modal
export const modalState = atom({
  key: 'modalState', // unique ID (with respect to other atoms/selectors)
  default: {
    isOpen: false,
    modalType: null,
    taskId: null, // Optional, if you need to associate a task with the modal
  },
});

// Atom untuk status menu
export const menuState = atom({
  key: 'menuState', // unique ID (with respect to other atoms/selectors)
  default: {
    isOpen: false,
    taskId: null, // Optional, if you need to associate a task with the menu
  },
});

export const filterState = atom({
  key: 'filterState',
  default: {
    progress: 'all', // nilai default filter
  },
});
