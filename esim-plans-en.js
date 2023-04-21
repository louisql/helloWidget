let nbreOfOffers

window.addEventListener("message", function (event) {
    // if (event.origin !== 'https://example.com') { // replace with the domain of file1
    //   return; // reject messages from other domains
    // }
    // console.log(event.data); // log the message content
    nbreOfOffers = event.data
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");
  
  
    elWidgets.forEach(elWidget => {
      if (linkIsUpAndFollows(simbudLink)) {
        let newIframe = document.createElement('iframe');
        let dataWidget = elWidget.getAttribute("data-widget");
        let url = "http://localhost:3001/" //Make sure to update to real url
  
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
            // console.log(data)
            let widgetHeight = calculateWidgetHeight(nbreOfOffers);
  
            // Set the iframe srcdoc attribute with the fetched HTML content
            newIframe.src = url;
            newIframe.id = "eda"
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
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
  }
  
  const calculateWidgetHeight = (nbreOfOffers) => {
    let widgetHeight = 320;
  
    // Transformation de la reponse
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(data, "text/html");
  
    // Comptage du nombre d'offres, en multiple de 3
    // const count = doc.getElementsByClassName("Card_card__9h8Dh").length;
    if (nbreOfOffers > 3) {
      widgetHeight += Math.floor((count - 1) / 3) * 210;
    }
  
    // console.log(nbreOfOffers)

    if (nbreOfOffers === 0) {
        widgetHeight = 180;
    }

    return widgetHeight;
}