dataDosen.forEach(dosen => {
    // Memisahkan berdasarkan ' & ' atau ' dan ' lalu membersihkan spasi
    dosen.bidang_keahlian_list = dosen.bidang_keahlian.split(/ dan | & /).map(item => item.trim());
});

// Configuration
const dosenPerPage = 14;
let currentPage = 1;
let currentLang = 'id';
let filteredDosen = [...dataDosen];
let totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
let recommendedDosen = [];

// Tab management
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Filter system
function generateFilterOptions() {
    const filterOptionsContainer = document.getElementById('filter-options');
    const expertiseSet = new Set();
    
    // [FIX 2] Mengambil data dari bidang_keahlian_list yang sudah dipisah
    dataDosen.forEach(dosen => {
        dosen.bidang_keahlian_list.forEach(keahlian => {
            expertiseSet.add(keahlian);
        });
    });
    
    const expertiseList = Array.from(expertiseSet).sort();
    
    expertiseList.forEach(expertise => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.innerHTML = `
            <input type="checkbox" id="filter-${expertise}" value="${expertise}">
            <label for="filter-${expertise}">${expertise}</label>
        `;
        filterOptionsContainer.appendChild(option);
    });
    
    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    document.getElementById('reset-filter').addEventListener('click', resetFilters);
}

function applyFilters() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-option input:checked')).map(cb => cb.value);
    
    if (selectedFilters.length === 0) {
        filteredDosen = [...dataDosen];
    } else {
        // [FIX 2] Logika filter diubah untuk memeriksa setiap item di bidang_keahlian_list
        filteredDosen = dataDosen.filter(dosen => 
            dosen.bidang_keahlian_list.some(keahlian => selectedFilters.includes(keahlian))
        );
    }
    
    currentPage = 1;
    totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
    showDosenPage(currentPage);
    createPaginationButtons();
    updateFilterCount();
}

function resetFilters() {
    document.querySelectorAll('.filter-option input').forEach(checkbox => checkbox.checked = false);
    filteredDosen = [...dataDosen];
    currentPage = 1;
    totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
    showDosenPage(currentPage);
    createPaginationButtons();
    updateFilterCount();
}

function updateFilterCount() {
    document.getElementById('count').textContent = filteredDosen.length;
    const filterCountElement = document.getElementById('filter-count');
    if (filteredDosen.length === dataDosen.length) {
        filterCountElement.textContent = `Menampilkan semua ${filteredDosen.length} dosen`;
    } else {
        filterCountElement.textContent = `Menampilkan ${filteredDosen.length} dosen berdasarkan filter`;
    }
}

// Recommendation system
function setupRecommendationSystem() {
    document.getElementById('get-recommendation').addEventListener('click', getRecommendations);
}

function getRecommendations() {
    const inputText = document.getElementById('thesis-input').value.trim().toLowerCase();
    
    if (!inputText) {
        alert('Masukkan judul skripsi atau topik penelitian terlebih dahulu.');
        return;
    }
    
    // [FIX 3] Improvisasi dan penambahan kata kunci serta kategori baru
    const expertiseKeywords = {
        "Dinamika Populasi Ikan": ["panjang bobot", "faktor kondisi", "fulton", "populasi", "ikan", "dinamika", "stok", "kelimpahan", "analisis", "sumber daya", "evaluasi", "ikhtiologi", "taksonomi ikan", "biologi ikan"],
        "Avertebrata Air": ["avertebrata", "teripang", "kerang", "udang", "kepiting", "biota laut", "invertebrata"],
        "Akuakultur": ["akuakultur", "budidaya", "kolam", "terpal", "pakan", "benih", "tambak", "kualitas air", "hama", "nutrisi", "reproduksi"],
        "Mikrobiologi Akuatik": ["mikrobiologi", "bakteri", "plankton", "probiotik", "mikroba", "virus", "bioremediasi"],
        "Tumbuhan Air": ["tumbuhan air", "fitoremediasi", "algae", "rumput laut", "makrofita", "lamun", "mangrove", "vegetasi"],
        "Kualitas Air": ["suhu", "kekeruhan", "bau", "tss", "ph", "oksigen terlarut", "do", "co2", "amonia", "nitrit", "nitrat", "fosfat", "salinitas", "alkalinitas", "makrozoobentos", "indeks keanekaragaman"],
        "Teknik Pantai": ["pantai", "teknik", "erosi", "sedimen", "gelombang", "abrasi", "pesisir", "reklamasi", "infrastruktur"],
        "Parasit & Penyakit Ikan": ["parasit", "penyakit", "kesehatan", "infeksi", "patogen", "imun", "patologi", "diagnostik", "imunologi", "kesehatan ikan"],
        "Ekologi Laut": ["ekologi", "keanekaragaman", "habitat", "biodiversitas", "komunitas", "interaksi", "mangrove", "ekosistem", "rantai makanan", "konservasi", "terumbu karang"],
        "Bioteknologi Kelautan": ["bioteknologi", "probiotik", "enzim", "bioaktif", "biomolekul", "genetika"],
        "Konservasi Perairan": ["konservasi", "perlindungan", "kawasan lindung", "spesies terancam", "rehabilitasi", "manajemen"],
        "Akustik Kelautan": ["akustik", "sonar", "bunyi", "frekuensi", "pemetaan"],
        "Oseanografi": ["oseanografi", "arus", "suhu", "salinitas", "parameter fisika"],
        "Penginderaan Jauh & SIG": ["penginderaan jauh", "remote sensing", "sig", "gis", "pemetaan", "citra satelit", "spasial"],
        "Pencemaran Laut": ["pencemaran", "polusi", "mikroplastik", "logam berat", "limbah", "toksikologi"],
        "Biologi Molekuler Kelautan": ["molekuler", "genetika", "dna", "edna", "filogeni", "identifikasi"]
    };
    
    const scoredDosen = dataDosen.map(dosen => {
        let score = 0;
        const words = inputText.split(/\s+/);
        
        words.forEach(word => {
            if (word.length > 3) {
                dosen.bidang_keahlian_list.forEach(keahlian => {
                    if (keahlian.toLowerCase().includes(word)) score += 15;
                    // Mencari kata kunci yang cocok dalam daftar keahlian
                    for (const key in expertiseKeywords) {
                        if (dosen.bidang_keahlian_list.includes(key) && expertiseKeywords[key].some(kw => kw.includes(word) || word.includes(kw))) {
                            score += 10;
                        }
                    }
                });
                if (dosen.program_studi.toLowerCase().includes(word)) score += 5;
            }
        });
        
        return { dosen, score };
    });
    
    scoredDosen.sort((a, b) => b.score - a.score);
    const topRecommendations = scoredDosen.slice(0, 5).filter(item => item.score > 0);
    
    // [FIX 1] Menggunakan NIP
    recommendedDosen = topRecommendations.map(item => item.dosen.NIP);
    
    displayRecommendations(topRecommendations);
    
    // [FIX 2] Reset daftar dosen ke semua dosen tanpa mengubah filter
    filteredDosen = [...dataDosen];
    currentPage = 1;
    totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
    showDosenPage(currentPage);
    createPaginationButtons();
    updateFilterCount();

    highlightRecommendedDosen();
}

function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('recommendation-results');
    
    if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>Tidak ditemukan dosen yang sesuai. Coba gunakan kata kunci yang lebih spesifik.</p>';
        return;
    }
    
    let html = '<h4>Rekomendasi Teratas:</h4><div class="recommendation-list">';
    recommendations.forEach(item => {
        const percentage = Math.min(100, (item.score / 50) * 100).toFixed(0);
        html += `
            <div class="recommendation-item" data-nip="${item.dosen.NIP}">
                <h4>${item.dosen.nama}</h4>
                <p><strong>Bidang Keahlian:</strong> ${item.dosen.bidang_keahlian_list.join(', ')}</p>
                <p><strong>Kesesuaian:</strong> <span class="match-percentage">${percentage}%</span></p>
            </div>
        `;
    });
    html += '</div>';
    
    resultsContainer.innerHTML = html;
    
    document.querySelectorAll('.recommendation-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.tab-btn[data-tab="filter-tab"]').click();
            const nip = item.getAttribute('data-nip');
            setTimeout(() => scrollToDosenCard(nip), 100);
        });
    });
}

function highlightRecommendedDosen() {
    document.querySelectorAll('.dosen-card').forEach(card => {
        card.classList.remove('recommended');
        // [FIX 1] Menggunakan NIP
        if (recommendedDosen.includes(card.dataset.nip)) {
            card.classList.add('recommended');
        }
    });
}

function scrollToDosenCard(nip) {
    // [FIX 1] Menggunakan NIP
    const targetCard = document.querySelector(`.dosen-card[data-nip="${nip}"]`);
    if (targetCard) {
        targetCard.classList.add('highlight');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => targetCard.classList.remove('highlight'), 2000);
    }
}

// Card template function
function createDosenCard(dosen) {
    return `
        <div class="dosen-card ${recommendedDosen.includes(dosen.NIP) ? 'recommended' : ''}" data-nip="${dosen.NIP}">
            <div class="card-body">
                <div class="card-intro">
                    <div class="photo-container">
                        <img src="${dosen.foto}" alt="Foto ${dosen.nama}" class="dosen-photo">
                    </div>
                    <div class="intro-text">
                        <h2>
                            <a href="${dosen.profileUrl}" class="dosen-name-link" target="_blank" rel="noopener noreferrer">
                                ${dosen.nama}
                            </a>
                        </h2>
                        <p class="jabatan-text">${dosen.jabatan} - ${dosen.program_studi}</p>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="info-item">
                        <span class="info-label" data-i18n="NIP">NIP:</span>
                        <span class="info-value">${dosen.NIP}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label" data-i18n="expertise">Bidang Keahlian:</span>
                        <span class="info-value">${dosen.bidang_keahlian_list.join(', ')}</span>
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

// Pagination functions (Tidak ada perubahan di sini)
function showDosenPage(page) {
    const container = document.getElementById('dosen-container');
    container.innerHTML = '';
    const startIndex = (page - 1) * dosenPerPage;
    const endIndex = Math.min(startIndex + dosenPerPage, filteredDosen.length);
    for (let i = startIndex; i < endIndex; i++) {
        container.innerHTML += createDosenCard(filteredDosen[i]);
    }
    updatePaginationButtons(page);
    applyCurrentLanguage();
}

function createPaginationButtons() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;
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

function updatePaginationButtons(activePage) {
    document.querySelectorAll('.page-btn').forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.textContent) === activePage) {
            button.classList.add('active');
        }
    });
}

// Language functions (Tidak ada perubahan di sini)
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

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    generateFilterOptions();
    setupRecommendationSystem();
    showDosenPage(currentPage);
    createPaginationButtons();
    setupLanguageToggle();
    updateFilterCount();
});
