
importScripts('https://www.gstatic.com/firebasejs/9.8.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDVFvurJK6PyxOgj9jS54HDa6lvSbUlJfI",
  authDomain: "sinbad-delivery.firebaseapp.com",
  projectId: "sinbad-delivery",
  storageBucket: "sinbad-delivery.appspot.com",
  messagingSenderId: "202365528516",
  appId: "1:202365528516:android:9af69bce9902c6350edc91",
});

const messaging = firebase.messaging();
