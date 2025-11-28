// Faculty page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadFacultyData();
    initFacultyFilter();
    initFacultyModal();
});

// Faculty data with all departments
const facultyData = [
    // Science Department
    {
        id: 1,
        name: "Dr. Rajesh Kumar",
        department: "science",
        subjects: "Physics, Advanced Physics",
        qualification: "PhD in Physics, IIT Delhi",
        experience: "15 years",
        email: "physics@school.edu",
        bio: "Specializes in theoretical physics and quantum mechanics. Published multiple research papers in international journals.",
        image: "Physics Teacher"
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        department: "science", 
        subjects: "Chemistry, Organic Chemistry",
        qualification: "PhD in Chemistry, University of Delhi",
        experience: "12 years",
        email: "chemistry@school.edu",
        bio: "Expert in organic chemistry and laboratory techniques. Focuses on practical application of chemical concepts.",
        image: "Chemistry Teacher"
    },
    {
        id: 3,
        name: "Ms. Anjali Singh",
        department: "science",
        subjects: "Biology, Biotechnology",
        qualification: "MSc in Biotechnology, JNU",
        experience: "10 years",
        email: "biology@school.edu",
        bio: "Passionate about genetics and molecular biology. Conducts interactive lab sessions for students.",
        image: "Biology Teacher"
    },
    {
        id: 4,
        name: "Mr. Amit Verma",
        department: "science",
        subjects: "Mathematics, Calculus",
        qualification: "MSc in Mathematics, BHU",
        experience: "14 years",
        email: "mathematics@school.edu",
        bio: "Makes complex mathematical concepts easy to understand through real-world applications.",
        image: "Mathematics Teacher"
    },
    {
        id: 5,
        name: "Ms. Neha Gupta",
        department: "science",
        subjects: "Computer Science, Programming",
        qualification: "MTech in Computer Science, IIIT",
        experience: "8 years",
        email: "computers@school.edu",
        bio: "Expert in programming languages and software development. Focuses on practical coding skills.",
        image: "Computer Teacher"
    },

    // Commerce Department
    {
        id: 6,
        name: "Mr. Sanjay Mehta",
        department: "commerce",
        subjects: "Accountancy, Financial Accounting",
        qualification: "CA, MBA in Finance",
        experience: "16 years",
        email: "accountancy@school.edu",
        bio: "Chartered Accountant with extensive industry experience. Teaches practical accounting techniques.",
        image: "Accountancy Teacher"
    },
    {
        id: 7,
        name: "Dr. Ritu Khanna",
        department: "commerce",
        subjects: "Business Studies, Entrepreneurship",
        qualification: "PhD in Business Management, IIM",
        experience: "13 years",
        email: "business@school.edu",
        bio: "Specializes in business strategy and entrepreneurship development programs.",
        image: "Business Teacher"
    },
    {
        id: 8,
        name: "Ms. Deepika Joshi",
        department: "commerce",
        subjects: "Economics, Microeconomics",
        qualification: "MA in Economics, Delhi School of Economics",
        experience: "11 years",
        email: "economics@school.edu",
        bio: "Expert in economic theories and their practical applications in modern markets.",
        image: "Economics Teacher"
    },

    // Arts & Humanities Department
    {
        id: 9,
        name: "Dr. Vikram Singh",
        department: "arts",
        subjects: "History, World History",
        qualification: "PhD in History, JNU",
        experience: "18 years",
        email: "history@school.edu",
        bio: "Specializes in ancient civilizations and world history. Makes history engaging through storytelling.",
        image: "History Teacher"
    },
    {
        id: 10,
        name: "Ms. Meera Patel",
        department: "arts",
        subjects: "Political Science, International Relations",
        qualification: "MA in Political Science, University of Delhi",
        experience: "9 years",
        email: "politicalscience@school.edu",
        bio: "Expert in political theories and international relations. Encourages critical thinking.",
        image: "Political Science Teacher"
    },
    {
        id: 11,
        name: "Dr. Anil Desai",
        department: "arts",
        subjects: "Psychology, Cognitive Psychology",
        qualification: "PhD in Psychology, TISS",
        experience: "12 years",
        email: "psychology@school.edu",
        bio: "Specializes in cognitive psychology and behavioral studies. Conducts interactive workshops.",
        image: "Psychology Teacher"
    },
    {
        id: 12,
        name: "Ms. Sunita Rao",
        department: "arts",
        subjects: "Sociology, Social Studies",
        qualification: "MA in Sociology, Jamia Millia",
        experience: "10 years",
        email: "sociology@school.edu",
        bio: "Focuses on social structures and cultural studies. Promotes inclusive education.",
        image: "Sociology Teacher"
    },
    {
        id: 13,
        name: "Mr. Ravi Shankar",
        department: "arts",
        subjects: "Geography, Environmental Studies",
        qualification: "MSc in Geography, Delhi University",
        experience: "14 years",
        email: "geography@school.edu",
        bio: "Expert in physical geography and environmental conservation. Organizes field trips.",
        image: "Geography Teacher"
    },

    // Languages Department
    {
        id: 14,
        name: "Ms. Kavita Malhotra",
        department: "language",
        subjects: "English Literature, Creative Writing",
        qualification: "MA in English Literature, University of Delhi",
        experience: "15 years",
        email: "english@school.edu",
        bio: "Passionate about literature and creative writing. Conducts poetry and writing workshops.",
        image: "English Teacher"
    },
    {
        id: 15,
        name: "Mr. Sameer Khan",
        department: "language",
        subjects: "Hindi Literature, Grammar",
        qualification: "MA in Hindi, Delhi University",
        experience: "12 years",
        email: "hindi@school.edu",
        bio: "Expert in Hindi literature and grammar. Promotes Indian literature and culture.",
        image: "Hindi Teacher"
    },
    {
        id: 16,
        name: "Ms. Isabelle Martin",
        department: "language",
        subjects: "French, Foreign Languages",
        qualification: "MA in French, Alliance Française",
        experience: "8 years",
        email: "french@school.edu",
        bio: "Native French speaker with expertise in language acquisition and cultural exchange.",
        image: "French Teacher"
    },
    {
        id: 17,
        name: "Mr. David Chen",
        department: "language",
        subjects: "Sanskrit, Ancient Languages",
        qualification: "MA in Sanskrit, Sanskrit University",
        experience: "11 years",
        email: "sanskrit@school.edu",
        bio: "Specializes in Sanskrit literature and ancient Indian texts. Preserves cultural heritage.",
        image: "Sanskrit Teacher"
    }
];

// Load faculty data into the grid
function loadFacultyData(filterDepartment = 'all') {
    const facultyGrid = document.getElementById('faculty-grid');
    
    if (!facultyGrid) return;
    
    // Filter faculty based on department
    const filteredFaculty = filterDepartment === 'all' 
        ? facultyData 
        : facultyData.filter(teacher => teacher.department === filterDepartment);
    
    // Generate faculty cards
    facultyGrid.innerHTML = filteredFaculty.map(teacher => `
        <div class="teacher-card" data-teacher-id="${teacher.id}">
            <div class="teacher-image">
                ${teacher.image}
            </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${teacher.name}</h3>
                <span class="teacher-department">${getDepartmentName(teacher.department)}</span>
                <p class="teacher-subjects">${teacher.subjects}</p>
                <p class="teacher-qualification">${teacher.qualification}</p>
                <button class="btn-view-profile">View Profile</button>
            </div>
        </div>
    `).join('');
}

// Get department display name
function getDepartmentName(departmentKey) {
    const departments = {
        'science': 'Science Department',
        'commerce': 'Commerce Department', 
        'arts': 'Arts & Humanities Department',
        'language': 'Languages Department'
    };
    return departments[departmentKey] || departmentKey;
}

// Initialize faculty filter
function initFacultyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter faculty
            const department = this.getAttribute('data-department');
            loadFacultyData(department);
        });
    });
}

// Initialize faculty modal
function initFacultyModal() {
    const modal = document.getElementById('faculty-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal) return;
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add click event to teacher cards and buttons
    document.addEventListener('click', function(event) {
        const teacherCard = event.target.closest('.teacher-card');
        const viewProfileBtn = event.target.closest('.btn-view-profile');
        
        if (teacherCard || viewProfileBtn) {
            const cardElement = teacherCard || viewProfileBtn.closest('.teacher-card');
            const teacherId = parseInt(cardElement.getAttribute('data-teacher-id'));
            showTeacherModal(teacherId);
        }
    });
}

// Show teacher modal with details
function showTeacherModal(teacherId) {
    const modal = document.getElementById('faculty-modal');
    const modalBody = document.getElementById('modal-body');
    const teacher = facultyData.find(t => t.id === teacherId);
    
    if (!modal || !modalBody || !teacher) return;
    
    modalBody.innerHTML = `
        <div class="teacher-modal-content">
            <div class="teacher-modal-image">
                ${teacher.image}
            </div>
            <div class="teacher-modal-details">
                <h2>${teacher.name}</h2>
                <div class="teacher-modal-department">${getDepartmentName(teacher.department)}</div>
                
                <div class="teacher-modal-info">
                    <div class="info-section">
                        <h4>Subjects Taught</h4>
                        <p>${teacher.subjects}</p>
                    </div>
                    
                    <div class="info-section">
                        <h4>Qualifications</h4>
                        <p>${teacher.qualification}</p>
                    </div>
                    
                    <div class="info-section">
                        <h4>Teaching Experience</h4>
                        <p>${teacher.experience}</p>
                    </div>
                    
                    <div class="info-section">
                        <h4>Email</h4>
                        <p>${teacher.email}</p>
                    </div>
                </div>
                
                <div class="teacher-bio">
                    <h4>About</h4>
                    <p>${teacher.bio}</p>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary">Schedule Meeting</button>
                    <button class="btn btn-outline">Send Message</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}