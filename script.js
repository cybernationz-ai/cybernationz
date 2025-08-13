// Auto-typing effect for tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize auto-typing when page loads
document.addEventListener('DOMContentLoaded', function() {
    const autoTypeElement = document.getElementById('auto-type');
    if (autoTypeElement) {
        const originalText = autoTypeElement.textContent;
        typeWriter(autoTypeElement, originalText, 80);
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Function to toggle menu
function toggleMenu() {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle menu on button click
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !menuBtn.contains(e.target) && 
        !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CTA button hover effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.transform = 'scale(1.05)';
        ctaButton.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
    });

    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.transform = 'scale(1)';
        ctaButton.style.boxShadow = 'none';
    });
}

// Job Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainFilterButtons = document.querySelectorAll('.filter-btn');
    const subFilterButtons = document.querySelectorAll('.sub-filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    const technicalSubfilters = document.querySelector('.technical-subfilters');
    const nonTechnicalSubfilters = document.querySelector('.non-technical-subfilters');

    // Show all cards initially
    jobCards.forEach(card => {
        card.classList.add('active');
    });

    // Handle main category filters
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all main buttons
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Hide all subfilters first
            technicalSubfilters.style.display = 'none';
            nonTechnicalSubfilters.style.display = 'none';
            technicalSubfilters.classList.remove('visible');
            nonTechnicalSubfilters.classList.remove('visible');

            // Show relevant subfilters
            if (filter === 'technical') {
                technicalSubfilters.style.display = 'flex';
                setTimeout(() => {
                    technicalSubfilters.classList.add('visible');
                }, 10);
            } else if (filter === 'non-technical') {
                nonTechnicalSubfilters.style.display = 'flex';
                setTimeout(() => {
                    nonTechnicalSubfilters.classList.add('visible');
                }, 10);
            }

            // Filter job cards
            jobCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.add('active');
                } else if (filter === 'technical') {
                    if (['fullstack', 'security', 'network', 'ctf', 'bug'].includes(card.getAttribute('data-category'))) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                } else if (filter === 'non-technical') {
                    if (['marketing', 'designer', 'editor', 'content'].includes(card.getAttribute('data-category'))) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                }
            });
        });
    });

    // Handle subcategory filters
    subFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all sub buttons
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            jobCards.forEach(card => {
                if (card.getAttribute('data-category') === filter) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
});

// Job Application Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close-modal');
    const applyButtons = document.querySelectorAll('.apply-btn');
    const jobTitleSpan = document.getElementById('jobTitle');
    const applicationForm = document.getElementById('applicationForm');

    // Open modal when Apply button is clicked
    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const jobCard = button.closest('.job-card');
            const position = jobCard.querySelector('h3').textContent;
            jobTitleSpan.textContent = position;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(applicationForm);
        const applicationData = {
            position: jobTitleSpan.textContent,
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            experience: formData.get('experience'),
            portfolio: formData.get('portfolio'),
            message: formData.get('message'),
            resume: formData.get('resume')
        };

        try {
            // Show loading state
            const submitBtn = applicationForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            const templateParams = {
                to_email: 'cybernationz1423@gmail.com',
                from_name: applicationData.fullName,
                from_email: applicationData.email,
                position: applicationData.position,
                phone: applicationData.phone,
                location: applicationData.location,
                experience: applicationData.experience,
                portfolio: applicationData.portfolio,
                message: applicationData.message,
                resume: applicationData.resume
            };

            // Initialize EmailJS with your public key
            emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

            // Send the email
            await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams);

            // Show success message
            alert('Thank you for your application! We will review your submission and get back to you soon.');
            
            // Reset form and close modal
            applicationForm.reset();
            modal.classList.remove('active');
            document.body.style.overflow = '';

        } catch (error) {
            console.error('Error submitting application:', error);
            alert('There was an error submitting your application. Please try again or contact us directly.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}); 