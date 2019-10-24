import Scale from './Scale';
import Note from './Note';

class Key {
    constructor(root, signature) {
        this.root = root instanceof Note ? root : new Note(root);

        if (typeof signature === 'undefined') {
            this.signature = /#/.test(this.root.symbol) ? 'sharp' : 'flat';
        } else {
            this.signature = signature;
        }

        this.ionian = new Scale(this.root, 'ionian', this.signature);
        this.dorian = new Scale(this.ionian.notes[1], 'dorian', this.signature);
        this.phrygian = new Scale(this.ionian.notes[2], 'phrygian', this.signature);
        this.lydian = new Scale(this.ionian.notes[3], 'lydian', this.signature);
        this.mixolydian = new Scale(this.ionian.notes[4], 'mixolydian', this.signature);
        this.aeolian = new Scale(this.ionian.notes[5], 'aeolian', this.signature);
        this.locrian = new Scale(this.ionian.notes[6], 'locrian', this.signature);

        this.notes = this.ionian.notes;

        this.modes = [
            this.ionian,
            this.dorian,
            this.phrygian,
            this.lydian,
            this.mixolydian,
            this.aeolian,
            this.locrian,
        ];
    }
}

export default Key;
