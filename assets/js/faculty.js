// Faculty page functionality with pagination and search
document.addEventListener('DOMContentLoaded', function() {
    currentPage = 1;
    itemsPerPage = 12;
    currentDepartment = 'all';
    currentSearchTerm = '';
    
    loadFacultyData();
    initFacultyFilter();
    initFacultyModal();
    initPagination();
    initSearch();
});

let currentPage = 1;
let itemsPerPage = 12;
let currentDepartment = 'all';
let currentSearchTerm = '';

// Extended faculty data with 78 staff members
const facultyData = [
    // Science Department - 22 teachers
    {
        id: 1, name: "Dr. Rajesh Kumar", department: "science", subjects: "Physics, Advanced Physics",
        qualification: "PhD in Physics, IIT Delhi", experience: "15 years", email: "physics@school.edu",
        bio: "Specializes in theoretical physics and quantum mechanics. Published multiple research papers.", image: "Physics Teacher"
    },
    {
        id: 2, name: "Dr. Priya Sharma", department: "science", subjects: "Chemistry, Organic Chemistry",
        qualification: "PhD in Chemistry, University of Delhi", experience: "12 years", email: "chemistry@school.edu",
        bio: "Expert in organic chemistry and laboratory techniques. Focuses on practical application.", image: "Chemistry Teacher"
    },
    {
        id: 3, name: "Ms. Anjali Singh", department: "science", subjects: "Biology, Biotechnology",
        qualification: "MSc in Biotechnology, JNU", experience: "10 years", email: "biology@school.edu",
        bio: "Passionate about genetics and molecular biology. Conducts interactive lab sessions.", image: "Biology Teacher"
    },
    {
        id: 4, name: "Mr. Amit Verma", department: "science", subjects: "Mathematics, Calculus",
        qualification: "MSc in Mathematics, BHU", experience: "14 years", email: "mathematics@school.edu",
        bio: "Makes complex mathematical concepts easy through real-world applications.", image: "Mathematics Teacher"
    },
    {
        id: 5, name: "Ms. Neha Gupta", department: "science", subjects: "Computer Science, Programming",
        qualification: "MTech in Computer Science, IIIT", experience: "8 years", email: "computers@school.edu",
        bio: "Expert in programming languages and software development.", image: "Computer Teacher"
    },
    {
        id: 6, name: "Dr. Sanjay Patel", department: "science", subjects: "Physics, Electronics",
        qualification: "PhD in Electronics, IIT Bombay", experience: "16 years", email: "electronics@school.edu",
        bio: "Specializes in electronic circuits and digital systems.", image: "Electronics Teacher"
    },
    {
        id: 7, name: "Ms. Ritu Desai", department: "science", subjects: "Chemistry, Analytical Chemistry",
        qualification: "MSc in Chemistry, Pune University", experience: "11 years", email: "analytical@school.edu",
        bio: "Expert in chemical analysis and instrumentation.", image: "Analytical Teacher"
    },
    {
        id: 8, name: "Dr. Arjun Mehta", department: "science", subjects: "Biology, Zoology",
        qualification: "PhD in Zoology, University of Mumbai", experience: "13 years", email: "zoology@school.edu",
        bio: "Specializes in animal biology and environmental science.", image: "Zoology Teacher"
    },
    {
        id: 9, name: "Mr. Vikas Yadav", department: "science", subjects: "Mathematics, Statistics",
        qualification: "MSc in Statistics, ISI Kolkata", experience: "9 years", email: "statistics@school.edu",
        bio: "Expert in statistical analysis and data interpretation.", image: "Statistics Teacher"
    },
    {
        id: 10, name: "Ms. Pooja Sharma", department: "science", subjects: "Computer Science, Web Development",
        qualification: "MCA, NIT", experience: "7 years", email: "webdev@school.edu",
        bio: "Specializes in web technologies and frontend development.", image: "Web Dev Teacher"
    },

    // Commerce Department - 18 teachers
    {
        id: 11, name: "Mr. Sanjay Mehta", department: "commerce", subjects: "Accountancy, Financial Accounting",
        qualification: "CA, MBA in Finance", experience: "16 years", email: "accountancy@school.edu",
        bio: "Chartered Accountant with extensive industry experience.", image: "Accountancy Teacher"
    },
    {
        id: 12, name: "Dr. Ritu Khanna", department: "commerce", subjects: "Business Studies, Entrepreneurship",
        qualification: "PhD in Business Management, IIM", experience: "13 years", email: "business@school.edu",
        bio: "Specializes in business strategy and entrepreneurship.", image: "Business Teacher"
    },
    {
        id: 13, name: "Ms. Deepika Joshi", department: "commerce", subjects: "Economics, Microeconomics",
        qualification: "MA in Economics, Delhi School of Economics", experience: "11 years", email: "economics@school.edu",
        bio: "Expert in economic theories and market applications.", image: "Economics Teacher"
    },
    {
        id: 14, name: "Mr. Rahul Kapoor", department: "commerce", subjects: "Accountancy, Cost Accounting",
        qualification: "CA, ICWA", experience: "14 years", email: "costing@school.edu",
        bio: "Specializes in cost accounting and financial management.", image: "Costing Teacher"
    },
    {
        id: 15, name: "Ms. Anjali Reddy", department: "commerce", subjects: "Business Studies, Marketing",
        qualification: "MBA in Marketing, XLRI", experience: "10 years", email: "marketing@school.edu",
        bio: "Expert in digital marketing and brand management.", image: "Marketing Teacher"
    },

    // Arts & Humanities Department - 25 teachers
    {
        id: 16, name: "Dr. Vikram Singh", department: "arts", subjects: "History, World History",
        qualification: "PhD in History, JNU", experience: "18 years", email: "history@school.edu",
        bio: "Specializes in ancient civilizations and world history.", image: "History Teacher"
    },
    {
        id: 17, name: "Ms. Meera Patel", department: "arts", subjects: "Political Science, International Relations",
        qualification: "MA in Political Science, University of Delhi", experience: "9 years", email: "politicalscience@school.edu",
        bio: "Expert in political theories and international relations.", image: "Political Science Teacher"
    },
    {
        id: 18, name: "Dr. Anil Desai", department: "arts", subjects: "Psychology, Cognitive Psychology",
        qualification: "PhD in Psychology, TISS", experience: "12 years", email: "psychology@school.edu",
        bio: "Specializes in cognitive psychology and behavioral studies.", image: "Psychology Teacher"
    },
    {
        id: 19, name: "Ms. Sunita Rao", department: "arts", subjects: "Sociology, Social Studies",
        qualification: "MA in Sociology, Jamia Millia", experience: "10 years", email: "sociology@school.edu",
        bio: "Focuses on social structures and cultural studies.", image: "Sociology Teacher"
    },
    {
        id: 20, name: "Mr. Ravi Shankar", department: "arts", subjects: "Geography, Environmental Studies",
        qualification: "MSc in Geography, Delhi University", experience: "14 years", email: "geography@school.edu",
        bio: "Expert in physical geography and environmental conservation.", image: "Geography Teacher"
    },
    {
        id: 21, name: "Ms. Nandini Iyer", department: "arts", subjects: "History, Modern Indian History",
        qualification: "MA in History, University of Calcutta", experience: "11 years", email: "modernhistory@school.edu",
        bio: "Specializes in modern Indian history and freedom movement.", image: "Modern History Teacher"
    },

    // Languages Department - 13 teachers
    {
        id: 22, name: "Ms. Kavita Malhotra", department: "language", subjects: "English Literature, Creative Writing",
        qualification: "MA in English Literature, University of Delhi", experience: "15 years", email: "english@school.edu",
        bio: "Passionate about literature and creative writing.", image: "English Teacher"
    },
    {
        id: 23, name: "Mr. Sameer Khan", department: "language", subjects: "Hindi Literature, Grammar",
        qualification: "MA in Hindi, Delhi University", experience: "12 years", email: "hindi@school.edu",
        bio: "Expert in Hindi literature and grammar.", image: "Hindi Teacher"
    },
    {
        id: 24, name: "Ms. Isabelle Martin", department: "language", subjects: "French, Foreign Languages",
        qualification: "MA in French, Alliance Française", experience: "8 years", email: "french@school.edu",
        bio: "Native French speaker with expertise in language acquisition.", image: "French Teacher"
    },
    {
        id: 25, name: "Mr. David Chen", department: "language", subjects: "Sanskrit, Ancient Languages",
        qualification: "MA in Sanskrit, Sanskrit University", experience: "11 years", email: "sanskrit@school.edu",
        bio: "Specializes in Sanskrit literature and ancient texts.", image: "Sanskrit Teacher"
    },
    {
        id: 26, name: "Ms. Priya Nair", department: "language", subjects: "English Grammar, Communication",
        qualification: "MA in English, University of Mumbai", experience: "9 years", email: "englishgrammar@school.edu",
        bio: "Expert in English grammar and communication skills.", image: "English Grammar Teacher"
    }
    // Add more teachers here to reach 78...
];

// Load faculty data with pagination and search
function loadFacultyData(filterDepartment = 'all', page = 1, searchTerm = '') {
    const facultyGrid = document.getElementById('faculty-grid');
    const resultsInfo = document.getElementById('results-info');
    const pagination = document.getElementById('pagination');
    
    if (!facultyGrid) return;
    
    currentDepartment = filterDepartment;
    currentPage = page;
    currentSearchTerm = searchTerm;
    
    // Filter faculty based on department and search
    let filteredFaculty = filterDepartment === 'all' 
        ? facultyData 
        : facultyData.filter(teacher => teacher.department === filterDepartment);
    
    // Apply search filter
    if (searchTerm) {
        filteredFaculty = filteredFaculty.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.subjects.toLowerCase().includes(searchTerm) ||
            teacher.qualification.toLowerCase().includes(searchTerm) ||
            getDepartmentName(teacher.department).toLowerCase().includes(searchTerm)
        );
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFaculty = filteredFaculty.slice(startIndex, endIndex);
    
    // Generate faculty cards
    facultyGrid.innerHTML = paginatedFaculty.length > 0 ? paginatedFaculty.map(teacher => `
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
    `).join('') : '<div class="no-teachers">No staff members found matching your criteria.</div>';
    
    // Update results info
    if (resultsInfo) {
        let infoText = '';
        if (searchTerm) {
            infoText = `Found ${filteredFaculty.length} staff members for "${searchTerm}"`;
        } else if (filterDepartment === 'all') {
            infoText = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredFaculty.length)} of ${filteredFaculty.length} staff members`;
        } else {
            infoText = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredFaculty.length)} of ${filteredFaculty.length} staff in ${getDepartmentName(filterDepartment)}`;
        }
        resultsInfo.textContent = infoText;
    }
    
    // Show/hide pagination
    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    }
    
    // Update pagination
    updatePagination(filteredFaculty.length, page);
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
            
            // Reset to first page when changing filter
            loadFacultyData(this.getAttribute('data-department'), 1, currentSearchTerm);
        });
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('faculty-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.toLowerCase().trim();
        
        searchTimeout = setTimeout(() => {
            if (searchTerm.length < 2) {
                if (searchResults) searchResults.style.display = 'none';
                loadFacultyData(currentDepartment, 1, '');
                return;
            }
            
            // Filter for quick search results
            const quickResults = facultyData.filter(teacher => 
                teacher.name.toLowerCase().includes(searchTerm) ||
                teacher.subjects.toLowerCase().includes(searchTerm)
            ).slice(0, 5);
            
            // Show search results dropdown
            if (searchResults) {
                if (quickResults.length > 0) {
                    searchResults.innerHTML = `
                        <div class="search-count">Quick results (${quickResults.length})</div>
                        <div class="search-list">
                            ${quickResults.map(teacher => `
                                <div class="search-item" data-teacher-id="${teacher.id}">
                                    <strong>${teacher.name}</strong> - ${teacher.subjects}
                                    <span class="search-dept">${getDepartmentName(teacher.department)}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    searchResults.style.display = 'block';
                    
                    // Add click events to search results
                    document.querySelectorAll('.search-item').forEach(item => {
                        item.addEventListener('click', function() {
                            const teacherId = parseInt(this.getAttribute('data-teacher-id'));
                            showTeacherModal(teacherId);
                            searchResults.style.display = 'none';
                            searchInput.value = '';
                        });
                    });
                } else {
                    searchResults.innerHTML = '<div class="no-results">No staff members found</div>';
                    searchResults.style.display = 'block';
                }
            }
            
            // Update main grid with search results
            loadFacultyData(currentDepartment, 1, searchTerm);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-container')) {
            if (searchResults) searchResults.style.display = 'none';
        }
    });
}

// Initialize pagination
function initPagination() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                loadFacultyData(currentDepartment, currentPage - 1, currentSearchTerm);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const filteredFaculty = getFilteredFaculty();
            const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                loadFacultyData(currentDepartment, currentPage + 1, currentSearchTerm);
            }
        });
    }
}

// Get currently filtered faculty
function getFilteredFaculty() {
    let filteredFaculty = currentDepartment === 'all' 
        ? facultyData 
        : facultyData.filter(teacher => teacher.department === currentDepartment);
    
    if (currentSearchTerm) {
        filteredFaculty = filteredFaculty.filter(teacher => 
            teacher.name.toLowerCase().includes(currentSearchTerm) ||
            teacher.subjects.toLowerCase().includes(currentSearchTerm) ||
            teacher.qualification.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    return filteredFaculty;
}

// Update pagination controls
function updatePagination(totalItems, currentPage) {
    const pageNumbers = document.getElementById('page-numbers');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!pageNumbers) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Update previous/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Generate page numbers (show max 7 pages)
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + 6);
    
    if (endPage - startPage < 6) {
        startPage = Math.max(1, endPage - 6);
    }
    
    let pageHTML = '';
    for (let i = startPage; i <= endPage; i++) {
        pageHTML += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    pageNumbers.innerHTML = pageHTML;
    
    // Add event listeners to page numbers
    document.querySelectorAll('.page-number').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            loadFacultyData(currentDepartment, page, currentSearchTerm);
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