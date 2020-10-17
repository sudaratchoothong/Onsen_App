$(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "meowflix.html"
        }
    });

    $("#signIn").click(function () {
        var email = $("#email").val()
        var password = $("#password").val()
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            ons.notification.alert(errorMessage);
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                window.location.href = "meowflix.html"
            }
        });
    })

    $("#signUp").click(function () {
        var email = $("#email").val()
        var password = $("#password").val()
        var name = $("#name").val()
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userProfile = firebase.auth().currentUser;
                userProfile.updateProfile({
                    displayName: name,
                    photoURL: "../img/logo-black.png"
                }).then(function () {
                    console.log("Success");
                    window.location.href = "meowflix.html"
                }).catch(function (error) {
                    // An error happened.
                });
            }
        });
    })

    $("#google").click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })

    $("#btn-back").click(function () {
        window.location.href = 'login.html'
    })

})
