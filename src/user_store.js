import { readable } from 'svelte/store';

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
