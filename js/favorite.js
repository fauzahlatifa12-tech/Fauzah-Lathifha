// ==========================================
// HALAMAN FAVORITE
// ==========================================

// Mengambil elemen HTML dengan id "favorite-grid"
const favoriteGrid = document.getElementById("favorite-grid");

// Mengambil elemen HTML dengan id "empty-favorite"
const emptyFavorite = document.getElementById("empty-favorite");
// Mengambil data user yang sedang login dari localStorage
const currentUser = localStorage.getItem("currentUser");


// BAGIAN MENJALANKAN PROGRAM

// Menunggu sampai seluruh HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Memeriksa apakah user sudah login
    periksaLoginFavorite();

    // Menjalankan function untuk mengatur tombol logout
    prosesLogout();

});


// BAGIAN MEMERIKSA LOGIN

function periksaLoginFavorite() {

    // Mengecek apakah currentUser tidak ada jika tidak ada berarti user belum login
    if (!currentUser) {

        // Menyimpan halaman favorite sebagai halaman tujuan setelah user melakukan login
        localStorage.setItem(
            "loginNext",
            "favorite.html"
        );

        // Memberikan pemberitahuan kepada user
        alert( "Silakan login terlebih dahulu." );

        // Mengarahkan user ke halaman login
        window.location.href =
            "login.html";

        // Menghentikan function
        return;
    }

    // Jika user sudah login, tampilkan drama yang ada di favorite
    tampilkanFavorite();
}


// BAGIAN MENAMPILKAN FAVORITE

function tampilkanFavorite() {

    // Membuat nama penyimpanan favorite berdasarkan username
    const namaPenyimpanan = "favorites_" + currentUser;
    const favorites =
        JSON.parse(
            localStorage.getItem(
                namaPenyimpanan
            )
        ) || [];

    // Mengosongkan favoriteGrid terlebih dahulu agar data lama agar ga numpuk
    favoriteGrid.textContent = "";

    // Mengecek apakah jumlah favorite adalah 0
    if (favorites.length === 0) {

        // Jika belum ada favorite, tampilkan pesan emptyFavorite
        emptyFavorite.style.display = "block";

        // Menghentikan function
        return;
    }

    // Jika terdapat favorite, sembunyikan pesan emptyFavorite
    emptyFavorite.style.display = "none";

    // Melakukan perulangan pada semua drama favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membuat card dari data favorite kemudian memasukkannya ke dalam favoriteGrid
        favoriteGrid.appendChild(
            buatCardFavorite(
                favorites[i]
            )
        );
    }
}


// BAGIAN CARD FAVORITE

function buatCardFavorite(drama) {

    // Membuat elemen article sebagai card
    const card = document.createElement("article");
    // Memberikan class CSS "drama-card"
    card.classList.add("drama-card");


    // BAGIAN POSTER DRAMA

    // Membuat elemen gambar
    const image = document.createElement("img");
    // Mengambil alamat poster dari data drama
    image.src = drama.poster;
    // Memberikan teks alternatif pada gambar
    image.alt = "Poster " + drama.nama;


    // BAGIAN TOMBOL FAVORITE

    // Membuat tombol favorite
    const favoriteButton = document.createElement("button");
    // Menentukan tipe tombol
    favoriteButton.type = "button";
    // Memberikan class CSS pada tombol
    favoriteButton.classList.add(
        "favorite-button"
    );

    // Karena drama sudah berada di halaman favorite, tombol ditampilkan menggunakan hati penuh
    favoriteButton.textContent = "♥";

    // Memberikan event ketika tombol favorite diklik
    favoriteButton.addEventListener(
        "click",
        function (event) {

            // Menghentikan event click supaya klik tombol tidak dianggap sebagai klik card
            event.stopPropagation();

            // Menjalankan function untuk menghapus favorite
            hapusFavorite(
                String(drama.id)
            );
        }
    );


    // BAGIAN ISI CARD

    // Membuat div untuk menampung isi card
    const cardBody = document.createElement("div");

    // Memberikan class CSS pada card body
    cardBody.classList.add( "drama-card-body" );

    // Membuat elemen h2 untuk nama drama
    const title = document.createElement("h2");
    // Memberikan class CSS pada judul drama
    title.classList.add( "drama-card-title" );

    // Menampilkan nama drama
    title.textContent = drama.nama;

    // Membuat elemen p untuk informasi drama
    const info = document.createElement("p");

    // Memberikan class CSS pada informasi
    info.classList.add(
        "drama-card-info"
    );

    // Menampilkan tahun rilis dan jumlah episode
    info.textContent =
        drama.rilis +
        " • " +
        drama.episode +
        " Episode";

    // Membuat elemen p untuk rating
    const rating = document.createElement("p");

    // Memberikan class CSS pada rating
    rating.classList.add(
        "drama-card-rating"
    );

    // Menampilkan simbol bintang dan rating drama
    rating.textContent =
        "★ " + drama.rating;


    // BAGIAN MEMASUKKAN ISI KE CARD

    // Memasukkan judul ke dalam cardBody
    cardBody.appendChild(title);
    // Memasukkan informasi rilis dan episode ke dalam cardBody
    cardBody.appendChild(info);
    // Memasukkan rating ke dalam cardBody
    cardBody.appendChild(rating);
    // Memasukkan poster ke dalam card
    card.appendChild(image);
    // Memasukkan tombol favorite ke dalam card
    card.appendChild(favoriteButton);
    // Memasukkan cardBody ke dalam card
    card.appendChild(cardBody);


    // BAGIAN KLIK CARD

    // Memberikan event ketika card diklik
    card.addEventListener(
        "click",
        function () {

            // Mengarahkan user ke halaman detail drama ID drama dikirim melalui URL
            window.location.href =
                "detail.html?id=" +
                encodeURIComponent(drama.id);
        }
    );

    return card;
}


// BAGIAN MENGHAPUS FAVORITE

function hapusFavorite(idDrama) {

    // Membuat nama penyimpanan favorite berdasarkan username user yang sedang login
    const namaPenyimpanan = "favorites_" + currentUser;

    // Mengambil data favorite dari localStorage Jika tidak ada data, digunakan array kosong
    const favorites =
        JSON.parse(
            localStorage.getItem(
                namaPenyimpanan
            )
        ) || [];

    // Membuat array kosong untuk menyimpan data favorite yang tidak dihapus
    const dataBaru = [];

    // Melakukan perulangan pada semua data favorite
    for (let i = 0; i < favorites.length; i++) {

        // Mengecek ID setiap drama
        // Jika ID berbeda dengan ID yang ingin dihapus,
        // maka drama tetap disimpan
        if (favorites[i].id !== idDrama) {

            // Memasukkan drama tersebut ke array baru
            dataBaru.push(
                favorites[i]
            );
        }
    }

    // Menyimpan kembali data favorite yang sudah diperbarui ke localStorage
    localStorage.setItem(
        namaPenyimpanan,
        JSON.stringify(dataBaru)
    );

    // Memberikan pemberitahuan bahwa drama telah dihapus
    alert( "Drama dihapus dari favorite." );

    // Menampilkan kembali halaman favorite supaya drama yang dihapus langsung hilang dari halaman
    tampilkanFavorite();
}


// BAGIAN LOGOUT

// Function untuk mengatur proses logout
function prosesLogout() {

    // Mengambil tombol logout berdasarkan id
    const btnLogout = document.getElementById("btn-logout");

    // Mengecek apakah tombol logout tersedia
    if (btnLogout) {

        // Memberikan event ketika tombol logout diklik
        btnLogout.addEventListener(
            "click",
            function () {

                // Menghapus data currentUser dari localStorage sehingga user dianggap sudah logout
                localStorage.removeItem(
                    "currentUser"
                );

                alert( "Logout berhasil" );

                window.location.href =
                    "login.html";
            }
        );
    }
}