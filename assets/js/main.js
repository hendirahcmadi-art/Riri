// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (link) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ===== SCROLL ANIMATION (Fade In) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ===== NAVBAR SHADOW ON SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 20px rgba(236, 72, 153, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(236, 72, 153, 0.08)';
    }
});

// ===== LIGHTBOX FOTO PROFIL =====
const fotoProfil = document.getElementById('fotoProfil');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');

if (fotoProfil) {
    fotoProfil.addEventListener('click', () => {
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ===== MUSIC PLAYER =====
const audioPlayer = document.getElementById('audioPlayer');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicNext = document.getElementById('musicNext');
const musicTitle = document.getElementById('musicTitle');
const musicSubtitle = document.getElementById('musicSubtitle');

const playlist = [
    {
        title: 'Back to December',
        artist: 'Taylor Swift',
        src: 'assets/audio/back-to-december.mp3'
    },
    {
        title: 'Fearless',
        artist: 'Taylor Swift',
        src: 'assets/audio/fearless.mp3'
    }
];

let currentSong = 0;

function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    musicTitle.textContent = song.title;
    musicSubtitle.textContent = song.artist;
}

loadSong(currentSong);

musicToggle.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        musicIcon.className = 'fas fa-pause';
        musicToggle.classList.add('playing');
    } else {
        audioPlayer.pause();
        musicIcon.className = 'fas fa-music';
        musicToggle.classList.remove('playing');
    }
});

musicNext.addEventListener('click', () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    audioPlayer.play();
    musicIcon.className = 'fas fa-pause';
    musicToggle.classList.add('playing');
});

audioPlayer.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    audioPlayer.play();
    musicIcon.className = 'fas fa-pause';
    musicToggle.classList.add('playing');
});