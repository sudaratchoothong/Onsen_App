$(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var profile =
                `<img src="${user.photoURL}" style="border-radius:360px" width="50%" alt="" srcset="">
                <div class="uesrname">
                    ${user.displayName}
                </div>`
            $("#User").append(profile)
        } else {
            window.location.href = "login.html"
        }
    });

    document.querySelector('ons-tabbar').addEventListener('reactive', function (event) {
        if (event.index == 0) {
            document.querySelector('#myNavigator').popPage();
        } else if (event.index == 1) {
            document.querySelector('#myNavigatorSearch').popPage();
        } else if (event.index == 2) {
            console.log("Account");
        }
    })

    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.id === 'movie') {
            movieall()
        } else if (page.id === 'action' || page.id === 'fantasy' || page.id === 'sci-fi' || page.id === 'thriller') {
            moviecategory()
        } else if (page.id === 'account') {
            $("#logout").click(function () {
                firebase.auth().signOut().then(function () {
                    window.location.href = "login.html"
                }).catch(function (error) {
                    // An error happened.
                });
            })
        }
    });
})
var db = firebase.firestore();

function movieall() {
    db.collection("Movie").where("rating", ">=", 8).orderBy("rating").limit(5)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var movie =
                    `<ons-carousel-item class="wallmovie" id="${doc.data().title}">
                                <img src="${doc.data().wallpaperURL}" style="border-radius: 10px;" width="100%" alt="" srcset="">
                            </ons-carousel-item>`
                $("#carousel").append(movie)
            });
            $(".wallmovie").click(function () {
                var id = $(this).attr('id');
                moviedetail(id)
                document.querySelector("#myNavigator").pushPage('views/movie.html')
            })
        });
    db.collection("Movie").where("rating", ">=", 9).orderBy("rating").limit(3)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var movie =
                    `<div class="removie col-4" id="${doc.data().title}">
                                <img src="${doc.data().posterURL}" width="100%" class="postermovieRecom" alt="" srcset="">
                            </div>`
                $("#recomendmovie").append(movie)
            });
            $(".removie").click(function () {
                var id = $(this).attr('id');
                moviedetail(id)
                document.querySelector("#myNavigator").pushPage('views/movie.html')
            })
        });
    db.collection("Movie").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var movie =
                `<div class="allmovie col-4" id="${doc.data().title}">
                            <img src="${doc.data().posterURL}" width="100%" class="postermovie" alt="" srcset="">
                        </div>`
            $("#allmovie").append(movie)
        });
        $(".allmovie").click(function () {
            var id = $(this).attr('id');
            moviedetail(id)
            document.querySelector("#myNavigator").pushPage('views/movie.html')
        })
    });
}

function moviecategory() {
    db.collection("Movie").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var movie =
                `<div class="border-img Kanit" id="${doc.data().title}">
                    <img src="${doc.data().wallpaperURL}" class="imgwall" width="100%" alt="" srcset="">
                    <div class="titlemoviewall">
                        ${doc.data().title}
                    </div>
                </div>`
            if (doc.data().category == 'action') {
                $("#movaction").append(movie)

            } else if (doc.data().category == 'fantasy') {
                $("#movfan").append(movie)

            } else if (doc.data().category == 'sci-fi') {
                $("#movsci").append(movie)

            } else if (doc.data().category == 'thriller') {
                $("#movthr").append(movie)

            }
        });
        $(".border-img").click(function () {
            var id = $(this).attr('id');
            moviedetail(id)
            document.querySelector("#myNavigator").pushPage('views/movie.html')
        })
    });
}

function moviedetail(data) {
    var db = firebase.firestore();
    db.collection("Movie").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().title == data) {
                var movie =
                    `<ons-row id="moviepage">
                        <div class="col-6">
                            <img src="${doc.data().posterURL}" width="100%" style="border-radius: 10px;" alt="" srcset="">
                        </div>
                        <div class="col-6 d-flex align-items-end" style="padding-left: 0;">
                            <div class="border-line">
                                <div class="titledetail">${doc.data().title}</div>
                                <div class="detail">
                                    ${doc.data().detail}
                                </div>
                            </div>
                        </div>
                    </ons-row>
                    <div class="Kanit title" style="margin: 15px;justify-content: center;">
                        ดูตัวอย่าง
                    </div>
                    <div class="col-12">
                        <video id="my-video" class="video-js" controls preload="auto" data-setup="{}">
                            <source src="${doc.data().videoURL}" type="video/mp4" />
                        </video>
                    </div>
                    <div class="Kanit title" style="margin: 15px;justify-content: center;">
                        ดูหนังเต็มเรื่อง
                    </div>
                    <div class="col-12">
                        <video id="my-video" class="video-js" controls preload="auto" data-setup="{}">
                            <source src="${doc.data().videoURL}" type="video/mp4" />
                        </video>
                    </div>`
                $("#movdetail").append(movie)
            }
        });
    });
}

function moviesearch() {
    var result = $("#searchval").val()
    $("#searchitem").empty();
    db.collection("Movie").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().title.toLowerCase().indexOf(result.toLowerCase()) != -1) {
                var searchitem =
                    `<div class="row itemsearch m-3 Kanit" id="${doc.data().title}">
                        <div class="col-6 text-right">
                            <img src="${doc.data().posterURL}" width="100%" style="border-radius: 10px;" alt="" srcset="">
                        </div>
                        <div class="col-6 d-flex align-items-start" style="padding-left: 0;">
                            <div class="border-line">
                                <div class="titleSearch">${doc.data().title}</div>
                                <div class="d-flex align-items-center mt-3">
                                    <ons-icon size="25px" class="mr-1" icon="md-star"></ons-icon> 
                                    <div class="rating">
                                        ${doc.data().rating}
                                    </div>
                                </div>
                                <div class="text-left">
                                    <ons-icon size="60px" icon="md-play-circle"></ons-icon>
                                </div> 
                            </div>
                        </div>
                    </div>`
                $("#searchitem").append(searchitem)
            }
        });
        $(".itemsearch").click(function () {
            var id = $(this).attr('id');
            moviedetail2(id)
            document.querySelector("#myNavigatorSearch").pushPage('views/movie1.html')
        })
    });
}

function moviedetail2(data) {
    var db = firebase.firestore();
    db.collection("Movie").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().title == data) {
                var movie =
                    `<ons-row id="moviepage">
                        <div class="col-6">
                            <img src="${doc.data().posterURL}" width="100%" style="border-radius: 10px;" alt="" srcset="">
                        </div>
                        <div class="col-6 d-flex align-items-end" style="padding-left: 0;">
                            <div class="border-line">
                                <div class="titledetail">${doc.data().title}</div>
                                <div class="detail">
                                    ${doc.data().detail}
                                </div>
                            </div>
                        </div>
                    </ons-row>
                    <div class="Kanit title" style="margin: 15px;justify-content: center;">
                        ดูตัวอย่าง
                    </div>
                    <div class="col-12">
                        <video id="my-video" class="video-js" controls preload="auto" data-setup="{}">
                            <source src="${doc.data().videoURL}" type="video/mp4" />
                        </video>
                    </div>
                    <div class="Kanit title" style="margin: 15px;justify-content: center;">
                        ดูหนังเต็มเรื่อง
                    </div>
                    <div class="col-12">
                        <video id="my-video" class="video-js" controls preload="auto" data-setup="{}">
                            <source src="${doc.data().videoURL}" type="video/mp4" />
                        </video>
                    </div>`
                $("#movsearch").append(movie)
            }
        });
    });
}