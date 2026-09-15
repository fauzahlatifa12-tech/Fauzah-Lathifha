// ==========================================
// BAGIAN DATA DRAMA
// ==========================================

// Menyimpan alamat API yang berisi data drama
const apiUrl = "https://api-fauzah.vercel.app/fauzah.json";

// Menyimpan semua data drama dari API
let dataDrama = [];
// Menyimpan hasil drama yang akan ditampilkan
let hasilDrama = [];
// Menentukan halaman yang sedang dibuka
let halamanSekarang = 1;
// Menentukan jumlah drama yang ditampilkan dalam satu halaman
// Dalam satu halaman terdapat 8 drama
const jumlahDramaPerHalaman = 8;
// Mengambil elemen HTML dengan id "drama-grid"
const dramaGrid = document.getElementById("drama-grid");
// Mengambil elemen input pencarian drama
const searchDrama = document.getElementById("search-drama");
// Mengambil elemen HTML untuk pagination
// Digunakan untuk menampilkan tombol nomor halaman
const pagination = document.getElementById("pagination");
// Mengambil elemen select untuk memilih tahun rilis
const ambilTahunRilis = document.getElementById("rilis");


// BAGIAN MENJALANKAN PROGRAM

// Menunggu sampai seluruh HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    ambilDataDrama();

    // Mengecek apakah input pencarian tersedia di halaman
    if (searchDrama) {

        //  functio dijalankann ketika pengguna mengetik sesuatu pada input pencarian
        searchDrama.addEventListener("input", function () {

            // Menjalankan function pencarian drama
            cariDrama();

        });
    }

    // Mengecek apakah pilihan tahun rilis tersedia
    if (ambilTahunRilis) {

        // Menjalankan function ketika pilihan tahun berubah
        ambilTahunRilis.addEventListener("change", function () {

            // Menjalankan kembali pencarian/filter drama
            cariDrama();

        });
    }

});


// BAGIAN MENGAMBIL DATA

function ambilDataDrama() {

    // Mengambil data drama dari alamat API
    fetch(apiUrl)

        // Menunggu response dari API
        .then(function (response) {

            // Mengecek apakah response dari API berhasil
            if (!response.ok) {

                // Jika gagal, membuat pesan error
                throw new Error(
                    "Data drama tidak dapat dimuat."
                );
            }

            // Mengubah response API menjadi data JSON
            return response.json();
        })

        // Menjalankan kode setelah data JSON berhasil didapat
        .then(function (data) {

            // Menyimpan semua data dari API ke dataDrama
            dataDrama = data;
            // Menyimpan semua data ke hasilDrama
            hasilDrama = data;
            // Mengatur halaman kembali ke halaman pertama
            halamanSekarang = 1;
            // Menampilkan data drama ke halaman
            tampilkanDrama();
        })

        // Menangani jika terjadi kesalahan saat mengambil atau membaca data dari APIII
        .catch(function (error) {
            // Menampilkan pesan error di Console
            console.log( "Terjadi kesalahan:", error );

            // Menampilkan pesan error pada halaman
            dramaGrid.textContent = "Drama tidak dapat dimuat.";
        });
}


// BAGIAN MENAMPILKAN DRAMA

function tampilkanDrama() {

    // Mengosongkan isi dramaGrid terlebih dahulu
    dramaGrid.textContent = "";

    // Menentukan posisi data pertama yang akan ditampilkan
    const awal = (halamanSekarang - 1) * jumlahDramaPerHalaman;
    // Menentukan batas akhir data yang akan ditampilkan
    const akhir = awal + jumlahDramaPerHalaman;

    // Melakukan perulangan mulai dari data awal sampai batas akhir
    for ( let i = awal; i < akhir && i < hasilDrama.length; i++ ) {

        // Membuat card dari data drama kemudian memasukkannya ke dalam dramaGrid
        dramaGrid.appendChild(
            buatCardDrama(hasilDrama[i])
        );
    }

    // Menampilkan tombol pagination
    tampilkanPagination();

    // Mengecek apakah hasil drama kosong
    if (hasilDrama.length === 0) {

        // Jika tidak ada drama yang ditemukan,maka menampilkan pesan
        dramaGrid.textContent =
            "Drama tidak ditemukan.";
    }
}


// BAGIAN PENCARIAN DRAMA

function cariDrama() {
    const kataKunci = searchDrama.value.toLowerCase().trim();
    // Mengambil tahun yang dipilih dari select Jika select tidak tersedia, digunakan nilai "semua"
    const tahunPilih = ambilTahunRilis ? ambilTahunRilis.value : "semua";
    // Mengosongkan hasilDrama karena hasil pencarian akan dibuat ulang
    hasilDrama = [];
    // Melakukan perulangan pada semua data drama
    for (let i = 0; i < dataDrama.length; i++) {
        // Mengambil nama drama kemudian mengubahnya menjadi huruf kecil
        const namaDrama = dataDrama[i].nama.toLowerCase();
        // Mengubah tahun rilis menjadi String supaya bisa dibandingkan dengan value dari select
        const tahunDrama = String(dataDrama[i].rilis);
        // Variabel untuk menentukan apakah nama drama cocok
        let nama = false;
        // Variabel untuk menentukan apakah tahun cocok
        let tahun = false;

        // Mengecek apakah nama drama mengandung kata kunci
        if (namaDrama.includes(kataKunci)) {

            // Jika cocok, nama menjadi true
            nama = true;
        }

        // Mengecek pilihan tahun
        // Jika memilih "semua", semua tahun diterima
        // Jika tidak, tahun harus sama dengan tahunDrama
        if (tahunPilih === "semua" || tahunPilih === tahunDrama) {

            // Jika cocok, tahun menjadi true
            tahun = true;
        }
        // Drama dimasukkan ke hasil jika nama DAN tahun sama-sama cocok
        if (nama && tahun) {

            // Menambahkan drama ke hasilDrama
            hasilDrama.push(dataDrama[i]);
        }
    }

    // Setelah melakukan pencarian/filter, kembali ke halaman pertama
    halamanSekarang = 1;

    // Menampilkan hasil pencarian
    tampilkanDrama();
}


// BAGIAN PAGINATION

function tampilkanPagination() {

    // Menghapus tombol pagination yang lama
    pagination.textContent = "";

    // Menghitung jumlah halaman yang dibutuhkan 
    // Math.ceil() digunakan untuk membulatkan ke atas
    const jumlahHalaman = Math.ceil(
        hasilDrama.length / jumlahDramaPerHalaman
    );

    // Jika jumlah halaman hanya 1 atau kurang, pagination tidak perlu ditampilkan
    if (jumlahHalaman <= 1) {

        // Menghentikan function
        return;
    }

    // Membuat tombol untuk setiap halaman dimulai dari halaman 1 sampai jumlahHalaman
    for (let i = 1; i <= jumlahHalaman; i++) {

        // Membuat elemen button menggunakan JavaScript
        const tombol = document.createElement("button");
        // Menentukan tipe button
        tombol.type = "button";
        // Menampilkan nomor halaman pada tombol
        tombol.textContent = i;
        // Memberikan class CSS pada tombol
        tombol.classList.add(
            "pagination-button"
        );

        // Mengecek apakah tombol adalah halaman yang sedang aktif
        if (i === halamanSekarang) {

            // Jika aktif, tambahkan class "active"
            tombol.classList.add("active");
        }

        // Memberikan event ketika tombol halaman diklik
        tombol.addEventListener(
            "click",
            function () {

                // Mengubah halaman sekarang sesuai tombol yang diklik
                halamanSekarang = i;

                // Menampilkan drama pada halaman tersebut
                tampilkanDrama();
            }
        );

        // Memasukkan tombol pagination ke dalam pagination
        pagination.appendChild(tombol);
    }
}


// BAGIAN CARD DRAMA

function buatCardDrama(drama) {

    // Membuat elemen article sebagai card drama
    const card = document.createElement("article");
    // Memberikan class CSS "drama-card"
    card.classList.add("drama-card");


    // BAGIAN POSTER DRAMA

    // Membuat elemen gambar
    const image = document.createElement("img");
    // Mengambil alamat poster dari data API
    image.src = drama.poster;
    // Memberikan teks alternatif untuk gambar
    image.alt = "Poster " + drama.nama;


    // BAGIAN TOMBOL FAVORITE

    // Membuat elemen button untuk favorite
    const favoriteButton = document.createElement("button");
    // Menentukan tipe button
    favoriteButton.type = "button";
    // Memberikan class CSS untuk tombol favorite
    favoriteButton.classList.add(
        "favorite-button"
    );

    // Mengecek apakah drama sudah ada di favorite
    if (cekFavorite(drama.id)) {
        favoriteButton.textContent = "♥";

    } else {
        favoriteButton.textContent = "♡";
    }

    // Memberikan event ketika tombol favorite diklik
    favoriteButton.addEventListener(
        "click",
        function (event) {

            // Menghentikan event agar klik tombol favorite tidak dianggap sebagai klik pada card
            event.stopPropagation();

            // Menjalankan proses untuk menambah atau menghapus favorite
            prosesFavorite(drama);
        }
    );


    // BAGIAN ISI CARD

    // Membuat div untuk menampung isi card
    const cardBody = document.createElement("div");

    // Memberikan class CSS pada card body
    cardBody.classList.add( "drama-card-body");

    // Membuat elemen h2 untuk judul drama
    const title = document.createElement("h2");

    // Memberikan class CSS pada judul
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

    // Menampilkan simbol bintang dan nilai rating
    rating.textContent =
        "★ " + drama.rating;


    // BAGIAN MEMASUKKAN ISI KE CARD

    // Memasukkan judul ke dalam cardBody
    cardBody.appendChild(title);
    // Memasukkan informasi rilis dan episode ke dalam cardBody
    cardBody.appendChild(info);
    // Memasukkan rating ke dalam cardBody
    cardBody.appendChild(rating);
    // Memasukkan gambar poster ke dalam card
    card.appendChild(image);
    // Memasukkan tombol favorite ke dalam card
    card.appendChild(favoriteButton);
    // Memasukkan cardBody ke dalam card
    card.appendChild(cardBody);


    // BAGIAN KLIK CARD

    // Memberikan event ketika seluruh card diklik
    card.addEventListener(
        "click",
        function () {

            // Mengarahkan pengguna ke halaman detail, ID drama dikirim melalui URL
            window.location.href =
                "detail.html?id=" +
                encodeURIComponent(drama.id);
        }
    );

    // Mengembalikan card yang sudah selesai dibuat
    return card;
}


// BAGIAN PERIKSA FAVORITE

function cekFavorite(idDrama) {

    // Mengambil username user yang sedang login
    const currentUser = localStorage.getItem("currentUser");

    // Mengecek apakah user sudah login
    if (!currentUser) {
        // Jika belum login, dianggap belum memiliki favorite
        return false;
    }

    // Mengambil data favorite milik user dari localStorage
    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites_" + currentUser
            )
        ) || [];

    // Melakukan perulangan pada semua favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID drama dengan ID yang sedang diperiksa
        if (favorites[i].id === idDrama) {

            // Jika ID sama, berarti drama sudah ada di favorite
            return true;
        }
    }

    // Jika tidak ditemukan, berarti drama belum ada di favorite
    return false;
}


// BAGIAN PROSES FAVORITE

function prosesFavorite(drama) {

    // Mengambil username user yang sedang login
    const currentUser = localStorage.getItem("currentUser");


    // JIKA BELUM LOGIN

    // Mengecek apakah currentUser tidak ada
    if (!currentUser) {

        // Menyimpan drama yang ingin ditambahkan ke favorite sementara
        localStorage.setItem(
            "pendingFavorite",
            JSON.stringify(drama)
        );

        // Menyimpan halaman yang akan dituju setelah proses login
        localStorage.setItem(
            "loginNext",
            "favorite.html"
        );

        // Memberikan pemberitahuan kepada user
        alert( "Silakan login terlebih dahulu." );

        // Mengarahkan user ke halaman login
        window.location.href =
            "login.html";

        // Menghentikan proses
        return;
    }

    // DATA FAVORITE USER

    // Membuat nama penyimpanan favorite berdasarkan username user
    const namaPenyimpanan = "favorites_" + currentUser;

    // Mengambil data favorite dari localStorage jika belum ada, digunakan array kosong
    let favorites =
        JSON.parse(
            localStorage.getItem(
                namaPenyimpanan
            )
        ) || [];

    // Menentukan apakah drama sudah ada di favorite
    let sudahAda = false;


    // CEK FAVORITE

    // Melakukan perulangan pada semua data favorite
    for (let i = 0; i < favorites.length; i++) {

        // Membandingkan ID favorite dengan ID drama yang diklik
        if (favorites[i].id === drama.id) {

            // Jika ID sama, berarti drama sudah ada
            sudahAda = true;
        }
    }


    // TAMBAH ATAU HAPUS FAVORITE

    // Mengecek apakah drama sudah ada
    if (sudahAda) {

        // Membuat array baru untuk menyimpan data favorite yang tetap ada
        const dataBaru = [];

        // Melakukan perulangan pada semua favorite
        for (let i = 0; i < favorites.length; i++) {

            // Memilih data yang ID-nya tidak sama dengan drama yang ingin dihapus
            if (favorites[i].id !== drama.id) {

                // Memasukkan data tersebut ke array baru
                dataBaru.push(favorites[i]);
            }
        }

        // Mengganti data favorite lama dengan data favorite yang baru
        favorites = dataBaru;

        // Memberikan pemberitahuan bahwa drama dihapus
        alert( "Drama dihapus dari favorite." );

    } else {
        // Jika drama belum ada, tambahkan drama ke array favorite
        favorites.push(drama);

        // Memberikan pemberitahuan bahwa drama ditambahkan
        alert( "Drama ditambahkan ke favorite." );
    }


    // BAGIAN MENYIMPAN FAVORITE

    // Menyimpan data favorite ke localStorage JSON.stringify mengubah array menjadi JSON
    localStorage.setItem(
        namaPenyimpanan,
        JSON.stringify(favorites)
    );

    // Menampilkan kembali drama supaya tampilan tombol favorite diperbarui
    tampilkanDrama();
}