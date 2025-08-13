document.addEventListener('DOMContentLoaded', () => {

    /* --- GESTION DU SIMULATEUR DE COÛT --- */
    const nbUtilisateursInput = document.getElementById('nb_utilisateurs');
    const estimationCheckbox = document.getElementById('estimation');
    const homestagingCheckbox = document.getElementById('homestaging');
    const totalPriceSpan = document.getElementById('total_price');
    const price12MonthsSpan = document.getElementById('price_12_months');
    const priceRentSpan = document.getElementById('price_rent');

    const prixBaseOrganisation = 69;
    const prixBaseUtilisateur = 19;
    const prixModuleEstimation = 7;
    const prixModuleHomestaging = 25;

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = (start + progress * (end - start)).toFixed(2);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function updatePrice() {
        const nbUtilisateurs = parseInt(nbUtilisateursInput.value, 10) || 0;
        let total = prixBaseOrganisation;

        if (nbUtilisateurs > 0) {
            total += nbUtilisateurs * prixBaseUtilisateur;
        }

        if (estimationCheckbox.checked) {
            total += nbUtilisateurs * prixModuleEstimation;
        }

        if (homestagingCheckbox.checked) {
            total += prixModuleHomestaging;
        }

        const prix12Mois = total * 0.8;
        const prixRent = total * 0.7;

        animateValue(totalPriceSpan, parseFloat(totalPriceSpan.textContent), total, 500);
        animateValue(price12MonthsSpan, parseFloat(price12MonthsSpan.textContent), prix12Mois, 500);
        animateValue(priceRentSpan, parseFloat(priceRentSpan.textContent), prixRent, 500);
    }

    nbUtilisateursInput.addEventListener('input', updatePrice);
    estimationCheckbox.addEventListener('change', updatePrice);
    homestagingCheckbox.addEventListener('change', updatePrice);

    // Initialisation
    updatePrice();

    /* --- GESTION DES ANIMATIONS AU SCROLL --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));


    /* --- GESTION DU CARROUSEL DE TÉMOIGNAGES --- */
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;

    function updateCarousel() {
        testimonialCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        navDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
        });
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});
