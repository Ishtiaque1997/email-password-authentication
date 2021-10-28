import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const initialiizeAuthentication=()=>{
 initializeApp(firebaseConfig);
}
export default initialiizeAuthentication;