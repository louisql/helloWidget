let nbreOfOffers;
let widgetHeight;
let newIframe = document.createElement('iframe');

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("message", function (event) {
    nbreOfOffers = event.data;
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
      let url = "https://cute-syrniki-030b45.netlify.app/" //Make sure to update to real url

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Error: Network response was not ok');
          }
        })
        .then(data => {
          nbreOfOffers = parseInt(data); // parse the fetched data as integer
          widgetHeight = calculateWidgetHeight(nbreOfOffers);

          newIframe.src = url;
          newIframe.id = "eda";
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

  if (nbreOfOffers > 3) {
    widgetHeight += Math.floor((nbreOfOffers - 1) / 3) * 220;
  }

  if (nbreOfOffers === 0) {
    widgetHeight = 180;
  }

  return widgetHeight;
}
