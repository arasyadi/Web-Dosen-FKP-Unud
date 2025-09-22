// Configuration
const dosenPerPage = 14;
let currentPage = 1;
let currentLang = 'id';
const totalPages = Math.ceil(dataDosen.length / dosenPerPage);

// Card template function
function createDosenCard(dosen) {
    return `
        <div class="dosen-card">
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
    const endIndex = Math.min(startIndex + dosenPerPage, dataDosen.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        container.innerHTML += createDosenCard(dataDosen[i]);
    }
    
    updatePaginationButtons(page);
    applyCurrentLanguage(); // Re-apply language after page render
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
    showDosenPage(currentPage);
    createPaginationButtons();
    setupLanguageToggle();
});
