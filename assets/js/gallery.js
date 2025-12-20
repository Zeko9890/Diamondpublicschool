// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryData();
    initGalleryFilter();
});

function loadGalleryData(filterCategory = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = `
    <div class="gallery-item" data-category="campus">
        <img src="assets/images/gallery/campus-1.jpg"
             alt="School Campus"
             class="gallery-image">
        <div class="gallery-caption">
            <h4>School Campus</h4>
            <p>Beautiful view of our main building</p>
        </div>
    </div>
`;

        <div class="gallery-item" data-category="events">
            <div class="gallery-image">Event Photo 1</div>
            <div class="gallery-caption">
                <h4>Annual Function</h4>
                <p>Cultural performances by students</p>
            </div>
        </div>
    `;
}

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadGalleryData(this.getAttribute('data-category'));
        });
    });
}