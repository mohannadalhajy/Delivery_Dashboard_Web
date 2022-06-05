// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('http://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('http://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

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
