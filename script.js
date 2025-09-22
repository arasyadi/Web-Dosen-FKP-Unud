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
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Filter system
function generateFilterOptions() {
    const filterOptionsContainer = document.getElementById('filter-options');
    
    // Collect all unique expertise
    const expertiseSet = new Set();
    dataDosen.forEach(dosen => {
        expertiseSet.add(dosen.bidang_keahlian);
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
    
    // Event listeners for filter buttons
    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    document.getElementById('reset-filter').addEventListener('click', resetFilters);
}

function applyFilters() {
    const selectedFilters = [];
    document.querySelectorAll('.filter-option input:checked').forEach(checkbox => {
        selectedFilters.push(checkbox.value);
    });
    
    if (selectedFilters.length === 0) {
        filteredDosen = [...dataDosen];
    } else {
        filteredDosen = dataDosen.filter(dosen => selectedFilters.includes(dosen.bidang_keahlian));
    }
    
    // Reset to first page and update display
    currentPage = 1;
    totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
    showDosenPage(currentPage);
    createPaginationButtons();
    updateFilterCount();
}

function resetFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-option input').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset filtered data
    filteredDosen = [...dataDosen];
    currentPage = 1;
    totalPages = Math.ceil(filteredDosen.length / dosenPerPage);
    showDosenPage(currentPage);
    createPaginationButtons();
    updateFilterCount();
}

function updateFilterCount() {
    const countElement = document.getElementById('count');
    countElement.textContent = filteredDosen.length;
    
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
    
    // Define keywords for each lecturer based on their expertise
    const expertiseKeywords = {
        "Dinamika Populasi Ikan dan Avertebrata Air": ["populasi", "ikan", "avertebrata", "dinamika", "stok", "kelimpahan"],
        "Akuakultur & Mikrobiologi Akuatik": ["akuakultur", "mikrobiologi", "budidaya", "pertumbuhan", "pakan", "kualitas air"],
        "Akuakultur & Tumbuhan Air": ["akuakultur", "tumbuhan air", "fitoremediasi", "algae", "rumput laut"],
        "Teknik Pantai": ["pantai", "teknik", "erosi", "sedimen", "gelombang", "arus"],
        "Parasit & Penyakit Ikan": ["parasit", "penyakit", "kesehatan", "infeksi", "patogen"],
        "Ekologi Laut": ["ekologi", "habitat", "biodiversitas", "komunitas", "interaksi"],
        "Bioteknologi Kelautan": ["bioteknologi", "enzim", "bioaktif", "biomolekul", "genetika"],
        "Konservasi Perairan": ["konservasi", "perlindungan", "kawasan lindung", "spesies terancam"],
        "Akustik Kelautan": ["akustik", "sonar", "bunyi", "frekuensi", "pemetaan"],
        "Oseanografi": ["oseanografi", "arus", "suhu", "salinitas", "parameter fisika"]
    };
    
    // Calculate scores for each lecturer
    const scoredDosen = dataDosen.map(dosen => {
        let score = 0;
        const words = inputText.split(/\s+/);
        
        // Check for keyword matches
        words.forEach(word => {
            if (word.length > 3) { // Only consider words longer than 3 characters
                // Check in bidang keahlian
                if (dosen.bidang_keahlian.toLowerCase().includes(word)) {
                    score += 15;
                }
                
                // Check in predefined keywords
                if (expertiseKeywords[dosen.bidang_keahlian]) {
                    if (expertiseKeywords[dosen.bidang_keahlian].some(keyword => 
                        keyword.includes(word) || word.includes(keyword))) {
                        score += 10;
                    }
                }
                
                // Check in program studi
                if (dosen.program_studi.toLowerCase().includes(word)) {
                    score += 5;
                }
            }
        });
        
        return {
            dosen: dosen,
            score: score
        };
    });
    
    // Sort by score and get top 5
    scoredDosen.sort((a, b) => b.score - a.score);
    const topRecommendations = scoredDosen.slice(0, 5).filter(item => item.score > 0);
    
    // Store recommended dosen for highlighting
    recommendedDosen = topRecommendations.map(item => item.dosen.nip);
    
    // Display recommendations
    displayRecommendations(topRecommendations);
    
    // Switch to filter tab to show all lecturers with highlights
    document.querySelector('.tab-btn[data-tab="filter-tab"]').click();
    
    // Apply highlighting to recommended lecturers
    highlightRecommendedDosen();
}

function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('recommendation-results');
    
    if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>Tidak ditemukan dosen yang sesuai. Coba gunakan kata kunci yang lebih spesifik.</p>';
        return;
    }
    
    let html = '<div class="recommendation-list">';
    recommendations.forEach(item => {
        const percentage = Math.min(100, (item.score / 100) * 100).toFixed(0);
        html += `
            <div class="recommendation-item" data-nip="${item.dosen.nip}">
                <h4>${item.dosen.nama}</h4>
                <p><strong>Bidang Keahlian:</strong> ${item.dosen.bidang_keahlian}</p>
                <p><strong>Kesesuaian:</strong> <span class="match-percentage">${percentage}%</span></p>
            </div>
        `;
    });
    html += '</div>';
    
    resultsContainer.innerHTML = html;
    
    // Add click event to recommendation items
    document.querySelectorAll('.recommendation-item').forEach(item => {
        item.addEventListener('click', () => {
            const nip = item.getAttribute('data-nip');
            scrollToDosenCard(nip);
        });
    });
}

function highlightRecommendedDosen() {
    // Remove previous highlights
    document.querySelectorAll('.dosen-card').forEach(card => {
        card.classList.remove('recommended');
    });
    
    // Add highlight to recommended lecturers
    recommendedDosen.forEach(nip => {
        const cards = document.querySelectorAll('.dosen-card');
        cards.forEach(card => {
            const cardNip = card.querySelector('.info-value').textContent.trim();
            if (cardNip === nip) {
                card.classList.add('recommended');
            }
        });
    });
}

function scrollToDosenCard(nip) {
    const cards = document.querySelectorAll('.dosen-card');
    let targetCard = null;
    
    cards.forEach(card => {
        const cardNip = card.querySelector('.info-value').textContent.trim();
        if (cardNip === nip) {
            targetCard = card;
        }
    });
    
    if (targetCard) {
        // Add temporary highlight
        targetCard.classList.add('highlight');
        
        // Scroll to the card
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            targetCard.classList.remove('highlight');
        }, 2000);
    }
}

// Card template function
function createDosenCard(dosen) {
    return `
        <div class="dosen-card ${recommendedDosen.includes(dosen.nip) ? 'recommended' : ''}">
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
                        <span class="info-value">${dosen.nip}</span>
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

// Pagination functions
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
    
    // Previous button
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
    
    // Page number buttons
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
    
    // Next button
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
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent == activePage) {
            button.classList.add('active');
        }
    });
}

// Language functions
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
[file content end]
