import firebase from 'firebase/compat/app';
import "firebase/compat/messaging"
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
const firebaseConfig = {
  apiKey: "AIzaSyDVFvurJK6PyxOgj9jS54HDa6lvSbUlJfI",
  authDomain: "sinbad-delivery.firebaseapp.com",
  projectId: "sinbad-delivery",
  storageBucket: "sinbad-delivery.appspot.com",
  messagingSenderId: "202365528516",
  appId: "1:202365528516:android:9af69bce9902c6350edc91",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// const messaging = firebase.messaging();

export default messaging;


// import firebase from 'firebase/app'
// // import firebase from 'firebase/compat/app';
// // import { initializeApp } from "firebase/app";
// // import { getMessaging } from "firebase/messaging";
// import "@firebase/messaging"
// const firebaseConfig = {
//   apiKey: "AIzaSyDVFvurJK6PyxOgj9jS54HDa6lvSbUlJfI",
//   authDomain: "sinbad-delivery.firebaseapp.com",
//   projectId: "sinbad-delivery",
//   storageBucket: "sinbad-delivery.appspot.com",
//   messagingSenderId: "202365528516",
//   appId: "1:202365528516:android:9af69bce9902c6350edc91",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.getMessaging(app);
// // export default firebase;
// export default messaging;