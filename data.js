// Data JSON untuk para dosen
const dataDosen = [
    {
        "nama": "Andy Rasyadi, S.Pi., M.Si.",
        "jabatan": "Dosen Asisten Ahli",
        "nuptk": "87654321",
        "bidang_keahlian": "Dinamika Populasi Ikan dan Avertebrata Air",
        "pendidikan": {
            "s1": "Budidaya Perairan - Univ. Muhammadiyah Makassar",
            "s2": "Pengelolaan Sumberdaya Perairan - IPB University",
            "s3": "-"
        },
        "email": "andy.rasyadi@unud.ac.id",
        "program_studi": "S1 Manajemen Sumberdaya Perairan",
        "foto": "https://fkp.unud.ac.id/protected/storage/file_summernote/5af7b98129e56dfc29f912f0abde6d8e.jpg",
        "links": [
            {"nama": "Scopus", "url": "#", "icon": "fa-file-alt"},
            {"nama": "SINTA", "url": "https://sinta.kemdiktisaintek.go.id/authors/profile/6968791", "icon": "fa-flask"},
            {"nama": "Google Scholar", "url": "https://scholar.google.com/citations?user=adxkaecAAAAJ&hl=en", "icon": "fa-graduation-cap"}
        ]
    },
    {
        "nama": "Dr. Pande Gde Sasmita Julyantoro, S.Si., M.Si.",
        "jabatan": "Lektor Kepala",
        "nuptk": "12345678",
        "bidang_keahlian": "Akuakultur & Mikrobiologi Akuatik",
        "pendidikan": {
            "s1": "Institut Teknologi Bandung",
            "s2": "Institut Teknologi Bandung",
            "s3": "Ghent University"
        },
        "email": "pande.sasmita@unud.ac.id",
        "program_studi": "S1 Akuakultur",
        "foto": "https://fkp.unud.ac.id/protected/storage/file_summernote/16adb31b6ebda70cf1344a04c484648b.jpg",
        "links": [
            {"nama": "Scopus", "url": "#", "icon": "fa-file-alt"},
            {"nama": "SINTA", "url": "https://sinta.kemdiktisaintek.go.id/authors/profile/5975626", "icon": "fa-flask"},
            {"nama": "Google Scholar", "url": "https://scholar.google.com/citations?user=iqkFmegAAAAJ&hl=en&oi=ao", "icon": "fa-graduation-cap"}
        ]
    },
    {
        "nama": "Dr. Coral Reef, S.Kel., M.Si.",
        "jabatan": "Dosen Tetap",
        "nuptk": "23456789",
        "bidang_keahlian": "Ekologi Terumbu Karang",
        "pendidikan": {
            "s1": "Ilmu Kelautan - Universitas Hasanuddin",
            "s2": "Marine Science - James Cook University",
            "s3": "Marine Biology - University of Queensland"
        },
        "email": "coral.reef@unud.ac.id",
        "program_studi": "Ilmu Kelautan",
        "foto": "https://placehold.co/120x180/34b4b4/white?text=Dr.+Coral",
        "links": [
            {"nama": "Publikasi", "url": "#", "icon": "fa-file-alt"},
            {"nama": "Website", "url": "#", "icon": "fa-globe"},
            {"nama": "ORCID", "url": "#", "icon": "fa-brands fa-orcid"}
        ]
    },
    {
        "nama": "Dr. Fishery Aqua, S.Pi., M.Si.",
        "jabatan": "Dosen Tetap",
        "nuptk": "34567890",
        "bidang_keahlian": "Budidaya Perairan",
        "pendidikan": {
            "s1": "Akuakultur - IPB University",
            "s2": "Aquaculture - Asian Institute of Technology",
            "s3": "Ilmu Perikanan - Universitas Brawijaya"
        },
        "email": "fishery.aqua@unud.ac.id",
        "program_studi": "Budidaya Perairan",
        "foto": "https://placehold.co/120x180/1b6f8c/white?text=Dr.+Fishery",
        "links": [
            {"nama": "ResearchGate", "url": "#", "icon": "fa-brands fa-researchgate"},
            {"nama": "Scopus", "url": "#", "icon": "fa-search"},
            {"nama": "Google Scholar", "url": "#", "icon": "fa-graduation-cap"}
        ]
    }
];

// Generate data untuk total 30 dosen
for (let i = 4; i < 30; i++) {
    const programs = ["Ilmu Kelautan", "Manajemen Sumberdaya Perairan", "Budidaya Perairan", "Teknologi Hasil Perikanan"];
    const expertise = ["Ekologi Laut", "Bioteknologi Kelautan", "Konservasi Perairan", "Dinamika Populasi Ikan", "Akustik Kelautan", "Oseanografi"];
    
    dataDosen.push({
        "nama": `Dr. Dosen Contoh ${i+1}, S.Pi., M.Si.`,
        "jabatan": "Dosen Tetap",
        "nuptk": `${10000000 + i}`,
        "bidang_keahlian": `${expertise[i % expertise.length]}`,
        "pendidikan": { 
            "s1": "Ilmu Kelautan - Univ. Terkemuka", 
            "s2": "Marine Science - Univ. Terkemuka", 
            "s3": "Ilmu Perikanan - Univ. Terkemuka" 
        },
        "email": `dosen.contoh.${i+1}@unud.ac.id`,
        "program_studi": programs[i % programs.length],
        "foto": `https://placehold.co/120x180/6c757d/white?text=Dosen+${i+1}`,
        "links": [
            {"nama": "Publikasi", "url": "#", "icon": "fa-file-alt"},
            {"nama": "Profil", "url": "#", "icon": "fa-user"},
            {"nama": "Kontak", "url": "#", "icon": "fa-envelope"}
        ]
    });
}

// Translation data
const translations = {
    'id': { 
        'title': 'Fakultas Kelautan dan Perikanan', 
        'subtitle': 'Dosen Pengajar Berpengalaman dan Profesional', 
        'position': 'Jabatan:', 
        'nuptk': 'NUPTK:', 
        'expertise': 'Bidang Keahlian:', 
        'education': 'Pendidikan:', 
        'email': 'E-mail:', 
        'studyProgram': 'Program Studi:', 
        'photoNote': '*Foto dapat diganti', 
        'footer': '© 2023 Fakultas Kelautan dan Perikanan. Hak Cipta Dilindungi.' 
    },
    'en': { 
        'title': 'Faculty of Marine and Fisheries', 
        'subtitle': 'Experienced and Professional Teaching Staff', 
        'position': 'Position:', 
        'nuptk': 'NUPTK:', 
        'expertise': 'Field of Expertise:', 
        'education': 'Education:', 
        'email': 'Email:', 
        'studyProgram': 'Study Program:', 
        'photoNote': '*Photo can be replaced', 
        'footer': '© 2023 Faculty of Marine and Fisheries. All rights reserved.' 
    }
};
