// ==========================================
// PROFIL PENGGUNA
// ==========================================

// Mengambil elemen judul nama profil dari HTML
const profileNameTitle = document.getElementById("profile-name-title");
// Mengambil elemen avatar dari HTML
const profileAvatar = document.getElementById("profile-avatar");
// Mengambil elemen nama pengguna dari HTML
const profileName = document.getElementById("profile-name");
// Mengambil elemen email pengguna dari HTML
const profileEmail = document.getElementById("profile-email");
// Mengambil elemen tanggal daftar dari HTML
const profileDate = document.getElementById("profile-date");
// Mengambil elemen jumlah favorite dari HTML
const profileFavorite = document.getElementById("profile-favorite");
// Mengambil tombol logout dari HTML
const logoutButton = document.getElementById("logout-button");


// MENJALANKAN PROGRAM

// Menunggu sampai halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Menjalankan fungsi untuk menampilkan profil
    tampilkanProfil();

});


// MENAMPILKAN PROFIL

function tampilkanProfil() {

    // Mengambil data user yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");


    // MEMERIKSA LOGIN

    // Jika tidak ada user yang sedang login
    if (!currentUser) {

        // Menyimpan halaman profile sebagai halaman yang akan dibuka setelah login
        localStorage.setItem(
            "loginNext",
            "profile.html"
        );

        // Memberikan pemberitahuan kepada user
        alert("Silakan login terlebih dahulu.");

        // Mengarahkan user ke halaman login
        window.location.href = "login.html";

        // Menghentikan fungsi
        return;
    }

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    // Menyediakan tempat untuk data user yang sedang login
    let user = null;


    // MENCARI DATA USER

    // Memeriksa semua akun yang tersimpan
    for (let i = 0; i < users.length; i++) {

        // Mencari akun berdasarkan email yang sedang login
        if (users[i].email === currentUser) {

            // Menyimpan data akun yang ditemukan
            user = users[i];

            // Menghentikan perulangan karena akun sudah ditemukan
            break;
        }
    }


    // JIKA DATA AKUN TIDAK DITEMUKAN

    // Jika data user tidak ditemukan
    if (!user) {

        // Menghapus status user yang sedang login
        localStorage.removeItem("currentUser");

        // Memberikan pemberitahuan
        alert("Data akun tidak ditemukan.");

        // Mengarahkan user ke halaman login
        window.location.href = "login.html";

        return;
    }


    // MENAMPILKAN DATA PROFIL

    // Menampilkan nama user pada judul profil
    profileNameTitle.textContent = "Halo, " + user.nama + "!";

    // Menampilkan nama user
    profileName.textContent = user.nama;

    // Menampilkan email user
    profileEmail.textContent = user.email;

    // Menampilkan tanggal user mendaftar
    // Jika tanggalDaftar tidak ada, maka menampilkan "Data lama"
    profileDate.textContent = user.tanggalDaftar || "Data lama";

    // Mengambil huruf pertama dari nama user kemudian mengubahnya menjadi huruf besar
    profileAvatar.textContent =
        user.nama.charAt(0).toUpperCase();


    // MENGAMBIL DATA FAVORITE

    // Mengambil data favorite berdasarkan user yang sedang login
    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites_" + currentUser
            )
        ) || [];


    // MENAMPILKAN JUMLAH FAVORITE

    // Mengambil jumlah data favorite menggunakan length
    profileFavorite.textContent =
        favorites.length + " Drama";
}


// LOGOUT

// Menjalankan fungsi ketika tombol logout diklik
logoutButton.addEventListener("click", function () {

    // Menghapus user yang sedang login
    localStorage.removeItem("currentUser");

    // Menghapus data favorite sementara yang belum diproses
    localStorage.removeItem("pendingFavorite");

    // Menghapus halaman tujuan setelah login
    localStorage.removeItem("loginNext");

    // Memberikan pemberitahuan logout berhasil
    alert("Berhasil logout.");

    // Mengarahkan user kembali ke halaman utama
    window.location.href = "../index.html";

});
