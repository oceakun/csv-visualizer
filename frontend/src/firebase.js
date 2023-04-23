import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';

const PUBLIC_API_KEY = import.meta.env.PUBLIC_API_KEY;
const PUBLIC_AUTH_DOMAIN = import.meta.env.PUBLIC_AUTH_DOMAIN;
const PUBLIC_PROJECT_ID = import.meta.env.PUBLIC_PROJECT_ID;
const PUBLIC_STORAGE_BUCKET = import.meta.env.PUBLIC_STORAGE_BUCKET;
const PUBLIC_MESSAGING_SENDER_ID = import.meta.env.PUBLIC_MESSAGING_SENDER_ID;
const PUBLIC_APP_ID = import.meta.env.PUBLIC_APP_ID;

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);
export{db , auth};