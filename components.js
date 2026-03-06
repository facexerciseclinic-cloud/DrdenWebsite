// ============================================
// COMPONENTS LOADER
// ============================================

// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load header
    await loadComponent('header-placeholder', 'components/header.html');
    
    // Load footer
    await loadComponent('footer-placeholder', 'components/footer.html');
    
    // After loading header, initialize mobile menu
    initializeMobileMenu();
    
    // Set active navigation link
    setActiveNavLink();
});

// Initialize mobile menu after header is loaded
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Lock/unlock body scroll via class (preserves sticky/fixed behavior)
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('mobile-menu-open');
            } else {
                document.body.classList.remove('mobile-menu-open');
            }
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Initialize floating contact button
    const contactToggle = document.getElementById('contactToggle');
    const floatingMenu = document.getElementById('floatingMenu');

    if (contactToggle && floatingMenu) {
        contactToggle.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');
            contactToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!contactToggle.contains(e.target) && !floatingMenu.contains(e.target)) {
                floatingMenu.classList.remove('active');
                contactToggle.classList.remove('active');
            }
        });
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === 'reviews.html' && href === 'reviews.html')) {
            link.classList.add('active');
        }
    });
}
