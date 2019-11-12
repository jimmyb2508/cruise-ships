/* globals describe it expect */
const Ship = require('../src/Ship.js');
const Port = require('../src/Port.js');
const Itinerary = require('../src/Itinerary.js');

describe('Ship', () => {
    describe('with ports and an itinerary', () => {
        let ship;
        let dover;
        let calais;
        let itinerary;
        beforeEach(() => {
            const port = {
              removeShip: jest.fn(),
              addShip: jest.fn(),
            };
            dover = {
              ...port,
              name: 'Dover',
              ships: []
            };
            calais = {
              ...port,
              name: 'Calais',
              ships: []
            };
            itinerary = new Itinerary([dover, calais]);
            ship = new Ship(itinerary);
      });
        it('can be instanstiated', () => {
            expect(ship).toBeInstanceOf(Object);
        });
        it('has a starting port', () => {    
            expect(ship.currentPort).toBe(dover);
        })
        it('can set sail', () => {
            ship.setSail();
            expect(ship.currentPort).toBeFalsy();
            expect(dover.removeShip).toHaveBeenCalledWith(ship);
        })
        it ('gets added to port on instantiation', () => { 
            expect(dover.addShip).toHaveBeenCalledWith(ship);
        });
        it(`can't sail further than its itinerary`, () => {
            dover = new Port('Dover');
            calais = new Port('Calais');
            itinerary = new Itinerary([dover, calais]);
            ship = new Ship(itinerary);
    
            ship.setSail();
            ship.dock();
    
            expect(() => ship.setSail()).toThrowError('End of itinerary reached');
        })
    });
});

describe('Dock', () => {
    it('can dock at a different port', () => {
        const dover = new Port('Dover');
        const calais = new Port('Calais');
        const itinerary = new Itinerary([dover, calais])
        const ship = new Ship(itinerary);

        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toBe(calais);
        expect(calais.ships).toContain(ship);
    });
});
