import Data from './Data';
import Interval from './Interval';

class Degree {
    constructor(data) {
        if (typeof data === 'string') {
            this.data = Data.degrees.find(data);
            this.symbol = data;
        } else {
            this.data = data;
            this.symbol = data.symbol;
        }

        this.interval = this.data.interval;
    }

    getInterval() {
        return new Interval(this.interval);
    }

    getNote(root) {
        return this.getInterval().getNote(root);
    }
}

export default Degree;
