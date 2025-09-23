# Web-Dosen-FKP-Unud

Next Improvement (Bug Fix) :
1. Simplifikasi bidang ilmu
2. Tulisan "nip" harusnya "NIP" semua (kapital)
3. Saat menginput judul, dan menekan tombol "Dapatkan Rekomendasi", dosen yang telah dicentang pada Filter "Cari Berdasarkan Bidang" tidak tereset. Maksudnya, ketika user memasukkan judul, daftar nama dosen (box floating dibawah) tidak berubah. Rekomendasi teratas biarkan apa adanya
4. Improvisasi dan turunan bidang ilmu yang ada dari script.js
const expertiseKeywords = {
        "Dinamika Populasi Ikan": ["populasi", "ikan", "dinamika", "stok", "kelimpahan", "pemodelan"],
        "Avertebrata Air": ["avertebrata", "teripang", "kerang", "udang", "kepiting"],
        "Akuakultur": ["akuakultur", "budidaya", "pakan", "benih", "tambak"],
        "Mikrobiologi Akuatik": ["mikrobiologi", "bakteri", "plankton", "probiotik"],
        "Tumbuhan Air": ["tumbuhan air", "fitoremediasi", "algae", "rumput laut", "makrofita"],
        "Teknik Pantai": ["pantai", "teknik", "erosi", "sedimen", "gelombang", "abrasi"],
        "Parasit & Penyakit Ikan": ["parasit", "penyakit", "kesehatan", "infeksi", "patogen", "imun"],
        "Ekologi Laut": ["ekologi", "habitat", "biodiversitas", "komunitas", "interaksi", "mangrove"],
        "Bioteknologi Kelautan": ["bioteknologi", "enzim", "bioaktif", "biomolekul", "genetika"],
        "Konservasi Perairan": ["konservasi", "perlindungan", "kawasan lindung", "spesies terancam"],
        "Akustik Kelautan": ["akustik", "sonar", "bunyi", "frekuensi", "pemetaan"],
        "Oseanografi": ["oseanografi", "arus", "suhu", "salinitas", "parameter fisika"]
    };
