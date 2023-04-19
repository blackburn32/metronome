<template>
    <div class="flex flex-row card bg-base-300 shrink items-center justify-center">
        <div class="flex flex-col p-4">
            <BpmControl v-on:updateBpm="(newBpm) => bpm = newBpm"/>
            <VolumeControl v-on:updateVolume="(newVolume) => mainVolume = newVolume"/>
        </div>
        <TimeSignatureControl
            v-on:updateBeatSubdivision="(newSubdivision) => beatSubdivision = newSubdivision"
            v-on:updateBeatsPerMeasure="(newBeatsPerMeasure) => beatsPerMeasure = newBeatsPerMeasure"
        />
        <Icon
            v-show="!isPlaying"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="ic:baseline-play-arrow"
            size="64"
            @click="start"
        />
        <Icon
            v-show="isPlaying"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="ic:baseline-pause"
            size="64"
            @click="stop"
        />
    </div>
</template>

<script lang="ts" setup>
import useMetronome from '~/composables/useMetronome';
import useAudio from '~/composables/useAudio';

const {
    audioContext,
    outputNode,
    mainVolume,
} = useAudio();
const {
    start,
    stop,
    bpm,
    beatsPerMeasure,
    beatSubdivision,
    isPlaying,
} = useMetronome(audioContext.value, outputNode);
</script>