import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC7sJ3wQY40ZXNvwn-QcbNr51R1Gjui_1E',
  authDomain: 'react-bar-67f33.firebaseapp.com',
  databaseURL: 'https://react-bar-67f33-default-rtdb.firebaseio.com',
  projectId: 'react-bar-67f33',
  storageBucket: 'react-bar-67f33.appspot.com',
  messagingSenderId: '621276654255',
  appId: '1:621276654255:web:c90ba2bc75df7ae1edc25a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
