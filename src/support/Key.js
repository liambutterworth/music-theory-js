import Scale from './Scale';
import Note from './Note';

class Key {
    constructor(root, quality = 'major') {
        this.root = root instanceof Note ? root : new Note(root);
        this.signature = this.root.getSignature();

        if (!['major', 'minor'].includes(quality)) {
            throw 'key quality can only be major or minor';
        }

        this.scale = new Scale(this.root, quality, this.signature);
        this.notes = this.scale.notes;
        this.modes = this.scale.getModes();
    }
}

export default Key;
