// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize events modal
    initEventsModal();
    
    // Load events from JSON
    loadEvents();
});

// Load events data from JSON file
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
        // Fallback to placeholder events if JSON fails to load
        const placeholderEvents = [
            {
                id: 1,
                title: "Graduation Day",
                date: "2026-04-12",
                description: "Showcasing innovative projects from our science students.",
                image: "https://via.placeholder.com/400x250/4A90E2/ffffff?text=Graduation+Day"
            },
            {
                id: 2,
                title: "Sports Day",
                date: "2026-11-25",
                description: "Annual inter-house sports competition.",
                image: "https://via.placeholder.com/400x250/50C878/ffffff?text=Sports+Day"
            },
            {
                id: 3,
                title: "Cultural Festival",
                date: "2026-04-26",
                description: "Celebrating diversity through music, dance, and art.",
                image: "assets/images/upcoming_events/cultural_festival.jpg"
            }
        ];
        displayEvents(placeholderEvents);
    }
}

// Display events in the events section
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    
    if (!eventsContainer) {
        console.error('Events container not found!');
        return;
    }
    
    // Sort events by date (most recent first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Display only the 3 most recent events
    const recentEvents = events.slice(0, 3);
    
    console.log('Displaying events:', recentEvents); // Debug log
    
    eventsContainer.innerHTML = recentEvents.map(event => `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <button class="btn btn-outline learn-more-btn" data-event-id="${event.id}">Learn More</button>
            </div>
        </div>
    `).join('');
    
    // Initialize event buttons
    initEventButtons();
}

// Initialize event buttons functionality
function initEventButtons() {
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showEventDetails(eventId);
        });
    });
}

// Show event details modal
function showEventDetails(eventId) {
    const events = [
        {
            id: 1,
            title: "Graduation Day",
            date: "2026-04-12",
            time: "9:00 AM - 3:00 PM",
            location: "School Main Ground",
            description: "Showcasing innovative projects from our science students.",
            fullDescription: "Our Annual Science Fair brings together the brightest young minds to showcase their innovative projects. Students from grades 6-12 will present experiments and research in physics, chemistry, biology, and computer science.",
            image: "https://via.placeholder.com/800x400/4A90E2/ffffff?text=Graduation+Day",
            participants: "Students Grades 6-12",
            organizer: "Diamond Public School"
        },
        {
            id: 2, 
            title: "Sports Day",
            date: "2026-11-25",
            time: "10:30 AM - 1:00 PM",
            location: "School Sports ground", 
            description: "Annual inter-house sports competition.",
            fullDescription: "The much-awaited Annual Sports Day features track and field events, team sports, and traditional games. Students compete for the championship trophy in a spirit of sportsmanship.",
            image: "https://via.placeholder.com/800x400/50C878/ffffff?text=Sports+Day",
            participants: "All Students",
            organizer: "Diamond Public School"
        },
        {
            id: 3,
            title: "Cultural Festival", 
            date: "2026-04-26",
            time: "9:00 AM - 12:00 PM",
            location: "School Auditorium",
            description: "Celebrating diversity through music, dance, and art.",
            fullDescription: "Our Cultural Festival showcases the diverse talents of our students through music, dance, drama, and art performances. The event celebrates our school's cultural diversity.",
            image: "https://via.placeholder.com/800x400/E94B3C/ffffff?text=Cultural+Festival", 
            participants: "All Students & Parents",
            organizer: "Diamond Public School"
        }
    ];
    
    const event = events.find(e => e.id == eventId);
    if (!event) return;
    
    const modal = document.getElementById('events-modal');
    const modalBody = document.getElementById('events-modal-body');
    
    modalBody.innerHTML = `
        <div class="event-modal-content">
            <div class="event-header">
                <div class="event-image-large">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="event-info">
                    <h2>${event.title}</h2>
                    <div class="event-meta">
                        <div class="meta-item">
                            <span class="meta-icon">📅</span>
                            <span>${formatDate(event.date)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">⏰</span>
                            <span>${event.time}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📍</span>
                            <span>${event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="event-details">
                <h3>Event Details</h3>
                <p>${event.fullDescription}</p>
                
                <div class="event-specifics">
                    <div class="specific-item">
                        <h4>👥 Participants</h4>
                        <p>${event.participants}</p>
                    </div>
                    <div class="specific-item">
                        <h4>🏢 Organized By</h4>
                        <p>${event.organizer}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Initialize events modal
function initEventsModal() {
    const modal = document.getElementById('events-modal');
    if (!modal) {
        console.error('Events modal not found!');
        return;
    }
    
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

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}