import Data from './Data';
import Intervals from './Intervals';
import Note from './Note';

class Notes {
    static all() {
        return Data.notes.all().map(data => new Note(data));
    }

    static byDegrees(degrees, root) {
        const notes = degrees.map(degree => Note.byDegree(degree, root));
        return new Notes(notes);
    }

    static byIntervals(intervals, root) {
        const notes = intervals.map(interval => Note.byInterval(interval, root));
        return new Notes(notes);
    }

    constructor(notes) {
        this.collection = notes.map(note => {
            return note instanceof Note ? note : new Note(note);
        });
    }

    getRoot() {
        return this.collection[0];
    }

    getIntervals() {
        const notes = this.collection.map(note => {
            return note.getInterval(this.getRoot());
        });

        return new Intervals(notes);
    }
}

export default Notes;
