// Faculty page functionality with pagination
document.addEventListener('DOMContentLoaded', function() {
    currentPage = 1;
    itemsPerPage = 12; // Show 12 teachers per page
    currentDepartment = 'all';
    
    loadFacultyData();
    initFacultyFilter();
    initFacultyModal();
    initPagination();
});

let currentPage = 1;
let itemsPerPage = 12;
let currentDepartment = 'all';

// Load faculty data with pagination
function loadFacultyData(filterDepartment = 'all', page = 1) {
    const facultyGrid = document.getElementById('faculty-grid');
    const resultsInfo = document.getElementById('results-info');
    
    if (!facultyGrid) return;
    
    currentDepartment = filterDepartment;
    currentPage = page;
    
    // Filter faculty based on department
    const filteredFaculty = filterDepartment === 'all' 
        ? facultyData 
        : facultyData.filter(teacher => teacher.department === filterDepartment);
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFaculty = filteredFaculty.slice(startIndex, endIndex);
    
    // Generate faculty cards
    facultyGrid.innerHTML = paginatedFaculty.map(teacher => `
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
    
    // Update results info
    if (resultsInfo) {
        resultsInfo.innerHTML = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredFaculty.length)} of ${filteredFaculty.length} staff members`;
    }
    
    // Update pagination
    updatePagination(filteredFaculty.length, page);
}

// Initialize pagination
function initPagination() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                loadFacultyData(currentDepartment, currentPage - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const filteredFaculty = currentDepartment === 'all' 
                ? facultyData 
                : facultyData.filter(teacher => teacher.department === currentDepartment);
            const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                loadFacultyData(currentDepartment, currentPage + 1);
            }
        });
    }
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
    
    // Generate page numbers (show max 5 pages)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
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
            loadFacultyData(currentDepartment, page);
        });
    });
}
// Search functionality
function initSearch() {
    const searchInput = document.getElementById('faculty-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            if (searchResults) searchResults.style.display = 'none';
            loadFacultyData(currentDepartment, currentPage);
            return;
        }
        
        // Filter faculty based on search
        const filteredFaculty = facultyData.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.subjects.toLowerCase().includes(searchTerm) ||
            teacher.qualification.toLowerCase().includes(searchTerm) ||
            getDepartmentName(teacher.department).toLowerCase().includes(searchTerm)
        );
        
        // Show search results
        if (searchResults) {
            if (filteredFaculty.length > 0) {
                searchResults.innerHTML = `
                    <div class="search-count">Found ${filteredFaculty.length} staff members</div>
                    <div class="search-list">
                        ${filteredFaculty.slice(0, 5).map(teacher => `
                            <div class="search-item" data-teacher-id="${teacher.id}">
                                <strong>${teacher.name}</strong> - ${teacher.subjects}
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
        const facultyGrid = document.getElementById('faculty-grid');
        if (facultyGrid) {
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
        
        // Hide pagination during search
        const pagination = document.getElementById('pagination');
        const resultsInfo = document.getElementById('results-info');
        if (pagination) pagination.style.display = 'none';
        if (resultsInfo) resultsInfo.innerHTML = `Found ${filteredFaculty.length} staff members for "${searchTerm}"`;
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-container')) {
            if (searchResults) searchResults.style.display = 'none';
        }
    });
}