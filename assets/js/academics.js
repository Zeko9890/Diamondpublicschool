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
            "Creative writing workshops"
        ],
        careerPaths: ["Civil Services", "Law", "Journalism", "Psychology", "Social Work"]
    }
};

// Initialize academics modal
function initAcademicsModal() {
    const modal = document.getElementById('academics-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize academics buttons
function initAcademicsButtons() {
    document.querySelectorAll('.explore-science, .explore-commerce, .explore-arts').forEach(button => {
        button.addEventListener('click', function() {
            const stream = this.classList[1].replace('explore-', '');
            showAcademicsModal(stream);
        });
    });
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
                    <h3>🎯 Career Opportunities</h3>
                    <div class="career-tags">
                        ${data.careerPaths.map(career => `<span class="career-tag">${career}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}