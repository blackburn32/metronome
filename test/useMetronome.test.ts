import {AudioContext} from 'standardized-audio-context-mock';
import {describe, expect, it} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import useMetronome from '../composables/useMetronome';

describe('useMetronome', () => {
    const audioContext = new AudioContext();
    const outputNode = audioContext.createGain();
    
    async function waitForBeat(metronome: any) {
        await new Promise(resolve => setTimeout(resolve, metronome.getBeatDuration() * 1000));
        await flushPromises();
    }
    
    async function changeBeatSubdivision(metronome: any, newSubdivision: number) {
        metronome.beatSubdivision.value = newSubdivision;
        await waitForBeat(metronome);
    }
    
    function assertBeatChange(initialBeat: number, currentBeat: number) {
        expect(currentBeat).toBeGreaterThan(initialBeat);
    }
    
    it('has correct initial values', () => {
        const metronome = useMetronome(audioContext, outputNode);
        
        expect(metronome.bpm.value == 120);
        expect(metronome.beat.value == 0);
        expect(metronome.beatsPerMeasure.value == 4);
        expect(metronome.beatSubdivision.value == 4);
        expect(metronome.frequency.value == 440);
        expect(metronome.isPlaying.value == false);
    });
    
    it('getBeatsPerQuarterNote works for all subdivisions', () => {
        const metronome = useMetronome(audioContext, outputNode);
        const testSubdivisions = [1, 2, 4, 8, 16, 32, 64];
        const expectedValues = [0.25, 0.5, 1, 2, 4, 8, 16];
        
        testSubdivisions.forEach((subdivision, index) => {
            metronome.beatSubdivision.value = subdivision;
            expect(metronome.getBeatsPerQuarterNote()).toEqual(expectedValues[index]);
        });
    });
    
    it('getBeatDuration works for different tempos and subdivisions', () => {
        const metronome = useMetronome(audioContext, outputNode);
        const testTempos = [60, 90, 120, 180];
        const testSubdivisions = [1, 2, 4, 8];
        const expectedDurations = [
            [4, 2, 1, 0.5], [8 / 3, 4 / 3, 2 / 3, 1 / 3], [2, 1, 0.5, 1 / 4], [4 / 3, 2 / 3, 1 / 3, 1 / 6],
        ];
        
        testTempos.forEach((tempo, rowIndex) => {
            metronome.bpm.value = tempo;
            testSubdivisions.forEach((subdivision, colIndex) => {
                metronome.beatSubdivision.value = subdivision;
                expect(metronome.getBeatDuration()).toBeCloseTo(expectedDurations[rowIndex][colIndex], 5);
            });
        });
    });
    
    it('advanceBeat works', () => {
        const metronome = useMetronome(audioContext, outputNode);
        
        metronome.advanceBeat();
        expect(metronome.beat.value == 1);
        metronome.advanceBeat();
        expect(metronome.beat.value == 2);
        metronome.advanceBeat();
        expect(metronome.beat.value == 3);
        metronome.advanceBeat();
        expect(metronome.beat.value == 0);
    });
    
    it('start and stop work', async () => {
        const metronome = useMetronome(audioContext, outputNode);
        metronome.start();
        expect(metronome.isPlaying.value == true);
        
        // Wait for a beat
        await waitForBeat(metronome);
        expect(metronome.beat.value == 1);
        
        metronome.stop();
        expect(metronome.isPlaying.value == false);
    });
    
    it('startAfterDelay and stop work', async () => {
        const metronome = useMetronome(audioContext, outputNode);
        metronome.startAfterDelay();
        expect(metronome.isPlaying.value == false);
        
        // Wait for the delay
        await new Promise(resolve => setTimeout(resolve, 500));
        await flushPromises();
        expect(metronome.isPlaying.value == true);
        
        metronome.stop();
        expect(metronome.isPlaying.value == false);
    });
    
    it('startIfNotPlaying and stop work', () => {
        const metronome = useMetronome(audioContext, outputNode);
        
        metronome.startIfNotPlaying();
        expect(metronome.isPlaying.value == true);
        
        metronome.stop();
        expect(metronome.isPlaying.value == false);
    });
    
    it('handles changes in beatSubdivision correctly', async () => {
        const metronome = useMetronome(audioContext, outputNode);
        const initialSubdivision = metronome.beatSubdivision.value;
        metronome.beatsPerMeasure.value = 4;
        metronome.startIfNotPlaying();
        
        await waitForBeat(metronome);
        const initialBeat = metronome.beat.value;
        
        await waitForBeat(metronome);
        const secondBeat = metronome.beat.value;
        assertBeatChange(initialBeat, secondBeat);
        
        await changeBeatSubdivision(metronome, initialSubdivision * 2);
        expect(metronome.beat.value).toBe(0);
        
        await waitForBeat(metronome);
        expect(metronome.beat.value).toBeGreaterThan(0);
        
        metronome.stop();
    });
});