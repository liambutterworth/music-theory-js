import Interval from './Interval';
import Notes from './Notes';

class Intervals {
    static byDegrees(degrees) {
        return degrees.map(degree => new Interval.byDegree(degree));
    }

    static byNotes(notes) {
        return new Notes(notes).getIntervals();
    }

    constructor(intervals) {
        this.collection = intervals.map(interval => {
            return interval instanceof Interval ? interval : new Interval(interval);
        });
    }

    getNotes(root) {
        return this.collection.map(interval => {
            return interval.getNote(root);
        });
    }
}

export default Intervals;
