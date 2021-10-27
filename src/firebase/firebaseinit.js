import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const initialiizeAll=()=>{
 initializeApp(firebaseConfig);
}
export default initialiizeAll;