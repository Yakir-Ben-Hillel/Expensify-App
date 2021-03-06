import { firebase, googleAuthProvider } from '../../database/firebase';
import { Login, Logout } from '../@types/types';
export const login = (
  username: string,
  photoURL: string,
  uid: string
): Login => {
  return {
    type: 'LOGIN',
    username,
    photoURL,
    uid,
  };
};
export const logout = (): Logout => {
  return {
    type: 'LOGOUT',
  };
};
export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
