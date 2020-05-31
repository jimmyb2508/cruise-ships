(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    this.initialiseSea();
    document.querySelector('#sailbutton').addEventListener('click', () => {
      this.setSail();
    });
  }
  
  Controller.prototype.initialiseSea = function initialiseSea() {
    const backgrounds = [
      './images/water0.png',
      './images/water1.png',
    ];
    let backgroundIndex = 0;
    window.setInterval(() => {
      document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
      backgroundIndex += 1;
    }, 1000);
  };

  Controller.prototype.renderPorts = function renderPorts(ports) {
    const portsElement = document.querySelector('#ports');
    portsElement.style.width = '0px';
    ports.forEach((port, index) => {
      const newPortElement = document.createElement('div');
      newPortElement.dataset.portName = port.name;
      newPortElement.dataset.portIndex = index;
      newPortElement.className = 'port';
      portsElement.appendChild(newPortElement);
      const portsElementWidth = parseInt(portsElement.style.width, 10);
      portsElement.style.width = `${portsElementWidth + 256}px`;
    })
  };

  Controller.prototype.renderShip = function renderShip() {
    const ship = this.ship;
    const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
    const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
    const shipElement = document.querySelector('#ship');
    shipElement.style.top = `${portElement.offsetTop + 32}px`;
    shipElement.style.left = `${portElement.offsetLeft - 32}px`;
  };

  Controller.prototype.setSail = function setSail() {
    const ship = this.ship;
    const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;
    const portElement = document.querySelector(`[data-port-index = "${nextPortIndex}"]`);
    if (!portElement) {
      this.renderMessage('Your journey has finished. Please disembark!');
      return;
    }
    const portPosition = portElement.offsetLeft;
    const shipElement = document.querySelector('#ship');
    let shipPosition = shipElement.offsetLeft;
    ship.setSail();
    const departingMessage = `Now departing ${ship.previousPort.name}`;
    const sailing = setInterval(() => {
      if (shipPosition === portPosition - 32) {
        clearInterval(sailing);
      }
      shipElement.style.left = `${shipPosition + 1}px`;
      shipPosition += 1;
    }, 10);
    ship.dock();
    const dockingMessage = `Now docking at ${ship.currentPort.name}`;
    this.renderMessage(departingMessage);
    window.setTimeout(() => {
      this.renderMessage(dockingMessage);
    }, 2000);
  };

  Controller.prototype.renderMessage = function renderMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.id = 'message';
    messageElement.innerHTML = message;
    
    const viewport = document.querySelector('#viewport');
    viewport.appendChild(messageElement);

    setTimeout(() => {
      viewport.removeChild(messageElement);
    }, 2000);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());

