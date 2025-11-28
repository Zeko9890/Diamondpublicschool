// Academics functionality
document.addEventListener('DOMContentLoaded', function() {
    initAcademicsModal();
    initAcademicsButtons();
});

// Academics data
const academicsData = {
    science: {
        title: "Science Stream",
        icon: "🔬",
        description: "Our Science program prepares students for careers in medicine, engineering, research, and technology through rigorous curriculum and hands-on learning.",
        subjects: [
            "Physics - Classical Mechanics, Modern Physics, Electronics",
            "Chemistry - Organic, Inorganic, Physical Chemistry",
            "Biology - Botany, Zoology, Biotechnology",
            "Mathematics - Calculus, Algebra, Statistics",
            "Computer Science - Programming, Data Structures, AI"
        ],
        features: [
            "State-of-the-art laboratories",
            "Research projects and science fairs",
            "Industry visits and guest lectures",
            "Olympiad preparation programs",
            "Career counseling for STEM fields"
        ],
        careerPaths: ["Medicine", "Engineering", "Research", "Data Science", "Biotechnology"]
    },
    commerce: {
        title: "Commerce Stream", 
        icon: "📊",
        description: "The Commerce program develops business acumen and financial literacy, preparing students for careers in accounting, finance, and business management.",
        subjects: [
            "Accountancy - Financial Accounting, Cost Accounting",
            "Business Studies - Management, Marketing, Entrepreneurship", 
            "Economics - Microeconomics, Macroeconomics, Indian Economy",
            "Mathematics - Business Mathematics, Statistics",
            "Computer Applications - Tally, Excel, Business Software"
        ],
        features: [
            "Practical accounting sessions",
            "Stock market simulation projects",
            "Business plan competitions",
            "Industry internships",
            "CA/CS foundation courses"
        ],
        careerPaths: ["Chartered Accountancy", "Business Management", "Banking", "Finance", "Entrepreneurship"]
    },
    arts: {
        title: "Arts & Humanities",
        icon: "📚", 
        description: "Our Arts program fosters critical thinking, creativity, and cultural awareness, preparing students for diverse careers in social sciences, arts, and public service.",
        subjects: [
            "History - Ancient, Medieval, Modern History",
            "Political Science - Indian Constitution, International Relations",
            "Psychology - Cognitive, Social, Clinical Psychology",
            "Sociology - Social Structure, Cultural Studies",
            "Languages - English, Hindi, French, Sanskrit"
        ],
        features: [
            "Debate and public speaking clubs",
            "Cultural exchange programs", 
            "Research projects and field work",
            "Creative writing workshops",
            "Model UN and youth parliament"
        ],
        careerPaths: ["Civil Services", "Law", "Journalism", "Psychology", "Social Work"]
    }
};

// Initialize academics modal
function initAcademicsModal() {
    const modal = document.getElementById('academics-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize academics buttons
function initAcademicsButtons() {
    // Explore buttons for each stream
    document.querySelectorAll('.explore-science, .explore-commerce, .explore-arts').forEach(button => {
        button.addEventListener('click', function() {
            const stream = this.classList[1].replace('explore-', '');
            showAcademicsModal(stream);
        });
    });
    
    // View all programs button
    const viewAllBtn = document.getElementById('view-all-programs');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showAllProgramsModal();
        });
    }
}

// Show academics modal for specific stream
function showAcademicsModal(stream) {
    const modal = document.getElementById('academics-modal');
    const modalBody = document.getElementById('academics-modal-body');
    const data = academicsData[stream];
    
    if (!data) return;
    
    modalBody.innerHTML = `
        <div class="academics-modal-content">
            <div class="academics-header">
                <div class="academics-icon">${data.icon}</div>
                <h2>${data.title}</h2>
            </div>
            
            <div class="academics-description">
                <p>${data.description}</p>
            </div>
            
            <div class="academics-details">
                <div class="detail-section">
                    <h3>📖 Subjects Offered</h3>
                    <ul>
                        ${data.subjects.map(subject => `<li>${subject}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3>⭐ Program Features</h3>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3>🎯 Career Paths</h3>
                    <div class="career-tags">
                        ${data.careerPaths.map(career => `<span class="career-tag">${career}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="academics-actions">
                <button class="btn btn-primary" onclick="downloadBrochure('${stream}')">Download Brochure</button>
                <button class="btn btn-outline" onclick="scheduleCounseling('${stream}')">Schedule Counseling</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Show all programs modal
function showAllProgramsModal() {
    const modal = document.getElementById('academics-modal');
    const modalBody = document.getElementById('academics-modal-body');
    
    modalBody.innerHTML = `
        <div class="all-programs-modal">
            <h2>All Academic Programs</h2>
            <p class="modal-subtitle">Choose from our comprehensive range of educational streams</p>
            
            <div class="programs-comparison">
                <div class="program-card">
                    <div class="program-icon">🔬</div>
                    <h3>Science Stream</h3>
                    <p>For students interested in medicine, engineering, and technology</p>
                    <button class="btn btn-outline explore-science-modal">Explore Science</button>
                </div>
                
                <div class="program-card">
                    <div class="program-icon">📊</div>
                    <h3>Commerce Stream</h3>
                    <p>For careers in business, finance, and entrepreneurship</p>
                    <button class="btn btn-outline explore-commerce-modal">Explore Commerce</button>
                </div>
                
                <div class="program-card">
                    <div class="program-icon">📚</div>
                    <h3>Arts & Humanities</h3>
                    <p>For creative minds interested in social sciences and arts</p>
                    <button class="btn btn-outline explore-arts-modal">Explore Arts</button>
                </div>
            </div>
            
            <div class="admission-info">
                <h3>Admission Process</h3>
                <div class="process-steps">
                    <div class="step">
                        <span class="step-number">1</span>
                        <span class="step-text">Submit Application Form</span>
                    </div>
                    <div class="step">
                        <span class="step-number">2</span>
                        <span class="step-text">Entrance Test</span>
                    </div>
                    <div class="step">
                        <span class="step-number">3</span>
                        <span class="step-text">Personal Interview</span>
                    </div>
                    <div class="step">
                        <span class="step-number">4</span>
                        <span class="step-text">Admission Confirmation</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to modal buttons
    modalBody.querySelector('.explore-science-modal').addEventListener('click', () => showAcademicsModal('science'));
    modalBody.querySelector('.explore-commerce-modal').addEventListener('click', () => showAcademicsModal('commerce'));
    modalBody.querySelector('.explore-arts-modal').addEventListener('click', () => showAcademicsModal('arts'));
    
    modal.style.display = 'block';
}

// Download brochure function
function downloadBrochure(stream) {
    // Simulate download
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.textContent = `Downloading ${stream} brochure...`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Schedule counseling function  
function scheduleCounseling(stream) {
    // Redirect to contact page with pre-filled form
    window.location.href = `contact.html?interest=${stream}&type=counseling`;
}