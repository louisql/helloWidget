document.addEventListener("DOMContentLoaded", function () {
    const simbudLink = document.querySelector("a[href*='https://www.simbud.ca']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    

});

const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
} 

const calculateWidgetHeight = (data) => {
    let widgetHeight = 310;

    // Transformation de la reponse
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // Comptage du nombre d'offres, en multiple de 3
    const count = doc.getElementsByClassName("proposal_plans__box").length;
    if (count > 3) {
        widgetHeight += Math.floor((count - 1) / 3) * 210;
    }

    if (count === 0 ) {
        widgetHeight = 180;
    }

    return widgetHeight;
}