// Data JSON untuk para dosen (diasumsikan dimuat dari file JSON)
const dataDosen = [
    // ... (konten dari blok JSON di atas) ...
];

// Generate data contoh tambahan untuk total 30 dosen
for (let i = 4; i < 30; i++) {
    const programs = ["Ilmu Kelautan", "Manajemen Sumberdaya Perairan", "Budidaya Perairan", "Teknologi Hasil Perikanan"];
    const expertise = ["Ekologi Laut", "Bioteknologi Kelautan", "Konservasi Perairan", "Dinamika Populasi Ikan", "Akustik Kelautan", "Oseanografi"];
    dataDosen.push({
        "nama": `Dr. Dosen Contoh ${i+1}, S.Pi., M.Si.`,
        "jabatan": "Dosen Tetap",
        "nuptk": `${10000000 + i}`,
        "bidang_keahlian": `${expertise[i % expertise.length]}`,
        "pendidikan": { "s1": "Ilmu Kelautan - Univ. Terkemuka", "s2": "Marine Science - Univ. Terkemuka", "s3": "Ilmu Perikanan - Univ. Terkemuka" },
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

const dosenPerPage = 14;
let currentPage = 1;
const totalPages = Math.ceil(dataDosen.length / dosenPerPage);

// Fungsi untuk membuat kartu HTML untuk setiap dosen
function createDosenCard(dosen) {
    return `
        <div class="dosen-card">
            <div class="card-body">
                <div class="card-intro">
                    <div class="photo-container">
                        <img src="${dosen.foto}" alt="Foto ${dosen.nama}" class="dosen-photo">
                    </div>
                    <div class="intro-text">
                        <h2>${dosen.nama}</h2>
                        <p class="jabatan-text">${dosen.jabatan} - ${dosen.program_studi}</p>
                    </div>
                </div>

                <div class="profile-details">
                    <div class="info-item">
                        <span class="info-label" data-i18n="nuptk">NUPTK:</span>
                        <span class="info-value">${dosen.nuptk}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label" data-i18n="expertise">Bidang Keahlian:</span>
                        <span class="info-value">${dosen.bidang_keahlian}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label" data-i18n="education">Pendidikan:</span>
                        <div class="info-value">
                            <div class="education-item">S1: ${dosen.pendidikan.s1}</div>
                            <div class="education-item">S2: ${dosen.pendidikan.s2}</div>
                            <div class="education-item">S3: ${dosen.pendidikan.s3}</div>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label" data-i18n="email">E-mail:</span>
                        <span class="info-value">
                            <a href="mailto:${dosen.email}">${dosen.email}</a>
                        </span>
                    </div>
                </div>

                <div class="links-container">
                    ${dosen.links.map(link => 
                        `<a href="${link.url}" class="custom-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas ${link.icon}"></i>
                            <span>${link.nama}</span>
                        </a>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk menampilkan dosen pada halaman tertentu
function showDosenPage(page) {
    const container = document.getElementById('dosen-container');
    container.innerHTML = '';
    const startIndex = (page - 1) * dosenPerPage;
    const endIndex = Math.min(startIndex + dosenPerPage, dataDosen.length);
    for (let i = startIndex; i < endIndex; i++) {
        container.innerHTML += createDosenCard(dataDosen[i]);
    }
    updatePaginationButtons(page);
    applyCurrentLanguage(); // Terapkan ulang bahasa setelah render
}

// Fungsi untuk membuat tombol-tombol paginasi
function createPaginationButtons() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    // Tombol "Sebelumnya"
    const prevButton = document.createElement('button');
    prevButton.className = 'page-btn';
    prevButton.innerHTML = '&laquo;';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showDosenPage(currentPage);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Tombol nomor halaman
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = 'page-btn';
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            showDosenPage(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Tombol "Selanjutnya"
    const nextButton = document.createElement('button');
    nextButton.className = 'page-btn';
    nextButton.innerHTML = '&raquo;';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showDosenPage(currentPage);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Fungsi untuk memperbarui status aktif tombol paginasi
function updatePaginationButtons(activePage) {
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent == activePage) {
            button.classList.add('active');
        }
    });
}

// Data terjemahan untuk fungsionalitas bahasa
const translations = {
    'id': { 'title': 'Fakultas Kelautan dan Perikanan', 'subtitle': 'Dosen Pengajar Berpengalaman dan Profesional', 'position': 'Jabatan:', 'nuptk': 'NUPTK:', 'expertise': 'Bidang Keahlian:', 'education': 'Pendidikan:', 'email': 'E-mail:', 'studyProgram': 'Program Studi:', 'photoNote': '*Foto dapat diganti', 'footer': '© 2023 Fakultas Kelautan dan Perikanan. Hak Cipta Dilindungi.' },
    'en': { 'title': 'Faculty of Marine and Fisheries', 'subtitle': 'Experienced and Professional Teaching Staff', 'position': 'Position:', 'nuptk': 'NUPTK:', 'expertise': 'Field of Expertise:', 'education': 'Education:', 'email': 'Email:', 'studyProgram': 'Study Program:', 'photoNote': '*Photo can be replaced', 'footer': '© 2023 Faculty of Marine and Fisheries. All rights reserved.' }
};
let currentLang = 'id';

// Fungsi untuk menerapkan terjemahan
function applyLanguage(lang) {
    currentLang = lang;
    const translation = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });
}

function applyCurrentLanguage() {
    applyLanguage(currentLang);
}

// Fungsi untuk mengatur event listener tombol bahasa
function setupLanguageToggle() {
    const idLangBtn = document.getElementById('id-lang');
    const enLangBtn = document.getElementById('en-lang');
    idLangBtn.addEventListener('click', () => {
        idLangBtn.classList.add('active');
        enLangBtn.classList.remove('active');
        applyLanguage('id');
    });
    enLangBtn.addEventListener('click', () => {
        enLangBtn.classList.add('active');
        idLangBtn.classList.remove('active');
        applyLanguage('en');
    });
}

// Inisialisasi halaman saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    showDosenPage(currentPage);
    createPaginationButtons();
    setupLanguageToggle();
});