export function authUser() {
  let user = localStorage.getItem( 'user')
  if (user) {
    try {
      return JSON.parse(user);
    } catch(e) {
      localStorage.removeItem('user');
    }
  }
  return false;
}
export function setAuthUser(user) {
  localStorage.setItem('user',JSON.stringify(user));
}

export function removeAuthUser() {
  localStorage.removeItem('user');
}