import {computed, onUnmounted, ref, watch} from 'vue';
import useAccurateTimer from '../composables/useAcurateTimer';
import {IAudioContext, IGainNode, IOscillatorNode} from 'standardized-audio-context';

export default function useMetronome(audioContext: IAudioContext, outputNode: IGainNode<IAudioContext>) {
    const bpm = ref(120);
    const beat = ref(0);
    const beatsPerMeasure = ref(4);
    const beatSubdivision = ref(4);
    const frequency = ref(440);
    
    const advanceBeat = () => {
        beat.value = (beat.value + 1) % beatsPerMeasure.value;
    };
    
    const isBeatOnDownbeat = computed(() => beat.value === 0);
    const isBeatOnQuarterNote = computed(() => {
        const beatsPerQuarterNote = getBeatsPerQuarterNote();
        return beat.value % beatsPerQuarterNote < 1;
    });
    
    const getBeatsPerQuarterNote = () => {
        return beatSubdivision.value / 4;
    };
    
    const getBeatDuration = () => {
        const quarterNotesPerSecond = bpm.value / 60;
        const beatsPerQuarterNote = getBeatsPerQuarterNote();
        return 1 / (quarterNotesPerSecond * beatsPerQuarterNote);
    };
    
    const getFrequencyToPlay = () => {
        if(isBeatOnDownbeat.value){
            return frequency.value * 2;
        }
        if(isBeatOnQuarterNote.value){
            return frequency.value;
        }
        return frequency.value / 2;
    };
    
    const playPing = () => {
        const timeTillNextBeat = getBeatDuration();
        const pingDuration = Math.min(timeTillNextBeat / 2, 0.1);
        
        const oscillatorNode = audioContext.createOscillator();
        const noteGainNode = audioContext.createGain();
        noteGainNode.gain.value = 1;
        oscillatorNode.frequency.value = getFrequencyToPlay();
        
        oscillatorNode.type = 'sine';
        oscillatorNode.start();
        oscillatorNode.connect(noteGainNode);
        noteGainNode.connect(outputNode);
        
        noteGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + pingDuration);
        setTimeout(() => cleanupNote(oscillatorNode, noteGainNode), pingDuration * 1000);
        advanceBeat();
    };
    
    const cleanupNote = (oscillatorNode: IOscillatorNode<IAudioContext>, gainNode: IGainNode<IAudioContext>) => {
        oscillatorNode.stop();
        oscillatorNode.disconnect();
        gainNode.disconnect();
    };
    
    const beatDuration = ref(getBeatDuration() * 1000);
    const {
        start: startTimer,
        stop: stopTimer,
    } = useAccurateTimer(playPing, beatDuration);
    stopTimer();
    const isPlaying = ref(false);
    
    const start = () => {
        isPlaying.value = true;
        beatDuration.value = getBeatDuration() * 1000;
        playPing();
        startTimer();
    };
    
    const startTimeout = ref<number | null>(null);
    const startAfterDelay = () => {
        if(isPlaying.value){
            stopTimer();
        }
        if(!isPlaying.value){
            return;
        }
        if(startTimeout.value){
            window.clearTimeout(startTimeout.value);
        }
        beat.value = 0;
        startTimeout.value = window.setTimeout(start, 500);
    };
    
    const startIfNotPlaying = () => {
        if(!isPlaying.value){
            beat.value = 0;
            start();
        }
    };
    
    const stop = () => {
        isPlaying.value = false;
        stopTimer();
    };
    
    watch(bpm, startAfterDelay);
    watch(beatSubdivision, startAfterDelay);
    
    onUnmounted(() => {
        stop();
        if(startTimeout.value){
            window.clearTimeout(startTimeout.value);
        }
    });
    
    return {
        bpm,
        beat,
        beatsPerMeasure,
        beatSubdivision,
        frequency,
        advanceBeat,
        getBeatsPerQuarterNote,
        getBeatDuration,
        start,
        startAfterDelay,
        startIfNotPlaying,
        stop,
        isPlaying,
    };
}