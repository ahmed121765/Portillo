/**
 * Ahmed Ashraf Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Theme Toggle & LocalStorage
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        htmlElement.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    /* ==========================================================================
       Scroll Progress Bar
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercentage + '%';
    });

    /* ==========================================================================
       Sticky Navbar & Active Links
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active Links
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Mobile Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        if (mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    /* ==========================================================================
       Back to Top Button
       ========================================================================== */
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Project Details Data & Modal Logic
       ========================================================================== */
    const projectsData = {
        1: {
            title: "Hospital Management System",
            description: "A comprehensive and scalable hospital management system designed to streamline healthcare operations. Built with a focus on role-based access control and efficient data management.",
            technologies: ["Laravel", "PHP", "MySQL", "Livewire", "Tailwind CSS", "Vite"],
            features: [
                "Role-based authentication and authorization (Admin, Doctor, Patient, etc.)",
                "Comprehensive patient records management",
                "Doctors management and scheduling",
                "Department and ward management",
                "Appointment booking system",
                "Laboratories and radiology integration",
                "Automated billing and invoicing",
                "Insurance processing module",
                "Multilingual support integration"
            ],
            architecture: [
                "MVC (Model-View-Controller) Architecture",
                "Repository Design Pattern for data access",
                "Eloquent ORM for database interactions",
                "Normalized MySQL database design"
            ]
        },
        2: {
            title: "School Management System",
            description: "A comprehensive educational platform managing all academic and administrative aspects of a school environment, facilitating communication between teachers, students, and parents.",
            technologies: ["Laravel", "PHP", "MySQL", "Livewire", "Bootstrap"],
            features: [
                "Multi-guard authentication system",
                "Complete CRUD operations for school entities",
                "Robust server-side form validation",
                "Complex database relationships handling",
                "Responsive role-based dashboards",
                "Real-time interactions using Livewire",
                "Attendance tracking and examination grading",
                "Fee management and online classes scheduling"
            ],
            architecture: [
                "MVC Architecture",
                "Service classes for business logic",
                "Optimized database queries"
            ]
        },
        3: {
            title: "Invoice Management System",
            description: "A streamlined financial tool for businesses to manage their customers, generate professional invoices, and track payment statuses efficiently.",
            technologies: ["Laravel", "PHP", "MySQL"],
            features: [
                "Customer profile management",
                "Dynamic invoice generation and PDF export",
                "Secure authentication and session management",
                "Complete CRUD functionality",
                "Real-time payment status tracking",
                "Strict server-side data validation"
            ],
            architecture: [
                "Standard Laravel MVC pattern",
                "Normalized MySQL database schema",
                "Optimized Eloquent ORM relationships and queries"
            ]
        },
        4: {
            title: "Integrated E-Commerce Platform",
            description: "An integrated e-commerce application built with Laravel, providing a user interface to browse products, search, add to cart or favorites, and complete orders with discount coupons. Includes a comprehensive admin dashboard.",
            technologies: ["Laravel", "Blade", "Tailwind CSS", "Vite", "MySQL"],
            features: [
                "User interface for product browsing and advanced search",
                "Shopping cart and favorites system",
                "Discount coupons and order checkout process",
                "Order status tracking",
                "Admin dashboard for products, categories, brands, and offers",
                "Management of orders, customers, and contact messages",
                "Authentication system and user account management"
            ],
            architecture: [
                "MVC Architecture",
                "Robust Authentication and Authorization",
                "Integration with Tailwind CSS and Vite for Frontend"
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalFeatures = document.getElementById('modal-features');
    const modalArchitecture = document.getElementById('modal-architecture');
    const architectureSection = document.getElementById('modal-architecture-section');

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        
        // Populate Technologies
        modalTech.innerHTML = '';
        data.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'skill-badge';
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        // Populate Features
        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        // Populate Architecture
        if (data.architecture && data.architecture.length > 0) {
            architectureSection.style.display = 'block';
            modalArchitecture.innerHTML = '';
            data.architecture.forEach(arch => {
                const li = document.createElement('li');
                li.textContent = arch;
                modalArchitecture.appendChild(li);
            });
        } else {
            architectureSection.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       Contact Form Validation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            
            // Validate Name
            if (name.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate Subject
            if (subject.value.trim() === '') {
                document.getElementById('subject-error').textContent = 'Subject is required';
                isValid = false;
            }
            
            // Validate Message
            if (message.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If valid, show success message and reset form
            if (isValid) {
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }
});
