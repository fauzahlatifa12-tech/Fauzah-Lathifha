// ==========================================
// HALAMAN WATCH
// ==========================================

// BAGIAN DATA DRAMA

// Menyimpan alamat API yang digunakan untuk mengambil data drama
const apiUrl = "https://api-fauzah.vercel.app/fauzah.json";

// BAGIAN MENGAMBIL ID DRAMA
// Mengambil parameter yang ada pada URL halaman
const parameter = new URLSearchParams(window.location.search);
// Mengambil nilai ID drama dari URL
const idDrama = parameter.get("id");
// Mengambil bagian judul video dari HTML
const watchTitle = document.getElementById("watch-title");
// Mengambil bagian tahun rilis dari HTML
const watchRilis = document.getElementById("watch-rilis");
// Mengambil bagian jumlah episode dari HTML
const watchEpisode = document.getElementById("watch-episode");
// Mengambil bagian rating dari HTML
const watchRating = document.getElementById("watch-rating");
// Mengambil bagian video dari HTML
const watchVideo = document.getElementById("watch-video");
// Mengambil tombol kembali ke halaman detail
const backDetail = document.getElementById("back-detail");


// MENJALANKAN PROGRAM

// Menunggu sampai halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    ambilDataDrama();

});


// BAGIAN MENGAMBIL DATA

function ambilDataDrama() {

    // Mengambil data drama dari API
    fetch(apiUrl)

        // Menunggu hasil dari proses pengambilan data
        .then(function (response) {

            // Memeriksa apakah data berhasil diambil
            if (!response.ok) {

                // Jika gagal, menampilkan pesan kesalahan
                throw new Error("Data API tidak dapat diambil.");
            }

            // Mengubah data dari API menjadi format JSON
            return response.json();
        })

        // Menjalankan proses setelah data JSON berhasil diterima
        .then(function (data) {

            // Menyiapkan variabel untuk menyimpan drama yang dipilih
            let drama = null;

            // Melakukan perulangan untuk mencari drama berdasarkan ID
            for (let i = 0; i < data.length; i++) {

                // Membandingkan ID data drama dengan ID dari URL
                if (data[i].id === idDrama) {

                    // Menyimpan data drama yang sesuai
                    drama = data[i];

                    // Menghentikan perulangan setelah drama ditemukan
                    break;
                }
            }

            // Memeriksa apakah drama tidak ditemukan
            if (!drama) {

                watchTitle.textContent = "Drama tidak ditemukan.";

                // Menghentikan proses
                return;
            }

            // Menampilkan nama drama
            watchTitle.textContent = drama.nama;

            // Menampilkan tahun rilis drama
            watchRilis.textContent = drama.rilis;

            // Menampilkan jumlah episode drama
            watchEpisode.textContent = drama.episode + " Episode";

            // Menampilkan rating drama
            watchRating.textContent = drama.rating;

            // Mengubah link trailer menjadi link embed YouTube
            watchVideo.src = ubahTrailer(drama.trailer);

            // Mengatur link untuk kembali ke halaman detail drama
            backDetail.href = "detail.html?id=" + encodeURIComponent(drama.id);
        })

        // Menangani kesalahan jika data gagal diambil
        .catch(function (error) {

            // Menampilkan kesalahan pada console
            console.log("Terjadi kesalahan:", error);

            // Menampilkan pesan kesalahan pada halaman
            watchTitle.textContent = "Video tidak dapat dimuat.";

            // Menampilkan pemberitahuan kepada user
            alert("Video tidak dapat dimuat.");
        });
}


// BAGIAN MENGAMBIL ID VIDEO

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

    // Mengembalikan nilai kosong jika ID video tidak ditemukan
    return "";
}


// BAGIAN MENGUBAH LINK TRAILER

function ubahTrailer(linkTrailer) {

    // Mengambil ID video dari link trailer
    const videoId = ambilIdVideo(linkTrailer);

    // Memeriksa apakah ID video tidak ditemukan
    if (videoId === "") {

        // Mengembalikan nilai kosong
        return "";
    }

    // BAGIAN MENYIAPKAN VIDEO YOUTUBE

    // Membuat link video dalam format embed YouTube
    let urlVideo =
        "https://www.youtube.com/embed/" +
        videoId +
        "?rel=0&playsinline=1";

    // BAGIAN MEMBERIKAN IDENTITAS HALAMAN

    // Menambahkan identitas halaman agar YouTube dapat mengenali halaman yang menampilkan video
    if (window.location.origin !== "null") {

        // Menambahkan pengaturan YouTube API dan alamat halaman
        urlVideo += "&enablejsapi=1&origin=" +
            encodeURIComponent(window.location.origin);
    }

    return urlVideo;
}