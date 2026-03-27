/* =========================================
   0. PRELOADER & THEME TOGGLE
   ========================================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.loader-progress');

    if (preloader) {
        // Simulate progress
        setTimeout(() => progressBar.style.width = '30%', 100);
        setTimeout(() => progressBar.style.width = '60%', 200);
        setTimeout(() => progressBar.style.width = '100%', 350);

        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            reveal(); // Initial reveal after preloader
        }, 500);
    } else {
        reveal(); // Initial reveal if no preloader
    }
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);

    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = targetTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// Initial theme check
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
window.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // --- FIX: Force Floating Elements to Body Root to avoid Nesting Issues ---
    const nextFunnel = document.getElementById('next-page-funnel');
    const waButton = document.querySelector('.float-wa');
    
    if (nextFunnel) document.body.appendChild(nextFunnel);
    if (waButton) document.body.appendChild(waButton);

    // Initial check
    checkScroll();
});

// Force check on scroll and resize
window.addEventListener("scroll", () => {
    checkScroll();
    reveal();
});
window.addEventListener("resize", () => {
    checkScroll();
    reveal();
});

function goBack() {
    window.history.back();
}

/* =========================================
   1. MOBILE MENU (SLIDE-IN + CLICK OUTSIDE)
   ========================================= */
const navLinks = document.getElementById('navLinks');
// Select the menu button using its class (since we changed it to an icon)
const menuBtn = document.querySelector('.menu-btn');

// Function to toggle the menu open/close
function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Logic to close the menu when clicking outside of it
document.addEventListener('click', function (event) {
    if (!navLinks || !menuBtn) return; // Guard against missing elements
    
    // Check if the click is INSIDE the menu or ON the button
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnBtn = menuBtn.contains(event.target);

    // If the menu is open AND the click is NOT inside menu AND NOT on button -> Close it
    if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnBtn) {
        navLinks.classList.remove('active');
    }
});


/* =========================================
   2. HERO SLIDER (SMOOTH ANIMATION - FIXED IMAGES)
   ========================================= */
const heroBg = document.getElementById('hero-bg');
const heroTitle = document.getElementById('hero-title');

// Only run this code if we are on the Home Page (elements exist)
if (heroBg && heroTitle) {
    const heroBg2 = document.getElementById('hero-bg-2');
    const slides = [
        {
            image: "images/hero-1.webp",
            title: "Profits over Likes. <br><span style='color:#f97316'>Results over Posts.</span>"
        },
        {
            image: "images/hero-2.webp",
            title: "Digital Sales Engine. <br><span style='color:#f97316'>Built for Growth.</span>"
        },
        {
            image: "images/hero-3.webp",
            title: "We focus on your goals <br><span style='color:#f97316'>while you run your business.</span><br><span style='font-size:1.5rem; color:white;'>Digital growth, simplified.</span>"
        }
    ];

    let currentSlide = 0;
    let activeLayer = 1; // 1 = heroBg, 2 = heroBg2

    // Set initial state
    heroBg.style.backgroundImage = `url('${slides[0].image}')`;
    heroBg.classList.add('active');

    function changeHero() {
        // Step 1: Fade Out TEXT
        heroTitle.classList.add('fade-out');

        setTimeout(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            const nextImage = slides[currentSlide].image;
            const nextTitle = slides[currentSlide].title;

            if (activeLayer === 1) {
                // Layer 1 is active, fade in Layer 2
                heroBg2.style.backgroundImage = `url('${nextImage}')`;
                heroBg2.classList.add('active');
                heroBg.classList.remove('active');
                activeLayer = 2;
            } else {
                // Layer 2 is active, fade in Layer 1
                heroBg.style.backgroundImage = `url('${nextImage}')`;
                heroBg.classList.add('active');
                heroBg2.classList.remove('active');
                activeLayer = 1;
            }

            heroTitle.innerHTML = nextTitle;
            heroTitle.classList.remove('fade-out');
        }, 800);
    }

    // Change slide every 6 seconds
    setInterval(changeHero, 6000);
}


/* =========================================
   3. WHATSAPP FORM INTEGRATION
   ========================================= */

// ⚠️ වැදගත්: ඔයාගේ WhatsApp නම්බර් එක මෙතනට දාන්න (94...)
const myNumber = "94711098429";


// --- A. HOME PAGE FORM HANDLER ---
const homeForm = document.getElementById('homeContactForm');
if (homeForm) {
    homeForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop page reload

        const name = document.getElementById('name').value;
        const business = document.getElementById('businessName').value;
        const service = document.getElementById('serviceSelection').value;

        const msg = `Hi BizMax (Home), I am ${name}. \nBusiness: ${business}. \nSelected Service: ${service}`;

        // Open WhatsApp
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}


// --- B. SERVICES PAGE FORM HANDLER ---
const servicesForm = document.getElementById('servicesContactForm');
if (servicesForm) {
    servicesForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('serviceName').value;
        const business = document.getElementById('serviceBusiness').value;
        const userDescription = document.getElementById('serviceMessage').value;

        const msg = `Hi BizMax (Services), I am ${name}. \nBusiness: ${business}. \nRequirement: ${userDescription}`;

        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}


// --- C. PRICING PAGE FORM HANDLER (Multi-Select) ---
const pricingForm = document.getElementById('pricingContactForm');
if (pricingForm) {
    pricingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('pName').value;
        const business = document.getElementById('pBusiness').value;

        // 1. Get all checked checkboxes (Chips)
        const checkedBoxes = document.querySelectorAll('.service-chip input:checked');

        // 2. Collect values into an array
        let selectedServices = [];
        checkedBoxes.forEach((checkbox) => {
            selectedServices.push(checkbox.value);
        });

        // 3. Create a string list
        let servicesString = selectedServices.length > 0 ? selectedServices.join(', ') : "No specific services selected";

        const msg = `Hi BizMax (Custom Plan), I am ${name}. \nBusiness: ${business}. \n\nI want a quote for: \n👉 ${servicesString}`;

        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}


// --- D. CONTACT PAGE FORM HANDLER ---
const contactPageForm = document.getElementById('contactPageForm');
if (contactPageForm) {
    contactPageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('cName').value;
        const email = document.getElementById('cEmail').value;
        const business = document.getElementById('cBusiness').value || "Not specified";
        const requirement = document.getElementById('cRequirement').value;
        const message = document.getElementById('cMessage').value;

        const whatsappMsg = `Hi BizMax Team, \n\nI am ${name} (${email}). \nBusiness: ${business}. \nRequirement: ${requirement} \n\nMessage: ${message}`;

        // Open WhatsApp
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

        // Optional: Show success message (since we can't do real email without backend)
        alert('Thank you! Redirecting to WhatsApp for final submission...');
    });
}

/* =========================================
   4. SCROLL REVEAL ANIMATION
   ========================================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

/* =========================================
   5. NEXT PAGE FUNNEL TRIGGER
   ========================================= */
function checkScroll() {
    const nextFunnel = document.getElementById('next-page-funnel');
    const waButton = document.querySelector('.float-wa');
    const heroSection = document.querySelector('.hero-section');
    
    if (!nextFunnel && !waButton) return;
    
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // 1. WhatsApp Button visibility: Show after 300px
    if (waButton) {
        if (scrollY > 300) waButton.classList.add('active');
        else waButton.classList.remove('active');
    }
    
    // 2. Next Page Button visibility: Show when nearing the bottom (90%)
    if (nextFunnel) {
        const scrollPercent = (scrollY + clientHeight) / scrollHeight;
        if (scrollPercent > 0.37) {
            nextFunnel.classList.add('active');
        } else {
            nextFunnel.classList.remove('active');
        }
    }
}

// --- 6. TESTIMONIAL SLIDER (INFINITE LOOP) ---
let testiCurrentIndex = 1; // Start at 1 because of clone
let isMoving = false;

function initTestiSlider() {
    const track = document.getElementById('testiTrack');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.testi-card-small'));
    if (cards.length === 0) return;

    // Clone first and last for seamless loop
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.prepend(lastClone);

    const cardWidth = cards[0].offsetWidth + 32;
    const containerWidth = track.parentElement.offsetWidth;
    const offset = (containerWidth - cards[0].offsetWidth) / 2;

    track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset}px)`;

    // Handle transition end to jump back/forward
    track.addEventListener('transitionend', () => {
        const updatedCards = track.querySelectorAll('.testi-card-small');
        if (testiCurrentIndex === updatedCards.length - 1) {
            track.style.transition = 'none';
            testiCurrentIndex = 1;
            track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset}px)`;
        }
        if (testiCurrentIndex === 0) {
            track.style.transition = 'none';
            testiCurrentIndex = updatedCards.length - 2;
            track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset}px)`;
        }
        isMoving = false;
    });
}

function scrollTestimonials(direction) {
    if (isMoving) return;
    const track = document.getElementById('testiTrack');
    if (!track) return;

    const cards = track.querySelectorAll('.testi-card-small');
    const cardWidth = cards[0].offsetWidth + 32;
    const containerWidth = track.parentElement.offsetWidth;
    const offset = (containerWidth - cards[0].offsetWidth) / 2;

    isMoving = true;
    testiCurrentIndex += direction;
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset}px)`;
}

// Initial Peek (adjusted for center)
function initTestiPeek() {
    const track = document.getElementById('testiTrack');
    if (!track) return;
    const card = track.querySelector('.testi-card-small');
    const cardWidth = card.offsetWidth + 32;
    const containerWidth = track.parentElement.offsetWidth;
    const offset = (containerWidth - card.offsetWidth) / 2;

    setTimeout(() => {
        track.style.transition = 'transform 0.6s ease';
        track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset + 40}px)`;
        setTimeout(() => {
            track.style.transform = `translateX(-${testiCurrentIndex * cardWidth - offset}px)`;
        }, 800);
    }, 1500);
}

// Removed redundant scroll listeners here since we added them above
