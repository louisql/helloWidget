document.addEventListener("DOMContentLoaded", () => {
    let reactAppHeight;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    let simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    // Get referal value from data-attribute
    const referalValue = document.querySelector('.simbud-esim-plans-widget').getAttribute('data-referal');
    
    const poweredByLink = document.getElementById('poweredByLink');
    
    // check if there is utm_source param in url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var utmSource = urlParams.get("utm_source");

    // change data-attribute value & link if (utm_source) 
    if(utmSource && utmSource !== ""){
        document.querySelector('.simbud-esim-plans-widget').setAttribute('data-referal', utmSource);
        poweredByLink.href = `https://www.simbud.com/?referal=${utmSource}`;
    }
    // change link in all other cases
    else if(referalValue !== ""){
        poweredByLink.href = `https://www.simbud.com/?referal=${referalValue}`;
    }else{
        poweredByLink.href = `https://www.simbud.com/?referal=null`;
    }

    elWidgets.forEach(elWidget => {
        const country = elWidget.dataset.country || 'Canada';
        const referal = elWidget.dataset.referal || '';
        const currency = elWidget.dataset.currency || 'CAD';
        const offersDisplayed = elWidget.dataset.offersdisplayed || 6;
        const language = elWidget.dataset.language || 'en';
        const provider = elWidget.dataset.provider || '';
        const theme = elWidget.dataset.theme || 'simbud';

        let url = "https://simbud.com/widgetActualite/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language + "&provider=" + provider + "&theme=" + theme;

        // newIframe.src = url;
        newIframe.src = "http://localhost:3000/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language + "&provider=" + provider + "&theme=" + theme;
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
