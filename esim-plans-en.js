document.addEventListener("DOMContentLoaded", () => {
    let reactAppHeight;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    let simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    // Get referal value from data-attribute
    const referalValue = document.querySelector('.simbud-esim-plans-widget').getAttribute('data-referal');
    
    // Get the a
    const poweredByLink = document.getElementById('poweredByLink');

    if (referalValue !== ""){
        // Update the href attribute of the link with the dynamic URL
        poweredByLink.href = `https://www.simbud.com/?referal=${referalValue}`;
    }
    // in case we want it to be visible that redirection from other website && that its widget attribute data-referal is empty
    else {
        poweredByLink.href = `https://www.simbud.com/?referal=null`;
    }

    elWidgets.forEach(elWidget => {
        const country = elWidget.dataset.country || 'Canada';

        // check if there is utm_source param in url
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var utmSource = urlParams.get("utm_source");

        // initialize referal before assignment
        var referal = null;

        // set data-referal as utm_source if yes, else 
        if (utmSource) {
            // console.log("utm_source: " + utmSource);
            elWidget.dataset.referal = utmSource;
            referal = elWidget.dataset.referal;
        } else {
            // console.log("utm_source not found in the URL.");
            referal = elWidget.dataset.referal || '';
        }

        const currency = elWidget.dataset.currency || 'CAD';
        const offersDisplayed = elWidget.dataset.offersdisplayed || 6;
        const language = elWidget.dataset.language || 'en';
        const provider = elWidget.dataset.provider || '';

        let url = "https://simbud.com/widgetActualite/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language + "&provider=" + provider;

        newIframe.src = url;
        // newIframe.src = "http://localhost:3000/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language + "&provider=" + provider;
        newIframe.id = "eda";
        newIframe.className = "widgetIframeElement";
        //Setting basic style for initial loading
        newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;

        if (linkIsUpAndFollows(simbudLink)) {
            let dataWidget = elWidget.getAttribute("data-widget");

            newIframe.setAttribute("data-widget", dataWidget);
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);

        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

    //Receiving message from the react website with the number of offers
    window.addEventListener("message", (event) => {
        reactAppHeight = event.data;
        if (Number.isInteger(reactAppHeight)) {
            widgetHeight = calculateWidgetHeight(reactAppHeight);
            newIframe.style = `border: 0; margin: 0 auto;top:0px; width:100%; height:${widgetHeight}px;`;
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);
        }
    });
});

const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}

const calculateWidgetHeight = (data) => {
    widgetHeight = data + 50;
    return widgetHeight;
}
