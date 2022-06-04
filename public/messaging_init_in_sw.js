// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.8.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDVFvurJK6PyxOgj9jS54HDa6lvSbUlJfI",
  authDomain: "sinbad-delivery.firebaseapp.com",
  projectId: "sinbad-delivery",
  storageBucket: "sinbad-delivery.appspot.com",
  messagingSenderId: "202365528516",
  appId: "1:202365528516:android:9af69bce9902c6350edc91",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
