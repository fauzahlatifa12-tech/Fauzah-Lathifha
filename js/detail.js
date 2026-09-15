// ==========================================
// BAGIAN DATA DRAMA
// ==========================================

// Menyimpan alamat API yang berisi data drama
const apiUrl = "https://api-fauzah.vercel.app/fauzah.json";


// BAGIAN MENGAMBIL ID DRAMA

// Mengambil bagian query dari URL
const parameter = new URLSearchParams(window.location.search);
// Mengambil nilai "id" dari URL
const idDrama = parameter.get("id");
// Menyimpan data drama yang ditemukan
// Nilai awalnya null karena drama belum ditemukan
let dramaTerpilih = null;


// BAGIAN MENGAMBIL ELEMEN HTML

// Mengambil elemen HTML untuk menampilkan poster drama
const detailPoster = document.getElementById("detail-poster");
// Mengambil elemen HTML untuk menampilkan nama drama
const detailNama = document.getElementById("detail-nama");
// Mengambil elemen HTML untuk menampilkan tahun rilis
const detailRilis = document.getElementById("detail-rilis");
// Mengambil elemen HTML untuk menampilkan jumlah episode
const detailEpisode = document.getElementById("detail-episode");
// Mengambil elemen HTML untuk menampilkan rating drama
const detailRating = document.getElementById("detail-rating");
// Mengambil elemen HTML untuk menampilkan informasi singkat drama
const detailText = document.getElementById("detail-text");
// Mengambil elemen HTML untuk menampilkan daftar pemain
const castGallery = document.getElementById("cast-gallery");
// Mengambil tombol Watch Now
const watchNow = document.getElementById("watch-now");
// Mengambil tombol Favorite / My List
const favoriteButton = document.getElementById("favorite-button");

// BAGIAN MENJALANKAN PROGRAM

// Menunggu sampai seluruh HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Menjalankan function untuk mengambil data drama
    ambilDataDrama();
});


// BAGIAN MENGAMBIL DATA DRAMA

function ambilDataDrama() {

    // Mengambil data drama dari alamat API
    fetch(apiUrl)

        // Menunggu response dari API nya
        .then(function (response) {

            // Mengecek apakah data dari API berhasil diterima
            if (!response.ok) {

                // Jika gagal, maka akan membuat pesan ini
                throw new Error(
                    "Data drama tidak dapat dimuat."
                );
            }

            // Mengubah response API menjadi data JSON
            return response.json();
        })

        // Menjalankan proses setelah data JSON berhasil didapatkan
        .then(function (data) {

            // Melakukan perulangan untuk memeriksa setiap data drama
            for (let i = 0; i < data.length; i++) {

                // Membandingkan ID drama dari API dengan ID dari URL
                if (data[i].id === idDrama) {

                    // Jika ID sama, simpan data tersebut
                    // ke dalam variabel dramaTerpilih
                    dramaTerpilih = data[i];

                    // Menghentikan perulangan karena drama sudah ditemukan
                    break;
                }
            }

            // Mengecek apakah drama berhasil ditemukan
            if (dramaTerpilih) {

                // Jika ditemukan, tampilkan detail drama
                tampilkanDetail();

            } else {

                // Jika tidak ditemukan, tampilkan pesan
                detailNama.textContent =
                    "Drama tidak ditemukan.";
            }
        })

        // Menangani kesalahan yang terjadi saat mengambil data
        .catch(function (error) {

            // Menampilkan informasi error di Console
            console.log(
                "Terjadi kesalahan:",
                error
            );

            // Menampilkan pesan error pada halaman
            detailNama.textContent =
                "Data drama tidak dapat dimuat.";
        });
}


// BAGIAN MENAMPILKAN DETAIL DRAMA

function tampilkanDetail() {
    // Mengambil alamat poster dari data drama kemudian memasukkannya ke atribut src pada gambar
    detailPoster.src = dramaTerpilih.poster;
    // Memberikan teks alternatif pada gambar poster
    detailPoster.alt = "Poster " + dramaTerpilih.nama;
    // Menampilkan nama drama
    detailNama.textContent = dramaTerpilih.nama;
    // Menampilkan tahun rilis drama
    detailRilis.textContent = dramaTerpilih.rilis;
    // Menampilkan jumlah episode ditambah tulisan "Episode" setelah jumlahnya
    detailEpisode.textContent = dramaTerpilih.episode + " Episode";
    // Menampilkan rating drama
    detailRating.textContent = dramaTerpilih.rating;
    // Menampilkan informasi singkat tentang drama nama drama diambil dari data API
    detailText.textContent =
        "Lihat informasi drama, trailer, dan daftar pemeran " +
        dramaTerpilih.nama +
        " di Draela.";

    // Membuat link menuju halaman watch
    watchNow.href =
        "watch.html?id=" +
        encodeURIComponent(dramaTerpilih.id);

    // Mengecek apakah drama sudah masuk ke favorite
    if (cekFavorite(dramaTerpilih.id)) {

        // Jika sudah ada, tombol menggunakan simbol hati penuh
        favoriteButton.textContent =
            "♥ My List";

    } else {

        // Jika belum ada, tombol menggunakan simbol hati kosong
        favoriteButton.textContent =
            "♡ My List";
    }

    // Menampilkan daftar pemain drama
    tampilkanPemain();
}


// BAGIAN MENAMPILKAN PEMAIN

function tampilkanPemain() {

    // Mengosongkan isi gallery pemain terlebih dahulu agar data pemain tidak muncul dua kali
    castGallery.textContent = "";

    // Mengecek apakah data pemain tersedia
    if (!dramaTerpilih.pemain) {

        // Jika tidak ada data pemain, function dihentikan
        return;
    }

    // Melakukan perulangan untuk mengambil setiap pemain
    for (let i = 0; i < dramaTerpilih.pemain.length; i++) {

        // Mengambil satu data pemain berdasarkan index
        const pemain = dramaTerpilih.pemain[i];

        // Menyiapkan variabel untuk menyimpan alamat foto
        let foto = "";

        // Mengecek apakah data foto menggunakan nama "potrait"
        if (pemain.foto && pemain.foto.potrait) {

            // Mengecek apakah array foto memiliki isi
            if (pemain.foto.potrait.length > 0) {

                // Mengambil foto pertama dari array
                foto = pemain.foto.potrait[0];
            }

        // Jika "potrait" tidak ada, program mengecek nama "portrait"
        } else if (pemain.foto && pemain.foto.portrait) {

            // Mengecek apakah array foto memiliki isi
            if (pemain.foto.portrait.length > 0) {

                // Mengambil foto pertama dari array
                foto = pemain.foto.portrait[0];
            }
        }

        // Membuat card pemain kemudian memasukkannya ke dalam gallery
        castGallery.appendChild(
            buatCardPemain(pemain, foto)
        );
    }
}


// BAGIAN MEMBUAT CARD PEMAIN

function buatCardPemain(pemain, foto) {

    // Membuat elemen HTML <article> yang digunakan sebagai card pemain
    const card = document.createElement("article");

    // Memberikan class "cast-card" pada article
    card.classList.add("cast-card");

    // Mengecek apakah foto pemain tersedia
    if (foto !== "") {

        // Membuat elemen HTML <img>
        const image = document.createElement("img");

        // Memberikan class "cast-photo" pada gambar
        image.classList.add(
            "cast-photo"
        );

        // Memasukkan alamat foto ke atribut src
        image.src = foto;

        // Memberikan teks alternatif berupa nama aktor
        image.alt = "Foto " + pemain.aktor;

        // Memasukkan gambar ke dalam card
        card.appendChild(image);

    } else {

        // Jika foto tidak tersedia, membuat elemen <div> sebagai pengganti foto
        const image = document.createElement("div");

        // Memberikan dua class pada elemen tersebut
        image.classList.add(
            "cast-photo",
            "cast-empty"
        );

        // Menampilkan nama aktor sebagai pengganti foto
        image.textContent = pemain.aktor;

        // Memasukkan elemen pengganti foto ke dalam card
        card.appendChild(image);
    }

    // Membuat div untuk bagian isi card
    const body = document.createElement("div");

    // Memberikan class "cast-body"
    body.classList.add("cast-body");

    // Membuat elemen <h3> untuk nama aktor
    const actor = document.createElement("h3");

    // Memberikan class "cast-actor"
    actor.classList.add(
        "cast-actor"
    );

    // Menampilkan nama aktor
    actor.textContent = pemain.aktor;

    // Membuat elemen <p> untuk nama karakter
    const character = document.createElement("p");

    // Memberikan class "cast-character"
    character.classList.add(
        "cast-character"
    );

    // Menampilkan karakter yang dimainkan aktor
    character.textContent =
        "Sebagai " + pemain.karakter;
    // Memasukkan nama aktor ke dalam body card
    body.appendChild(actor);
    // Memasukkan karakter ke dalam body card
    body.appendChild(character);
    // Memasukkan body ke dalam card
    card.appendChild(body);

    // Mengembalikan card yang sudah selesai dibuat
    return card;
}


// BAGIAN CEK FAVORITE

function cekFavorite(id) {

    // Mengambil username pengguna yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");

    // Mengecek apakah pengguna sudah login
    if (!currentUser) {

        // Jika belum login, mengembalikan nilai false
        return false;
    }

    // Mengambil data favorite milik user dari localStorage nama penyimpanan dibuat berdasarkan username
    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites_" + currentUser
            )
        ) || [];

    // Melakukan perulangan untuk memeriksa semua favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID favorite dengan ID drama
        if (favorites[i].id === id) {

            // Jika ID sama, berarti drama sudah favorite
            return true;
        }
    }

    // Jika tidak ditemukan, berarti drama belum masuk favorite
    return false;
}


// BAGIAN PROSES FAVORITE

function prosesFavorite() {

    // Mengecek apakah data drama sudah tersedia
    if (!dramaTerpilih) {

        // Jika belum tersedia, function dihentikan
        return;
    }

    // Mengambil username pengguna yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");

    // Mengecek apakah pengguna belum login
    if (!currentUser) {

        // Menyimpan drama yang ingin ditambahkan ke favorite sementara di localStorage
        localStorage.setItem(
            "pendingFavorite",
            JSON.stringify(
                dramaTerpilih
            )
        );

        // Menyimpan halaman tujuan setelah proses login
        localStorage.setItem(
            "loginNext",
            "favorite.html"
        );
        alert(
            "Silakan login terlebih dahulu."
        );
        window.location.href =
            "login.html";

        // Menghentikan function
        return;
    }

    // Membuat nama penyimpanan favorite berdasarkan username
    const namaPenyimpanan =
        "favorites_" + currentUser;

    // Mengambil data favorite dari localStorage jika belum ada, digunakan array kosong
    let favorites =
        JSON.parse(
            localStorage.getItem(
                namaPenyimpanan
            )
        ) || [];

    // Variabel untuk mengecek apakah drama sudah ada
    let sudahAda = false;

    // Melakukan perulangan pada semua data favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID favorite dengan ID drama yang dipilih
        if (favorites[i].id === dramaTerpilih.id) {

            // Jika ID sama, berarti drama sudah ada
            sudahAda = true;
        }
    }

    // Mengecek apakah drama sudah ada di favorite
    if (sudahAda) {

        // Membuat array baru untuk menyimpan favorite yang tidak ingin dihapus
        const dataBaru = [];

        // Melakukan perulangan pada semua favorite
        for (let i = 0; i < favorites.length; i++) {

            // Memasukkan data yang ID-nya berbeda dari drama yang ingin dihapus
            if (favorites[i].id !== dramaTerpilih.id) {

                // Menambahkan data ke array baru
                dataBaru.push(favorites[i]);
            }
        }

        // Mengganti data favorite lama dengan data baru
        favorites = dataBaru;

        // Mengubah tombol menjadi hati kosong karena drama sudah dihapus dari favorite
        favoriteButton.textContent =
            "♡ My List";

        alert( "Drama dihapus dari favorite." );

    } else {

        // Jika drama belum ada, masukkan drama ke array favorite
        favorites.push(
            dramaTerpilih
        );

        // Mengubah tombol menjadi hati penuh karena drama berhasil ditambahkan
        favoriteButton.textContent =
            "♥ My List";

        // Memberikan pemberitahuan kepada pengguna
        alert( "Drama ditambahkan ke favorite." );
    }

    localStorage.setItem(
        namaPenyimpanan,
        JSON.stringify(favorites)
    );
}

// BAGIAN TOMBOL FAVORITE

// Memberikan event click pada tombol favorite
favoriteButton.addEventListener(
    "click",

    // Saat tombol diklik, function prosesFavorite akan dijalankan
    prosesFavorite
);