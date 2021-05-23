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

let resetProfile;
const createNewUser = () => {
  const newUser = { id: uuidv4() };
  try {
    window.localStorage.setItem('userProfile', JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
  }
  return newUser;
};

export const userProfile = readable({}, (set) => {
  resetProfile = set;
  let saved = window.localStorage.getItem('userProfile');
  let user = saved ? JSON.parse(saved) : createNewUser();
  resetProfile(user);
});

export const forgetUser = () => {
  window.localStorage.removeItem('userProfile');
  let newUser = createNewUser();
  resetProfile(newUser);
};