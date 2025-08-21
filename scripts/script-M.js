document.addEventListener('DOMContentLoaded', function () {

    /**
     * ------------------------------------------------------------------------
     * MÓDULO 1: NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
     * ------------------------------------------------------------------------
     */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links-container');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    /**
     * ------------------------------------------------------------------------
     * MÓDULO 2: REPRODUCTOR DE AUDIO PARA LA SECCIÓN DE MÚSICA
     * ------------------------------------------------------------------------
     */
    const songCards = document.querySelectorAll('.song-card');

    songCards.forEach(card => {
        const audio = card.querySelector('audio');
        const playButton = card.querySelector('.play-button');
        const progressBar = card.querySelector('.progress-bar');
        const progress = card.querySelector('.progress');

        if (!audio || !playButton || !progressBar || !progress) return;

        playButton.addEventListener('click', () => {
            const isPlaying = card.classList.contains('playing');

            // Pausar todas las demás canciones antes de reproducir la nueva
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.closest('.song-card').classList.remove('playing');
                    otherAudio.closest('.song-card').querySelector('.play-button').textContent = '▶';
                }
            });

            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        });

        audio.addEventListener('play', () => {
            card.classList.add('playing');
            playButton.textContent = '❚❚';
        });

        audio.addEventListener('pause', () => {
            card.classList.remove('playing');
            playButton.textContent = '▶';
        });

        audio.addEventListener('timeupdate', () => {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
        });

        progressBar.addEventListener('click', (e) => {
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = (clickX / width) * duration;
            }
        });

        audio.addEventListener('ended', () => {
            progress.style.width = '0%';
        });
    });

    /**
     * ------------------------------------------------------------------------
     * MÓDULO 3: GALERÍA DE FOTOS CON LIGHTBOX
     * ------------------------------------------------------------------------
     */
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const gridImageItems = document.querySelectorAll('.grid-item img');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        let currentIndex;

        const showImage = (index) => {
            if (index < 0 || index >= gridImageItems.length) return;
            lightboxImg.src = gridImageItems[index].src;
            currentIndex = index;
            lightbox.classList.add('active');
        };

        gridImageItems.forEach((item, index) => {
            item.addEventListener('click', () => showImage(index));
        });

        const closeLightbox = () => lightbox.classList.remove('active');
        const showPrevImage = () => showImage((currentIndex > 0) ? currentIndex - 1 : gridImageItems.length - 1);
        const showNextImage = () => showImage((currentIndex < gridImageItems.length - 1) ? currentIndex + 1 : 0);

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        window.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
    }
});
