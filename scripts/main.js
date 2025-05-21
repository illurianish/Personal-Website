document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuBtn.textContent = mobileMenu.classList.contains('active') ? 'Close' : 'Menu';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.textContent = 'Menu';
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.textContent = 'Menu';
            }
        });
    }

    // Dropdown menu functionality
    const homeLink = document.querySelector('.home-link');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const nav = document.querySelector('.nav-logo');

    // Toggle dropdown on mobile
    if (window.innerWidth <= 768) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.nav-header').offsetHeight;
                const extraOffset = 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuBtn.textContent = 'Menu';
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add scroll-based navbar background
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background on scroll
        const header = document.querySelector('.nav-header');
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }

        lastScroll = currentScroll;
    });
}); 