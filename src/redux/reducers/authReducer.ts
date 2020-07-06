import { AuthActionTypes } from '../@types/types';

export default (state = {}, action: AuthActionTypes) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.username,
        photoURL: action.photoURL,
        uid: action.uid,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
