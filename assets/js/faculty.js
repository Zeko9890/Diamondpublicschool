// Faculty page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadFacultyData();
    initFacultyFilter();
});

function loadFacultyData(filterDepartment = 'all') {
    const facultyGrid = document.getElementById('faculty-grid');
    if (!facultyGrid) return;
    
    facultyGrid.innerHTML = `
        <div class="teacher-card">
            <div class="teacher-image">Faculty Member</div>
            <div class="teacher-info">
                <h3 class="teacher-name">Science Department</h3>
                <span class="teacher-department">Science</span>
                <p class="teacher-subjects">Physics, Chemistry, Biology, Mathematics</p>
                <p class="teacher-qualification">Experienced Educators</p>
            </div>
        </div>
        <div class="teacher-card">
            <div class="teacher-image">Faculty Member</div>
            <div class="teacher-info">
                <h3 class="teacher-name">Commerce Department</h3>
                <span class="teacher-department">Commerce</span>
                <p class="teacher-subjects">Accountancy, Business Studies, Economics</p>
                <p class="teacher-qualification">Industry Professionals</p>
            </div>
        </div>
    `;
}

function initFacultyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadFacultyData(this.getAttribute('data-department'));
        });
    });
}