import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAVonlw8QdTL2dUHQHQXd3GvHPvHy2Sn1A',
  authDomain: 'expensify-app-ec00d.firebaseapp.com',
  databaseURL: 'https://expensify-app-ec00d.firebaseio.com',
  projectId: 'expensify-app-ec00d',
  storageBucket: '',
  messagingSenderId: '959835198480',
  appId: '1:959835198480:web:ac9a2d855577c1ee662695'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if (firebaseUser) console.log(firebaseUser);
// });
export { firebase, googleAuthProvider, database as default };
