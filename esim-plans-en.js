document.addEventListener("DOMContentLoaded", function () {
    const simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");
    
    elWidgets.forEach(elWidget => {
        console.log(simbudLink)
        if (linkIsUpAndFollows(simbudLink)) {
            let newIframe = document.createElement('iframe');
            let dataWidget = elWidget.getAttribute("data-widget");
            let url = "https://cute-syrniki-030b45.netlify.app/" //Make sure to update to real url

            // Fetch to verify the number of offers and adapt the size of the iframe
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Error: Network response was not ok');
                    }
                })
                .then(data => {
                    let widgetHeight = calculateWidgetHeight(data);
                
                    // Set the iframe srcdoc attribute with the fetched HTML content
                    newIframe.src = url;
                
                    newIframe.className = "widgetIframeElement";
                    newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
                    newIframe.setAttribute("data-widget", dataWidget);
                
                    elWidget.prepend(newIframe);
                    elWidget.removeChild(elWidget.lastElementChild);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

});

const linkIsUpAndFollows = (link) => {
    console.log(link)
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

    if (count === 0) {
        widgetHeight = 180;
    }

    return widgetHeight;
}