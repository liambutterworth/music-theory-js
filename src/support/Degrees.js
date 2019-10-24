import Degree from './Degree';
import Intervals from './Intervals';
import Notes from './Notes';

class Degrees {
    constructor(degrees) {
        this.collection = degrees.map(degree => {
            return degree instanceof Degree ? degree : new Degree(degree);
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
