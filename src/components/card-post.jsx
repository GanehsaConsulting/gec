import Image from "next/image"
import Link from "next/link"

export const CardPost = () => {
    const data = [
        {
            "id": "4",
            "status": "published",
            "highlight": true,
            "published": false,
            "category": "Perizinan",
            "title": "NIB dan Izin Berusaha: Panduan Lengkap OSS 2025",
            "content": "<h2>Apa itu NIB (Nomor Induk Berusaha)?</h2><p>NIB adalah identitas tunggal untuk pelaku usaha yang diterbitkan oleh Lembaga OSS setelah Pelaku Usaha melakukan pendaftaran. NIB sekaligus berfungsi sebagai:</p><ul><li>Tanda Daftar Perusahaan (TDP)</li><li>Angka Pengenal Importir (API)</li><li>Akses kepabeanan untuk Eksportir</li></ul><h3>Jenis-jenis Izin Berusaha</h3><h4>Berdasarkan Risiko:</h4><ol><li><strong>Risiko Rendah:</strong> Tidak memerlukan izin, cukup NIB</li><li><strong>Risiko Menengah Rendah:</strong> Perlu izin sektor tertentu</li><li><strong>Risiko Menengah Tinggi:</strong> Perlu izin dan sertifikat standar</li><li><strong>Risiko Tinggi:</strong> Perlu izin lengkap dan pemeriksaan</li></ol><h3>Cara Mengurus NIB melalui OSS</h3><ol><li><strong>Registrasi Akun:</strong> Daftar di portal OSS.go.id</li><li><strong>Isi Data Perusahaan:</strong> Lengkapi informasi bisnis dan pemilik</li><li><strong>Upload Dokumen:</strong> KTP, NPWP, akta (jika PT/CV)</li><li><strong>Pilih KBLI:</strong> Tentukan klasifikasi bidang usaha</li><li><strong>Submit Permohonan:</strong> Sistem akan memproses otomatis</li><li><strong>Download NIB:</strong> NIB akan terbit dalam hitungan menit</li></ol><h3>Dokumen yang Diperlukan</h3><h4>Untuk Perorangan:</h4><ul><li>KTP yang masih berlaku</li><li>NPWP (jika ada)</li><li>Surat keterangan domisili usaha</li></ul><h4>Untuk Badan Usaha:</h4><ul><li>Akta pendirian dan perubahannya</li><li>SK pengesahan dari Kemenkumham</li><li>KTP dan NPWP pengurus</li><li>Surat keterangan domisili perusahaan</li></ul><h3>Biaya dan Waktu Pengurusan</h3><p><strong>Biaya:</strong> GRATIS (tidak ada biaya resmi)<br><strong>Waktu:</strong> NIB terbit langsung, izin sektoral bervariasi 1-30 hari kerja</p>",
            "excerpt": "Panduan lengkap mengurus NIB dan izin berusaha melalui sistem OSS terbaru. Dari syarat dokumen hingga tips agar permohonan tidak ditolak.",
            "coverImage": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
            "createdAt": "27 Mei 2025",
            "updatedAt": "27 Mei 2025",
            "publishedAt": "27 Mei 2025",
            "date": "27 Mei 2025",
            "tags": [
                "perizinan",
                "nib",
                "oss",
                "izin-usaha",
                "kemenkumham"
            ],
            "categories": "Perizinan",
            "view": 0,
            "slug": "nib-dan-izin-berusaha-panduan-lengkap-oss-2025"
        },
        {
            "id": "3",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "Website Development",
            "title": "Membangun Website E-commerce dengan Framework Modern",
            "content": "<h2>Mengapa E-commerce Penting untuk Bisnis?</h2><p>Di era digital ini, memiliki website e-commerce bukan lagi pilihan melainkan kebutuhan. Website e-commerce memungkinkan bisnis menjangkau pasar yang lebih luas dan beroperasi 24/7.</p><h3>Framework Populer untuk E-commerce</h3><h4>1. Next.js + Shopify</h4><ul><li>Performance tinggi dengan SSR</li><li>SEO-friendly</li><li>Integrasi mudah dengan Shopify API</li><li>Scalable dan maintainable</li></ul><h4>2. WordPress + WooCommerce</h4><ul><li>User-friendly untuk non-developer</li><li>Plugin ecosystem yang kaya</li><li>Biaya pengembangan relatif murah</li><li>Template siap pakai tersedia banyak</li></ul><h4>3. Laravel + Custom Solution</h4><ul><li>Fleksibilitas tinggi</li><li>Keamanan terjamin</li><li>Dapat disesuaikan dengan kebutuhan spesifik</li><li>Performa optimal</li></ul><h3>Fitur Wajib Website E-commerce</h3><ol><li><strong>Katalog Produk:</strong> Tampilan produk yang menarik dengan foto berkualitas</li><li><strong>Shopping Cart:</strong> Keranjang belanja yang mudah digunakan</li><li><strong>Payment Gateway:</strong> Integrasi dengan berbagai metode pembayaran</li><li><strong>User Management:</strong> Sistem registrasi dan login pelanggan</li><li><strong>Order Management:</strong> Sistem pengelolaan pesanan</li><li><strong>Responsive Design:</strong> Tampilan optimal di semua device</li></ol><h3>Tips Optimasi Performance</h3><p>Untuk memastikan website e-commerce berjalan optimal:</p><ul><li>Gunakan CDN untuk loading image yang cepat</li><li>Implementasi lazy loading</li><li>Optimasi database queries</li><li>Enable caching mechanism</li><li>Compress assets (CSS, JS, images)</li></ul>",
            "excerpt": "Pelajari cara membangun website e-commerce modern menggunakan framework terkini. Dari pemilihan teknologi hingga optimasi performance untuk user experience terbaik.",
            "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
            "createdAt": "27 Mei 2025",
            "updatedAt": "27 Mei 2025",
            "publishedAt": "27 Mei 2025",
            "date": "27 Mei 2025",
            "tags": [
                "web-development",
                "ecommerce",
                "nextjs",
                "wordpress",
                "laravel"
            ],
            "categories": "Website Development",
            "view": 0,
            "slug": "membangun-website-e-commerce-dengan-framework-modern"
        },
        {
            "id": "2",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "Legalitas",
            "title": "Cara Mendirikan PT: Syarat, Prosedur, dan Biaya Terbaru",
            "content": "<h2>Pengertian Perseroan Terbatas (PT)</h2><p>Perseroan Terbatas (PT) adalah badan hukum yang modalnya terdiri dari saham-saham dan pemegang sahamnya memiliki tanggung jawab terbatas sebesar modal yang disetor.</p><h3>Syarat Mendirikan PT</h3><ul><li>Minimal 2 orang pendiri (bisa WNI atau WNA)</li><li>Modal dasar minimal Rp 50.000.000</li><li>Modal disetor minimal 25% dari modal dasar</li><li>Akta pendirian dari notaris</li><li>Domisili perusahaan yang jelas</li></ul><h3>Prosedur Pendirian PT</h3><ol><li><strong>Reservasi Nama:</strong> Ajukan nama PT melalui sistem AHU Online</li><li><strong>Pembuatan Akta:</strong> Tandatangani akta pendirian di hadapan notaris</li><li><strong>Pengesahan:</strong> Ajukan pengesahan ke Kemenkumham</li><li><strong>Pendaftaran Pajak:</strong> Daftar NPWP dan PKP jika diperlukan</li><li><strong>Izin Usaha:</strong> Urus NIB melalui OSS</li></ol><h3>Biaya Pendirian PT</h3><p>Estimasi biaya total pendirian PT:</p><ul><li>PNBP Kemenkumham: Rp 1.500.000</li><li>Jasa notaris: Rp 5.000.000 - Rp 15.000.000</li><li>Biaya lain-lain: Rp 1.000.000</li></ul><p><strong>Total estimasi: Rp 7.500.000 - Rp 17.500.000</strong></p>",
            "excerpt": "Panduan step-by-step mendirikan PT mulai dari syarat, prosedur pengurusan, hingga estimasi biaya. Lengkap dengan tips memilih notaris terpercaya.",
            "coverImage": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
            "createdAt": "27 Mei 2025",
            "updatedAt": "27 Mei 2025",
            "publishedAt": "27 Mei 2025",
            "date": "27 Mei 2025",
            "tags": [
                "legalitas",
                "pt",
                "badan-hukum",
                "notaris",
                "kemenkumham"
            ],
            "categories": "Legalitas",
            "view": 0,
            "slug": "cara-mendirikan-pt-syarat-prosedur-dan-biaya-terbaru"
        },
        {
            "id": "1",
            "status": "published",
            "highlight": true,
            "published": false,
            "category": "Pajak",
            "title": "Panduan Lengkap Pajak Penghasilan untuk UMKM",
            "content": "<h2>Pengertian Pajak Penghasilan</h2><p>Pajak Penghasilan (PPh) adalah pajak yang dikenakan atas penghasilan yang diterima atau diperoleh Wajib Pajak. Bagi pelaku UMKM, memahami PPh sangat penting untuk kepatuhan perpajakan.</p><h3>Jenis-jenis PPh untuk UMKM</h3><ul><li><strong>PPh Pasal 21:</strong> Pajak atas penghasilan berupa gaji, upah, honorarium</li><li><strong>PPh Pasal 23:</strong> Pajak atas penghasilan dari modal, penyerahan jasa</li><li><strong>PPh Final UMKM:</strong> Tarif 0.5% dari omzet bruto</li></ul><h3>Cara Menghitung PPh UMKM</h3><p>Untuk UMKM dengan omzet di bawah Rp 4.8 miliar per tahun, dapat menggunakan skema PPh Final dengan tarif 0.5% dari omzet bruto bulanan.</p><p><strong>Contoh Perhitungan:</strong></p><p>Omzet bulanan: Rp 50.000.000<br>PPh Final = 0.5% × Rp 50.000.000 = Rp 250.000</p><h3>Tips Pelaporan Pajak</h3><ol><li>Catat semua transaksi dengan rapi</li><li>Simpan bukti pembayaran dan nota</li><li>Laporkan pajak tepat waktu</li><li>Manfaatkan aplikasi pajak online</li></ol>",
            "excerpt": "Pelajari cara menghitung dan melaporkan Pajak Penghasilan untuk UMKM dengan tarif 0.5%. Panduan lengkap dengan contoh perhitungan dan tips pelaporan.",
            "coverImage": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
            "createdAt": "27 Mei 2025",
            "updatedAt": "27 Mei 2025",
            "publishedAt": "27 Mei 2025",
            "date": "27 Mei 2025",
            "tags": [
                "pajak",
                "umkm",
                "pph",
                "pelaporan",
                "bisnis"
            ],
            "categories": "Pajak",
            "view": 0,
            "slug": "panduan-lengkap-pajak-penghasilan-untuk-umkm"
        },
        {
            "id": "5",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "HAKI",
            "title": "Cara Daftar Merek Dagang dan Hak Cipta Online",
            "content": "<h2>Pentingnya Melindungi Kekayaan Intelektual</h2><p>Hak Kekayaan Intelektual (HAKI) adalah hak yang timbul dari hasil olah pikir manusia yang menghasilkan suatu produk atau proses yang berguna untuk manusia. Melindungi HAKI sangat penting untuk menjaga aset bisnis Anda.</p><h3>Jenis-jenis HAKI</h3><h4>1. Merek Dagang</h4><p>Tanda yang dapat dibedakan berupa gambar, nama, kata, huruf-huruf, angka-angka, susunan warna, atau kombinasi dari unsur-unsur tersebut yang memiliki daya pembeda dan digunakan dalam kegiatan perdagangan barang atau jasa.</p><h4>2. Hak Cipta</h4><p>Hak eksklusif pencipta yang timbul secara otomatis berdasarkan prinsip deklaratif setelah suatu ciptaan diwujudkan dalam bentuk nyata tanpa mengurangi pembatasan sesuai dengan ketentuan peraturan perundang-undangan.</p><h3>Cara Mendaftar Merek Dagang</h3><ol><li><strong>Persiapan Dokumen:</strong><ul><li>Formulir permohonan (tersedia online)</li><li>Contoh merek (logo/tulisan) format JPEG</li><li>Daftar barang/jasa yang akan dilindungi</li><li>Surat kuasa (jika diwakilkan)</li><li>KTP pemohon</li></ul></li><li><strong>Penelusuran Merek:</strong> Cek kesamaan dengan merek terdaftar di database DJKI</li><li><strong>Pengajuan Online:</strong> Submit melalui portal merek.dgip.go.id</li><li><strong>Pembayaran Biaya:</strong> Bayar PNBP sesuai ketentuan</li><li><strong>Pemeriksaan Substantif:</strong> DJKI akan memeriksa kelayakan merek</li><li><strong>Pengumuman:</strong> Merek diumumkan dalam Berita Resmi Merek</li><li><strong>Penerbitan Sertifikat:</strong> Jika tidak ada sanggahan</li></ol><h3>Biaya Pendaftaran HAKI</h3><table><tr><th>Jenis HAKI</th><th>Biaya PNBP</th><th>Masa Berlaku</th></tr><tr><td>Merek Dagang (UMKM)</td><td>Rp 500.000/kelas</td><td>10 tahun</td></tr><tr><td>Merek Dagang (Umum)</td><td>Rp 1.800.000/kelas</td><td>10 tahun</td></tr><tr><td>Hak Cipta</td><td>Rp 200.000</td><td>Seumur hidup + 70 tahun</td></tr></table><h3>Tips Agar Pendaftaran Berhasil</h3><ul><li>Pastikan merek memiliki daya pembeda yang kuat</li><li>Hindari merek yang bersifat deskriptif</li><li>Lakukan penelusuran merek secara menyeluruh</li><li>Pilih kelas barang/jasa dengan tepat</li><li>Gunakan jasa konsultan HAKI jika diperlukan</li></ul>",
            "excerpt": "Panduan step-by-step mendaftarkan merek dagang dan hak cipta secara online. Lengkap dengan biaya, syarat, dan tips agar pendaftaran tidak ditolak.",
            "coverImage": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
            "createdAt": "27 Mei 2025",
            "updatedAt": "27 Mei 2025",
            "publishedAt": "27 Mei 2025",
            "date": "27 Mei 2025",
            "tags": [
                "haki",
                "merek-dagang",
                "hak-cipta",
                "djki",
                "kekayaan-intelektual"
            ],
            "categories": "HAKI",
            "view": 0,
            "slug": "cara-daftar-merek-dagang-dan-hak-cipta-online"
        },
        {
            "id": "8",
            "status": "published",
            "highlight": true,
            "published": false,
            "category": "Perizinan",
            "title": "Panduan Lengkap Mengurus Izin Usaha Mikro Kecil (IUMK)",
            "content": "<h1>Panduan Lengkap Mengurus Izin Usaha Mikro Kecil (IUMK)</h1><p>Izin Usaha Mikro Kecil (IUMK) adalah perizinan yang wajib dimiliki oleh setiap pelaku usaha mikro dan kecil di Indonesia. Dengan adanya IUMK, usaha Anda akan memiliki legalitas yang kuat dan dapat mengakses berbagai program pemerintah.</p><h2>Syarat-syarat Mengurus IUMK</h2><ul><li>KTP pemilik usaha</li><li>Pas foto 3x4 sebanyak 2 lembar</li><li>Surat keterangan domisili usaha</li><li>Surat pernyataan tidak mengganggu lingkungan</li></ul><h2>Langkah-langkah Pengurusan</h2><ol><li>Datang ke kantor kecamatan setempat</li><li>Mengisi formulir permohonan IUMK</li><li>Menyerahkan berkas persyaratan</li><li>Menunggu proses verifikasi selama 3-7 hari kerja</li><li>Mengambil sertifikat IUMK yang telah jadi</li></ol><p>Dengan mengikuti panduan ini, proses pengurusan IUMK Anda akan lebih mudah dan cepat.</p>",
            "excerpt": "Pelajari cara mudah mengurus Izin Usaha Mikro Kecil (IUMK) dengan panduan lengkap ini. Syarat, prosedur, dan tips praktis untuk legalitas usaha Anda.",
            "coverImage": "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&h=800&fit=crop",
            "createdAt": "15 Desember 2024",
            "updatedAt": "15 Desember 2024",
            "publishedAt": "15 Desember 2024",
            "date": "15 Desember 2024",
            "tags": [
                "perizinan",
                "usaha",
                "IUMK",
                "legalitas",
                "mikro kecil"
            ],
            "categories": "Perizinan",
            "view": 0,
            "slug": "panduan-lengkap-mengurus-izin-usaha-mikro-kecil-iumk"
        },
        {
            "id": "9",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "HAKI",
            "title": "Cara Mendaftarkan Merek Dagang untuk Melindungi Brand Anda",
            "content": "<h1>Cara Mendaftarkan Merek Dagang untuk Melindungi Brand Anda</h1><p>Merek dagang adalah aset berharga bagi setiap bisnis. Mendaftarkan merek dagang memberikan perlindungan hukum yang kuat terhadap penyalahgunaan dan pemalsuan brand Anda.</p><h2>Mengapa Perlu Mendaftarkan Merek Dagang?</h2><ul><li>Perlindungan hukum selama 10 tahun</li><li>Mencegah pihak lain menggunakan merek serupa</li><li>Meningkatkan nilai aset perusahaan</li><li>Memberikan hak eksklusif penggunaan merek</li></ul><h2>Syarat Pendaftaran Merek</h2><ul><li>Merek harus memiliki daya pembeda</li><li>Tidak bertentangan dengan moral dan ketertiban umum</li><li>Tidak sama atau mirip dengan merek terdaftar</li><li>Bukan merupakan nama generik produk</li></ul><h2>Proses Pendaftaran</h2><ol><li>Penelusuran merek di database DJKI</li><li>Mengisi formulir permohonan online</li><li>Upload dokumen pendukung</li><li>Pembayaran biaya pendaftaran</li><li>Proses pemeriksaan substantif</li><li>Pengumuman dalam berita resmi</li><li>Penerbitan sertifikat merek</li></ol><p>Investasi untuk melindungi merek dagang akan memberikan keuntungan jangka panjang bagi bisnis Anda.</p>",
            "excerpt": "Panduan lengkap mendaftarkan merek dagang di Indonesia. Syarat, prosedur, dan manfaat penting untuk melindungi brand bisnis Anda.",
            "coverImage": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop",
            "createdAt": "14 Desember 2024",
            "updatedAt": "14 Desember 2024",
            "publishedAt": "14 Desember 2024",
            "date": "14 Desember 2024",
            "tags": [
                "HAKI",
                "merek dagang",
                "brand",
                "perlindungan",
                "DJKI"
            ],
            "categories": "HAKI",
            "view": 0,
            "slug": "cara-mendaftarkan-merek-dagang-untuk-melindungi-brand-anda"
        },
        {
            "id": "10",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "Yayasan",
            "title": "Langkah Mudah Mendirikan Yayasan untuk Kegiatan Sosial",
            "content": "<h1>Langkah Mudah Mendirikan Yayasan untuk Kegiatan Sosial</h1><p>Yayasan adalah badan hukum yang didirikan untuk menjalankan kegiatan sosial, keagamaan, dan kemanusiaan tanpa tujuan memperoleh keuntungan. Mendirikan yayasan memerlukan persiapan yang matang dan pemahaman yang baik tentang prosedurnya.</p><h2>Persyaratan Mendirikan Yayasan</h2><ul><li>Minimal 3 orang pendiri</li><li>Akta notaris pendirian yayasan</li><li>Anggaran Dasar dan Anggaran Rumah Tangga</li><li>Surat keterangan domisili</li><li>NPWP yayasan</li><li>Rekening bank atas nama yayasan</li></ul><h2>Struktur Organisasi Yayasan</h2><ul><li><strong>Pembina:</strong> Organ tertinggi yang memberikan arahan</li><li><strong>Pengurus:</strong> Menjalankan kegiatan operasional</li><li><strong>Pengawas:</strong> Mengawasi jalannya organisasi</li></ul><h2>Tahapan Pendirian</h2><ol><li>Rapat pendiri untuk menyusun AD/ART</li><li>Pembuatan akta notaris</li><li>Pengajuan pengesahan ke Kemenkumham</li><li>Pendaftaran NPWP</li><li>Pembukaan rekening bank</li><li>Pendaftaran domisili</li></ol><h2>Keuntungan Memiliki Yayasan</h2><ul><li>Status badan hukum yang sah</li><li>Dapat menerima donasi dan hibah</li><li>Kemudahan akses program pemerintah</li><li>Kredibilitas yang tinggi di masyarakat</li></ul><p>Dengan mengikuti langkah-langkah ini, yayasan Anda akan memiliki fondasi hukum yang kuat untuk menjalankan misi sosial.</p>",
            "excerpt": "Pelajari cara mendirikan yayasan untuk kegiatan sosial. Syarat, struktur organisasi, dan prosedur lengkap untuk memulai organisasi nirlaba Anda.",
            "coverImage": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop",
            "createdAt": "13 Desember 2024",
            "updatedAt": "13 Desember 2024",
            "publishedAt": "13 Desember 2024",
            "date": "13 Desember 2024",
            "tags": [
                "yayasan",
                "organisasi nirlaba",
                "badan hukum",
                "sosial",
                "kemenkumham"
            ],
            "categories": "Yayasan",
            "view": 0,
            "slug": "langkah-mudah-mendirikan-yayasan-untuk-kegiatan-sosial"
        },
        {
            "id": "11",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "Koperasi",
            "title": "Panduan Praktis Mendirikan Koperasi Simpan Pinjam",
            "content": "<h1>Panduan Praktis Mendirikan Koperasi Simpan Pinjam</h1><p>Koperasi simpan pinjam merupakan badan usaha yang bergerak di bidang jasa keuangan dengan prinsip gotong royong dan kekeluargaan. Mendirikan koperasi simpan pinjam dapat menjadi solusi untuk memenuhi kebutuhan finansial anggota dengan bunga yang lebih rendah.</p><h2>Syarat Pendirian Koperasi</h2><ul><li>Minimal 20 orang calon anggota</li><li>Akta pendirian dari notaris</li><li>Anggaran Dasar dan Anggaran Rumah Tangga</li><li>Berita acara pembentukan koperasi</li><li>Surat keterangan domisili</li><li>Daftar hadir rapat pembentukan</li></ul><h2>Struktur Organisasi Koperasi</h2><ul><li><strong>Rapat Anggota:</strong> Pemegang kekuasaan tertinggi</li><li><strong>Pengurus:</strong> Menjalankan operasional harian</li><li><strong>Pengawas:</strong> Mengawasi kinerja pengurus</li><li><strong>Manager:</strong> Mengelola operasional (jika diperlukan)</li></ul><h2>Langkah-langkah Pendirian</h2><ol><li>Rapat pembentukan dengan calon anggota</li><li>Penyusunan AD/ART koperasi</li><li>Pemilihan pengurus dan pengawas</li><li>Pembuatan akta notaris</li><li>Pengajuan badan hukum ke Kemenkop UKM</li><li>Pendaftaran NPWP</li><li>Pembukaan rekening bank</li><li>Pengurusan izin operasional</li></ol><h2>Keuntungan Koperasi Simpan Pinjam</h2><ul><li>Bunga pinjaman rendah untuk anggota</li><li>Pembagian Sisa Hasil Usaha (SHU)</li><li>Akses modal usaha yang mudah</li><li>Membangun kemandirian ekonomi bersama</li></ul><p>Koperasi yang dikelola dengan baik akan memberikan manfaat berkelanjutan bagi semua anggotanya.</p>",
            "excerpt": "Cara mudah mendirikan koperasi simpan pinjam. Syarat, struktur organisasi, dan langkah praktis untuk memulai usaha koperasi yang menguntungkan.",
            "coverImage": "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=800&fit=crop",
            "createdAt": "12 Desember 2024",
            "updatedAt": "12 Desember 2024",
            "publishedAt": "12 Desember 2024",
            "date": "12 Desember 2024",
            "tags": [
                "koperasi",
                "simpan pinjam",
                "badan hukum",
                "kemenkop",
                "finansial"
            ],
            "categories": "Koperasi",
            "view": 0,
            "slug": "panduan-praktis-mendirikan-koperasi-simpan-pinjam"
        },
        {
            "id": "12",
            "status": "published",
            "highlight": false,
            "published": false,
            "category": "Pajak",
            "title": "Tips Efisien Mengelola Pajak untuk Usaha Kecil dan Menengah",
            "content": "<h1>Tips Efisien Mengelola Pajak untuk Usaha Kecil dan Menengah</h1><p>Pengelolaan pajak yang efisien adalah kunci kesuksesan bisnis UKM. Dengan pemahaman yang baik tentang kewajiban perpajakan, Anda dapat mengoptimalkan beban pajak sambil tetap mematuhi peraturan yang berlaku.</p><h2>Jenis Pajak untuk UKM</h2><ul><li><strong>PPh Final 0.5%:</strong> Untuk omzet di bawah 4.8 miliar per tahun</li><li><strong>PPN:</strong> Untuk PKP dengan omzet di atas 4.8 miliar</li><li><strong>PPh Pasal 21:</strong> Pajak penghasilan karyawan</li><li><strong>PPh Pasal 23:</strong> Pemotongan pajak atas jasa tertentu</li></ul><h2>Strategi Pengelolaan Pajak</h2><h3>1. Pencatatan yang Rapi</h3><ul><li>Catat semua transaksi harian</li><li>Simpan bukti transaksi dengan baik</li><li>Gunakan aplikasi akuntansi sederhana</li><li>Pisahkan rekening bisnis dan pribadi</li></ul><h3>2. Manfaatkan Insentif Pajak</h3><ul><li>PPh final 0.5% untuk UKM</li><li>Fasilitas tax holiday untuk investasi</li><li>Pengurangan tarif PPh badan</li><li>Kemudahan pembayaran dan pelaporan</li></ul><h3>3. Perencanaan Pajak yang Baik</h3><ul><li>Hitung estimasi pajak bulanan</li><li>Sisihkan dana untuk pembayaran pajak</li><li>Manfaatkan periode pelaporan yang tepat</li><li>Konsultasi dengan konsultan pajak</li></ul><h2>Tools dan Aplikasi Membantu</h2><ul><li>Aplikasi OnlinePajak</li><li>E-Faktur untuk PPN</li><li>E-SPT untuk pelaporan</li><li>Software akuntansi terintegrasi</li></ul><h2>Tips Menghindari Masalah Pajak</h2><ol><li>Selalu bayar dan lapor tepat waktu</li><li>Jaga kelengkapan dokumen</li><li>Update peraturan pajak terbaru</li><li>Manfaatkan layanan konsultasi gratis DJP</li></ol><p>Dengan menerapkan tips ini, pengelolaan pajak UKM Anda akan lebih efisien dan terhindar dari masalah hukum.</p>",
            "excerpt": "Panduan lengkap mengelola pajak untuk UKM. Strategi efektif, tips praktis, dan tools yang membantu mengoptimalkan kewajiban perpajakan bisnis Anda.",
            "coverImage": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop",
            "createdAt": "11 Desember 2024",
            "updatedAt": "11 Desember 2024",
            "publishedAt": "11 Desember 2024",
            "date": "11 Desember 2024",
            "tags": [
                "pajak",
                "UKM",
                "PPh final",
                "perpajakan",
                "DJP"
            ],
            "categories": "Pajak",
            "view": 0,
            "slug": "tips-efisien-mengelola-pajak-untuk-usaha-kecil-dan-menengah"
        }
    ]
    return (
        <>
            <div className="carousel w-full gap-3">
                {data.map((el, idx) => (
                    <Link
                        key={idx}
                        href=""
                        className={`${idx === 0 && "ml-120"} ${idx === data.length - 1 && "mr-10"}`}
                    >
                        <div className="relative w-100 min-w-100 rounded-main overflow-hidden group">
                            <Image
                                width={500}
                                height={500}
                                src={el.coverImage}
                                className={`w-100 min-w-100 object-cover rounded-main group-hover:scale-105 duration-300`}
                                alt=""
                            />

                            <div className="absolute top-2 left-2 group-hover:-translate-y-100 translate-y-0 duration-500">
                                <p className="px-2 py-1 text-xs rounded-full bg-lightColor/70 dark:bg-darkColor/70 lightColor font-semibold backdrop-blur-lg">
                                    {el.categories}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 space-y-2">

                            <h1 className="text-lg font-medium line-clamp-2">
                                {el.title}
                            </h1>

                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                {el.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}