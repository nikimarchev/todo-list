import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqfu2S5l90fHMdWQ6CS0DHutA1mDLfCbo",
  authDomain: "todo-list-4b516.firebaseapp.com",
  databaseURL: "https://todo-list-4b516-default-rtdb.firebaseio.com",
  projectId: "todo-list-4b516",
  storageBucket: "todo-list-4b516.appspot.com",
  messagingSenderId: "1005517725556",
  appId: "1:1005517725556:web:9365fcb2a8d02e0fd19621"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);