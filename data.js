// Data JSON untuk para dosen
const dataDosen = [
    {
        "nama": "Andy Rasyadi, S.Pi., M.Si.",
        "jabatan": "Dosen Asisten Ahli",
        "nuptk": "87654321",
        "bidang_keahlian": "Dinamika Populasi Ikan, Avertebrata, Daya Dukung Perairan",
        "pendidikan": {
            "s1": "Budidaya Perairan - Universitas Muhammadiyah Makassar",
            "s2": "Pengelolaan Sumberdaya Perairan - IPB University",
            "s3": "-"
        },
        "email": "andy.rasyadi@unud.ac.id",
        "program_studi": "Manajemen Sumberdaya Perairan",
        "foto": "https://fkp.unud.ac.id/protected/storage/file_summernote/5af7b98129e56dfc29f912f0abde6d8e.jpg",
        "links": [
            {"nama": "Publikasi", "url": "#", "icon": "fa-file-alt"},
            {"nama": "ResearchGate", "url": "#", "icon": "fa-flask"},
            {"nama": "Google Scholar", "url": "#", "icon": "fa-graduation-cap"}
        ]
    },
    {
        "nama": "Prof. Dr. Ir. Bambang Ocean, M.Sc.",
        "jabatan": "Guru Besar",
        "nuptk": "12345678",
        "bidang_keahlian": "Dinamika Populasi Ikan",
        "pendidikan": {
            "s1": "Perikanan - IPB University",
            "s2": "Fisheries Science - University of Washington",
            "s3": "Ilmu Perikanan - IPB University"
        },
        "email": "bambang.ocean@unud.ac.id",
        "program_studi": "Manajemen Sumberdaya Perairan",
        "foto": "https://placehold.co/120x180/0a4a6f/white?text=Prof.+Bambang",
        "links": [
            {"nama": "Jurnal", "url": "#", "icon": "fa-book"},
            {"nama": "LinkedIn", "url": "#", "icon": "fa-brands fa-linkedin"},
            {"nama": "Sinta", "url": "#", "icon": "fa-star"}
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