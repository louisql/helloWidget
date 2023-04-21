document.addEventListener("DOMContentLoaded", () => {
    let nbreOfOffers;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    //Receiving message from the react website with the nber of offers
    window.addEventListener("message", (event) => {
        nbreOfOffers = event.data;

        //Was required to set the parameters here and in loops as two messages are coming from the react app, initial message empty, second one with relevant parameters
        if (Number.isInteger(nbreOfOffers)) {
            widgetHeight = calculateWidgetHeight(nbreOfOffers);
            newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);
        }
    });

    const simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(simbudLink)) {
            let dataWidget = elWidget.getAttribute("data-widget");

            //Make sure to update to real url !
            // let url = "http://localhost:3001/"
            let url = "https://cute-syrniki-030b45.netlify.app/"
            newIframe.src = url;
            newIframe.id = "eda";
            newIframe.className = "widgetIframeElement";
            //Setting basic style for initial loading
            newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: 320px`;
            newIframe.setAttribute("data-widget", dataWidget);
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);

        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

});

const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}

const calculateWidgetHeight = (nbreOfOffers) => {
    let widgetHeight = 320;

    if (nbreOfOffers > 3) {
        widgetHeight += Math.floor((nbreOfOffers - 1) / 3) * 220;
    }

    if (nbreOfOffers === 0) {
        widgetHeight = 180;
    }

    return widgetHeight;
}
