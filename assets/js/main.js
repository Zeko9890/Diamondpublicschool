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
// Update the displayEvents function in main.js
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    
    if (!eventsContainer) return;
    
    // Sort events by date (most recent first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Display only the 3 most recent events
    const recentEvents = events.slice(0, 3);
    
    eventsContainer.innerHTML = recentEvents.map(event => `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image">
                ${event.image}
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
    // Learn More buttons
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showEventDetails(eventId);
        });
    });
    
    // View All Events button
    const viewAllEventsBtn = document.getElementById('view-all-events');
    if (viewAllEventsBtn) {
        viewAllEventsBtn.addEventListener('click', showAllEventsModal);
    }
}

// Show event details modal
function showEventDetails(eventId) {
    // This would fetch event details from your events data
    const events = [
        {
            id: 1,
            title: "Annual Science Fair",
            date: "2023-11-15",
            time: "9:00 AM - 3:00 PM",
            location: "School Main Ground",
            description: "Showcasing innovative projects from our science students. Open to parents and community members.",
            fullDescription: "Our Annual Science Fair brings together the brightest young minds to showcase their innovative projects. Students from grades 6-12 will present experiments and research in physics, chemistry, biology, and computer science. Special guest judges from local universities will evaluate projects and award prizes in various categories.",
            image: "Science Fair",
            participants: "Students Grades 6-12",
            contact: "science@school.edu"
        },
        // Add other events...
    ];
    
    const event = events.find(e => e.id == eventId);
    if (!event) return;
    
    const modal = document.getElementById('events-modal');
    const modalBody = document.getElementById('events-modal-body');
    
    modalBody.innerHTML = `
        <div class="event-modal-content">
            <div class="event-header">
                <div class="event-image-large">
                    ${event.image}
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
                <h3>About This Event</h3>
                <p>${event.fullDescription || event.description}</p>
                
                <div class="event-specifics">
                    <div class="specific-item">
                        <h4>👥 Participants</h4>
                        <p>${event.participants}</p>
                    </div>
                    <div class="specific-item">
                        <h4>📞 Contact</h4>
                        <p>${event.contact}</p>
                    </div>
                </div>
            </div>
            
            <div class="event-actions">
                <button class="btn btn-primary" onclick="registerForEvent(${event.id})">Register Now</button>
                <button class="btn btn-outline" onclick="addToCalendar(${event.id})">Add to Calendar</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Show all events modal
function showAllEventsModal() {
    const modal = document.getElementById('events-modal');
    const modalBody = document.getElementById('events-modal-body');
    
    modalBody.innerHTML = `
        <div class="all-events-modal">
            <h2>All Upcoming Events</h2>
            <p class="modal-subtitle">Stay updated with our school activities and programs</p>
            
            <div class="events-calendar">
                <div class="calendar-header">
                    <h3>📅 Events Calendar</h3>
                    <button class="btn btn-outline" onclick="downloadCalendar()">Download Calendar</button>
                </div>
                <div class="events-list" id="events-list">
                    <!-- Events will be loaded here -->
                </div>
            </div>
            
            <div class="events-newsletter">
                <h3>📬 Stay Updated</h3>
                <p>Get notified about upcoming events and important dates</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Enter your email" class="newsletter-input">
                    <button class="btn btn-primary" onclick="subscribeNewsletter()">Subscribe</button>
                </div>
            </div>
        </div>
    `;
    
    // Load all events
    loadAllEvents();
    modal.style.display = 'block';
}

// Load all events for the modal
async function loadAllEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        displayAllEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function displayAllEvents(events) {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;
    
    eventsList.innerHTML = events.map(event => `
        <div class="calendar-event" data-event-id="${event.id}">
            <div class="event-date">
                <span class="event-day">${new Date(event.date).getDate()}</span>
                <span class="event-month">${new Date(event.date).toLocaleDateString('en', {month: 'short'})}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <span class="event-time">${event.time || 'All Day'}</span>
            </div>
            <button class="btn btn-outline learn-more-sm" data-event-id="${event.id}">Details</button>
        </div>
    `).join('');
    
    // Add event listeners to detail buttons
    document.querySelectorAll('.learn-more-sm').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showEventDetails(eventId);
        });
    });
}

// Event action functions
function registerForEvent(eventId) {
    // Simulate registration
    alert(`Registration for event ${eventId} would be processed here!`);
}

function addToCalendar(eventId) {
    // Simulate calendar add
    alert(`Event ${eventId} added to your calendar!`);
}

function downloadCalendar() {
    alert('School calendar download would start here!');
}

function subscribeNewsletter() {
    const input = document.querySelector('.newsletter-input');
    if (input && input.value) {
        alert(`Thank you for subscribing with: ${input.value}`);
        input.value = '';
    } else {
        alert('Please enter your email address');
    }
}