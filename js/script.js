// ==========================================
// BAGIAN PROGRAM JAVASCRIPT
// ==========================================

// Menyimpan alamat API yang digunakan untuk mengambil data drama
const apiUrl = "https://api-fauzah.vercel.app/fauzah.json";

// Membuat array untuk menyimpan seluruh data drama
let dataDrama = [];
// Mengambil bagian grid drama unggulan dari HTML
const highlightGrid = document.getElementById("highlight-grid");
// Mengambil bagian untuk menampilkan nama drama pada hero
const heroNama = document.getElementById("hero-nama");
// Mengambil bagian untuk menampilkan tahun rilis pada hero
const heroTahun = document.getElementById("hero-tahun");
// Mengambil bagian untuk menampilkan jumlah episode pada hero
const heroEpisode = document.getElementById("hero-episode");
// Mengambil bagian untuk menampilkan rating pada hero
const heroRating = document.getElementById("hero-rating");
// Mengambil gambar poster drama pada bagian hero
const heroPoster = document.getElementById("hero-poster");
// Mengambil video trailer yang digunakan sebagai background hero
const heroTrailerBg = document.getElementById("hero-trailer-bg");
// Mengambil tombol Watch Now dari HTML
const heroWatch = document.getElementById("hero-watch");
// Mengambil tombol untuk melihat detail drama
const heroDetail = document.getElementById("hero-detail");


// MENJALANKAN PROGRAM

// Menunggu sampai halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    ambilDataDrama();

});


// MENGAMBIL DATA

function ambilDataDrama() {

    // Mengambil data drama dari alamat API
    fetch(apiUrl)

        // Menunggu hasil dari proses pengambilan data
        .then(function (response) {

            // Memeriksa apakah data berhasil diambil
            if (!response.ok) {

                // Jika gagal, menampilkan pesan kesalahan
                throw new Error("Data tidak dapat diambil.");
            }

            // Mengubah data dari API menjadi format JSON
            return response.json();
        })

        // Menjalankan proses setelah data JSON berhasil diterima
        .then(function (data) {

            // Menyimpan data dari API ke dalam array dataDrama
            dataDrama = data;

            // Menampilkan drama pertama pada bagian hero
            tampilkanHero();

            // Menampilkan drama unggulan
            tampilkanDramaUnggulan();
        })

        // Menangani kesalahan jika proses mengambil data gagal
        .catch(function (error) {

            // Menampilkan kesalahan pada console
            console.log("Terjadi kesalahan:", error);

            // Menampilkan pesan kesalahan pada bagian nama drama
            heroNama.textContent =
                "Drama belum dapat dimuat.";
        });
}


// HERO HOME

function tampilkanHero() {

    // Memeriksa apakah data drama kosong
    if (dataDrama.length === 0) {

        // Menghentikan fungsi jika tidak ada data drama
        return;
    }

    // Mengambil drama pertama dari array dataDrama
    const drama = dataDrama[0];

    // Menampilkan nama drama pada bagian hero
    heroNama.textContent = drama.nama;
    // Menampilkan tahun rilis drama
    heroTahun.textContent = drama.rilis;
    // Menampilkan jumlah episode drama
    heroEpisode.textContent = drama.episode + " Episode";
    // Menampilkan rating drama
    heroRating.textContent = drama.rating;
    // Menampilkan poster drama
    heroPoster.src = drama.poster;
    // Memberikan teks alternatif untuk poster
    heroPoster.alt = "Poster " + drama.nama;
    // Mengambil ID video dari link trailer
    const videoId = ambilIdVideo(drama.trailer);
    // Menentukan alamat video trailer untuk background
    heroTrailerBg.src =
        ubahTrailer(drama.trailer) +
        "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
        videoId;

    // Mengatur link tombol Watch Now menuju halaman watch
    heroWatch.href =
        "html/watch.html?id=" +
        encodeURIComponent(drama.id);

    // Mengatur link tombol Detail menuju halaman detail
    heroDetail.href =
        "html/detail.html?id=" +
        encodeURIComponent(drama.id);
}


// DRAMA UNGGULAN

function tampilkanDramaUnggulan() {

    // Mengosongkan isi grid drama unggulan
    highlightGrid.textContent = "";

    // Membuat salinan data drama agar dataDrama asli tidak berubah
    let dramaTerpilih = dataDrama.slice();

    // Mengurutkan drama berdasarkan rating dari yang terbesar
    dramaTerpilih.sort(function (a, b) {

        // Mengubah rating menjadi angka kemudian membandingkannya
        return parseFloat(b.rating) -
               parseFloat(a.rating);
    });

    // Memeriksa apakah jumlah drama lebih dari 8
    if (dramaTerpilih.length > 8) {

        // Mengambil hanya 8 drama dengan rating tertinggi
        dramaTerpilih =
            dramaTerpilih.slice(0, 8);
    }

    // Melakukan perulangan untuk setiap drama yang dipilih
    for (let i = 0; i < dramaTerpilih.length; i++) {

        // Menambahkan card drama ke dalam grid
        highlightGrid.appendChild(
            buatCardDrama(dramaTerpilih[i])
        );
    }
}


// CARD DRAMA

function buatCardDrama(drama) {

    // Membuat elemen article untuk card drama
    const card = document.createElement("article");
    // Memberikan class drama-card pada card
    card.classList.add("drama-card");
    // Membuat elemen gambar untuk poster drama
    const image = document.createElement("img");

    // Mengambil alamat poster dari data API
    image.src = drama.poster;

    // Memberikan teks alternatif pada gambar
    image.alt = "Poster " + drama.nama;


    // TOMBOL FAVORITE

    // Membuat tombol untuk menambahkan drama ke favorite
    const favoriteButton = document.createElement("button");

    // Menentukan tipe tombol sebagai button
    favoriteButton.type = "button";

    // Memberikan class favorite-button pada tombol
    favoriteButton.classList.add("favorite-button");

    // Memeriksa apakah drama sudah masuk ke favorite
    if (cekFavorite(drama.id)) {

        // Jika sudah, menampilkan simbol hati penuh
        favoriteButton.textContent = "♥";

    } else {

        // Jika belum, menampilkan simbol hati kosong
        favoriteButton.textContent = "♡";
    }

    // Menjalankan proses ketika tombol favorite diklik
    favoriteButton.addEventListener(
        "click",
        function (event) {

            // Mencegah klik tombol ikut menjalankan klik card
            event.stopPropagation();

            // Menjalankan proses favorite untuk drama tersebut
            prosesFavorite(drama);
        }
    );


    // ISI CARD

    // Membuat bagian body untuk isi card
    const cardBody = document.createElement("div");

    // Memberikan class drama-card-body pada body card
    cardBody.classList.add("drama-card-body");

    // Membuat elemen h3 untuk nama drama
    const title = document.createElement("h3");

    // Memberikan class drama-card-title pada judul
    title.classList.add("drama-card-title");

    // Menampilkan nama drama
    title.textContent = drama.nama;

    // Membuat elemen p untuk informasi drama
    const info = document.createElement("p");

    // Memberikan class drama-card-info
    info.classList.add("drama-card-info");

    // Menampilkan tahun rilis dan jumlah episode
    info.textContent = drama.rilis + " • " + drama.episode + " Episode";

    // Membuat elemen p untuk rating drama
    const rating = document.createElement("p");

    // Memberikan class drama-card-rating
    rating.classList.add("drama-card-rating");

    // Menampilkan simbol bintang dan rating
    rating.textContent = "★ " + drama.rating;


    // MENAMPILKAN CARD

    // Memasukkan judul ke dalam body card
    cardBody.appendChild(title);

    // Memasukkan informasi drama ke dalam body card
    cardBody.appendChild(info);

    // Memasukkan rating ke dalam body card
    cardBody.appendChild(rating);

    // Memasukkan gambar poster ke dalam card
    card.appendChild(image);

    // Memasukkan tombol favorite ke dalam card
    card.appendChild(favoriteButton);

    // Memasukkan body card ke dalam card
    card.appendChild(cardBody);


    // KLIK CARD

    // Menjalankan proses ketika card drama diklik
    card.addEventListener(
        "click",
        function () {

            // Mengarahkan user ke halaman detail drama
            window.location.href =
                "html/detail.html?id=" +
                encodeURIComponent(drama.id);
        }
    );

    // Mengembalikan card yang sudah dibuat
    return card;
}


// FAVORITE

function cekFavorite(idDrama) {

    // Mengambil email user yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");

    // Memeriksa apakah user belum login
    if (!currentUser) {

        // Mengembalikan nilai false jika belum login
        return false;
    }

    // Mengambil data favorite milik user dari localStorage
    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites_" + currentUser
            )
        ) || [];

    // Melakukan perulangan untuk memeriksa data favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID drama dengan ID yang ada di favorite
        if (favorites[i].id === idDrama) {

            // Mengembalikan true jika drama ditemukan
            return true;
        }
    }

    // Mengembalikan false jika drama tidak ditemukan
    return false;
}


// PROSES FAVORITE

function prosesFavorite(drama) {

    // Mengambil email user yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");


    // JIKA BELUM LOGIN

    // Memeriksa apakah user belum login
    if (!currentUser) {

        // Menyimpan data drama yang ingin ditambahkan ke favorite
        localStorage.setItem(
            "pendingFavorite",
            JSON.stringify(drama)
        );

        // Menyimpan halaman tujuan setelah user login
        localStorage.setItem(
            "loginNext",
            "favorite.html"
        );

        // Menampilkan pemberitahuan kepada user
        alert("Silakan login terlebih dahulu.");

        // Memberikan jeda sebelum pindah halaman login
        setTimeout(function () {

            // Mengarahkan user ke halaman login
            window.location.href =
                "html/login.html";
        }, 700);

        // Menghentikan proses
        return;
    }


    // DATA FAVORITE USER

    // Membuat nama penyimpanan berdasarkan email user
    const namaPenyimpanan = "favorites_" + currentUser;

    let favorites =
        JSON.parse(
            localStorage.getItem(namaPenyimpanan)
        ) || [];

    // Menentukan apakah drama sudah ada di favorite
    let sudahAda = false;


    // CEK FAVORITE

    // Melakukan perulangan untuk memeriksa semua data favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID drama dengan ID favorite
        if (favorites[i].id === drama.id) {

            // Jika ID sama, berarti drama sudah ada
            sudahAda = true;
        }
    }


    // TAMBAH ATAU HAPUS FAVORITE

    // Memeriksa apakah drama sudah ada di favorite
    if (sudahAda) {

        const dataBaru = [];

        // Melakukan perulangan pada data favorite
        for (let i = 0; i < favorites.length; i++) {

            // Memilih data yang ID-nya berbeda dengan drama
            if (favorites[i].id !== drama.id) {

                dataBaru.push(favorites[i]);
            }
        }

        favorites = dataBaru;

        // Memberikan pemberitahuan bahwa drama dihapus
        alert("Drama dihapus dari favorite.");

    } else {

        // Menambahkan drama ke dalam array favorite
        favorites.push(drama);

        // Memberikan pemberitahuan bahwa drama ditambahkan
        alert("Drama ditambahkan ke favorite.");
    }


    // SIMPAN FAVORITE

    // Menyimpan data favorite terbaru ke localStorage
    localStorage.setItem(
        namaPenyimpanan,
        JSON.stringify(favorites)
    );

    // Menampilkan kembali drama unggulan agar tombol favorite diperbarui
    tampilkanDramaUnggulan();
}


// TRAILER YOUTUBE

function ambilIdVideo(linkTrailer) {

    // Memeriksa apakah link trailer tidak tersedia
    if (!linkTrailer) {

        // Mengembalikan nilai kosong
        return "";
    }

    // Memeriksa apakah link menggunakan format youtu.be
    if (linkTrailer.includes("youtu.be/")) {

        // Mengambil ID video dari link trailer
        return linkTrailer
            .split("youtu.be/")[1]
            .split("?")[0];
    }

    // Memeriksa apakah link menggunakan format watch?v=
    if (linkTrailer.includes("watch?v=")) {

        // Mengambil ID video dari link trailer
        return linkTrailer
            .split("watch?v=")[1]
            .split("&")[0];
    }

    // Mengembalikan nilai kosong jika format link tidak sesuai
    return "";
}


// MENGUBAH LINK TRAILER

function ubahTrailer(linkTrailer) {

    // Mengambil ID video dari link trailer
    const videoId = ambilIdVideo(linkTrailer);

    // Memeriksa apakah ID video tidak ditemukan
    if (videoId === "") {

        // Mengembalikan link trailer seperti semula
        return linkTrailer || "";
    }

    // Mengubah link menjadi format embed YouTube
    return "https://www.youtube.com/embed/" +
           videoId;
}