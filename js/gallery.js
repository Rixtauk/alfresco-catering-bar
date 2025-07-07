// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.overlay-content h3').textContent;
            const description = this.querySelector('.overlay-content p').textContent;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox
    function closeLightboxModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeLightbox.addEventListener('click', closeLightboxModal);

    // Close on click outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxModal();
        }
    });

    // Dynamic gallery loading (for when you add more images)
    function loadGalleryImages() {
        // This function can be expanded to dynamically load images from a folder
        // For now, it's set up for manual addition of images
        
        // You could fetch a list of images from your images/gallery folder
        // and dynamically create gallery items
        
        // Example structure for adding new images:
        /*
        const newImages = [
            {
                src: '../images/gallery/your-image.jpg',
                title: 'Event Title',
                description: 'Event Description',
                size: 'size-small' // or size-wide, size-tall, size-large
            }
        ];
        
        newImages.forEach(imageData => {
            createGalleryItem(imageData);
        });
        */
    }

    function createGalleryItem(imageData) {
        const galleryGrid = document.querySelector('.gallery-grid');
        
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${imageData.size}`;
        
        galleryItem.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.title}">
            <div class="gallery-overlay">
                <div class="overlay-content">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                </div>
            </div>
        `;
        
        // Add click event for lightbox
        galleryItem.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.overlay-content h3').textContent;
            const description = this.querySelector('.overlay-content p').textContent;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        galleryGrid.appendChild(galleryItem);
    }

    // Lazy loading for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                entry.target.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all gallery items for lazy loading
    galleryItems.forEach(item => {
        imageObserver.observe(item);
    });

    // Masonry layout adjustment on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate grid layout if needed
            // Modern CSS Grid handles this automatically, but you could add custom logic here
        }, 250);
    });

    // Initialize
    loadGalleryImages();
});

// Utility function to shuffle gallery items (optional)
function shuffleGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = Array.from(galleryGrid.children);
    
    // Shuffle array
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    
    // Re-append in new order
    items.forEach(item => galleryGrid.appendChild(item));
}