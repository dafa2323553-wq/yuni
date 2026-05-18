// --- 1. Sembunyi / Intip Password ---
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "🙈";
});

// --- 2. Data Mata Pelajaran (Database Dummy) ---
const DATA_MAPEL = [
    { id: 1, nama: "Matematika Wajib", guru: "buk oktrin", ikon: "📐" },
    { id: 2, nama: "pjok", guru: "pak jhhonmanullang", ikon: "⚡" },
    { id: 3, nama: "Bahasa Indonesia", guru: "buk roma", ikon: "✍️" },
    { id: 4, nama: "kktkj", guru: "pak haloho", ikon: "🧪" },
    { id: 5, nama: "Sejarah Indonesia", guru: "buk mian", ikon: "📜" },
    { id: 6, nama: "Bahasa Inggris", guru: "mem khairiya", ikon: "🗣️" }
];

// --- 3. Logika Proses Login & Tampilan Mapel ---
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const subjectsGrid = document.getElementById("subjectsGrid");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;
    const role = document.querySelector('input[name="role"]:checked').value;

    // Reset Pesan Error
    errorMessage.textContent = "";

    // Definisi Password: Siswa = siswa123 | Guru = guru123
    if (role === "siswa" && password === "siswa123") {
        bukaDashboard(username, "Siswa");
    } else if (role === "guru" && password === "guru123") {
        bukaDashboard(username, "Guru");
    } else {
        errorMessage.textContent = `Password ${role.toUpperCase()} salah! (Siswa: siswa123 | Guru: guru123)`;
    }
});

// Fungsi untuk berganti halaman dan menampilkan pelajaran
function bukaDashboard(namaUser, peran) {
    // Sembunyikan halaman login, tampilkan halaman dashboard
    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

    // Atur teks nama dan badge peran di dashboard
    document.getElementById("welcomeUser").textContent = `Selamat datang kembali, ${namaUser}!`;
    const roleBadge = document.getElementById("roleBadge");
    roleBadge.textContent = peran;

    // Atur warna badge berdasarkan peran
    if (peran === "Guru") {
        roleBadge.style.background = "#e6f4ea";
        roleBadge.style.color = "#137333";
    } else {
        roleBadge.style.background = "#e1f5fe";
        roleBadge.style.color = "#0288d1";
    }

    // Bersihkan grid sebelum memasukkan data baru
    subjectsGrid.innerHTML = "";

    // Render daftar mata pelajaran secara dinamis
    DATA_MAPEL.forEach(mapel => {
        const kartu = document.createElement("div");
        kartu.classList.add("subject-card");

        // Bedakan tombol aksi/fitur di dalam mapel untuk Siswa dan Guru
        let tombolAksi = "";
        if (peran === "Siswa") {
            tombolAksi = `<button class="subject-action-btn btn-siswa" onclick="aksiMapel('Membuka materi ${mapel.nama}')">📖 Buka Materi & Tugas</button>`;
        } else {
            tombolAksi = `<button class="subject-action-btn btn-guru" onclick="aksiMapel('Mengedit nilai ${mapel.nama}')">📝 Input Nilai & Absen</button>`;
        }

        kartu.innerHTML = `
            <span class="subject-icon">${mapel.ikon}</span>
            <h4>${mapel.nama}</h4>
            <p class="subject-teacher">${mapel.guru}</p>
            ${tombolAksi}
        `;
        
        subjectsGrid.appendChild(kartu);
    });
}

// Fungsi interaksi tombol di dalam kartu pelajaran
function aksiMapel(pesan) {
    alert(`Fitur Berhasil: Anda sedang ${pesan}.`);
}

// --- 4. Fitur Tombol Keluar (Logout) ---
document.getElementById("btnLogout").addEventListener("click", function() {
    // Kosongkan form login
    loginForm.reset();
    // Tukar tampilan kembali ke login
    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});