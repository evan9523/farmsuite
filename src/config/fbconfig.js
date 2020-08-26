import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBfrtmBt3GEekjaH_QL3uFgqmxYKbR9XqE",
  authDomain: "farmsuite-13d43.firebaseapp.com",
  databaseURL: "https://farmsuite-13d43.firebaseio.com",
  projectId: "farmsuite-13d43",
  storageBucket: "farmsuite-13d43.appspot.com",
  messagingSenderId: "442280337489",
  appId: "1:442280337489:web:05a31a3f0a187045105870",
  measurementId: "G-B7LF9J5MMB"
};
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots:true});
  

  export default firebase;