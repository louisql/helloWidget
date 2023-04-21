document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('message', (event) => {
    const nbreOfOffers = event.data;
    const elWidget = document.querySelector(`.simbud-esim-plans-widget[data-widget="${event.origin}"]`);

    if (Number.isInteger(nbreOfOffers)) {
      const newIframe = addIframe(elWidget, event.origin, event.origin);
      updateIframe(newIframe, nbreOfOffers);
      elWidget.removeChild(elWidget.lastElementChild);
    }
  });

  const elWidgets = document.querySelectorAll('.simbud-esim-plans-widget');

  elWidgets.forEach((elWidget) => {
    if (linkIsUpAndFollows(simbudLink)) {
      const dataWidget = elWidget.getAttribute('data-widget');
      const url = 'https://cute-syrniki-030b45.netlify.app/';
      addIframe(elWidget, url, dataWidget);
      elWidget.removeChild(elWidget.lastElementChild);
    } else {
      addErrorMessage(elWidget);
    }
  });
});

const simbudLink = document.querySelector("a[href*='https://www.simbud.com']");

const linkIsUpAndFollows = (link) => {
  return link && !link.getAttribute('rel')?.match(/nofollow/i);
};

const calculateWidgetHeight = (nbreOfOffers) => {
  let widgetHeight = 320;

  if (nbreOfOffers > 3) {
    widgetHeight += Math.floor((nbreOfOffers - 1) / 3) * 220;
  }

  if (nbreOfOffers === 0) {
    widgetHeight = 180;
  }

  return widgetHeight;
};

const addErrorMessage = (elWidget) => {
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = 'Error: Element missing';
  elWidget.prepend(errorMessage);
};

const addIframe = (elWidget, url, dataWidget) => {
  const newIframe = document.createElement('iframe');
  const nbreOfOffers = null;
  newIframe.id = 'eda';
  newIframe.className = 'widgetIframeElement';
  newIframe.setAttribute('data-widget', dataWidget);
  newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: 320px`;
  newIframe.src = url;
  elWidget.prepend(newIframe);
  return newIframe;
};

const updateIframe = (newIframe, nbreOfOffers) => {
  const widgetHeight = calculateWidgetHeight(nbreOfOffers);
  newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
};


