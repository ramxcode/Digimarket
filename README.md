# DigiMarket

Marketplace produk digital berbasis ReactJS. Proyek ini dibuat sebagai bagian dari tugas UTS mata kuliah Pengembangan Aplikasi Web (PAW).

## Tentang Proyek

DigiMarket adalah simulasi marketplace untuk produk-produk digital seperti template website, UI kit, e-book, icon pack, template presentasi, template CV, dan ilustrasi digital. Seluruh fitur berjalan di sisi klien tanpa backend, database, atau payment gateway.

**Fitur yang tersedia:**
- Katalog produk dengan pencarian, filter kategori, dan sorting harga
- Halaman detail produk
- Keranjang belanja
- Wishlist
- Simulasi checkout
- Konfirmasi dan riwayat pesanan

## Teknologi

| Teknologi | Versi |
|-----------|-------|
| React | ^19.0.0 |
| React Router DOM | ^7.6.0 |
| Bootstrap | ^5.3.3 |
| Bootstrap Icons | ^1.13.1 |
| Vite | ^7.0.0 |

## Prasyarat

Pastikan kamu sudah menginstal:
- **Node.js** versi 18 atau lebih baru — [nodejs.org](https://nodejs.org)
- **npm** (sudah termasuk bersama Node.js)

Cek versi yang terpasang:

```bash
node -v
npm -v
```

## Cara Menjalankan Proyek

### 1. Clone atau ekstrak proyek

Jika menggunakan Git:
```bash
git clone <url-repositori>
cd digimarket
```

Jika menggunakan file ZIP, ekstrak dan masuk ke folder proyek:
```bash
cd "Project UTS"
```

### 2. Install dependensi

```bash
npm install
```

> Perintah ini akan mengunduh seluruh paket yang dibutuhkan ke folder `node_modules`. Proses ini hanya perlu dilakukan sekali, atau setiap kali `package.json` berubah.

### 3. Jalankan development server

```bash
npm run dev
```

Setelah berhasil, terminal akan menampilkan alamat lokal seperti:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Buka **http://localhost:5173** di browser untuk melihat aplikasi.

## Perintah Lain

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Menjalankan server development dengan hot-reload |
| `npm run build` | Membuat versi production di folder `dist/` |
| `npm run preview` | Menjalankan preview dari hasil build production |

### Build untuk production

```bash
npm run build
```

Hasil build tersimpan di folder `dist/`. Folder ini yang di-deploy ke hosting statis.

```bash
npm run preview
```

Gunakan perintah ini untuk melihat hasil build secara lokal sebelum deploy.

## Struktur Proyek

```
Project UTS/
├── public/
│   ├── favicon.svg          # Favicon website
│   └── images/              # Gambar produk dan banner
├── src/
│   ├── components/          # Komponen React yang dapat digunakan ulang
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── SearchFilter.jsx
│   ├── context/
│   │   └── ShopContext.jsx  # State global (keranjang, wishlist, pesanan)
│   ├── data/
│   │   └── products.json    # Data produk statis
│   ├── pages/               # Halaman-halaman aplikasi
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   ├── styles/
│   │   └── style.css        # Styling global
│   ├── App.jsx              # Root komponen & routing
│   └── main.jsx             # Entry point aplikasi
├── index.html
├── package.json
└── vite.config.js
```

## Catatan

- Seluruh data (keranjang, wishlist, riwayat pesanan) tersimpan di **localStorage** browser. Data akan tetap ada setelah halaman di-refresh, tetapi akan hilang jika cache browser dibersihkan.
- Checkout bersifat simulasi — tidak ada transaksi keuangan sungguhan.
- Aplikasi tidak memerlukan koneksi internet setelah dependensi terinstal.
