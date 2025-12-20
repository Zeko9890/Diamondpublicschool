function loadGalleryData(filterCategory = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Define your gallery items
    const galleryItems = [
        {
            category: 'campus',
            image: 'assets/images/gallery/campus-1.jpg',
            title: 'School Campus',
            description: 'Beautiful view of our main building'
        },
        {
            category: 'events',
            image: 'images/event-photo-1.jpg',
            title: 'Annual Function',
            description: 'Cultural performances by students'
        },
        {
            category: 'sports',
            image: 'images/sports-day-1.jpg',
            title: 'Sports Day',
            description: 'Students participating in athletics'
        }
    ];
    
    // Filter items
    const filteredItems = filterCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filterCategory);
    
    // Generate HTML
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
}
```