import Data from './Data';
import Interval from './Interval';

class Degree {
    static byInterval(interval) {
        const intervalSymbol = interval instanceof Interval ? interval.symbol : interval;
        const degreeData = Data.degrees.findByInterval(intervalSymbol);
        return new Degree(degreeData);
    }

    constructor(data) {
        if (typeof data === 'string') {
            this.data = Data.degrees.find(data);
            this.symbol = data;
        } else {
            this.data = data;
            this.symbol = data.symbol;
        }
    }

    getNumber() {
        return this.symbol.match(/([1-7])/)[1];
    }

    getSign() {
        return this.symbol.match(/(.*)[1-7]/)[1];
    }

    getInterval() {
        return new Interval(this.data.interval);
    }

    getNote(root) {
        return this.getInterval().getNote(root);
    }
}

export default Degree;
