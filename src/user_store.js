import { readable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

let resetAdmin;
export const isAdmin = readable(false, (set) => {
  resetAdmin = set;
});

export const tryAdminAccess = async () => {
  const respond = await fetch('/admin-access', {
    method: 'GET',
  });

  if (respond.ok) {
    resetAdmin(true);
  } else {
    resetAdmin(false);
  }
};

export const userProfile = readable({}, (set) => {
  let saved = window.localStorage.getItem('userProfile');
  if (!saved) {
    saved = JSON.stringify({ id: uuidv4() });
    try {
      window.localStorage.setItem('userProfile', saved);
    } catch (error) {
      console.error(error);
    }
  }

  set(JSON.parse(saved));
});
