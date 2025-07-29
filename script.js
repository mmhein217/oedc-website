document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // About tabs functionality
    const aboutTabs = document.querySelectorAll('.about-tab');
    const aboutContents = document.querySelectorAll('.about-content');
    
    // Show first tab content by default
    if (aboutContents.length > 0) {
        aboutContents[0].classList.remove('hidden');
        aboutContents[0].classList.add('active');
    }

    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            
            // Close dropdown menu after selection on mobile
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.add('hidden');
                const toggle = dropdownMenu.previousElementSibling;
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                    const icon = toggle.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = '';
                }
            }
            
            // Hide all content sections with fade out
            aboutContents.forEach(content => {
                if (content.classList.contains('active')) {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.classList.add('hidden');
                        content.classList.remove('active');
                        
                        // Show target content with fade in
                        const targetContent = document.getElementById(targetId);
                        if (targetContent) {
                            targetContent.classList.remove('hidden');
                            setTimeout(() => {
                                targetContent.classList.add('active');
                                targetContent.style.opacity = '1';
                                
                                // Smooth scroll to content on mobile
                                if (window.innerWidth < 768) {
                                    targetContent.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }
                            }, 50);
                        }
                    }, 300);
                }
            });
            
            // Update active state of tabs
            aboutTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Dropdown functionality for all dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            const dropdownMenu = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherMenu = otherToggle.nextElementSibling;
                    otherMenu.classList.add('hidden');
                    otherToggle.setAttribute('aria-expanded', 'false');
                    const otherIcon = otherToggle.querySelector('.fa-chevron-down');
                    if (otherIcon) otherIcon.style.transform = '';
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('hidden');
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Rotate arrow icon
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                icon.style.transform = isExpanded ? '' : 'rotate(180deg)';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
            const toggles = document.querySelectorAll('.dropdown-toggle');
            toggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                const icon = toggle.querySelector('.fa-chevron-down');
                if (icon) icon.style.transform = '';
            });
        }
    });

    // Programs section dropdown functionality
    const programButtons = document.querySelectorAll('.program-dropdown button[data-target]');
    
    programButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.fa-chevron-down');
            const isExpanding = content.classList.contains('hidden');
            
            // Close other program contents first
            document.querySelectorAll('.program-dropdown [id$="-content"]').forEach(el => {
                if (el.id !== targetId) {
                    el.classList.add('hidden');
                    const otherButton = document.querySelector(`button[data-target="${el.id}"]`);
                    if (otherButton) {
                        const otherIcon = otherButton.querySelector('.fa-chevron-down');
                        if (otherIcon) otherIcon.style.transform = '';
                    }
                }
            });
            
            // Toggle current content with smooth animation
            if (content) {
                if (isExpanding) {
                    content.classList.remove('hidden');
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.opacity = '1';
                    }, 10);
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.classList.add('hidden');
                    }, 300);
                }

                if (icon) {
                    icon.style.transform = isExpanding ? 'rotate(180deg)' : '';
                }
            }
        });
    });

    // Modal Management Functions
    function closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function openModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Donation Modal Functionality
    const showDonationDetails = document.getElementById('showDonationDetails');
    const donationModal = document.getElementById('donationModal');
    const closeDonationModal = document.getElementById('closeDonationModal');

    if (showDonationDetails && donationModal && closeDonationModal) {
        showDonationDetails.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(donationModal);
        });
        
        closeDonationModal.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(donationModal);
        });
        
        donationModal.addEventListener('click', function(e) {
            if (e.target === donationModal) {
                closeModal(donationModal);
            }
        });

        // Handle contact support button click
        const contactForSupport = donationModal.querySelector('[href="#contact"]');
        if (contactForSupport) {
            contactForSupport.addEventListener('click', () => {
                closeModal(donationModal);
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    // QR Code Modal Functionality
    const qrImage = document.getElementById('qrImage');
    const qrModal = document.getElementById('qrModal');
    const modalImage = document.getElementById('modalImage');
    const modalCloseBtn = document.querySelector('#qrModal .modal-close');


    if (qrImage && qrModal && modalImage && modalCloseBtn) {
        // Open modal and set image
        qrImage.addEventListener('click', () => {
            modalImage.src = qrImage.src;
            modalImage.alt = qrImage.alt;
            qrModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Close modal on close button
        modalCloseBtn.addEventListener('click', () => {
            qrModal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside the image area
        qrModal.addEventListener('click', (e) => {
            // Only close if clicking the backdrop, not the image or modal content
            if (e.target === qrModal) {
                qrModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (!qrModal.classList.contains('hidden') && e.key === 'Escape') {
                qrModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

    }

    // Update the global escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (donationModal) closeModal(donationModal);
            if (qrModal) closeModal(qrModal);
        }
    });

    // Handle navigation links smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Program section dropdowns and navigation
    const programLinks = document.querySelectorAll('.program-dropdown button, a[href^="#oedc-content"], a[href^="#occ-content"]');
    programLinks.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target content ID
            const targetId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            const content = document.getElementById(targetId);
            const programsSection = document.getElementById('programs');
            
            if (content && programsSection) {
                // First scroll to programs section
                programsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Show the target content and hide others
                document.querySelectorAll('.program-dropdown [id$="-content"]').forEach(el => {
                    if (el.id === targetId) {
                        el.classList.remove('hidden');
                        // Rotate the corresponding button's icon
                        const button = document.querySelector(`button[data-target="${targetId}"]`);
                        if (button) {
                            const icon = button.querySelector('.fa-chevron-down');
                            if (icon) {
                                icon.style.transform = 'rotate(180deg)';
                            }
                        }
                    } else {
                        el.classList.add('hidden');
                        // Reset other icons
                        const otherButton = document.querySelector(`button[data-target="${el.id}"]`);
                        if (otherButton) {
                            const icon = otherButton.querySelector('.fa-chevron-down');
                            if (icon) {
                                icon.style.transform = '';
                            }
                        }
                    }
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Close any open dropdowns in header
                const dropdowns = document.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
                const toggles = document.querySelectorAll('.dropdown-toggle');
                toggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    const icon = toggle.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = '';
                });
            }
        });
    });

    // Handle About tab clicks
    document.querySelectorAll('.about-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Hide all about content sections
            document.querySelectorAll('.about-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected content
            const selectedContent = document.getElementById(tabId);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
            }
            
            // Close dropdown after selection
            const dropdown = this.closest('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.add('hidden');
                const toggle = dropdown.previousElementSibling;
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                    const icon = toggle.querySelector('.fa-chevron-down');
                    if (icon) icon.style.transform = '';
                }
            }
        });
    });

    // Global escape key handler for all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(donationModal);
            closeModal(qrModal);
        }
    });
});
