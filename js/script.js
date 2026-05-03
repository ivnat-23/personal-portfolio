document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Components (Navbar & Footer)
    loadComponent('navbar', 'components/navbar.html');
    loadComponent('footer', 'components/footer.html');

    // 2. Dark Mode Logic
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Form Validation (Generic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    });
});

async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        if (id === 'navbar') {
            initNavbarLogic();
        }
    } catch (err) {
        console.error(`Error loading component ${id}:`, err);
    }
}

function initNavbarLogic() {
    const themeToggle = document.getElementById('theme-toggle');
    const navLinks = document.getElementById('nav-links');
    const mobileMenu = document.getElementById('mobile-menu');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
        
        // Initial icon set
        const currentTheme = document.documentElement.getAttribute('data-theme');
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    // Mobile Menu Toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileMenu.innerHTML = navLinks.classList.contains('show') ? '✕' : '☰';
        });
    }

    // Set initial emoji
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
            const count = parseInt(counter.innerText);
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        // updateCount(); // Will trigger via intersection observer if needed
    });
}
