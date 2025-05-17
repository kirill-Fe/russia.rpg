        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.feature-card, .gallery-item').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
        // Галерея с модальным окном
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeModal = document.createElement('span');
    closeModal.className = 'close-modal';
    closeModal.innerHTML = '&times;';
    
    const prevBtn = document.createElement('span');
    prevBtn.className = 'nav-modal prev-modal';
    prevBtn.innerHTML = '&larr;';
    
    const nextBtn = document.createElement('span');
    nextBtn.className = 'nav-modal next-modal';
    nextBtn.innerHTML = '&rarr;';
    
    const modalImg = document.createElement('img');
    
    modalContent.appendChild(modalImg);
    modalContent.appendChild(closeModal);
    modalContent.appendChild(prevBtn);
    modalContent.appendChild(nextBtn);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    function openModal(index) {
        currentIndex = index;
        modalImg.src = images[currentIndex];
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigate(direction) {
        currentIndex += direction;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        modalImg.src = images[currentIndex];
    }
    
    // Открытие модального окна при клике на изображение
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', closeModalFunc);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModalFunc();
    });
    
    // Навигация по изображениям
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });
    
    // Навигация с помощью клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modalOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModalFunc();
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    });
});