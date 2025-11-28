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
                title: "Annual Science Fair",
                date: "2023-11-15",
                description: "Showcasing innovative projects from our science students.",
                image: "Science Fair"
            },
            {
                id: 2,
                title: "Sports Day",
                date: "2023-11-25",
                description: "Annual inter-house sports competition.",
                image: "Sports Day"
            },
            {
                id: 3,
                title: "Cultural Festival",
                date: "2023-12-05",
                description: "Celebrating diversity through music, dance, and art.",
                image: "Cultural Festival"
            }
        ];
        displayEvents(placeholderEvents);
    }
}

// Display events in the events section
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    
    if (!eventsContainer) return;
    
    // Sort events by date (most recent first)
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only the 3 most recent events
    const recentEvents = events.slice(0, 3);
    
    eventsContainer.innerHTML = recentEvents.map(event => `
        <div class="event-card">
            <div class="event-image">
                ${event.image}
            </div>
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <a href="#" class="btn btn-outline">Learn More</a>
            </div>
        </div>
    `).join('');
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}