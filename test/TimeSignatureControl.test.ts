import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import TimeSignatureControl from '../components/TimeSignatureControl.vue';

describe('BeatControl.vue', () => {
    it('renders beats per measure and beat value correctly', () => {
        const wrapper = mount(TimeSignatureControl);
        const beatsPerMeasure = wrapper.find<HTMLInputElement>('#beats-per-measure');
        const beatValue = wrapper.find('#beat-value');
        
        expect(beatsPerMeasure.element.value).toBe('4');
        expect(beatValue.text()).toBe('4');
    });
    
    it('increments and decrements beats per measure correctly', async () => {
        const wrapper = mount(TimeSignatureControl);
        const increaseButton = wrapper.find('#beats-per-measure-plus');
        const decreaseButton = wrapper.find('#beats-per-measure-minus');
        const beatsPerMeasure = wrapper.find<HTMLInputElement>('#beats-per-measure');
        
        await increaseButton.trigger('click');
        expect(beatsPerMeasure.element.value).toBe('5');
        
        await decreaseButton.trigger('click');
        expect(beatsPerMeasure.element.value).toBe('4');
    });
    
    it('increments and decrements beat value correctly', async () => {
        const wrapper = mount(TimeSignatureControl);
        const increaseButton = wrapper.find('#beat-value-plus');
        const decreaseButton = wrapper.find('#beat-value-minus');
        const beatValue = wrapper.find('#beat-value');
        
        await increaseButton.trigger('click');
        expect(beatValue.text()).toBe('8');
        
        await decreaseButton.trigger('click');
        expect(beatValue.text()).toBe('4');
    });
    
    it('emits events with correct values when beats per measure and beat value change', async () => {
        const wrapper = mount(TimeSignatureControl);
        const increaseBeatsPerMeasureButton = wrapper.find('#beats-per-measure-plus');
        const increaseBeatValueButton = wrapper.find('#beat-value-plus');
        
        await increaseBeatsPerMeasureButton.trigger('click');
        expect(wrapper.emitted().updateBeatsPerMeasure).toBeTruthy();
        expect(wrapper.emitted().updateBeatsPerMeasure[0]).toEqual([5]);
        
        await increaseBeatValueButton.trigger('click');
        expect(wrapper.emitted().updateBeatSubdivision).toBeTruthy();
        expect(wrapper.emitted().updateBeatSubdivision[0]).toEqual([8]);
    });
});