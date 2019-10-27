// import Degrees from './Degrees';
import Interval from './Interval';
import Notes from './Notes';

class Intervals {
    static byDegrees(degrees) {
        const intervals = degrees.map(degree => Interval.byDegree(degree));
        return new Intervals(intervals);
    }

    static byNotes(notes) {
        notes = notes instanceof Notes ? notes : new Notes(notes);
        return notes.getIntervals();
    }

    constructor(intervals) {
        this.collection = intervals.map(interval => {
            return interval instanceof Interval ? interval : new Interval(interval);
        });

        if (this.collection.length <= 7) this.resolve(); 
    }

    resolve() {
        const numbers = this.collection.map(interval => interval.getNumber());

        const conflicts = numbers.filter((number, index) => {
            return numbers.indexOf(number) !== index;
        });

        if (conflicts.length === 0) return;

        this.collection = this.collection.map(interval => {
            const letter = interval.getLetter();
            const number = interval.getNumber();

            if (conflicts.includes(number) && interval.isAltered()) {
                const newLetter = letter === 'd' ? 'A' : 'd';
                const newNumber = letter === 'd' ? number - 1 : number + 1;
                interval = new Interval(`${newLetter}${newNumber}`);
            }

            return interval;
        });
    }

    getDegrees() {
        return this.collection.map(interval => interval.getDegree());
    }

    getNotes(root) {
        const notes = this.collection.map(interval => {
            return interval.getNote(root);
        });

        return new Notes(notes);
    }
}

export default Intervals;
