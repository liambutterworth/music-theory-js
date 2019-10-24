import Data from './Data';
import Interval from './Interval';

class Note {
    static byDegree(degree, root) {
        degree = degree instanceof Degree ? degree : new Degree(degree);
        return this.byInterval(degree.interval, root);
    }

    static byInterval(interval, root) {
        interval = interval instanceof Interval ? interval : new Interval(interval);

        const rootSymbol = root instanceof Note ? root.symbol : root;
        const rootIndex = Data.notes.findIndex(rootSymbol);
        const noteIndex = (rootIndex + interval.steps) % 12;

        return new Note(Data.notes.findByIndex(noteIndex));
    }

    constructor(data) {
        if (typeof data === 'string') {
            this.data = Data.notes.find(data);
            this.symbol = data;
        } else {
            this.data = data;
            this.symbol = this.data.symbols[0];
        }
    }

    getInterval(note) {
        const targetSymbol = note instanceof Note ? note.symbol : note;
        const currentIndex = Data.notes.findIndex(this.symbol);
        const targetIndex = Data.notes.findIndex(targetSymbol);
        const steps = Math.abs(currentIndex - targetIndex);

        return new Interval.bySteps(steps);
    }

    isAccidental() {
        return this.data.type === 'accidental';
    }

    isNatural() {
        return this.data.type === 'natural';
    }

    isFlat() {
        return /[A-G]b/.test(this.symbol);
    }

    isSharp() {
        return /[A-G]#/.test(this.symbol);
    }
}

export default Note;
