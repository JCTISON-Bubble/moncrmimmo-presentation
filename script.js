document.addEventListener('DOMContentLoaded', () => {
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

    function updatePrice() {
        const nbUtilisateurs = parseInt(nbUtilisateursInput.value, 10);
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

        const prix12Mois = total * 0.8; // -20%
        const prixRent = total * 0.7; // -30%

        totalPriceSpan.textContent = total.toFixed(2);
        price12MonthsSpan.textContent = prix12Mois.toFixed(2);
        priceRentSpan.textContent = prixRent.toFixed(2);
    }

    nbUtilisateursInput.addEventListener('input', updatePrice);
    estimationCheckbox.addEventListener('change', updatePrice);
    homestagingCheckbox.addEventListener('change', updatePrice);

    updatePrice();
});
