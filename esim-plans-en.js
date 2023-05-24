document.addEventListener("DOMContentLoaded", () => {
    let reactAppHeight;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    let simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    //Sending the country and the referal to the react app
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlCountry = urlParams.get('country')
    const urlReferal = urlParams.get('referal')

    //Setting Canada as default country if no country is passed
    const country = (urlCountry === null ? 'Canada' : urlCountry.charAt(0).toUpperCase() + urlCountry.slice(1));
    const referal = (urlReferal === null ? '' : urlReferal.toLocaleLowerCase());

    //Make sure to update to real url !
    // let url = "http://localhost:3000/"+country+"&referal="+referal
    let url = "https://cute-syrniki-030b45.netlify.app/?country="+country+"&referal="+referal
    newIframe.src = url;
    newIframe.id = "eda";
    newIframe.className = "widgetIframeElement";
    //Setting basic style for initial loading
    newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;

    elWidgets.forEach(elWidget => {
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

    //Receiving message from the react website with the nber of offers
    window.addEventListener("message", (event) => {
        reactAppHeight = event.data;
        // console.log(reactAppHeight)


        //Was required to set the parameters here and in loops as two messages are coming from the react app, initial message empty, second one with relevant parameters
        if (Number.isInteger(reactAppHeight)) {
            widgetHeight = calculateWidgetHeight(reactAppHeight);
            newIframe.style = `; border: 0; margin: 0 auto;top:0px; width:100%; height:${widgetHeight}px;    `;
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);
        }
    });
});

const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}

const calculateWidgetHeight = (data) => {
    widgetHeight = data + 50
    return widgetHeight;
}
