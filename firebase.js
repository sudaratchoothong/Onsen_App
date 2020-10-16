var firebaseConfig = {
    apiKey: "AIzaSyCa9SZMUJ7LtpkYHvicXxdR0YMbynsJUbs",
    authDomain: "meowflix-9bd3d.firebaseapp.com",
    databaseURL: "https://meowflix-9bd3d.firebaseio.com/",
    projectId: "meowflix-9bd3d",
    storageBucket: "meowflix-9bd3d.appspot.com",
    messagingSenderId: "887706623073",
    appId: "1:429650509455:web:adadc8b6215fe21011fafa", //ยังหาapp ในเบสไม่เจอ ที่เขียนไปเป็นของอใจารย์
    measurementId: "G-HG7G7ZEFPC" //อันนี้ด้วย
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();