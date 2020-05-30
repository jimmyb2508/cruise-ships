(function exportPort() {
  class Port{
    constructor(name) {
      this.name = name;
      this.ships = [];
    }
    addShip(ship) {
      this.ships.push(ship);
    }
    removeShip(ship) {
      for (let i = 0; i < this.ships.length; i++) {
          if (this.ships[i] === ship) {
              this.ships.splice(i, 1);
          }
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }
}());
