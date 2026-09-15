// ==========================================
// LOGIN
// ==========================================

// Mengambil form login dari HTML
const loginForm = document.getElementById("login-form");
// Mengambil input email dari HTML
const loginEmail = document.getElementById("login-email");
// Mengambil input password dari HTML
const loginPassword = document.getElementById("login-password");
// Mengambil elemen untuk menampilkan pesan login
const loginMessage = document.getElementById("login-message");


// BAGIAN MENJALANKAN PROGRAM

// Menunggu sampai seluruh halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    prosesLogin();

});


// BAGIAN PROSES LOGIN

function prosesLogin() {

    // Menjalankan proses ketika form login dikirim
    loginForm.addEventListener("submit", function (event) {

        // Mencegah halaman melakukan refresh saat form dikirim
        event.preventDefault();

        // Mengambil nilai email yang dimasukkan user
        const email = loginEmail.value.trim();
        // Mengambil nilai password yang dimasukkan user
        const password = loginPassword.value.trim();

        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        // Menentukan status apakah akun ditemukan atau tidak awalnya false karena akun belum diperiksa
        let akunDitemukan = false;


       // MEMERIKSA AKUN

        // Melakukan perulangan untuk memeriksa semua akun
        for (let i = 0; i < users.length; i++) {

            // Mengecek apakah email dan password yang dimasukkan sama dengan data akun
            if (users[i].email === email && users[i].password === password) {

                // Jika email dan password cocok, akunDitemukan diubah menjadi true
                akunDitemukan = true;

                // Menghentikan perulanga karena akun sudah ditemukan
                break;
            }
        }


        // JIKA AKUN TIDAK DITEMUKA

        // Mengecek apakah akun tidak ditemukan
        if (!akunDitemukan) {
            alert("Email atau password salah.");

            // Menghentikan proses login
            return;
        }


        // MENYIMPAN USER

        // Menyimpan email user yang berhasil login ke dalam localStorage dengan nama currentUser
        localStorage.setItem("currentUser", email);


        // FAVORITE SETELAH LOGIN

        // Mengecek apakah ada drama yang sebelumnya ingin dimasukkan ke favorite sebelum login
        const pendingFavorite = localStorage.getItem(
            "pendingFavorite"
        );

        // Jika terdapat drama yang tertunda
        if (pendingFavorite) {

            // Mengubah data pendingFavorite dari JSON menjadi object drama
            const drama = JSON.parse(pendingFavorite);

            // Membuat nama penyimpanan favorite berdasarkan email user yang sedang login
            const namaPenyimpanan = "favorites_" + email;

            // Mengambil data favorite milik user jika belum ada, digunakan array kosong
            let favorites = JSON.parse(
                localStorage.getItem(namaPenyimpanan)
            ) || [];

            // Menentukan apakah drama sudah ada di favorite awalnya false
            let sudahAda = false;


            // CEK FAVORITE

            // Melakukan perulangan untuk memeriksa semua drama yang sudah ada di favorite
            for (let i = 0; i < favorites.length; i++) {

                // Membandingkan ID drama yang dipilih dengan ID drama yang sudah ada
                if (favorites[i].id === drama.id) {

                    // Jika ID sama,
                    // berarti drama sudah ada di favorite
                    sudahAda = true;
                }
            }


            // MENAMBAHKAN FAVORITE

            // Mengecek apakah drama belum ada di favorite
            if (!sudahAda) {

                // Menambahkan drama ke dalam array favorite
                favorites.push(drama);
            }

            // Menyimpan kembali data favorite ke localStorage
            localStorage.setItem(
                namaPenyimpanan,
                JSON.stringify(favorites)
            );

            // Menghapus data pendingFavorite karena drama sudah berhasil diproses
            localStorage.removeItem("pendingFavorite");
        }


        // LOGIN BERHASIL

        // Memberikan pemberitahuan bahwa login berhasil
        alert("Login berhasil.");


        // MENGARAHKAN HALAMAN

        // Mengambil halaman tujuan yang sebelumnya disimpan di localStorage
        const loginNext = localStorage.getItem("loginNext");

        // Menghapus loginNext setelah digunakan
        localStorage.removeItem("loginNext");

        // Mengecek apakah user sebelumnya ingin membuka halaman favorite
        if (loginNext === "favorite.html") {

            window.location.href = "favorite.html";

        } else if (loginNext === "profile.html") {
            window.location.href = "profile.html";

        } else {
            window.location.href = "../index.html";
        }

    });
}
