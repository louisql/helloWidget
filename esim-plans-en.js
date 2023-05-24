document.addEventListener("DOMContentLoaded", () => {
    let reactAppHeight;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    let simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");

    //Make sure to update to real url !
    // let url = "http://localhost:3000/"
    let url = "https://cute-syrniki-030b45.netlify.app/"
    newIframe.src = url;
    newIframe.id = "eda";
    newIframe.className = "widgetIframeElement";
    //Setting basic style for initial loading
    newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
    
    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(simbudLink)) {
            let dataWidget = elWidget.getAttribute("data-widget");
            console.log(dataWidget)

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
    widgetHeight= data + 50
    return widgetHeight;
}
