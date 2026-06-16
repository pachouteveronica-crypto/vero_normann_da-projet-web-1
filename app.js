// MENU MOBILE (responsive)
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector(' .navbar');

if (menu && navbar) {
    menu.addEventListener('click', () => {
        // Ne pas utiliser toggle() avec plusieurs classes.
        // On change plutôt l'icône via add/remove.
        let isOpen = navbar.classList.contains('active');

        if (isOpen) {
            menu.classList.remove('fa-solid', 'fa-xmark');
            menu.classList.add('fa-solid', 'fa-bars');
        } else {
            menu.classList.remove('fa-solid', 'fa-bars');
            menu.classList.add('fa-solid', 'fa-xmark');
        }

        navbar.classList.toggle('active');
    });
}

// Fermer quand on clique ailleurs (mobile)
document.addEventListener('click', (e) => {
    const isMobile = () => window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile()) return;
    if (!navbar || !navbar.classList.contains('active')) return;

    const clickedInside = (navbar && navbar.contains(e.target)) || (menu && menu.contains(e.target));
    if (!clickedInside) navbar.classList.remove('active');
});





// OUVERTURE DU FORMULAIRE (guards pour éviter les erreurs si les éléments n'existent pas sur une page)
const openBtn = document.getElementById("open-create-trip");
const modal = document.getElementById("createTripModal");
const closeBtn = document.getElementById("form-close");

if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.hidden = false;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");


        // focus sur le premier champ (améliore l’UX)
        const firstField = modal.querySelector("input, select, textarea, button");
        firstField?.focus();

    });

    // FERMETURE DU FORMULAIRE
    closeBtn.addEventListener("click", () => {
        modal.hidden = true;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

    });



    // Fermer en cliquant à l'extérieur de la fenêtre
    window.addEventListener("click", (e) => {
        if (!modal.classList.contains("active")) return;

        // si on clique sur le backdrop lui-même (overlay)
        if (e.target === modal) {
            modal.classList.remove("active");
            modal.hidden = true;
            modal.setAttribute("aria-hidden", "true");
        }


    });

    // Fermer avec ESC
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            modal.hidden = true;
            modal.setAttribute("aria-hidden", "true");
        }


    });
}


// CHANGEMENT DES VIDÉOS
const videoBtns = document.querySelectorAll('.vid-btn');
const videoSlider = document.querySelector('#video-slider');

if (videoBtns.length && videoSlider) {
    videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.controls .active')
                ?.classList.remove('active');

            btn.classList.add('active');

            const src = btn.getAttribute('data-src');
            if (!src) return;

            videoSlider.src = src;
            videoSlider.load();
            videoSlider.play();
        });
    });
}

const form = document.getElementById('contactForm');
const result = document.getElementById('formResult');

// CONTACT: éviter l'erreur si le formulaire n'existe pas sur certaines pages
if (form && result) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const name = nameInput?.value?.trim() || '';

        result.classList.remove('error');
result.textContent = `Merci ${name}! Votre message a été envoyé (simulation).`;

        result.style.opacity = '1';
        form.reset();
    });
}
