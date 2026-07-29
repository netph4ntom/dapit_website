# Panduan Kustomisasi Website Portofolio

Dokumen ini menjelaskan file mana saja yang perlu Anda edit jika ingin mengubah atau memperbarui informasi di website portofolio Anda.

---

## 1. Mengubah Informasi Profil & Sosial Media
Semua teks profil dan link sosial media terletak di dalam **[src/App.jsx](file:///d:/Project%20Website/dapit_website/src/App.jsx)**.

* **Nama, Title, dan Tagline**: 
  Cari tag `<header className="left-panel">` di `src/App.jsx`. Anda bisa mengganti:
  ```jsx
  <h1 className="profile-name">David Muhaimin</h1>
  <div className="profile-title">Infrastructure & Security Engineer ...</div>
  <p className="profile-tagline">Membangun infrastruktur server yang aman ...</p>
  ```
* **Link Sosial Media (GitHub, LinkedIn, Email)**:
  Cari bagian `<div className="social-links">` di bagian bawah tag `<header>`. Ganti atribut `href` dengan link akun Anda:
  ```jsx
  <a href="https://github.com/username-anda" ...>
  ```

---

## 2. Mengubah Konten Halaman (Experience, Projects, Certifications, dll)
Seluruh data konten berada di panel kanan dalam **[src/App.jsx](file:///d:/Project%20Website/dapit_website/src/App.jsx)**. Konten ini ditulis dalam format HTML/JSX card.

* **Experience (Pengalaman)**:
  Cari `<section id="experience" ...>` dan ubah atau duplikat elemen `.card-item` berikut:
  ```jsx
  <div className="card-item">
    <div className="card-left">Tahun (Contoh: 2025 — Present)</div>
    <div className="card-right">
      <h3 className="card-title">Nama Jabatan / Peran</h3>
      <div className="card-subtitle">Nama Perusahaan / Organisasi</div>
      <p className="card-description">Deskripsi pekerjaan Anda...</p>
      <div className="badge-list">
        <span className="badge">Teknologi 1</span>
        <span className="badge">Teknologi 2</span>
      </div>
    </div>
  </div>
  ```
* **Projects (Projek)**:
  Cari `<section id="projects" ...>`. Strukturnya sama dengan *Experience*, Anda tinggal mengubah judul projek, deskripsi, dan tag lencana (*badges*).
* **Blog & Education**:
  Cari `<section id="blog">` atau `<section id="education">` untuk memperbarui artikel atau riwayat pendidikan Anda.
* **Certifications (Sertifikasi)**:
  Cari `<section id="certifications" ...>` dan sesuaikan nama sertifikat serta penerbitnya di dalam kelas `.cert-card`:
  ```jsx
  <div className="cert-card">
    <div className="cert-info">
      <h4 className="cert-name">Nama Sertifikasi</h4>
      <span className="cert-issuer">Lembaga Penerbit</span>
      <span className="cert-date">Tahun Terbit</span>
    </div>
  </div>
  ```

---

## 3. Mengubah Fitur Terminal Interaktif (CLI)
Logika terminal interaktif diatur oleh state dan fungsi `handleTerminalSubmit` di dalam **[src/App.jsx](file:///d:/Project%20Website/dapit_website/src/App.jsx)**.

* **Pesan Sambutan Awal**:
  Ubah teks di dalam `useState` awal pada variabel `terminalHistory`:
  ```javascript
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Pesan sambutan di sini...' },
  ]);
  ```
* **Menambah atau Mengubah Command baru**:
  Cari fungsi `const handleTerminalSubmit = (e) => { ... }`. Di dalamnya terdapat `switch (cleanCmd)`. Anda bisa menambahkan case baru:
  ```javascript
  case 'nama_command_baru':
    output = [
      { type: 'output', text: 'Respons baris pertama' },
      { type: 'output', text: 'Respons baris kedua' }
    ];
    break;
  ```

---

## 4. Mengubah Warna, Font, & Tema Visual (CSS)
Semua variabel tema visual diatur di dalam **[src/index.css](file:///d:/Project%20Website/dapit_website/src/index.css)** menggunakan CSS Variables pada selector `:root`.

* **Mengubah Warna Utama**:
  Buka `src/index.css` dan ganti kode hex warna pada variabel berikut:
  - `--bg-primary`: Warna latar belakang utama website.
  - `--bg-secondary` & `--bg-card`: Warna background card dan terminal.
  - `--accent`: Warna neon cyan untuk highlight infrastruktur/jaringan.
  - `--accent-purple`: Warna ungu untuk highlight security.
  - `--accent-green`: Warna hijau untuk highlight IoT.
* **Mengubah Efek Spotlight (Sorotan Lampu Senter)**:
  Cari kelas `.spotlight` di `src/index.css`. Anda dapat mengatur tingkat transparansi atau ukuran lingkaran sorotan pada bagian `background: radial-gradient(600px ... rgba(34, 211, 238, 0.05) ...)`.

---

## 5. Mengubah Layout Detail
Jika ingin memodifikasi struktur tata letak (seperti lebar kolom kiri-kanan, margin, padding, responsive break-point untuk mobile), Anda dapat mengubahnya di file **[src/App.css](file:///d:/Project%20Website/dapit_website/src/App.css)**.
