# Pelacak Anggaran Gemini (Budget Tracker Gemini)

Ini adalah aplikasi pelacak anggaran sederhana yang dibangun menggunakan React (Vite) untuk frontend dan Express.js untuk backend, dengan Supabase sebagai database. Aplikasi ini memungkinkan pengguna untuk mencatat pemasukan dan pengeluaran, melihat riwayat transaksi, dan memantau saldo mereka.

## Fitur

*   **Pencatatan Transaksi**: Tambah transaksi baru dengan tipe (pemasukan/pengeluaran), kategori, jumlah, dan deskripsi.
*   **Ringkasan Keuangan**: Lihat saldo saat ini, total pemasukan, dan total pengeluaran.
*   **Riwayat Transaksi**: Tinjau semua transaksi yang tercatat.
*   **Manajemen Kategori**: Kategori yang dapat dikelola untuk transaksi.
*   **Halaman Profil**: Halaman kosong untuk kustomisasi pengguna.
*   **Pengaturan Tema**: Beralih antara tema gelap dan terang.
*   **Navigasi Multi-Halaman**: Aplikasi terstruktur dengan halaman-halaman terpisah untuk pengalaman pengguna yang lebih baik.

## Teknologi yang Digunakan

### Frontend
*   **React**: Pustaka JavaScript untuk membangun antarmuka pengguna.
*   **Vite**: Alat build frontend yang cepat.
*   **Tailwind CSS**: Kerangka kerja CSS untuk desain yang cepat dan responsif.
*   **React Router DOM**: Untuk manajemen routing di dalam aplikasi satu halaman (SPA).
*   **Lucide React**: Pustaka ikon.

### Backend
*   **Node.js**: Lingkungan runtime JavaScript.
*   **Express.js**: Kerangka kerja aplikasi web untuk Node.js.
*   **Supabase**: Backend-as-a-Service (BaaS) untuk database, autentikasi, dll.
*   **dotenv**: Untuk memuat variabel lingkungan dari file `.env`.
*   **cors**: Middleware Express.js untuk mengaktifkan Cross-Origin Resource Sharing.

## Persyaratan

*   Node.js (v14 atau lebih tinggi)
*   npm atau Yarn
*   Instansi Supabase yang berjalan (lokal atau berbasis cloud)

## Pengaturan Proyek

Ikuti langkah-langkah ini untuk menyiapkan proyek di lingkungan pengembangan lokal Anda.

### 1. Klon Repositori

```bash
git clone https://github.com/your-username/budget-tracker.git
cd budget-tracker
```

### 2. Pengaturan Backend

```bash
cd budget-tracker-backend
npm install
```

Buat file `.env` di direktori `budget-tracker-backend` dan tambahkan variabel lingkungan Supabase Anda:

```
SUPABASE_URL=YOUR_SUPABASE_URL
SUPA_BASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Ganti `YOUR_SUPABASE_URL` dan `YOUR_SUPABASE_ANON_KEY` dengan kredensial Supabase Anda yang sebenarnya. Jika Anda menjalankan Supabase secara lokal, URL-nya biasanya `http://localhost:54321`.

**Jalankan Backend:**
```bash
npm start
# Atau untuk mode pengembangan dengan hot-reloading:
npm run dev
```

### 3. Pengaturan Frontend

```bash
cd ../budget-tracker-frontend
npm install
```

Buat file `.env` di direktori `budget-tracker-frontend` dan tambahkan URL API backend Anda:

```
VITE_API_URL=http://localhost:5000/api/v1
```

Pastikan port (`5000`) dan versi API (`v1`) sesuai dengan konfigurasi backend Anda.

**Jalankan Frontend:**
```bash
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

## Skema Database

Berikut adalah skema SQL untuk tabel `transactions` dan `categories` di Supabase Anda:

```sql
-- Tabel untuk menyimpan transaksi
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa query
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_transactions_category ON transactions(category);

-- Tabel untuk menyimpan kategori custom (opsional)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert kategori default
INSERT INTO categories (name, type) VALUES
  ('Gaji', 'income'),
  ('Freelance', 'income'),
  ('Bisnis', 'income'),
  ('Investasi', 'income'),
  ('Makanan', 'expense'),
  ('Transportasi', 'expense'),
  ('Belanja', 'expense'),
  ('Tagihan', 'expense'),
  ('Hiburan', 'expense'),
  ('Kesehatan', 'expense'),
  ('Pendidikan', 'expense'),
  ('Lainnya', 'expense');
```

## Penggunaan

Setelah frontend dan backend berjalan:
1.  Buka browser Anda dan navigasikan ke URL frontend (misalnya, `http://localhost:5173`).
2.  Gunakan navigasi di bagian bawah untuk beralih antar halaman.
3.  Di halaman "Tambah", Anda dapat memasukkan detail transaksi baru.
4.  Lihat ringkasan keuangan Anda di halaman "Beranda" dan semua transaksi di halaman "Riwayat".
5.  Ganti tema di halaman "Pengaturan".

## Kontribusi

Kontribusi disambut baik! Silakan ikuti langkah-langkah berikut untuk berkontribusi:
1.  Fork repositori ini.
2.  Buat branch baru (`git checkout -b feature/nama-fitur-baru`).
3.  Lakukan perubahan Anda.
4.  Commit perubahan Anda (`git commit -m 'Tambahkan fitur baru'`).
5.  Push ke branch Anda (`git push origin feature/nama-fitur-baru`).
6.  Buka Pull Request.
