import Data from './Data';
import Note from './Note';

class Interval {
    static byDegree(degree) {
        return new Interval(degree.interval);
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

        this.name = this.data.name;
        this.steps = this.data.steps;
    }

    getNote(root) {
        root = root instanceof Note ? root : new Note(root);
        return new Note.byInterval(this, root);
    }
}

export default Interval;
