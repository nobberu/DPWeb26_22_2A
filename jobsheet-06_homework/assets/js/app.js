/* =========================================================
   app.js - Fungsi umum SIMPUS-Mini
   Dimuat di semua halaman.
   ========================================================= */

// 1. Menu hamburger
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// 2. Konfirmasi hapus - EVENT DELEGATION
// Tombol .btn-hapus dibuat setelah halaman selesai dimuat oleh
// buku.js / anggota.js, jadi listener dipasang di document.
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");

        if (yakin && row) {
            row.remove();
        }
    });
}

// 3. Pencarian tabel real-time
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        table.querySelectorAll("tbody tr").forEach(function (row) {
            const cocok = row.textContent.toLowerCase().includes(keyword);
            row.style.display = cocok ? "" : "none";
        });
    });
}

// 4. Validasi form client-side
const rules = [
    { name: "judul", pesan: "Field ini wajib diisi.", cek: (v) => v.trim() !== "" },
    { name: "nama", pesan: "Field ini wajib diisi.", cek: (v) => v.trim() !== "" },
    { name: "pengarang", pesan: "Field ini wajib diisi.", cek: (v) => v.trim() !== "" },
    { name: "tahun", pesan: "Tahun harus di antara 1900-2026.", cek: (v) => v >= 1900 && v <= 2026 },
    { name: "stok", pesan: "Stok tidak boleh negatif.", cek: (v) => v >= 0 },
];

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) next.remove();
}

function initValidasiForm() {
    document.querySelectorAll("#form-tambah, #form-anggota").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            let valid = true;

            rules.forEach(function (rule) {
                const input = form.querySelector("[name='" + rule.name + "']");
                if (!input) return;

                const nilai = input.type === "number" ? parseInt(input.value, 10) : input.value;
                if (rule.cek(nilai)) hapusError(input);
                else {
                    tampilkanError(input, rule.pesan);
                    valid = false;
                }
            });

            if (!valid) e.preventDefault();
        });
    });
}

// Entry point
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
