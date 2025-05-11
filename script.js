
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (hamburger) {
                hamburger.addEventListener('click', function() {
                    navLinks.classList.toggle('show');
                });
            }
            
            // Modal functionality
            const modalTriggers = document.querySelectorAll('[data-modal]');
            const modalClose = document.querySelectorAll('.modal-close');
            const modals = document.querySelectorAll('.modal');
            
            modalTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modalId = this.getAttribute('data-modal');
                    document.getElementById(modalId).classList.add('show');
                });
            });
            
            modalClose.forEach(close => {
                close.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('show');
                });
            });
            
            window.addEventListener('click', function(e) {
                modals.forEach(modal => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            });
            
        });
            

        // Toggle FAQ items
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
      });
    });
    
    // Search functionality
    const searchBox = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.no-results');
    
    searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();
      let resultsFound = false;
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          resultsFound = true;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show/hide no results message
      if (resultsFound) {
        noResults.style.display = 'none';
      } else {
        noResults.style.display = 'block';
      }
    });

        //App download 

    // Animation for app features on scroll
    document.addEventListener('DOMContentLoaded', function() {
        // Animate counter numbers on page load
        animateValue('download-count', 0, 500, 2000);
        
        // Add hover effect to app image
        const appImage = document.getElementById('app-image');
        if (window.innerWidth > 992) { // Only on desktop
            document.querySelector('.app-image').addEventListener('mousemove', function(e) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                appImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
            
            document.querySelector('.app-image').addEventListener('mouseleave', function() {
                appImage.style.transform = 'rotateY(-15deg) rotateX(5deg)';
            });
        }
        
        // Track button clicks
        document.getElementById('apple-btn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('App Store button clicked');
            alert('Redirecting to App Store...');
        });
        
        document.getElementById('google-btn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Google Play button clicked');
            alert('Redirecting to Google Play...');
        });
    });
    
    // Counter animation function
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value + 'K+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
           
    // CTA Section

    // Create floating dots effect
    document.addEventListener('DOMContentLoaded', function() {
        const dotsContainer = document.getElementById('floating-dots');
        const dotsCount = 20;
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            // Random positioning
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.width = `${Math.random() * 6 + 3}px`;
            dot.style.height = dot.style.width;
            
            // Random delay and duration
            const animationDuration = Math.random() * 10 + 5;
            const animationDelay = Math.random() * 5;
            
            dot.style.animation = `float ${animationDuration}s infinite linear ${animationDelay}s`;
            
            dotsContainer.appendChild(dot);
        }
        
        // Button click effect
        document.getElementById('cta-button').addEventListener('click', function(e) {
            const button = e.currentTarget;
            
            // Create ripple effect
            const circle = document.createElement('div');
            const d = Math.max(button.clientWidth, button.clientHeight);
            
            circle.style.width = circle.style.height = `${d}px`;
            circle.style.left = `${e.clientX - button.offsetLeft - d/2}px`;
            circle.style.top = `${e.clientY - button.offsetTop - d/2}px`;
            circle.classList.add('ripple');
            
            // Alert for demo purposes
            alert('Booking service...');
        });
    });
            
           
           
            
       