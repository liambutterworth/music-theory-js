import Data from './Data';
import Note from './Note';

class Interval {
    static byDegree(degree) {
        const data = Data.intervals.findByDegree(degree);
        return new Interval(data);
    }

    static byNotes(root, target) {
        root = root instanceof Note ? root : new Note(root);
        return root.getInterval(target);
    }

    static bySteps(steps) {
        const data = Data.intervals.findBySteps(steps);
        return new Interval(data);
    }

    constructor(data) {
        if (typeof data === 'string') {
            this.data = Data.intervals.find(data);
            this.symbol = data;
        } else {
            this.data = data;
            this.symbol = data.symbol;
        }
    }

    getLetter() {
        return this.symbol.match(/([dmMPA])[1-8]/)[1];
    }

    getNumber() {
        return parseInt(this.symbol.match(/[dmMPA]([1-8])/)[1]);
    }

    isDiminished() {
        return this.getLetter() === 'd';
    }

    isAugmented() {
        return this.getLetter() === 'A';
    }

    isAltered() {
        return this.isDiminished() || this.isAugmented();
    }

    getName() {
        return this.data.name;
    }

    getSteps() {
        return this.data.steps;
    }

    getDegree() {
        return this.data.degree;
    }

    getNote(root) {
        root = root instanceof Note ? root : new Note(root);
        return new Note.byInterval(this, root);
    }
}

export default Interval;
