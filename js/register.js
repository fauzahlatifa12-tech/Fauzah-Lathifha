// ==========================================
// REGISTRASI
// ==========================================

// Mengambil form registrasi dari HTML
const registerForm = document.getElementById("register-form");
// Mengambil input nama dari HTML
const registerName = document.getElementById("register-name");
// Mengambil input email dari HTML
const registerEmail = document.getElementById("register-email");
// Mengambil input password dari HTML
const registerPassword = document.getElementById("register-password");
// Mengambil input konfirmasi password dari HTML
const registerConfirmPassword = document.getElementById("register-confirm-password");


// MENJALANKAN PROGRAM

// Menunggu sampai halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    prosesRegistrasi();

});


// PROSES REGISTRASI

function prosesRegistrasi() {

    // Menjalankan proses ketika form registrasi dikirim
    registerForm.addEventListener("submit", function (event) {

        // Mencegah halaman melakukan refresh ketika form dikirim
        event.preventDefault();


        // MENGAMBIL DATA INPUT

        // Mengambil nama yang dimasukkan user
        const nama = registerName.value.trim();
        // Mengambil email yang dimasukkan user
        const email = registerEmail.value.trim();
        // Mengambil password yang dimasukkan user
        const password = registerPassword.value.trim();
        // Mengambil password konfirmasi
        const confirmPassword = registerConfirmPassword.value.trim();


        // DATA PENGGUNA

        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

        // Menentukan apakah email sudah terdaftar Awalnya false
        let emailSudahAda = false;


        // MEMERIKSA EMAIL

        // Melakukan perulangan untuk memeriksa semua data pengguna
        for (let i = 0; i < users.length; i++) {

            // Membandingkan email yang dimasukkan dengan email yang sudah tersimpan
            if (users[i].email === email) {

                // Jika email sama, berarti email sudah digunakan
                emailSudahAda = true;

                // Menghentikan perulangan
                break;
            }
        }


        // CEK EMAIL

        // Jika email sudah terdaftar
        if (emailSudahAda) {

            // Menampilkan pemberitahuan
            alert("Email sudah terdaftar.");

            // Menghentikan proses registrasi
            return;
        }


        // CEK PASSWORD

        // Membandingkan password dengan password konfirmasi
        if (password !== confirmPassword) {

            // Jika tidak sama, tampilkan pemberitahuan
            alert("Password tidak sama.");

            // Menghentikan proses registrasi
            return;
        }


        // MEMBUAT DATA PENGGUNA

        // Membuat object untuk menyimpan data pengguna baru
        const userBaru = {

            // Menyimpan nama pengguna
            nama: nama,

            // Menyimpan email pengguna
            email: email,

            // Menyimpan password pengguna
            password: password,

            // Menyimpan tanggal saat akun dibuat
            tanggalDaftar:
                new Date().toLocaleDateString("id-ID", {

                    // Menampilkan tanggal dengan 2 digit
                    day: "2-digit",

                    // Menampilkan nama bulan
                    month: "long",

                    // Menampilkan tahun
                    year: "numeric"
                })
        };


        // MENYIMPAN DATA

        // Menambahkan data pengguna baru ke dalam array users
        users.push(userBaru);

        // Menyimpan kembali seluruh data pengguna
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // REGISTRASI BERHASIL

        // registrasi berhasil
        alert("Registrasi berhasil. Silakan login.");

        window.location.href = "login.html";

    });
}