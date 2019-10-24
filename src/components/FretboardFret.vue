<template>
    <div :class="classNames">
        {{ note.symbol }}
    </div>
</template>

<script>

import Music from '../support/Music';

export default {
    name: 'fretboard-fret',

    props: {
        note: {
            required: true,
            type: Music.Note,
        },

        pressed: {
            default: false,
            type: Boolean,
        },
    },

    data() {
        return {
            isPressed: this.pressed,
        };
    },

    computed: {
        classNames() {
            return {
                'fretboard-fret': true,
                'fretboard-fret--is-pressed': this.isPressed,
            };
        },
    },
}

</script>

<style scoped lang="scss">

.fretboard-fret {
    display: inline-block;
}
.fretboard-fret.fretboard-fret--is-pressed {
    background-color: red;
    color: white;
}

</style>
