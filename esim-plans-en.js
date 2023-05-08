document.addEventListener("DOMContentLoaded", () => {
    let nbreOfOffers;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    //Receiving message from the react website with the nber of offers
    window.addEventListener("message", (event) => {
        nbreOfOffers = event.data;
        console.log(nbreOfOffers)
        
        //Was required to set the parameters here and in loops as two messages are coming from the react app, initial message empty, second one with relevant parameters
        if (Number.isInteger(nbreOfOffers)) {
            widgetHeight = calculateWidgetHeight(nbreOfOffers);
            newIframe.style = `; border: 0; margin: 0 auto;top:0px; width:100%; height:${widgetHeight}px;    `;
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
            // let url = "http://localhost:3000/"
            let url = "https://cute-syrniki-030b45.netlify.app/"
            newIframe.src = url;
            newIframe.id = "eda";
            newIframe.className = "widgetIframeElement";
            //Setting basic style for initial loading
            newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
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

const calculateWidgetHeight = (data) => {
    // console.log(data)
    let width = window.innerWidth;

    let widgetHeight = 410



    // Parsing the answer
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // Counting number of offers, in multiple of 3
    // const count = doc.getElementsByClassName("Card_card__9h8Dh").length;
    const count = data;

// Managing height when we have 3, 2 or 1 offers (and their multiple)

    //Below 3 offers
    if (count === 3) {
        if (width > 932) {
            widgetHeight = 410
        } else if (width > 720 && width < 932) {
            widgetHeight = 640
        } else if (width<630 && width > 610) {
            widgetHeight = 740
        } else if (width>610) {
            widgetHeight = 710
        } else if (width > 450){
            widgetHeight = 945
        } else {
            widgetHeight = 1010
        }
    } else if (count === 2) {
        if (width < 700 && width > 610) {
            widgetHeight = 470;
        } else if (width > 450) {
            widgetHeight = 710
        } else {
            widgetHeight = 770
        }
    } else if (count === 1) {
        if (width > 700) widgetHeight = 420
        else if (width> 430) widgetHeight = 470
        else widgetHeight = 540
    }

    //Over 3 offers
    if (count > 3 && width > 920) {
        widgetHeight += Math.floor((count - 1) / 3) * 260;
    } else if (count > 3 && width > 650) {

        widgetHeight += Math.floor((count - 1) / 3) * 540;
    } else if (count > 3) {
        widgetHeight += Math.floor((count - 1) / 3) * 1050;
    }

    //No offer 
    if (count === 0 ) {
        if ( width > 700 ) widgetHeight = 300;
        else if (width > 440) widgetHeight = 400
        else widgetHeight = 250
    }

    return widgetHeight;
}
