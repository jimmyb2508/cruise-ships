/* globals describe it expect */
const Port = require('../src/Port.js');

describe('Port', () => {
    describe('with ports and an itinerary', () => {
            let port;
            let ship;
            let titanic;
            let queenMary;
        beforeEach(() => {
            port = new Port('Dover');
            ship = jest.fn();
            titanic = {};
            queenMary = {};
        });
    it('can be instantiated', () => {
        expect(new Port()).toBeInstanceOf(Object);
    })
    it('has a name', () => {
        expect(port.name).toBe('Dover')
    })
    it('can add a ship', () => {
        port.addShip(ship);
        expect(port.ships).toContain(ship);
    })
    it('can remove a ship', () => {
        port.addShip(titanic);
        port.addShip(queenMary);
        port.removeShip(queenMary);
        expect(port.ships).toEqual([titanic]);
    })
  })
});