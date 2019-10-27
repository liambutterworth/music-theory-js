import Degree from './Degree';
import Intervals from './Intervals';
import Notes from './Notes';

class Degrees {
    constructor(degrees) {
        this.collection = degrees.map(degree => {
            return degree instanceof Degree ? degree : new Degree(degree);
        });

        if (this.collection.length <= 7) {
            this.resolve()
        }
    }

    resolve() {
        const numbers = this.collection.map(degree => degree.getNumber());

        const conflicts = numbers.filter((number, index) => {
            return numbers.indexOf(number) !== index;
        });

        if (conflicts.length > 0) {
            this.collection = this.collection.map(degree => {
                const sign = degree.getSign();
                const number = parseInt(degree.getNumber());

                if (conflicts.includes(number) && sign !== '') {
                    const newSign = sign === 'b' ? '#' : 'b';
                    const newNumber = sign === 'b' ? number - 1 : number + 1;
                    degree = new Degree(`${newSign}${newNumber}`);
                }

                return degree;
            });
        }
    }

    getSymbols() {
        return this.collection.map(degree => {
            return degree.symbol;
        });
    }

    getIntervals() {
        const intervals = this.collection.map(degree => degree.getInterval());
        return new Intervals(intervals);
    }

    getNotes(root) {
        const notes = this.collection.map(degree => degree.getNote(root));
        return new Notes(notes);
    }
}

export default Degrees;
