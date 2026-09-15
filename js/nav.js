// ==========================================
// MENU DAN STATUS LOGIN
// ==========================================

// Mengambil menu favorite dari HTML
const favoriteLink = document.getElementById("favorite-link");
// Mengambil menu login dari HTML
const loginLink = document.getElementById("login-link");
// Mengambil tombol hamburger
const hamburger = document.getElementById("hamburger");
// Mengambil bagian navigasi
const nav = document.getElementById("nav");


// MENENTUKAN HALAMAN

// Fungsi untuk mengecek apakah halaman yang sedang dibuka berada di dalam folder html
function halamanHtml() {

    // Mengambil alamat halaman saat ini lalu mengecek apakah ada di "/html/"
    return window.location.pathname.includes("/html/");
}


// LINK LOGIN

// Fungsi untuk menentukan alamat halaman login
function linkLogin() {

    // Jika halaman saat ini berada di folder html
    if (halamanHtml()) {

        // Cukup menggunakan login.html
        return "login.html";

    } else {

        // Jika halaman berada di luar folder html masuk ke folder html terlebih dahulu
        return "html/login.html";
    }
}


// LINK FAVORITE

// Fungsi untuk menentukan alamat halaman favorite
function linkFavorite() {

    // Jika halaman saat ini berada di folder html
    if (halamanHtml()) {

        // Cukup menggunakan favorite.html
        return "favorite.html";

    } else {

        // Jika halaman berada di luar folder html masuk ke folder html terlebih dahulu
        return "html/favorite.html";
    }
}


// LINK PROFILE

// Fungsi untuk menentukan alamat halaman profile
function linkProfile() {

    // Jika halaman saat ini berada di folder html
    if (halamanHtml()) {
        return "profile.html";

    } else {
        return "html/profile.html";
    }
}


// MEMERIKSA STATUS LOGIN

// Fungsi untuk mengecek apakah user sudah login
function periksaMenuLogin() {

    // Mengambil data user yang sedang login
    const currentUser =
        localStorage.getItem("currentUser");

    // Jika currentUser ada, berarti user sudah login
    if (currentUser) {

        // Mengubah tulisan menu menjadi Profil
        loginLink.textContent = "Profil";

        // Mengubah link menuju halaman profile
        loginLink.href = linkProfile();

    } else {

        // Jika belum login, tulisan menu tetap Login
        loginLink.textContent = "Login";

        // Mengarahkan menu ke halaman login
        loginLink.href = linkLogin();
    }
}


// MENU FAVORITE

// Fungsi untuk mengatur menu favorite
function aturMenuFavorite() {

    // Menentukan alamat halaman favorite
    favoriteLink.href = linkFavorite();

    // Menjalankan fungsi ketika menu favorite diklik
    favoriteLink.addEventListener("click", function (event) {

        // Mengecek user yang sedang login
        const currentUser =
            localStorage.getItem("currentUser");

        // Jika user belum login
        if (!currentUser) {

            // Mencegah link favorite dibuka
            event.preventDefault();

            // Memberikan pemberitahuan kepada user
            alert("Silakan login terlebih dahulu.");

            // Menyimpan halaman yang ingin dibuka setelah user berhasil login
            localStorage.setItem(
                "loginNext",
                "favorite.html"
            );

            // Mengarahkan user ke halaman login
            window.location.href = linkLogin();
        }
    });
}


// MENU HAMBURGER

// Fungsi untuk membuka dan menutup menu hamburger
function bukaMenu() {

    // Menjalankan fungsi ketika hamburger diklik
    hamburger.addEventListener("click", function () {

        // Menambahkan atau menghapus class "show" pada bagian navigasi
        nav.classList.toggle("show");
    });
}


// MENJALANKAN PROGRAM

// Menunggu sampai halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    // Mengecek status login pada menu
    periksaMenuLogin();

    // Mengatur menu favorite
    aturMenuFavorite();

    // Mengaktifkan menu hamburger
    bukaMenu();

});
