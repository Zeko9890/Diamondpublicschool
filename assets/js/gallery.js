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
            image: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Campus+1',
            title: 'School Campus',
            description: 'Beautiful view of our main building'
        },
        {
            category: 'events',
            image: 'https://via.placeholder.com/400x300/E94B3C/ffffff?text=Event+1',
            title: 'Annual Function',
            description: 'Cultural performances by students'
        },
        {
            category: 'sports',
            image: 'https://via.placeholder.com/400x300/50C878/ffffff?text=Sports+1',
            title: 'Sports Day',
            description: 'Students participating in athletics'
        },
        {
            category: 'academics',
            image: 'https://via.placeholder.com/400x300/FFB347/ffffff?text=Academic+1',
            title: 'Science Lab',
            description: 'Students conducting experiments'
        },
        {
            category: 'campus',
            image: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Campus+2',
            title: 'School Library',
            description: 'Our well-equipped library'
        },
        {
            category: 'events',
            image: 'https://via.placeholder.com/400x300/E94B3C/ffffff?text=Event+2',
            title: 'Independence Day',
            description: 'Celebrating our nation'
        }
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