// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryData();
    initGalleryFilter();
});

function loadGalleryData(filterCategory = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) {
        console.log('ERROR: gallery-grid not found!');
        return;
    }
    
    console.log('Gallery grid found, loading data...');
    
    // Define your gallery items with placeholder images
    const galleryItems = [
        {
            category: 'campus',
            image: 'assets/images/gallery/campus-1.jpg',
            title: 'School Campus',
            description: 'Beautiful view of our main building'
        },
        {
            category: 'Academics',
            image: 'assets/images/gallery/computer_lab.jpg',
            title: 'Computer Lab',
            description: 'Our well-equipped Computer Lab'
        },
        {
            category: 'sports',
            image: 'assets/images/gallery/sports.jpg',
            title: 'Sports Day',
            description: 'Students participating in athletics'
        },
        {
            category: 'academics',
            image: 'assets/images/gallery/science_lab.jpg',
            title: 'Science Lab',
            description: 'Students conducting experiments'
        },
        {
            category: 'campus',
            image: 'assets/images/gallery/library.avif',
            title: 'School Library',
            description: 'Our well-equipped library'
        },
        {
            category: 'events',
            image: 'assets/images/gallery/republic_day.jpeg',
            title: 'Republic Day',
            description: 'Celebrating our nation'
        },
        {
            category: 'events',
            image: 'add another image',
            title: 'Event3',
            description: 'Celebrating our nation'
        },
{
            category: 'events',
            image: 'add another image',
            title: 'Event1',
            description: 'Celebrating our nation'
        },
        {
            category: 'events',
            image: 'add another image',
            title: 'Event2',
            description: 'Celebrating our nation'
        },
    ];
    
    // Filter items
    const filteredItems = filterCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filterCategory);
    
    console.log('Filtered items:', filteredItems.length);
    
    // Generate HTML - THIS IS WHERE THE ERROR WAS
    galleryGrid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item" data-category="${item.category}">
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="gallery-caption">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
    
    console.log('Gallery loaded successfully!');
}

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    console.log('Filter buttons found:', filterButtons.length);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            console.log('Filtering by:', category);
            loadGalleryData(category);
        });
    });
}