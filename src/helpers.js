const helpers = {
  createContent: contentObj => {
    if (contentObj.element === null) {
      return null;
    }

    const output = document.createElement(contentObj.element);
    Object.keys(contentObj).forEach(key => {
      if (
        ![
          'element',
          'children',
          'classList',
          'eventListeners',
          'data-toggle',
          'data-target',
        ].includes(key)
      ) {
        output[key] = contentObj[key];
      } else {
        switch (key) {
          case 'children':
            contentObj.children.forEach(element => {
              output.appendChild(helpers.createContent(element));
            });
            break;
          case 'element':
            break;
          case 'classList':
            contentObj.classList.forEach(element => output.classList.add(element));
            break;
          case 'eventListeners':
            contentObj.eventListeners.forEach(eventListener => {
              output.addEventListener(eventListener[0], eventListener[1]);
            });
            break;
          case 'data-toggle':
            output.setAttribute('data-toggle', contentObj['data-toggle']);
            break;
          case 'data-target':
            output.setAttribute('data-target', contentObj['data-target']);
            break;
          default:
            break;
        }
      }
    });
    return output;
  },
};

export default helpers;
