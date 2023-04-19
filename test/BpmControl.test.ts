import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import BpmControl from '../components/BpmControl.vue';

describe('BpmControl.vue', () => {
    it('renders the correct initial BPM', () => {
        const wrapper = mount(BpmControl);
        const bpmInput = wrapper.find<HTMLInputElement>('input[type="text"]');
        expect(bpmInput.element.value).toBe('120');
    });
    
    it('increases BPM when the plus icon is clicked', async () => {
        const wrapper = mount(BpmControl);
        const plusIcon = wrapper.find('#plus');
        
        await plusIcon.trigger('click');
        
        const bpmInput = wrapper.find<HTMLInputElement>('input[type="text"]');
        expect(bpmInput.element.value).toBe('121');
    });
    
    it('decreases BPM when the minus icon is clicked', async () => {
        const wrapper = mount(BpmControl);
        const minusIcon = wrapper.find('#minus');
        
        await minusIcon.trigger('click');
        
        const bpmInput = wrapper.find<HTMLInputElement>('input[type="text"]');
        expect(bpmInput.element.value).toBe('119');
    });
    
    it('emits updateBpm event when BPM is updated', async () => {
        const wrapper = mount(BpmControl);
        const plusIcon = wrapper.find('#plus');
        
        await plusIcon.trigger('click');
        
        expect(wrapper.emitted('updateBpm')).toBeTruthy();
        expect(wrapper.emitted('updateBpm')![0]).toEqual([121]);
    });
    
    it('prevents non-numeric input', async () => {
        const wrapper = mount(BpmControl);
        const bpmInput = wrapper.find<HTMLInputElement>('input[type="text"]');
        
        await bpmInput.setValue('12');
        await bpmInput.trigger('keypress.a');
        
        expect(bpmInput.element.value).toBe('12');
    });
});