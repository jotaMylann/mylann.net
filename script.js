document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '⬆️';
    backToTopButton.id = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Sidenote functionality
    const sidenotes = document.querySelectorAll('.sidenote');
    sidenotes.forEach(note => {
        note.addEventListener('mouseenter', () => {
            note.style.transform = 'scale(1.05)';
        });
        note.addEventListener('mouseleave', () => {
            note.style.transform = 'scale(1)';
        });
    });

    // Apply animations on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });
    const elementsToAnimate = document.querySelectorAll('.container, h2, h3, p, blockquote, ul, ol, table');
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});

// Add styles for hidden and visible classes
const style = document.createElement('style');
style.innerHTML = `
.hidden {
    opacity: 0;
    transition: opacity 1s ease-in-out, transform 1s ease-in-out, filter 1s ease-in-out;
}
.visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}
`;
document.head.appendChild(style);
